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

  /** Smart move. Does not think ahead */
  getSmartMove(): Move | undefined {
    let move: Move | undefined;

    const revealed = this.game.getTiles('revealed');
    revealed.some(source => {
      const srcHiddenTiles = source.getAdjacent('hidden');
      const srcPotentialMines =
        source.value - source.getAdjacent('flagged').length;

      // TODO: forAdjacent without finals
      return source
        .getAdjacent('revealed')
        .filter(a => !a.isFinal)
        .some(targetTile => {
          const targetHiddenTiles = targetTile.getAdjacent('hidden');
          const targetPotentialMines =
            targetTile.value - targetTile.getAdjacent('flagged').length;

          const targetAndSource: MinesweeperTile[] = [];
          const targetNotSource: MinesweeperTile[] = [];

          targetHiddenTiles.forEach(targetHidden => {
            if (srcHiddenTiles.includes(targetHidden)) {
              targetAndSource.push(targetHidden);
            } else {
              targetNotSource.push(targetHidden);
            }
          });

          if (targetAndSource.length === 0) {
            // If there is no intersection whatsoever, no information can be realized
            return false;
          }

          if (targetNotSource.length !== 0) {
            // If same number of mines, and target contains tiles not in source, we can click them
            if (
              srcPotentialMines === targetPotentialMines &&
              arrayContains(targetHiddenTiles, srcHiddenTiles)
            ) {
              move = { action: 'click', tiles: targetNotSource };
              return true;
            }

            // targetPotentialMines - srcPotentialMines = The amount of flags we need in targetNotSource
            if (
              targetPotentialMines - srcPotentialMines ===
              targetNotSource.length
            ) {
              move = { action: 'flag', tiles: targetNotSource };
              return true;
            }
          }

          return false;
        });
    });

    return move;
  }

  getNextMove() {
    const move =
      this.getSimpleFlagMove() ||
      this.getSimpleClickMove() ||
      this.getSmartMove();

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
