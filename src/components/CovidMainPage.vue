<template>
  <div class="flex flex-col items-center">
    <button
      class="rounded-3xl font-bold bg-green-400 p-4 md:p-6 big-text mt-[10%]"
      @click="router.push('/covid-bet-results')"
    >
      לתוצאות ההימורים
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    return { router };
  },
});
</script>
