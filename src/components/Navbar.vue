<script setup lang="ts">
import DarkThemeToggleButton from './DarkThemeToggleButton.vue';
import SelectLocale from './SelectLocale.vue';
</script>

<template>
  <div
    class="
      rounded-b-2xl
      border-b-2
      bg-white
      border-gray-200
      dark:bg-blue-900 dark:border-none
    "
  >
    <div
      class="
        flex
        px-2
        justify-start
        items-center
        mx-auto
        max-w-[1200px]
        min-h-[48px]
      "
      dir="ltr"
    >
      <SelectLocale />
      <DarkThemeToggleButton class="ms-auto" />
    </div>
  </div>
</template>

<script></script>
