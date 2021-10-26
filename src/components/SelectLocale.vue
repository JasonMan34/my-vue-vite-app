<template>
  <select v-model="locale" class="bg-transparent">
    <option
      v-for="option in localeOptions"
      :key="`locale-${option.locale}`"
      :value="option.locale"
      class="dark-compliant"
    >
      {{ option.name }} {{ option.flag }}
    </option>
  </select>
</template>

<script lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { defineComponent, watch } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';

interface LocaleSelect {
  locale: string;
  name: string;
  flag: string;
  country: string;
  rtl?: boolean;
}

export default defineComponent({
  name: 'SelectLocale',
  setup() {
    const localeOptions: LocaleSelect[] = [
      {
        locale: 'en-US',
        name: 'English',
        flag: '🇺🇸',
        country: 'USA',
      },
      {
        locale: 'he-IL',
        name: 'עברית',
        flag: '🇮🇱',
        country: 'Israel',
        rtl: true,
      },
    ];

    const i18n = useI18n();
    const locale = useLocalStorage('locale', i18n.locale.value, {
      listenToStorageChanges: true,
    });

    const syncLocale = () => {
      // Sync i18n.locale from localStorage
      i18n.locale.value = locale.value;

      // Handle RTL
      const localeOption = localeOptions.find(
        option => option.locale === locale.value
      );

      if (localeOption) {
        if (localeOption.rtl) {
          document.documentElement.setAttribute('dir', 'rtl');
        } else {
          document.documentElement.setAttribute('dir', 'ltr');
        }
      }
    };

    // Run on first render, then watch for changes
    syncLocale();
    watch(locale, syncLocale);

    return { localeOptions, locale };
  },
});
</script>
