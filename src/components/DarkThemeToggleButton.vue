<template>
  <IconButton
    class="text-xl"
    :icon="isDark ? 'fa-sun' : 'fa-moon'"
    :tooltip="`Turn the light ${isDark ? 'on' : 'off'}`"
    @click="isDark = !isDark"
  />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { toggleDarkTheme, useDarkTheme } from '../utils/dark-theme';
import IconButton from './IconButton.vue';

export default defineComponent({
  name: 'DarkThemeToggleButton',
  components: { IconButton },
  setup() {
    const isDark = useDarkTheme();

    toggleDarkTheme(isDark.value);
    watch(isDark, () => {
      toggleDarkTheme(isDark.value);
    });

    return { isDark };
  },
});
</script>
