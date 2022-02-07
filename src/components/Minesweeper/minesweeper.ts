import shuffleArray from 'shuffle-array';
import { Point, Tile } from './minesweeper-tile';

export const HEIGHT = 16;
export const WIDTH = 30;
export const MINE_COUNT = 99;

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

  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile.isMine) return;

      let value = 0;
      if (board[rowIndex - 1]) {
        if (board[rowIndex - 1][colIndex - 1]?.isMine) {
          value++;
        }
        if (board[rowIndex - 1][colIndex].isMine) {
          value++;
        }
        if (board[rowIndex - 1][colIndex + 1]?.isMine) {
          value++;
        }
      }

      if (board[rowIndex][colIndex - 1]?.isMine) {
        value++;
      }
      if (board[rowIndex][colIndex + 1]?.isMine) {
        value++;
      }

      if (board[rowIndex + 1]) {
        if (board[rowIndex + 1][colIndex - 1]?.isMine) {
          value++;
        }
        if (board[rowIndex + 1][colIndex].isMine) {
          value++;
        }
        if (board[rowIndex + 1][colIndex + 1]?.isMine) {
          value++;
        }
      }

      tile.value = value;
    });
  });

  return board;
};
