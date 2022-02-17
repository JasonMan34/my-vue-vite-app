import { AutoPlayer } from './auto-player';
import { MinesweeperGame } from './minesweeper-game';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;
const TestAutoPlayer = async (runs = 100) => {
  let wins = 0;
  let time = 0;
  const start = new Date();

  const win = () => {
    wins++;
  };

  for (let i = 0; i < runs; i++) {
    time = new Date().getTime() - start.getTime();
    const game = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
    const player = new AutoPlayer(game);

    game.onGameWin(win);

    // eslint-disable-next-line no-await-in-loop
    await player.autoPlay();
  }

  const data = {
    runs,
    wins,
    time,
    winRate: (wins * 100) / runs,
  };
  return data;
};

const main = async () => {
  const count = 20;
  let runs = 0;
  const gameSets = [];
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line no-await-in-loop
    const data = await TestAutoPlayer(100);
    gameSets.push(data);
    runs += data.runs;
  }

  const winRates = gameSets.map(a => a.winRate);
  const highestWinRate = Math.max(...winRates);
  const lowestWinRate = Math.min(...winRates);
  const averageWinRate = (
    winRates.reduce((total, curr) => total + curr, 0) / gameSets.length
  ).toFixed(2);

  console.log(`Minesweeper bot played ${gameSets.length} sets of 100 games each.
Its highest win rate was ${highestWinRate}%
Its lowest win rate was ${lowestWinRate}%
Its average win rate was ${averageWinRate}%

The win rates are: ${JSON.stringify(winRates)}
`);
};

main();
