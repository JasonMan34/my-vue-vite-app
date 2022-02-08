<template>
  <div class="minesweeper-board">
    <div v-for="row in game.board" class="flex flex-row justify-center">
      <Tile
        v-for="tile in row"
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
import { UnwrapNestedRefs } from '@vue/reactivity';
import { MinesweeperGame } from './game/minesweeper-game';

export default defineComponent({
  name: 'MinesweeperGame',
  components: { Tile },
  props: {
    game: {
      type: Object as PropType<UnwrapNestedRefs<MinesweeperGame>>,
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
