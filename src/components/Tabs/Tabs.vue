<template>
  <div class="overflow-x-auto max-w-full">
    <div class="flex flex-row justify-center space-s-6 pt-6 min-w-[900px]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, readonly, ref, watch } from 'vue';
import { ChangeTabKey, ActiveTabKey } from './keys';

export default defineComponent({
  emits: ['update:activeTab'],

  props: {
    activeTab: {
      type: Number,
      required: true,
    },
  },

  setup(props, context) {
    const innerActiveTab = ref(props.activeTab);

    const changeTab = (index: number) => {
      context.emit('update:activeTab', index);
    };

    watch(
      () => props.activeTab,
      () => (innerActiveTab.value = props.activeTab)
    );

    provide(ActiveTabKey, readonly(innerActiveTab));
    provide(ChangeTabKey, changeTab);
  },
});
</script>
