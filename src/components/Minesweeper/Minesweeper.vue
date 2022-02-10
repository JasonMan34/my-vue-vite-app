<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row justify-center px-4 space-x-3">
      <button
        class="self-start bg-blue-600 hover:bg-blue-800 font-semibold rounded-lg p-4 text-white;"
        @click="autoPlayOneMove"
      >
        Auto play
      </button>
      <div class="minesweeper-container" @contextmenu="$event.preventDefault()">
        <div class="minesweeper-inner">
          <div class="minesweeper-score-header">
            <div class="minesweeper-score">
              {{ minesLeft.toString().padStart(3, '0') }}
            </div>
            <div class="minesweeper-new-game-wrapper">
              <button @click="newGame">🙂</button>
            </div>
            <div class="minesweeper-score">
              {{ time.toString().padStart(3, '0') }}
            </div>
          </div>

          <MinesweeperBoard :game="board!" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useStopwatch from './use-stopwatch';
import MinesweeperBoard from './MinesweeperBoard.vue';
import { MinesweeperGame } from './game/minesweeper-game';
import { AutoPlayer } from './game/auto-player';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;

export default defineComponent({
  name: 'Minesweeper',
  components: { MinesweeperBoard },
  setup() {
    const minesLeft = ref(MINE_COUNT);
    const { time } = useStopwatch();
    const game = ref<MinesweeperGame>();
    const player = ref<AutoPlayer>();

    const newGame = () => {
      game.value = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
      player.value = new AutoPlayer(game.value);
    };

    const autoPlayOneMove = async () => {
      await player.value!.autoPlay(100);
    };

    newGame();

    return { board: game, time, minesLeft, newGame, autoPlayOneMove };
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
