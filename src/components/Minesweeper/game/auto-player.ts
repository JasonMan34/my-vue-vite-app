import { Information } from './information';
import { MinesweeperGame } from './minesweeper-game';
import { MinesweeperTile } from './minesweeper-tile';

const sleep = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(() => resolve(), ms);
  });

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
  private lastMove?: Move;
  private nextMove?: Move;
  private game: MinesweeperGame;
  private info: Information;

  constructor(game: MinesweeperGame) {
    this.game = game;
    this.info = new Information(game);
    (window as any).info = this.info;
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

  private removeStaleInfo() {
    // if (!this.lastMove) return;

    // this.info.invalidate(this.lastMove.tiles);

    // TODO: Only invalidate actual stale data
    this.info.data = [];
    this.info.meaningfulData = [];
  }

  private getSmartMove(): Move | undefined {
    const revealed = this.game.getActiveTiles('revealed');
    const handled: MinesweeperTile[] = [];

    this.removeStaleInfo();

    if (this.lastMove && false) {
      console.log('test');
    } else {
      revealed.some(srcTile => {
        if (handled.includes(srcTile)) return;

        const srcHiddenTiles = srcTile.getAdjacent('hidden');
        const srcPotentialMines =
          srcTile.value - srcTile.getAdjacent('flagged').length;
        this.info.add(srcHiddenTiles, srcPotentialMines);
        handled.push(srcTile);

        if (this.info.meaningfulData[0]) {
          return true;
        }
        return false;
      });
    }

    // If no meaningful data found, check mines left
    if (!this.info.foundMeaningfulData) {
      // this.info.checkMinesLeft();
    }

    // If meaningful data found, we can make a 100% certain move
    if (this.info.foundMeaningfulData) {
      const data = this.info.meaningfulData[0];
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
    // TODO: Smart guess. Right now it is completely random
    const allTiles = this.game.getAllTiles('hidden');
    const randomTile = allTiles[Math.floor(Math.random() * allTiles.length)];

    return {
      action: 'click',
      tiles: [randomTile],
    };
  }

  getNextMove(): Move | undefined {
    if (this.game.isGameOver || this.game.isGameWon) return;

    const move =
      this.getSimpleFlagMove() ||
      this.getSimpleClickMove() ||
      this.getSmartMove();
    // ||
    // this.getGuessMove();

    this.nextMove = move;

    return this.nextMove;
  }

  playNextMove() {
    if (this.game.isGameOver || this.game.isGameWon || !this.nextMove) return;

    if (this.nextMove.action === 'flag') {
      this.nextMove.tiles.forEach(tile => tile.flag());
    } else {
      this.nextMove.tiles.forEach(tile => tile.click());
    }
    this.lastMove = this.nextMove;
  }

  async autoPlay(delay?: number) {
    while (
      !(this.game.isGameOver || this.game.isGameWon) &&
      this.getNextMove()
    ) {
      if (delay) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay);
      }

      this.playNextMove();
    }
  }
}
