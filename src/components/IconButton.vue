<script setup lang="ts">
defineProps<{ icon: string; tooltip?: string }>();
defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <div class="relative group">
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
    <span
      class="
        absolute
        w-auto
        min-w-max
        p-2
        top-12
        left-1/2
        -translate-x-1/2
        rounded-md
        shadow-md
        dark:bg-gray-900 dark:text-white
        text-sm
        font-bold
        transition-all
        dureation-100
        scale-0
        group-hover:scale-100
        origin-top
      "
      v-if="!!tooltip"
    >
      {{ tooltip }}
    </span>
  </div>
</template>

<script lang="ts"></script>
