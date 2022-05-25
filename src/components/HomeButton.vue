<template>
  <IconButton
    class="text-xl"
    :icon="'fa-home'"
    :tooltip="'Home'"
    @click="router.push('/')"
  />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRouter } from 'vue-router';
import IconButton from './IconButton.vue';

export default defineComponent({
  name: 'DarkThemeToggleButton',
  components: { IconButton },
  setup() {
    const router = useRouter();

    return { router };
  },
});
</script>
