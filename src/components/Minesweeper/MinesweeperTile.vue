<template>
  <div
    :class="tileClass"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseout="onMouseOut"
    @mouseenter="onMouseEnter"
    @contextmenu="$event.preventDefault()"
  >
    <div v-if="tile.isRevealed" :class="textClass">
      {{ tile.isMine ? '💣' : '' }}
      {{ !tile.isMine && tile.value !== 0 ? tile.value : '' }}
    </div>
    <div v-else-if="tile.isFlagged">🚩</div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-bitwise */
import { computed, defineComponent, PropType } from 'vue';
import { MinesweeperTile } from './game/minesweeper-tile';

// e.buttons & LMB - Left mouse is active in the event
// e.buttons & RMB - Right mouse is active in the event
const LMB = 0x1;
const RMB = 0x2;

// e.button === LMC - Left mouse click (up or down) was involved in the event
// e.button === RMC - Right mouse click (up or down) was involved in the event
const LMC = 0;
const RMC = 2;

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
    const textClass = computed(() => {
      if (props.tile.value === 1) return 'text-blue-700';
      if (props.tile.value === 2) return 'text-green-700';
      if (props.tile.value === 3) return 'text-red-700';
      if (props.tile.value === 4) return 'text-blue-700';
      if (props.tile.value === 5) return 'text-red-900';
      if (props.tile.value === 6) return 'text-blue-900';
      if (props.tile.value === 7) return 'text-gray-800';

      return 'text-black';
    });

    const tileClass = computed(() => {
      const classes = ['minesweeper-tile'];
      if (props.tile.isLosingTile) {
        classes.push('losing-tile');
      }

      if (props.tile.isRevealed) {
        classes.push('revealed');
      } else if (props.tile.isPeaking) {
        classes.push('peaking');
      }

      return classes.join(' ');
    });

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === LMC) {
        props.tile.peak();
      } else if (e.button === RMC) {
        if (!props.tile.isRevealed) {
          props.tile.flag();
          // context.emit('flag');
        }
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === LMC) {
        if (!props.tile.isFlagged) {
          props.tile.click();
        }

        if (props.tile.isPeaking) {
          props.tile.unpeak();
        }
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      if (e.buttons & LMB) {
        if (!props.tile.isPeaking) {
          props.tile.peak();
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.buttons & LMB) {
        if (props.tile.isPeaking) {
          props.tile.unpeak();
        }
      }
    };

    return {
      tileClass,
      textClass,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseOut,
    };
  },
});
</script>

<style>
.minesweeper-tile {
  @apply bg-gray-200 h-[28px] w-[28px] m-[1px] text-center font-bold text-xl cursor-default;
}

.minesweeper-tile.revealed,
.minesweeper-tile.peaking {
  @apply bg-gray-400;
}

.minesweeper-tile.revealed.losing-tile {
  @apply bg-red-600;
}
</style>
