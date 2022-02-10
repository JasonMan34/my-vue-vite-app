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
  game: MinesweeperGame;

  constructor(game: MinesweeperGame) {
    this.game = game;
  }

  /** Flag all remaining adjacent tiles a tile that needs it */
  getSimpleFlagMove(): FlagMove | undefined {
    const a = this.game.getTiles('revealed');
    const tileToFlagAdjacent = a.find(tile => {
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
    const a = this.game.getTiles('revealed');
    const tileToClick = a.find(tile => {
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

  getNextMove() {
    const move = this.getSimpleFlagMove() || this.getSimpleClickMove();

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
