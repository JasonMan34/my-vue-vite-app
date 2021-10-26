<template>
  <IconButton
    @click="isDark = !isDark"
    :icon="isDark ? 'fa-sun' : 'fa-moon'"
    :tooltip="`Turn the light ${isDark ? 'on' : 'off'}`"
    class="text-xl"
  />
</template>

<script lang="ts">
import { toggleDarkTheme, useDarkTheme } from '../utils/dark-theme';
import IconButton from './IconButton.vue';
import { defineComponent, watch } from '@vue/runtime-core';

export default defineComponent({
  name: 'DarkThemeToggleButton',
  setup() {
    const isDark = useDarkTheme();

    toggleDarkTheme(isDark.value);
    watch(isDark, () => {
      console.log('changed!');
      toggleDarkTheme(isDark.value);
    });

    return { isDark };
  },
  components: { IconButton },
});
</script>
