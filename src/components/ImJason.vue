<template>
  <div class="space-y-8 max-w-lg">
    <p class="text-6xl font-bold">
      {{ t('title.iAm') }}
      <span class="text-blue-500">{{ t('title.jason') }}</span
      >,
      {{ t('title.myWebsite') }}
    </p>
    <p class="text-lg dark:text-gray-400">
      {{ t('text.main') }} <span class="italic">{{ t('text.me') }}.</span>
    </p>
    <div class="flex flex-row justify-between space-s-16">
      <button @click="onClick" class="button">{{ t('clickMe') }}!</button>
      <button @click="onClick" class="button">{{ t('orMe') }}!!!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ImJason',
  setup() {
    const { t } = useI18n();
    const onClick = () => {
      alert('What did you think would happen?');
    };

    return { t, onClick };
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
          text-white
          w-[40%]
          md:w-44;
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
    "text": {
      "main": "Hello there, dear visitor. You might be asking yourself, what is this text? Well, this text is nothing but filler of course. In fact, the purpose of this text isn't even known to",
      "me": "me"
    },
    "clickMe": "Click Me",
    "orMe": "Or Me"
  },
  "he": {
    "title": {
      "iAm": "אני",
      "jason": "איתמר",
      "myWebsite": "וזה האתר שלי"
    },
    "text": {
      "main": "שלום לך, אורח יקר. אתה כנראה שאתה שואל את עצמך, מה זה הטקסט הזה? ובכן, הטקסט הזה אינו אלא ממלא מקום כמובן. למעשה, מטרת הטקסט הזה אפילו לא ידועה ",
      "me": "לי"
    },
    "clickMe": "לחץ עלי",
    "orMe": "או עלי"
  }
}
</i18n>
