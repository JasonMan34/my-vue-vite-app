<template>
  <div class="minesweeper-board">
    <div class="flex flex-row ml-[28px]">
      <div
        v-for="(col, colIndex) in game.board[0]"
        :key="colIndex"
        class="w-[28px]"
      >
        {{ colIndex.toString().padStart(2, '0') }}
      </div>
    </div>
    <div
      v-for="(row, rowIndex) in game.board"
      :key="rowIndex"
      class="flex flex-row justify-center"
    >
      {{ rowIndex.toString().padStart(2, '0') }}
      <SandboxTile
        v-for="(tile, colIndex) in row"
        :key="colIndex"
        :tile="tile"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SandboxTile from './SandboxTile.vue';
import { MinesweeperGame } from '../game/minesweeper-game';

export default defineComponent({
  name: 'MinesweeperGame',
  components: { SandboxTile },
  props: {
    game: {
      type: Object as PropType<MinesweeperGame>,
      required: true,
    },
  },
  setup() {},
});
</script>
