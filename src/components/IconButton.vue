<script setup lang="ts">
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps<{ icon: IconDefinition }>();
defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <button class="icon-button" @click="$emit('click')">
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>

<script lang="ts"></script>
