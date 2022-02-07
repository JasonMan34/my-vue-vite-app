<template>
  <div class="flex flex-row justify-center flex-1 px-4">
    <div class="flex flex-col justify-center">
      <div class="minesweeper-board">
        <div
          v-for="(row, rowIndex) in board"
          class="flex flex-row justify-center"
        >
          <div v-for="(tile, colIndex) in row" class="minesweeper-tile"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { getRandomBoard } from './minesweeper';

export default defineComponent({
  name: 'Minesweeper',
  components: {},
  setup() {
    const board = reactive(getRandomBoard());

    return { board };
  },
});
</script>

<style>
.minesweeper-board {
  @apply bg-gray-200 dark:bg-gray-600;
}

.minesweeper-tile {
  height: 28px;
  width: 28px;
  border: 1px solid black;
}
</style>
