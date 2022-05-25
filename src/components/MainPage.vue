<script setup lang="ts">
import ImJason from './ImJason.vue';
import Showcase from './Showcase/Showcase.vue';
</script>

<template>
  <div
    class="flex flex-row flex-wrap px-4 md:space-s-8 mt-20 mx-auto max-w-[1400px]"
  >
    <ImJason />
    <Showcase class="flex-1 self-start pt-8" />
  </div>
</template>
