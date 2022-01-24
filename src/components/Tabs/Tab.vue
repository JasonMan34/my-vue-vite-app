<template>
  <button :class="`p-2 rounded-xl text-white ${tabClass}`" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { ChangeTabKey, ActiveTabKey } from './keys';

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
  },

  setup({ index }) {
    const activeTab = inject(ActiveTabKey);
    const changeTab = inject(ChangeTabKey);

    if (!activeTab || !changeTab) {
      throw new Error('Missing value or changeTab injection');
    }

    const isActive = computed(() => index === activeTab.value);

    const tabClass = computed(() => {
      const classes: string[] = ['active:bg-blue-900'];

      if (isActive.value) {
        classes.push('bg-blue-900');
      } else {
        classes.push('bg-blue-500');
        classes.push('hover:bg-blue-600');
      }

      return classes.join(' ');
    });

    const onClick = () => changeTab(index);

    return { isActive, tabClass, onClick };
  },
});
</script>
