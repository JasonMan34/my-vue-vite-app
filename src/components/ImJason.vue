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
    <div class="flex flex-row justify-between space-s-16">
      <button class="button" @click="onClick">{{ t('clickMe') }}</button>
      <button class="button" @click="onClick">{{ t('orMe') }}!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ImJason',
  setup() {
    const { t } = useI18n();
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('TODO: idk something cool');
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
      "myWebsite": "this is my website"
    },
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, inventore officia. Quas, accusamus consectetur? Earum, nostrum, commodi ullam impedit architecto error animi veniam quasi quo praesentium totam incidunt unde corporis?",

    "clickMe": "Click Me",
    "orMe": "Or Me"
  },
  "he": {
    "title": {
      "iAm": "אני",
      "jason": "איתמר",
      "myWebsite": "זה האתר שלי"
    },
    "text": "שלום לך, אורח יקר. אתה כנראה שאתה שואל את עצמך, מה זה הטקסט הזה? ובכן, הטקסט הזה אינו אלא ממלא מקום כמובן. למעשה, מטרת הטקסט הזה אפילו לא ידועה ",
    "clickMe": "לחץ עלי",
    "orMe": "או עלי"
  }
}
</i18n>
