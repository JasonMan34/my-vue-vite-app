<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { initDarkTheme } from '../utils/dark-theme';

initDarkTheme();
const boolRef = ref(false);
</script>

<template>
  <button @click="boolRef = !boolRef" class="rounded-3xl">
    <FAIcon :icon="boolRef ? 'sun' : 'moon'" />
  </button>
</template>

<script></script>

<style></style>
