import shuffleArray from 'shuffle-array';
import { MinesweeperTile } from './minesweeper-tile';

const placeMines = (
  board: MinesweeperTile[][],
  mineCount: number,
  firstTile: MinesweeperTile
) => {
  const mines: MinesweeperTile[] = [];
  const potentialMines = board.flat().filter(tile => tile !== firstTile);

  shuffleArray(potentialMines);
  const minePoints = potentialMines.slice(0, mineCount);

  minePoints.forEach(tile => {
    tile.isMine = true;
    mines.push(tile);
  });

  potentialMines.forEach(tile => tile.calculateValue());
  firstTile.calculateValue();

  return mines;
};

const getBoard = (game: MinesweeperGame) => {
  const board: MinesweeperTile[][] = [];
  const allTiles: MinesweeperTile[] = [];

  for (let row = 0; row < game.HEIGHT; row++) {
    board[row] = [];
    for (let col = 0; col < game.WIDTH; col++) {
      const tile = new MinesweeperTile(row, col, game);
      board[row][col] = tile;
      allTiles.push(tile);
    }
  }

  return { board, allTiles };
};

export class MinesweeperGame {
  public readonly HEIGHT: number;
  public readonly WIDTH: number;
  public readonly MINE_COUNT: number;

  public board: MinesweeperTile[][];
  private mines: MinesweeperTile[];
  private allTiles: MinesweeperTile[];

  constructor(width: number, height: number, mineCount: number) {
    if (!Number.isInteger(width) || width <= 0) {
      throw new Error('Width parameter must be a positive integer');
    }

    if (!Number.isInteger(height) || height <= 0) {
      throw new Error('Height parameter must be a positive integer');
    }

    if (!Number.isInteger(mineCount) || mineCount <= 0) {
      throw new Error('Mine count parameter must be a positive integer');
    }

    this.WIDTH = width;
    this.HEIGHT = height;
    this.MINE_COUNT = mineCount;

    const { board, allTiles } = getBoard(this);
    this.board = board;
    this.allTiles = allTiles;
    this.mines = [];
  }

  initBoard(row: number, col: number) {
    const mines = placeMines(this.board, this.MINE_COUNT, this.board[row][col]);
    this.mines = mines;
    this.allTiles.forEach(tile => tile.calculateValue());
  }

  click(row: number, col: number) {
    this.board[row][col].click();
  }
}
