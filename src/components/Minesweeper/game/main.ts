import { AutoPlayer } from './auto-player';
import { MinesweeperGame } from './minesweeper-game';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;
const TestAutoPlayer = async (runs: number = 800) => {
  let runCount = 0;
  let game;
  let player;

  let wins = 0;

  const start = new Date();

  const win = () => {
    wins++;
  };

  while (runCount < runs) {
    runCount++;
    game = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
    player = new AutoPlayer(game);

    game.onGameWin(win);

    // eslint-disable-next-line no-await-in-loop
    await player.autoPlay();
  }

  const time = (new Date().getTime() - start.getTime()) / 1000;
  console.log({ wins, time });
};

TestAutoPlayer();
