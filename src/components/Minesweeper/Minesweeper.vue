<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row justify-center px-4 space-x-3">
      <div class="flex flex-col">
        <div>
          <input
            id="flexCheckDefault"
            v-model="showIndexes"
            class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer mr-1"
            type="checkbox"
          />
          <label class="inline-block" for="flexCheckDefault">
            Show indexes
          </label>
        </div>

        <button
          class="self-start bg-blue-600 hover:bg-blue-800 font-semibold rounded-lg p-4 text-white;"
          @click="autoPlayOneMove"
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
import { defineComponent, provide, Ref, ref } from 'vue';
import useStopwatch from './use-stopwatch';
import MinesweeperBoard from './MinesweeperBoard.vue';
import { MinesweeperGame } from './game/minesweeper-game';
import { AutoPlayer } from './game/auto-player';
import { ShowIndexesKey } from './keys';

const HEIGHT = 16;
const WIDTH = 30;
const MINE_COUNT = 99;

export default defineComponent({
  name: 'Minesweeper',
  components: { MinesweeperBoard },
  setup() {
    const showIndexes = ref(false);
    provide(ShowIndexesKey, showIndexes);

    const { time } = useStopwatch();
    const game = ref(
      new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT)
    ) as Ref<MinesweeperGame>;
    const player = ref(new AutoPlayer(game.value)) as Ref<AutoPlayer>;

    let autoPlayOneMove: () => Promise<void>;

    const newGame = () => {
      game.value = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT);
      player.value = new AutoPlayer(game.value);

      game.value.onGameOver(autoPlayOneMove);
    };

    autoPlayOneMove = async () => {
      if (!game.value.initiated) {
        newGame();
      }

      // player.value.getNextMove();
      // player.value.playNextMove();
      await player.value.autoPlay(1);
    };

    newGame();

    return { game, time, newGame, autoPlayOneMove, showIndexes };
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
