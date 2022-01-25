<template>
  <div class="relative">
    <Loading
      active
      color="#08f"
      backgroundColor="#000"
      :opacity="opacity"
      :isFullPage="isFullPage"
    />
  </div>
</template>

<script lang="ts">
import 'vue-loading-overlay/dist/vue-loading.css';
import { computed, defineComponent } from 'vue';
import Loading from 'vue-loading-overlay';
import { useDarkTheme } from '../utils/dark-theme';

export default defineComponent({
  components: { Loading },
  props: {
    isFullPage: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isDark = useDarkTheme();
    const opacity = computed(() => {
      return isDark.value ? 0.5 : 0.7;
    });

    return { opacity };
  },
});
</script>
