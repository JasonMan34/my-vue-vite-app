import { useLocalStorage } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';
/**
 * If dark theme is specifically stated, or it is in OS preferences, return
 * true. Otherwise, return false
 */
export const isDarkTheme = () =>
  localStorage.getItem('is-dark-theme') === 'true' ||
  (!('is-dark-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);

/** Add or remove `dark` class to `html` */
export const toggleDarkTheme = (val: boolean) => {
  if (val) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  window.dispatchEvent(new Event('dark-theme-changed'));
};

/** Syncs a boolean ref with localStorage for dark theme */
export const useDarkTheme = (listenForChanges: boolean = false) => {
  const isDark = useLocalStorage('is-dark-theme', isDarkTheme(), {
    listenToStorageChanges: true,
  });

  if (listenForChanges) {
    const change = () => {
      isDark.value = isDarkTheme();
    };

    onMounted(() => {
      window.addEventListener('dark-theme-changed', change);
    });

    onUnmounted(() => {
      window.removeEventListener('dark-theme-changed', change);
    });
  }

  return isDark;
};
