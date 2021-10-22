<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { isDarkTheme, toggleDarkTheme } from '../utils/dark-theme';
import IconButton from './IconButton.vue';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const isDark = ref(isDarkTheme());
watchEffect(() => toggleDarkTheme(isDark.value));
</script>

<template>
  <IconButton @click="isDark = !isDark" :icon="isDark ? faSun : faMoon" />
</template>
