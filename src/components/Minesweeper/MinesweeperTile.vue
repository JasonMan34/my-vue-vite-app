<template>
  <div class="minesweeper-tile">
    <div v-if="tile.revealed" :class="tileClass">
      <span v-if="tile.isMine">💣</span>
      <span v-else-if="tile.value !== 0">{{ tile.value }}</span>
    </div>
    <div v-else class="h-full" @click="onClick"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Tile } from './minesweeper-tile';

export default defineComponent({
  name: 'MinesweeperTile',
  components: {},
  props: {
    tile: {
      required: true,
      type: Object as PropType<Tile>,
    },
  },
  emits: ['click'],
  setup({ tile }, context) {
    const tileClass = (() => {
      if (tile.value === 0) return 'text-black';
      if (tile.value === 1) return 'text-blue-700';
      if (tile.value === 2) return 'text-green-700';
      if (tile.value === 3) return 'text-red-700';
      if (tile.value === 4) return 'text-blue-700';
      if (tile.value === 5) return 'text-red-900';
      if (tile.value === 6) return 'text-blue-900';
      if (tile.value === 7) return 'text-gray-800';
      if (tile.value === 8) return 'text-black';
    })();

    const onClick = () => {
      if (!tile.revealed) {
        tile.revealed = true;
        context.emit('click');
      }
    };

    return { tileClass, onClick };
  },
});
</script>

<style>
.minesweeper-tile {
  @apply bg-gray-200 h-[28px] w-[28px] m-[1px] text-center font-bold text-xl cursor-default;
}

.minesweeper-tile.revealed {
  @apply bg-gray-300;
}
</style>
