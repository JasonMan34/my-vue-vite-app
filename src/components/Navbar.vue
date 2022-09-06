<template>
  <div
    class="rounded-b-2xl border-b-4 border-gray-200 dark:bg-blue-900 dark:border-transparent"
  >
    <div
      class="flex px-2 justify-start items-center mx-auto max-w-full 2xl:max-w-[1400px] min-h-[56px]"
      dir="ltr"
    >
      <SelectLocale v-if="routeName !== 'CovidBetResults' || true" />
      <DarkThemeToggleButton class="ms-auto" />
      <HomeButton />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import DarkThemeToggleButton from './DarkThemeToggleButton.vue';
import SelectLocale from './SelectLocale.vue';
import HomeButton from './HomeButton.vue';

export default defineComponent({
  name: 'ShowcaseChart',
  components: { DarkThemeToggleButton, SelectLocale, HomeButton },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);

    return { routeName };
  },
});
</script>
