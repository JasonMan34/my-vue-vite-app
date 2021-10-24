<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { isDarkTheme, toggleDarkTheme } from '../utils/dark-theme';
import IconButton from './IconButton.vue';

const isDark = ref(isDarkTheme());
watchEffect(() => toggleDarkTheme(isDark.value));
</script>

<template>
  <IconButton
    @click="isDark = !isDark"
    :icon="isDark ? 'fa-sun' : 'fa-moon'"
    :tooltip="`Turn the light ${isDark ? 'on' : 'off'}`"
  />
</template>
