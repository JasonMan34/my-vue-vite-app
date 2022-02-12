import { clamp } from '@vueuse/core';
import type { MinesweeperGame } from './minesweeper-game';

// Final = Revealed tile, and all adjacent tiles are also revealed / flagged
export type TileStatus = 'hidden' | 'flagged' | 'revealed';
// | 'final_revealed'
// | 'final_flagged';

export class MinesweeperTile {
  row: number;
  col: number;
  value: number = 0;
  isMine: boolean = false;
  isPeaking: boolean = false;
  game: MinesweeperGame;
  isLosingTile: boolean = false;

  private _flagCount: number = 0;
  private _status: TileStatus = 'hidden';

  public get status() {
    return this._status;
  }

  public get isRevealed() {
    return this._status === 'revealed';
  }

  public get isFlagged() {
    return this._status === 'flagged';
  }

  public get isFinal() {
    return this.getAdjacent('hidden').length === 0;

    // TODO: Not calculate evrey time
    // return (
    //   this._status === 'final_revealed' || this._status === 'final_flagged'
    // );
  }

  public get BOARD_WIDTH() {
    return this.game.WIDTH;
  }

  public get BOARD_HEIGHT() {
    return this.game.HEIGHT;
  }

  private get flagCount() {
    return this._flagCount;

    // return this.getAdjacent().reduce(
    //   (flagCount, tile) => flagCount + (tile.isFlagged ? 1 : 0),
    //   0
    // );
  }

  constructor(row: number, col: number, game: MinesweeperGame) {
    this.row = row;
    this.col = col;
    this.game = game;
  }

  public getAdjacent(...statuses: TileStatus[]) {
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
          (statuses.length === 0 || statuses.includes(tile._status))
        ) {
          adjacent.push(tile);
        }
      }
    }

    return adjacent;
  }

  public forAdjacent(fn: Parameters<Array<MinesweeperTile>['forEach']>[0]) {
    return this.getAdjacent().forEach(fn);
  }

  public calculateValue() {
    if (this.isMine) return;

    let value = 0;
    this.forAdjacent(adjacentTile => {
      if (adjacentTile.isMine) {
        value++;
      }
    });

    this.value = value;
  }

  // private updateFinalStatus() {
  // const hiddenAdjacent = this.getAdjacent('hidden');
  // if (hiddenAdjacent.length === 0 && !this.isFinal) {
  //   this._status =
  //     this.status === 'flagged' ? 'final_flagged' : 'final_revealed';
  // } else if (hiddenAdjacent.length !== 0 && this.isFinal) {
  //   // impossible to have been final and also revealed
  //   this._status = this.status === 'final_flagged' ? 'flagged' : 'revealed';
  // }
  // }

  public reveal() {
    this._status = 'revealed';

    if (!this.game.isGameOver && this.isMine) {
      this.isLosingTile = true;
      this.game.gameOver();
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

      // After we've revealed all tiles this turn, lets see who is finalized
      // handled.forEach(tile => tile.updateFinalStatus());
    }
  }

  public flag() {
    if (this.game.isGameOver) return;

    if (this.isFlagged) {
      this._status = 'hidden';
      this.forAdjacent(tile => tile._flagCount--);
      this.game.minesLeft++;
    } else {
      this._status = 'flagged';
      this.forAdjacent(tile => tile._flagCount++);
      this.game.minesLeft--;
    }
  }

  public peak() {
    if (this.isFlagged || this.isFinal) return;

    this.isPeaking = true;

    // If we are revealed, peaking means to also peak the unrevealed adjacent
    if (this.isRevealed) {
      const unrevealedAdjacent = this.getAdjacent('hidden');
      unrevealedAdjacent.forEach(tile => tile.peak());
      return unrevealedAdjacent;
    }
  }

  public unpeak() {
    if (this.isFlagged || this.isFinal) return;

    this.isPeaking = false;

    if (this.isRevealed) {
      // If we are revealed, unpeaking means to unpeak the unrevealed adjacent
      const unrevealedAdjacent = this.getAdjacent('hidden');
      unrevealedAdjacent.forEach(tile => tile.unpeak());
      return unrevealedAdjacent;
    }
  }
}
