<script setup lang="ts">
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps<{ icon: IconDefinition; tooltip?: string }>();
defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <button
    class="
      rounded-3xl
      min-h-[32px] min-w-[32px]
      hover:bg-black hover:bg-opacity-20
      dark:hover:bg-black dark:hover:bg-opacity-20
      transition-all
      ease-linear
      duration-75
    "
    @click="$emit('click')"
  >
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>

<script lang="ts"></script>
