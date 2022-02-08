<template>
  <div class="flex flex-row justify-center flex-1 px-4">
    <div class="flex flex-col justify-center">
      <div class="minesweeper-container" @contextmenu="$event.preventDefault()">
        <div class="minesweeper-inner">
          <div class="minesweeper-score-header">
            <div class="minesweeper-score">
              {{ minesLeft.toString().padStart(3, '0') }}
            </div>
            <div class="minesweeper-new-game-wrapper">
              <button @click="newGame">🙂</button>
            </div>
            <div class="minesweeper-score">
              {{ time.toString().padStart(3, '0') }}
            </div>
          </div>

          <MinesweeperBoard :game="board!" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import useStopwatch from './use-stopwatch';
import Tile from './MinesweeperTile.vue';
import MinesweeperBoard from './MinesweeperBoard.vue';
import { MinesweeperGame } from './game/minesweeper-game';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;

export default defineComponent({
  name: 'Minesweeper',
  components: { Tile, MinesweeperBoard },
  setup() {
    const minesLeft = ref(MINE_COUNT);
    const { start, stop, time } = useStopwatch();
    const board = ref<MinesweeperGame>();

    const gameOver = (row: number, col: number) => {
      stop();
      alert('You lose!');
    };

    const newGame = () => {
      board.value = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
    };

    newGame();

    return { board, time, minesLeft, newGame };
  },
});
</script>

<style>
.minesweeper-container {
  @apply bg-gray-200 p-4;
}

.minesweeper-inner {
  @apply bg-black;
}

.minesweeper-score-header {
  @apply bg-black flex flex-row justify-between p-1 items-center border-b-8;
}

.minesweeper-score {
  @apply text-red-700 font-bold text-4xl px-1;
}

.minesweeper-new-game-wrapper {
  @apply bg-gray-200 text-2xl p-1;
}
</style>
