<script setup lang="ts">
import ImJason from './ImJason.vue';
import Showcase from './Showcase/Showcase.vue';
</script>

<template>
  <div
    class="
      flex flex-row flex-wrap
      md:space-s-8
      items-center
      mx-auto
      max-w-[1400px]
    "
  >
    <ImJason
      class="flex-fixed-12 md:flex-fixed-7 lg:flex-fixed-6 xl:flex-fixed-4"
    />
    <Showcase class="flex-1 self-start pt-8" />
  </div>
</template>
