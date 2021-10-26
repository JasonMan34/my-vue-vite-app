<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import MainPage from './components/MainPage.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col dark-compliant">
    <Navbar />
    <MainPage class="flex-1 px-4" />
  </div>
</template>
