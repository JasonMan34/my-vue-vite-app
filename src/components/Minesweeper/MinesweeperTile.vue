<template>
  <div
    :class="`minesweeper-tile${tile.revealed ? ' revealed' : ''}`"
    @click="onClick"
    @contextmenu="onRightClick"
  >
    <div v-if="tile.revealed" :class="textClass">
      {{ tile.isMine ? '💣' : '' }}
      {{ !tile.isMine && tile.value !== 0 ? tile.value : '' }}
    </div>
    <div v-else-if="tile.flagged">🚩</div>
    <div v-else class="h-full"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { UnwrapNestedRefs } from '@vue/reactivity';
import { MinesweeperTile } from './game/minesweeper-tile';

export default defineComponent({
  name: 'MinesweeperTile',
  components: {},
  props: {
    tile: {
      required: true,
      type: Object as PropType<UnwrapNestedRefs<MinesweeperTile>>,
    },
  },
  emits: ['click', 'flag'],
  setup({ tile }, context) {
    const textClass = computed(() => {
      if (tile.value === 0) return 'text-black';
      if (tile.value === 1) return 'text-blue-700';
      if (tile.value === 2) return 'text-green-700';
      if (tile.value === 3) return 'text-red-700';
      if (tile.value === 4) return 'text-blue-700';
      if (tile.value === 5) return 'text-red-900';
      if (tile.value === 6) return 'text-blue-900';
      if (tile.value === 7) return 'text-gray-800';
      if (tile.value === 8) return 'text-black';
    });

    const onRightClick = (e: Event) => {
      e.preventDefault();

      if (!tile.revealed) {
        context.emit('flag');
      }
    };

    const onClick = (e: Event) => {
      if (!tile.flagged) {
        context.emit('click');
      }
    };

    return { textClass, onRightClick, onClick };
  },
});
</script>

<style>
.minesweeper-tile {
  @apply bg-gray-200 h-[28px] w-[28px] m-[1px] text-center font-bold text-xl cursor-default;
}

.minesweeper-tile.revealed {
  @apply bg-gray-400;
}
</style>
