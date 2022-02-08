import { clamp } from '@vueuse/core';
import { MinesweeperGame } from './minesweeper-game';

export class MinesweeperTile {
  row: number;
  col: number;
  revealed: boolean = false;
  value: number = 0;
  isMine: boolean = false;
  game: MinesweeperGame;

  constructor(row: number, col: number, game: MinesweeperGame) {
    this.row = row;
    this.col = col;
    this.game = game;
  }

  get BOARD_WIDTH() {
    return this.game.board.length;
  }

  get BOARD_HEIGHT() {
    return this.game.board[0].length;
  }

  getAdjacent() {
    const adjacent: MinesweeperTile[] = [];

    // Don't exit matrix coundaries
    const rowStart = clamp(this.row - 1, 0, this.row);
    const rowEnd = clamp(this.row + 1, this.row, this.BOARD_WIDTH - 1);

    // Don't exit matrix coundaries
    const colStart = clamp(this.col - 1, 0, this.col);
    const colEnd = clamp(this.col + 1, this.col, this.BOARD_HEIGHT - 1);

    // Go over all adjacent tiles
    for (let row = rowStart; row <= rowEnd; row++) {
      for (let col = colStart; col <= colEnd; col++) {
        const tile = this.game.board[row][col];

        // Don't count self as a tile
        if (tile !== this) {
          adjacent.push(this.game.board[row][col]);
        }
      }
    }

    return adjacent;
  }

  forAdjacent(...fn: Parameters<Array<MinesweeperTile>['forEach']>) {
    return this.getAdjacent().forEach(...fn);
  }

  calculateValue() {
    if (this.isMine) return;

    let value = 0;
    this.forAdjacent(adjacentTile => {
      if (adjacentTile.isMine) {
        value++;
      }
    });

    this.value = value;
  }

  private innerClick(beenOver: MinesweeperTile[]) {
    // Reveal self, and mark that we've been over
    this.revealed = true;
    beenOver.push(this);

    // If we're not a mine and value is 0, click all adjacent tiles
    if (this.value === 0 && !this.isMine) {
      this.forAdjacent(tile => {
        // Only click if we haven't been over it already
        if (!beenOver.includes(tile)) {
          tile.innerClick(beenOver);
        }
      });
    }
  }

  public click() {
    this.innerClick([]);
  }

  public flag() {}
}
