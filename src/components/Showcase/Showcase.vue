<script setup lang="ts">
import ShowcaseCard from './ShowcaseCard.vue';
import ShowcaseChart from './ShowcaseChart.vue';
</script>

<template>
  <div class="flex flex-row flex-wrap space-x-8">
    <ShowcaseCard class="xl:max-w-[40%] h-full" />
    <ShowcaseChart />
  </div>
</template>
