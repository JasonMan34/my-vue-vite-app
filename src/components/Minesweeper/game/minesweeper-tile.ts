import { clamp } from '@vueuse/core';
import type { MinesweeperGame } from './minesweeper-game';

export class MinesweeperTile {
  row: number;
  col: number;
  value: number = 0;
  isFlagged: boolean = false;
  isMine: boolean = false;
  isPeaking: boolean = false;
  game: MinesweeperGame;
  isLosingTile: boolean = false;

  private _isRevealed: boolean = false;

  public get isRevealed() {
    return this._isRevealed;
  }

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

  getAdjacent(removeRevealed = false) {
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
        if (
          tile !== this &&
          (!removeRevealed || (removeRevealed && !tile.isRevealed))
        ) {
          adjacent.push(this.game.board[row][col]);
        }
      }
    }

    return adjacent;
  }

  forAdjacent(fn: Parameters<Array<MinesweeperTile>['forEach']>[0]) {
    return this.getAdjacent().forEach(fn);
  }

  forUnrevealedAdjacent(fn: Parameters<Array<MinesweeperTile>['forEach']>[0]) {
    return this.getAdjacent(true).forEach(fn);
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
      (flagCount, tile) => flagCount + (tile.isFlagged ? 1 : 0),
      0
    );
  }

  public reveal() {
    this._isRevealed = true;

    if (!this.game.isGameOver && this.isMine) {
      this.isLosingTile = true;
      this.game.gameOver(this);
    }
  }

  private revealAdjacent(handled: MinesweeperTile[]) {
    this.forAdjacent(tile => {
      // Only click if we haven't been over it already
      if (!handled.includes(tile)) {
        handled.push(tile);

        if (tile.isFlagged) return;

        if (!tile.isRevealed) {
          tile.reveal();

          if (tile.value === 0 && !tile.isMine) {
            tile.revealAdjacent(handled);
          }
        }
      }
    });
  }

  public click() {
    if (this.game.isGameOver) return;

    if (!this.game.initiated) {
      this.game.initBoard(this.row, this.col);
    }

    // Clicking on a flag does nothing
    if (this.isFlagged) return;

    if (this.isPeaking) this.unpeak();

    // Reveal self, and mark that we've handled ourself
    const wasRevealed = this.isRevealed;
    const handled = [this];
    if (!this.isRevealed) {
      this.reveal();
    }

    // If we're not a mine and value is 0, reveal adjacent
    // If we're clicking a fully flagged number, reveal adjacent
    if (
      (this.value === 0 && !this.isMine) ||
      (wasRevealed && this.flagCount === this.value)
    ) {
      this.revealAdjacent(handled);
    }
  }

  public flag() {
    if (this.game.isGameOver) return;
    this.isFlagged = !this.isFlagged;
  }

  public peak() {
    this.isPeaking = true;

    // If we are revealed, peaking means to also peak the unrevealed adjacent
    if (this.isRevealed) {
      const unrevealedAdjacent = this.getAdjacent(true);
      unrevealedAdjacent.forEach(tile => tile.peak());
      return unrevealedAdjacent;
    }
  }

  public unpeak() {
    // If we're not revealed, we can only unpeak ourself
    if (!this.isRevealed) {
      this.isPeaking = false;
    } else {
      // If we are revealed, unpeaking means to unpeak the unrevealed adjacent
      const unrevealedAdjacent = this.getAdjacent(true);
      unrevealedAdjacent.forEach(tile => tile.unpeak());
      return unrevealedAdjacent;
    }
  }
}
