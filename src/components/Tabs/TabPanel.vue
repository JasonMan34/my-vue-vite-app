<template>
  <slot v-if="index === activeTab"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },

    activeTab: {
      type: Number,
      required: true,
    },
  },
});
</script>
