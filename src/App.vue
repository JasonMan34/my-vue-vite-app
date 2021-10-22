<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import MainPage from './components/MainPage.vue';
</script>

<template>
  <div
    class="
      min-h-screen
      flex flex-col
      bg:white
      dark:bg-gray-800
      text-gray-900
      dark:text-white
    "
  >
    <Navbar />
    <MainPage class="flex-1" />
  </div>
</template>
