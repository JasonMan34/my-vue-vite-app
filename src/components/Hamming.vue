<template>
  <iframe id="hamming_iframe" width="100%" height="100%" :src="src"></iframe>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useDarkTheme } from '../utils/dark-theme';

export default defineComponent({
  setup() {
    const isDark = useDarkTheme(true);
    const src = import.meta.env.VITE_HAMMING_URL;

    const toggleDarkTheme = (val: boolean) => {
      const frameDoc = (
        document.getElementById('hamming_iframe') as HTMLIFrameElement
      ).contentWindow!.document;

      console.log(frameDoc);

      if (val) {
        frameDoc.documentElement.classList.add('dark');
      } else {
        frameDoc.documentElement.classList.remove('dark');
      }
    };

    watch(isDark, () => {
      toggleDarkTheme(isDark.value);
    });

    onMounted(() => {
      const frame = document.getElementById(
        'hamming_iframe'
      ) as HTMLIFrameElement;

      frame.onload = () => toggleDarkTheme(isDark.value);
    });

    return { src };
  },
});
</script>
