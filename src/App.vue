<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { initDarkTheme } from './utils/dark-theme';

initDarkTheme();
</script>

<template>
  <div class="min-h-screen bg:white dark:bg-gray-800">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>
