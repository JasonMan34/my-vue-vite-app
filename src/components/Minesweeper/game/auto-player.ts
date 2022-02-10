import { MinesweeperGame } from './minesweeper-game';
import { MinesweeperTile } from './minesweeper-tile';
import { arraysAreEqual } from './utils';

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
    let move: Move | undefined;

    const revealed = this.game.getTiles('revealed');
    revealed.some(tile => {
      const hiddenTiles = tile.getAdjacent('hidden');
      const potentialMineCount =
        tile.value - tile.getAdjacent('flagged').length;

      // TODO: forAdjacent without finals
      return tile
        .getAdjacent('revealed')
        .filter(a => !a.isFinal)
        .some(adjTile => {
          const adjHiddenTiles = adjTile.getAdjacent('hidden');
          const adjPotentialMineCount =
            adjTile.value - adjTile.getAdjacent('flagged').length;

          // TODO: Efficiency
          const interesctionTiles = hiddenTiles.filter(hiddenTile =>
            adjHiddenTiles.includes(hiddenTile)
          );

          const hiddenButNotAdjacentHidden = hiddenTiles.filter(
            hiddenTile => !adjHiddenTiles.includes(hiddenTile)
          );

          const adjacentHiddenButNotHidden = adjHiddenTiles.filter(
            adjHiddenTile => !hiddenTiles.includes(adjHiddenTile)
          );

          if (interesctionTiles.length === 0) {
            // If there is no intersection whatsoever, no information can be realized
            return;
          }

          // Adjacent hidden contains hidden, but they have the same number of mines. So we can click on the difference
          if (
            potentialMineCount === adjPotentialMineCount &&
            adjacentHiddenButNotHidden.length !== 0
          ) {
            const adjacentHiddenContainsHidden = arraysAreEqual(
              interesctionTiles,
              hiddenTiles
            );

            if (adjacentHiddenContainsHidden) {
              move = {
                action: 'click',
                tiles: adjacentHiddenButNotHidden,
              };
              return true;
            }
          }

          return false;
        });
    });

    return move;
  }

  getNextMove() {
    // const move = this.getSimpleFlagMove() || this.getSimpleClickMove();
    const move = this.getSmartMove();

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
