import shuffleArray from 'shuffle-array';
import { Point, Tile } from './minesweeper-tile';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;

export const getRandomBoard = () => {
  const board: Tile[][] = [];
  const allPoints: Point[] = [];

  for (let row = 0; row < HEIGHT; row++) {
    board[row] = [];
    for (let col = 0; col < WIDTH; col++) {
      board[row][col] = { isMine: false, value: 0 };
      allPoints.push({ x: row, y: col });
    }
  }

  shuffleArray(allPoints);
  const minePoints = allPoints.slice(0, MINE_COUNT);

  minePoints.forEach(point => {
    board[point.x][point.y].isMine = true;
  });

  return board;
};
