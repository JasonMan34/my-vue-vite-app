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
  action: 'flag';
  tiles: MinesweeperTile[];
};

type Move = FlagMove | ClickMove;

export class AutoPlayer {
  game: MinesweeperGame;

  constructor(game: MinesweeperGame) {
    this.game = game;
  }

  getFlagMove(): FlagMove | undefined {
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

  getNextMove() {
    const move = this.getFlagMove();
    // TODO: Or click move, or ...
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

    throw new Error('Not yet implemented');
  }
}
