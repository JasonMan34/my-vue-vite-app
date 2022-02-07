<template>
  <div class="flex flex-row justify-center flex-1 px-4">
    <div class="flex flex-col justify-center">
      <div class="minesweeper-container">
        <div class="minesweeper-inner">
          <div class="minesweeper-score-header">
            <div class="minesweeper-score">
              {{ minesLeft.toString().padStart(3, '0') }}
            </div>
            <div class="minesweeper-new-game-wrapper">
              <button>🙂</button>
            </div>
            <div class="minesweeper-score">
              {{ time.toString().padStart(3, '0') }}
            </div>
          </div>

          <div class="minesweeper-board">
            <div
              v-for="(row, rowIndex) in board"
              class="flex flex-row justify-center"
            >
              <Tile
                v-for="(tile, colIndex) in row"
                :tile="tile"
                @click="start"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { getRandomBoard, MINE_COUNT } from './minesweeper';
import useStopwatch from './use-stopwatch';
import Tile from './MinesweeperTile.vue';

export default defineComponent({
  name: 'Minesweeper',
  components: { Tile },
  setup() {
    const minesLeft = ref(MINE_COUNT);
    const { start, stop, time } = useStopwatch();
    const board = reactive(getRandomBoard());

    return { board, start, time, minesLeft };
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

.minesweeper-board {
  @apply p-1;
}

.minesweeper-row {
  @apply flex flex-row;
}
</style>
