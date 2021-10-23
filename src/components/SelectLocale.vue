<template>
  <select @change="asd" class="locale-select" :value="i18n.locale.value">
    <option
      v-for="option in localeOptions"
      :key="`locale-${option.locale}`"
      :value="option.locale"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';

interface LocaleSelect {
  locale: string;
  name: string;
  flag: string;
}

export default defineComponent({
  name: 'SelectLocale',
  setup() {
    const i18n = useI18n();

    const asd = (e: Event) => {
      const newLocale = (e.target as HTMLSelectElement).value;
      i18n.locale.value = newLocale;
    };

    const localeOptions: LocaleSelect[] = [
      {
        locale: 'en-US',
        name: 'English',
        flag: '',
      },
      {
        locale: 'he-IL',
        name: 'עברית',
        flag: '',
      },
    ];

    return { localeOptions, asd, i18n };
  },
});
</script>

<style>
.locale-select {
  @apply bg-transparent;
}
</style>
