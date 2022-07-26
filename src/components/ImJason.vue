<template>
  <div class="space-y-8 max-w-lg">
    <p class="text-6xl font-bold">
      {{ t('title.iAm') }}
      <span class="text-blue-500">{{ t('title.jason') }}</span
      >,
      {{ t('title.myWebsite') }}
    </p>
    <p class="text-lg dark:text-gray-400">
      {{ t('text') }}
    </p>
    <div class="flex flex-row justify-between">
      <button class="button" @click="push('/minesweeper')">
        {{ t('minesweeper') }}
      </button>
      <button class="button" @click="push('/hamming')">
        {{ t('hamming') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ImJason',
  setup() {
    const { t } = useI18n();
    const { push } = useRouter();

    return { t, push };
  },
});
</script>

<style scoped>
.button {
  @apply bg-blue-600
          hover:bg-blue-800
          font-semibold
          rounded-lg
          p-4
          text-white;
}
</style>

<i18n lang="json">
{
  "en": {
    "title": {
      "iAm": "I am",
      "jason": "Jason",
      "myWebsite": "and this is my website"
    },
    "text": "There's nothing too interesting here, just me messing around with stuff and learning",

    "minesweeper": "Minesweeper",
    "hamming": "Hamming Encoder"
  },
  "he": {
    "title": {
      "iAm": "אני",
      "jason": "איתמר",
      "myWebsite": "וזה האתר שלי"
    },
    "text": "אין פה שום דבר מעניין, זה בעיקר מקום שבו אני משחק בדברים חדשים ולומד",
    "minesweeper": "שולה מוקשים",
    "hamming": "מקודד האמינג"
  }
}
</i18n>
