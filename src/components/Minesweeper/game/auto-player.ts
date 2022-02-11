import { Information } from './information';
import { MinesweeperGame } from './minesweeper-game';
import { MinesweeperTile } from './minesweeper-tile';
import { arrayContains, arraysAreEqual } from './utils';

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
  game: MinesweeperGame;

  constructor(game: MinesweeperGame) {
    this.game = game;
  }

  /** Flag all remaining adjacent tiles a tile that needs it */
  getSimpleFlagMove(): FlagMove | undefined {
    const tileToFlagAdjacent = this.game.getTiles('revealed').find(tile => {
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

  // Click a tile that is all flagged up
  getSimpleClickMove(): ClickMove | undefined {
    const tileToClick = this.game.getTiles('revealed').find(tile => {
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

  getSmartMove(): Move | undefined {
    const revealed = this.game.getTiles('revealed');
    const handled: MinesweeperTile[] = [];
    const information = new Information();

    const foundMeaningfulData = revealed.some(srcTile => {
      if (handled.includes(srcTile)) return;

      const srcHiddenTiles = srcTile.getAdjacent('hidden');
      const srcPotentialMines =
        srcTile.value - srcTile.getAdjacent('flagged').length;
      information.add(srcHiddenTiles, srcPotentialMines);
      handled.push(srcTile);

      if (information.meaningfulData[0]) {
        return true;
      }

      // TODO: forAdjacent without finals
      return srcTile
        .getAdjacent('revealed')
        .filter(a => !a.isFinal)
        .some(targetTile => {
          if (handled.includes(targetTile)) return;

          const targetHiddenTiles = targetTile.getAdjacent('hidden');
          const targetPotentialMines =
            targetTile.value - targetTile.getAdjacent('flagged').length;
          information.add(targetHiddenTiles, targetPotentialMines);
          handled.push(targetTile);

          if (information.meaningfulData[0]) {
            return true;
          }

          return false;
        });
    });

    if (foundMeaningfulData) {
      const data = information.meaningfulData[0];
      if (data.mines === 0) {
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

  getNextMove() {
    const move =
      this.getSimpleFlagMove() ||
      this.getSimpleClickMove() ||
      this.getSmartMove();

    if (!move) {
      console.log('No next move');
    }
    return move;
  }

  playNextMove() {
    const move = this.getNextMove();
    if (!move) return;

    if (move.action === 'flag') {
      move.tiles.forEach(tile => tile.flag());
    } else if (move.action === 'click') {
      move.tiles.forEach(tile => tile.click());
    }
  }

  async autoPlay(delay: number) {
    let nextMove = this.getNextMove();
    while (nextMove) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(delay);
      this.playNextMove();

      nextMove = this.getNextMove();
    }
  }
}
