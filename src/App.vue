<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col dark-compliant">
    <Navbar />
    <router-view class="flex-1" />
  </div>
</template>
