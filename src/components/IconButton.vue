<script setup lang="ts">
defineProps<{ icon: string; tooltip?: string }>();
const emit = defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <div class="relative group">
    <button
      class="rounded-full leading-none button p-3 fast-transition"
      @click="emit('click')"
    >
      <i :class="`fas ${icon}`"></i>
    </button>
    <span
      v-if="!!tooltip"
      class="absolute w-auto min-w-max p-2 top-12 left-full -translate-x-full xl:left-1/2 xl:-translate-x-1/2 rounded-md shadow-md dark:bg-gray-900 dark:text-white text-sm font-bold transition-all dureation-100 scale-0 group-hover:scale-100 origin-top"
    >
      {{ tooltip }}
    </span>
  </div>
</template>
