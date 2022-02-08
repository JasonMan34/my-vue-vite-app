<template>
  <div
    :class="`minesweeper-tile${tile.revealed ? ' revealed' : ''}`"
    @click="onClick"
    @contextmenu="onRightClick"
  >
    <div v-if="tile.revealed" :class="textClass()">
      {{ tile.isMine ? '💣' : '' }}
      {{ !tile.isMine && tile.value !== 0 ? tile.value : '' }}
    </div>
    <div v-else-if="tile.flagged">🚩</div>
    <div v-else class="h-full"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MinesweeperTile } from './game/minesweeper-tile';

export default defineComponent({
  name: 'MinesweeperTile',
  components: {},
  props: {
    tile: {
      required: true,
      type: Object as PropType<MinesweeperTile>,
    },
  },
  emits: ['click', 'flag'],
  setup(props, context) {
    const textClass = () => {
      if (props.tile.value === 1) return 'text-blue-700';
      if (props.tile.value === 2) return 'text-green-700';
      if (props.tile.value === 3) return 'text-red-700';
      if (props.tile.value === 4) return 'text-blue-700';
      if (props.tile.value === 5) return 'text-red-900';
      if (props.tile.value === 6) return 'text-blue-900';
      if (props.tile.value === 7) return 'text-gray-800';

      return 'text-black';
    };

    const onRightClick = (e: Event) => {
      e.preventDefault();

      if (!props.tile.revealed) {
        context.emit('flag');
      }
    };

    const onClick = () => {
      if (!props.tile.flagged) {
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
