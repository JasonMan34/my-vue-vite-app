import { useLocalStorage } from '@vueuse/core';
import { ref, watch } from 'vue';

/**
 * If dark theme is specifically stated, or it is in OS preferences, return
 * true. Otherwise, return false
 */
export const isDarkTheme = () =>
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);

/** Add or remove `dark` class to `html` */
export const toggleDarkTheme = (val: boolean) => {
  if (val) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/** Syncs a boolean ref with localStorage for dark theme */
export const useDarkTheme = () => {
  const isDark = useLocalStorage('is-dark-theme', isDarkTheme(), {
    listenToStorageChanges: true,
  });
  toggleDarkTheme(isDark.value);
  watch(isDark, () => toggleDarkTheme(isDark.value));

  return isDark;
};
