import { clamp } from '@vueuse/core';
import type { MinesweeperGame } from './minesweeper-game';

export class MinesweeperTile {
  row: number;
  col: number;
  revealed: boolean = false;
  flagged: boolean = false;
  value: number = 0;
  isMine: boolean = false;
  game: MinesweeperGame;

  constructor(row: number, col: number, game: MinesweeperGame) {
    this.row = row;
    this.col = col;
    this.game = game;
  }

  get BOARD_WIDTH() {
    return this.game.WIDTH;
  }

  get BOARD_HEIGHT() {
    return this.game.HEIGHT;
  }

  getAdjacent() {
    const adjacent: MinesweeperTile[] = [];

    // Don't exit matrix coundaries
    const rowStart = clamp(this.row - 1, 0, this.row);
    const rowEnd = clamp(this.row + 1, this.row, this.BOARD_HEIGHT - 1);

    // Don't exit matrix coundaries
    const colStart = clamp(this.col - 1, 0, this.col);
    const colEnd = clamp(this.col + 1, this.col, this.BOARD_WIDTH - 1);

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

  forAdjacent(fn: Parameters<Array<MinesweeperTile>['forEach']>[0]) {
    return this.getAdjacent().forEach(fn);
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

  private get flagCount() {
    return this.getAdjacent().reduce(
      (flagCount, tile) => flagCount + (tile.flagged ? 1 : 0),
      0
    );
  }

  private innerClick(handled: MinesweeperTile[]) {
    // Clicking on a flag does nothing
    if (this.flagged) return;

    // Reveal self, and mark that we've handled ourself
    const wasRevealed = this.revealed;
    this.revealed = true;
    handled.push(this);

    // If we're not a mine and value is 0, click all adjacent tiles recursively
    if (this.value === 0 && !this.isMine) {
      this.forAdjacent(tile => {
        // Only click if we haven't been over it already
        if (!handled.includes(tile)) {
          tile.innerClick(handled);
        }
      });
    }

    // If we're clicking a fully flagged number, reveal all adjacent tiles
    if (wasRevealed && this.flagCount === this.value) {
      this.forAdjacent(tile => {
        if (tile.flagged) return;

        if (tile.value === 0 && !handled.includes(tile)) {
          tile.innerClick(handled);
        } else {
          tile.revealed = true;
        }
      });
    }
  }

  public click() {
    if (!this.game.initiated) {
      this.game.initBoard(this.row, this.col);
    }

    this.innerClick([]);
  }

  public flag() {
    this.flagged = !this.flagged;
  }
}
