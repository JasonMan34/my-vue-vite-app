import { AutoPlayer } from './auto-player';
import { MinesweeperGame } from './minesweeper-game';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;
const TestAutoPlayer = async (totalTime: number) => {
  let runs = 0;
  let wins = 0;
  let time = 0;
  const start = new Date();

  const win = () => {
    wins++;
  };

  while (time < totalTime) {
    time = new Date().getTime() - start.getTime();
    runs++;
    const game = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
    const player = new AutoPlayer(game);

    game.onGameWin(win);

    // eslint-disable-next-line no-await-in-loop
    await player.autoPlay();
  }

  const data = { runs, wins, time, winRate: (runs / wins).toFixed(2) };
  console.log(data);
  return data;
};

const main = async () => {
  const count = 10;
  let runs = 0;
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line no-await-in-loop
    const data = await TestAutoPlayer(1000);
    runs += data.runs;
  }

  console.log(
    `Average amount of runs in 1 second - ${(runs / count).toFixed(2)}`
  );

  console.log('\n Now we will do the lastIndex improvement');

  (globalThis as any).TEST = true;

  runs = 0;
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line no-await-in-loop
    const data = await TestAutoPlayer(1000);
    runs += data.runs;
  }

  console.log(
    `Average amount of runs in 1 second - ${(runs / count).toFixed(2)}`
  );
};

main();
