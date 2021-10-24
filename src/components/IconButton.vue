<script setup lang="ts">
defineProps<{ icon: string; tooltip?: string }>();
defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <button
    class="
      rounded-3xl
      min-h-[32px] min-w-[32px]
      hover:bg-black hover:bg-opacity-20
      dark:hover:bg-black dark:hover:bg-opacity-20
      fast-transition
    "
    @click="$emit('click')"
  >
    <i :class="`fas ${icon}`"></i>
  </button>
</template>

<script lang="ts"></script>
