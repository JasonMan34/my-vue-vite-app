import shuffleArray from 'shuffle-array';
import { MinesweeperTile } from './minesweeper-tile';

export class MinesweeperGame {
  public readonly HEIGHT: number;
  public readonly WIDTH: number;
  public readonly MINE_COUNT: number;

  public board: MinesweeperTile[][];
  private mines: MinesweeperTile[];
  private allTiles: MinesweeperTile[];
  private initiated: boolean = false;

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

    const { board, allTiles } = this.getBoard();
    this.board = board;
    this.allTiles = allTiles;
    this.mines = [];
  }

  private getBoard() {
    const board: MinesweeperTile[][] = [];
    const allTiles: MinesweeperTile[] = [];

    for (let row = 0; row < this.HEIGHT; row++) {
      board[row] = [];
      for (let col = 0; col < this.WIDTH; col++) {
        const tile = new MinesweeperTile(row, col, this);
        board[row][col] = tile;
        allTiles.push(tile);
      }
    }

    return { board, allTiles };
  }

  initBoard(row: number, col: number) {
    const firstTile = this.board[row][col];
    const mines: MinesweeperTile[] = [];
    const potentialMines = this.board.flat().filter(tile => tile !== firstTile);

    shuffleArray(potentialMines);
    const minePoints = potentialMines.slice(0, this.MINE_COUNT);

    minePoints.forEach(tile => {
      tile.isMine = true;
      mines.push(tile);
    });

    potentialMines.forEach(tile => tile.calculateValue());
    firstTile.calculateValue();

    this.mines = mines;
    this.initiated = true;
  }

  click(row: number, col: number) {
    if (!this.initiated) {
      this.initBoard(row, col);
    }

    this.board[row][col].click();
  }
}
