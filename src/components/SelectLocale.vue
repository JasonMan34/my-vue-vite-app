<template>
  <select @change="asd" class="locale-select">
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
      console.log((e.target as HTMLSelectElement).value);
    };

    const localeOptions = [
      {
        locale: 'en',
        name: 'English',
        flag: '',
      },
      {
        locale: 'he',
        name: 'עברית',
        flag: '',
      },
    ];

    return { localeOptions, i18n, asd };
  },
});
</script>

<style></style>
