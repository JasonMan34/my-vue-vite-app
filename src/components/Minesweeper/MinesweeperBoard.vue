<template>
  <div class="minesweeper-board">
    <div
      v-for="(row, rowIndex) in game.board"
      :key="rowIndex"
      class="flex flex-row justify-center"
    >
      <Tile
        v-for="(tile, colIndex) in row"
        :key="colIndex"
        :tile="tile"
        @click="tile.click()"
        @flag="tile.flag()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Tile from './MinesweeperTile.vue';
import { MinesweeperGame } from './game/minesweeper-game';

export default defineComponent({
  name: 'MinesweeperGame',
  components: { Tile },
  props: {
    game: {
      type: Object as PropType<MinesweeperGame>,
      required: true,
    },
  },
  setup() {},
});
</script>

<style>
.minesweeper-board {
  @apply p-1;
}

.minesweeper-row {
  @apply flex flex-row;
}
</style>
