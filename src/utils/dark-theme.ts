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
