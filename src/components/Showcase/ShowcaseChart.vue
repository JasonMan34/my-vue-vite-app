<template>
  <div>
    <DoughnutChart ref="chartRef" :chartData="testData" :options="options" />
    <div class="flex flex-row justify-between">
      <div
        class="
          rounded-xl
          p-2
          hover:bg-black hover:bg-opacity-20
          dark:hover:bg-opacity-40
        "
      >
        <button @click="newData">Roll data</button>
      </div>
      <select @change="" class="bg-transparent">
        <option>Doughnut</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { DoughnutChart, ExtractComponentData } from 'vue-chart-3';

export default defineComponent({
  name: 'Home',
  components: { DoughnutChart },
  setup() {
    const chartRef = ref<ExtractComponentData<typeof DoughnutChart>>();
    const data = ref([0, 0, 0, 0]);

    watch(data, () => {
      console.log(chartRef.value.chartInstance);
    });

    const options = reactive<ChartOptions>({
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Lorem ipsum',
        },
      },
    });

    const testData = computed<ChartData>(() => ({
      labels: ['Vue', 'React', 'Angular', 'Svelte'],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#42B883', '#61DBFB', '#DD1B16', '#D7B4F3'],
          color: '#000',
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

    onMounted(newData);

    return { testData, newData, options, chartRef };
  },
});
</script>
