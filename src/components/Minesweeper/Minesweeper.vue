<template>
  <div id="minesweeper-wrapper" class="flex flex-col justify-center">
    <teleport to="head">
      <link
        v-for="(asset, index) in assets"
        :key="index"
        rel="preload"
        as="image"
        :href="`/assets/${asset}`"
      />
    </teleport>
    <div class="flex flex-row justify-center px-4 space-x-3">
      <!-- Options -->
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

      <!-- Minesweeper -->
      <div class="ms-container" @contextmenu="$event.preventDefault()">
        <span>{{ game.isGameWon ? 'You win! 🥳🥳🥳' : '' }}</span>
        <!-- Top border -->
        <div class="flex flex-row">
          <div class="ms-border-corner ms-border-top-left" />
          <div class="flex-1 ms-border-horizontal" />
          <div class="ms-border-corner ms-border-top-right" />
        </div>

        <!-- scoreboard -->
        <div class="bg-black flex flex-row justify-center items-center">
          <div class="ms-border-vertical self-stretch" />
          <div class="ms-score">
            <div :class="getDigitClass(game.minesLeft, 0)" />
            <div :class="getDigitClass(game.minesLeft, 1)" />
            <div :class="getDigitClass(game.minesLeft, 2)" />
          </div>

          <div
            class="ms-new-game-wrapper flex-1 flex justify-center"
            @click="newGame"
          >
            <button :class="smileyClass" />
          </div>

          <div class="ms-score">
            <div :class="getDigitClass(time, 0)" />
            <div :class="getDigitClass(time, 1)" />
            <div :class="getDigitClass(time, 2)" />
          </div>

          <div class="ms-border-vertical self-stretch" />
        </div>

        <!-- Middle border -->
        <div class="flex flex-row">
          <div class="ms-border-corner ms-border-middle-left" />
          <div class="flex-1 ms-border-horizontal" />
          <div class="ms-border-corner ms-border-middle-right" />
        </div>

        <div class="flex flex-row">
          <div class="ms-border-vertical" />

          <div class="ms-inner">
            <MinesweeperBoard :game="game!" />
          </div>

          <div class="ms-border-vertical" />
        </div>

        <!-- Bottom border -->
        <div class="flex flex-row">
          <div class="ms-border-corner ms-border-bottom-left" />
          <div class="flex-1 ms-border-horizontal" />
          <div class="ms-border-corner ms-border-bottom-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-await-in-loop */
import './minesweeper.pcss';
import { computed, defineComponent, provide, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();
    const isSandbox = route.path.includes('sandbox');

    const showIndexes = ref(false);
    const autoPlaySafe = ref(false);
    const restartOnFailure = ref(true);
    const playerSpeed = ref(10);
    const autoPlayerDelay = computed(() =>
      Math.round(101 - 10 * playerSpeed.value)
    );

    provide(ShowIndexesKey, showIndexes);
    const { time, start, stop } = useStopwatch();
    const game = ref(
      new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT, isSandbox)
    ) as Ref<MinesweeperGame>;
    const player = ref(
      new AutoPlayer(game.value, !autoPlaySafe.value)
    ) as Ref<AutoPlayer>;

    game.value.onGameInit(start);
    game.value.onGameLose(stop);
    game.value.onGameWin(stop);

    const newGame = () => {
      game.value = new MinesweeperGame(WIDTH, HEIGHT, MINE_COUNT, isSandbox);
      player.value = new AutoPlayer(game.value, !autoPlaySafe.value);

      game.value.onGameInit(start);
      game.value.onGameLose(stop);
      game.value.onGameWin(stop);
    };

    watch(autoPlaySafe, () => {
      player.value.shouldGuess = !autoPlaySafe.value;
    });

    watch(autoPlayerDelay, () => {
      player.value.delay = autoPlayerDelay.value;
    });

    const autoPlay = async () => {
      if (game.value.isGameLost) {
        newGame();
      }

      player.value.autoPlay(autoPlayerDelay.value);

      while (restartOnFailure.value && !game.value.isGameWon) {
        await game.value.waitForEnd();
        if (restartOnFailure.value) {
          await sleep(200);
          newGame();
          player.value.autoPlay(autoPlayerDelay.value);
        }
      }
    };

    newGame();

    const getDigitClass = (value: number, index: number) =>
      `ms-digit ms-digit-${value.toString().padStart(3, '0')[index]}`;

    const smileyClass = computed(() => {
      if (game.value.isGameWon) return 'ms-face ms-face-won';
      if (game.value.isGameLost) return 'ms-face ms-face-lost';

      return 'ms-face ms-face-neutral';
    });

    const assets = [
      'border_hor_2x.png',
      'border_middle_left_2x.png',
      'border_middle_right_2x.png',
      'border_vert_2x.png',
      'corner_bottom_left_2x.png',
      'corner_bottom_right_2x.png',
      'corner_up_left_2x.png',
      'corner_up_right_2x.png',
      'd0.svg',
      'd1.svg',
      'd2.svg',
      'd3.svg',
      'd4.svg',
      'd5.svg',
      'd6.svg',
      'd7.svg',
      'd8.svg',
      'd9.svg',
      'face_active.svg',
      'face_lost.svg',
      'face_neutral.svg',
      'face_pressed.svg',
      'face_won.svg',
      'flag_wrong.svg',
      'flag.svg',
      'hidden.svg',
      'logo.png',
      'mine_red.svg',
      'mine.svg',
      'nums_background.svg',
      'pressed.svg',
      'type0.svg',
      'type1.svg',
      'type2.svg',
      'type3.svg',
      'type4.svg',
      'type5.svg',
      'type6.svg',
      'type7.svg',
      'type8.svg',
    ];

    return {
      assets,
      game,
      time,
      newGame,
      autoPlay,
      showIndexes,
      autoPlaySafe,
      playerSpeed,
      restartOnFailure,
      getDigitClass,
      smileyClass,
    };
  },
});
</script>

<style scoped>
.checkbox {
  @apply w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer mr-1;
}
</style>

<!-- 
  #minesweeper-wrapper::after {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: -1;
  content: url('/assets/border_hor_2x.png')
    url('/assets/border_middle_left_2x.png')
    url('/assets/border_middle_right_2x.png') url('/assets/border_vert_2x.png')
    url('/assets/corner_bottom_left_2x.png')
    url('/assets/corner_bottom_right_2x.png')
    url('/assets/corner_up_left_2x.png') url('/assets/corner_up_right_2x.png')
    url('/assets/d0.svg') url('/assets/d1.svg') url('/assets/d2.svg')
    url('/assets/d3.svg') url('/assets/d4.svg') url('/assets/d5.svg')
    url('/assets/d6.svg') url('/assets/d7.svg') url('/assets/d8.svg')
    url('/assets/d9.svg') url('/assets/face_active.svg')
    url('/assets/face_lost.svg') url('/assets/face_neutral.svg')
    url('/assets/face_pressed.svg') url('/assets/face_won.svg')
    url('/assets/flag_wrong.svg') url('/assets/flag.svg')
    url('/assets/hidden.svg') url('/assets/logo.png')
    url('/assets/mine_red.svg') url('/assets/mine.svg')
    url('/assets/nums_background.svg') url('/assets/pressed.svg')
    url('/assets/type0.svg') url('/assets/type1.svg') url('/assets/type2.svg')
    url('/assets/type3.svg') url('/assets/type4.svg') url('/assets/type5.svg')
    url('/assets/type6.svg') url('/assets/type7.svg') url('/assets/type8.svg');
}
 -->
