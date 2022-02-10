import shuffleArray from 'shuffle-array';
import { MinesweeperTile, TileStatus } from './minesweeper-tile';

export class MinesweeperGame {
  public readonly HEIGHT: number;
  public readonly WIDTH: number;
  public readonly MINE_COUNT: number;

  public board: MinesweeperTile[][];
  private mines: MinesweeperTile[];
  public initiated: boolean = false;
  public isGameOver: boolean = false;

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

    this.board = this.getBoard();
    this.mines = [];
  }

  private getBoard() {
    const board: MinesweeperTile[][] = [];

    for (let row = 0; row < this.HEIGHT; row++) {
      board[row] = [];
      for (let col = 0; col < this.WIDTH; col++) {
        const tile = new MinesweeperTile(row, col, this);
        board[row][col] = tile;
      }
    }

    return board;
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
    this.board[row][col].click();
  }

  gameOver() {
    this.isGameOver = true;
    this.mines.forEach(mine => mine.reveal());
  }

  public getTiles(...statuses: TileStatus[]) {
    const allTiles = this.board.flat().filter(tile => !tile.isFinal);
    if (statuses.length === 0) {
      return allTiles;
    }

    return allTiles.filter(tile => statuses.includes(tile.status));
  }

  public getAllTiles(...statuses: TileStatus[]) {
    const allTiles = this.board.flat();
    if (statuses.length === 0) {
      return allTiles;
    }

    return allTiles.filter(tile => statuses.includes(tile.status));
  }
}
