<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row justify-center px-4 space-x-3">
      <div class="minesweeper-container" @contextmenu="$event.preventDefault()">
        <span class="text-black">{{
          game.isGameWon ? 'Woohoo you win :)' : ''
        }}</span>
        <div class="minesweeper-inner">
          <div class="minesweeper-score-header">
            <div class="minesweeper-score">
              {{ game.minesLeft.toString().padStart(3, '0') }}
            </div>
            <div class="minesweeper-new-game-wrapper">
              <button @click="newGame">🙂</button>
            </div>
            <div class="minesweeper-score">
              {{ time.toString().padStart(3, '0') }}
            </div>
          </div>

          <SandboxBoard :game="game!" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import useStopwatch from '../use-stopwatch';
import SandboxBoard from './SandboxBoard.vue';
import { MinesweeperGame } from '../game/minesweeper-game';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;

export default defineComponent({
  name: 'Minesweeper',
  components: { SandboxBoard },
  setup() {
    const { time } = useStopwatch();
    const game = ref(
      new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT, true)
    ) as Ref<MinesweeperGame>;

    const newGame = () => {
      game.value = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT, true);
    };

    newGame();

    return { game, time, newGame };
  },
});
</script>

<style>
.minesweeper-container {
  @apply bg-gray-200 p-4 select-none;
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
