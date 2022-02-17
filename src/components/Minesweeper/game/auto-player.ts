import { Information } from './information';
import { MinesweeperGame } from './minesweeper-game';
import { MinesweeperTile } from './minesweeper-tile';
import { sleep } from './utils';

type FlagMove = {
  action: 'flag';
  tiles: MinesweeperTile[];
};
type ClickMove = {
  action: 'click';
  tiles: MinesweeperTile[];
};

type Move = FlagMove | ClickMove;

export class AutoPlayer {
  private game: MinesweeperGame;
  public nextMove?: Move;
  public shouldGuess: boolean;

  constructor(game: MinesweeperGame, shouldGuess = false) {
    this.game = game;
    this.shouldGuess = shouldGuess;
  }

  /** Flag all remaining adjacent tiles a tile that needs it */
  private getSimpleFlagMove(): FlagMove | undefined {
    const tileToFlagAdjacent = this.game
      .getActiveTiles('revealed')
      .find(tile => {
        const hiddenAdjacent = tile.getAdjacent('hidden').length;
        const flagAdjacent = tile.getAdjacent('flagged').length;
        return tile.value - flagAdjacent === hiddenAdjacent;
      });

    if (tileToFlagAdjacent) {
      const tilesToFlag = tileToFlagAdjacent.getAdjacent('hidden');

      return {
        action: 'flag',
        tiles: tilesToFlag,
      };
    }
  }

  /** Click a tile that is all flagged up */
  private getSimpleClickMove(): ClickMove | undefined {
    const tileToClick = this.game.getActiveTiles('revealed').find(tile => {
      const flagAdjacent = tile.getAdjacent('flagged').length;
      return tile.value === flagAdjacent;
    });

    if (tileToClick) {
      return {
        action: 'click',
        tiles: [tileToClick],
      };
    }
  }

  private getSmartMove(): Move | undefined {
    const revealed = this.game.getActiveTiles('revealed');
    const handled: MinesweeperTile[] = [];

    const info = new Information(this.game);
    // TODO: Remove this
    (globalThis as any).info = info;

    revealed.some(srcTile => {
      if (handled.includes(srcTile)) return;

      const srcHiddenTiles = srcTile.getAdjacent('hidden');
      const srcPotentialMines =
        srcTile.value - srcTile.getAdjacent('flagged').length;
      info.add(srcHiddenTiles, srcPotentialMines);
      handled.push(srcTile);

      if (info.meaningfulData[0]) {
        return true;
      }
      return false;
    });

    // If no meaningful data found, start inferring data
    let canInferMoreData = true;
    while (!info.foundMeaningfulData && canInferMoreData) {
      canInferMoreData = info.inferData();
    }

    if (!info.foundMeaningfulData) {
      info.checkMinesLeft();
    }

    // If meaningful data found, we can make a 100% certain move
    if (info.foundMeaningfulData) {
      const data = info.meaningfulData[0];
      if (data.mines.value === 0) {
        return {
          action: 'click',
          tiles: data.tiles,
        };
      }

      return {
        action: 'flag',
        tiles: data.tiles,
      };
    }
  }

  getGuessMove(): Move {
    // First, we see if there are double-hidden corners:
    const move: Partial<ClickMove> = {
      action: 'click',
    };

    this.game.getCorners().some(tile => {
      if (tile.status === 'hidden') {
        move.tiles = [tile];
        return true;
      }

      return false;
    });

    // TODO: Smart guess. Right now it is completely random

    if (!move.tiles) {
      const allTiles = this.game.getAllTiles('hidden');
      const randomTile = allTiles[Math.floor(Math.random() * allTiles.length)];

      move.tiles = [randomTile];
    }

    return move as Move;
  }

  getNextMove(): Move | undefined {
    if (this.game.isGameLost || this.game.isGameWon) return;

    let move =
      this.getSimpleFlagMove() ||
      this.getSimpleClickMove() ||
      this.getSmartMove();

    if (!move && this.shouldGuess) {
      move = this.getGuessMove();
    }

    this.nextMove = move;

    return this.nextMove;
  }

  playNextMove() {
    if (this.game.isGameLost || this.game.isGameWon || !this.nextMove) return;

    if (this.nextMove.action === 'flag') {
      this.nextMove.tiles.forEach(tile => tile.flag());
    } else {
      this.nextMove.tiles.forEach(tile => tile.click());
    }
  }

  async autoPlay(delay?: number) {
    while (!this.game.isGameOver && this.getNextMove()) {
      if (delay) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay);
      }

      this.playNextMove();
    }
  }
}
