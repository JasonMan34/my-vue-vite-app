<template>
  <div>
    <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
    <button @click="newData">Roll data</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';

export default defineComponent({
  name: 'Home',
  components: { DoughnutChart },
  setup() {
    const data = ref([0, 0, 0, 0]);
    const doughnutRef = ref();

    const options = ref({
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Lorem ipsum',
        },
      },
    });

    const testData = computed(() => ({
      labels: ['Vue', 'React', 'Angular', 'Svelte'],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#42B883', '#61DBFB', '#DD1B16', '#D7B4F3'],
        },
      ],
    }));

    const newData = () => {
      const newData: number[] = [];

      data.value.forEach(() => {
        const value = Math.floor(Math.random() * 100);
        newData.push(value);
      });

      data.value = newData;
    };

    onMounted(() => {
      newData();
    });

    return { testData, newData, doughnutRef, options };
  },
});
</script>
