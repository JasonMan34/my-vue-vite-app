<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row justify-center px-4 space-x-3">
      <div class="flex flex-col space-y-2">
        <div>
          <input
            id="showIndexesCheckbox"
            v-model="showIndexes"
            class="checkbox"
            type="checkbox"
          />
          <label class="inline-block" for="showIndexesCheckbox">
            Show indexes
          </label>
        </div>

        <div>
          <input
            id="autoPlayerShouldGuessCheckbox"
            v-model="autoPlaySafe"
            class="checkbox"
            type="checkbox"
          />
          <label class="inline-block" for="autoPlayerShouldGuessCheckbox">
            Only play safe moves
          </label>
        </div>
        <div v-if="!autoPlaySafe">
          <input
            id="restartOnFailureCheckbox"
            v-model="restartOnFailure"
            class="checkbox"
            type="checkbox"
          />
          <label class="inline-block" for="restartOnFailureCheckbox">
            Restart on failure
          </label>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="playerSpeed">
            Player speed
          </label>
          <input
            id="playerSpeed"
            v-model="playerSpeed"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            max="10"
            min="1"
          />
        </div>

        <button
          class="bg-blue-600 hover:bg-blue-800 font-semibold rounded-lg p-4 text-white"
          @click="autoPlay"
        >
          Auto play
        </button>
      </div>
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

          <MinesweeperBoard :game="game!" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, Ref, ref, watch } from 'vue';
import useStopwatch from './use-stopwatch';
import MinesweeperBoard from './MinesweeperBoard.vue';
import { MinesweeperGame } from './game/minesweeper-game';
import { AutoPlayer } from './game/auto-player';
import { ShowIndexesKey } from './keys';
import { sleep } from './game/utils';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;

export default defineComponent({
  name: 'Minesweeper',
  components: { MinesweeperBoard },
  setup() {
    const showIndexes = ref(false);
    const autoPlaySafe = ref(true);
    const restartOnFailure = ref(true);
    const playerSpeed = ref(10);

    provide(ShowIndexesKey, showIndexes);
    const { time, start, stop } = useStopwatch();
    const game = ref(
      new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT)
    ) as Ref<MinesweeperGame>;
    const player = ref(
      new AutoPlayer(game.value, !autoPlaySafe.value)
    ) as Ref<AutoPlayer>;

    const newGame = () => {
      game.value = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
      player.value = new AutoPlayer(game.value, !autoPlaySafe.value);
    };

    watch(autoPlaySafe, () => {
      player.value.shouldGuess = !autoPlaySafe.value;
    });

    const autoPlay = async () => {
      while (!game.value.isGameOver && player.value.getNextMove()) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(Math.round(101 - 10 * playerSpeed.value));
        player.value.playNextMove();
      }

      if (game.value.isGameLost && restartOnFailure.value) {
        await sleep(200);
        newGame();
        autoPlay();
      }
    };

    newGame();

    return {
      game,
      time,
      newGame,
      autoPlay,
      showIndexes,
      autoPlaySafe,
      playerSpeed,
      restartOnFailure,
    };
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

.checkbox {
  @apply w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer mr-1;
}
</style>
