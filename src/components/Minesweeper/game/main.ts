import { AutoPlayer } from './auto-player';
import { MinesweeperGame } from './minesweeper-game';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;
const TestAutoPlayer = async () => {
  let runs = 0;
  let wins = 0;
  let time = 0;
  const start = new Date();

  const win = () => {
    wins++;
  };

  while (time < 30) {
    time = (new Date().getTime() - start.getTime()) / 1000;
    runs++;
    const game = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
    const player = new AutoPlayer(game);

    game.onGameWin(win);

    // eslint-disable-next-line no-await-in-loop
    await player.autoPlay();
  }

  console.log({ runs, wins, time, winRate: (runs / wins).toFixed(2) });
};

TestAutoPlayer();
