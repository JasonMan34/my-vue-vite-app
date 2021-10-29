<template>
  <div>
    <DoughnutChart ref="chartRef" :chartData="chartData" :options="options" />
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
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { DoughnutChart, ExtractComponentData } from 'vue-chart-3';

// https://stackoverflow.com/a/18194993
const shuffleArrays = (...args: any[]) => {
  let arrLength = 0;
  let argsLength = args.length;
  let rnd, tmp;

  for (let index = 0; index < argsLength; index += 1) {
    if (!Array.isArray(args[index])) {
      throw new TypeError('Argument is not an array.');
    }

    if (index === 0) {
      arrLength = args[0].length;
    }

    if (arrLength !== args[index].length) {
      throw new RangeError('Array lengths do not match.');
    }
  }

  while (arrLength) {
    rnd = Math.floor(Math.random() * arrLength);
    arrLength -= 1;
    for (let index = 0; index < argsLength; index += 1) {
      tmp = args[index][arrLength];
      args[index][arrLength] = args[index][rnd];
      args[index][rnd] = tmp;
    }
  }
};

const MY_SKILLS = [
  'Vue',
  'Vite',
  'React',
  'Redux',
  'Material UI',
  'JavaScript',
  'TypeScript',
  'GraphQL',
  'REST',
  'NodeJS',
  'SQL',
  'PostgreSQL',
  'Oracle',
  'C#',
  'Linux',
];

export default defineComponent({
  name: 'ShowcaseChart',
  components: { DoughnutChart },
  setup() {
    const chartRef = ref<ExtractComponentData<typeof DoughnutChart>>();
    const chartData = reactive<ChartData<'doughnut', number[]>>({
      datasets: [
        {
          data: new Array(8).fill(0),
          backgroundColor: [
            '#003f5c',
            '#2f4b7c',
            '#665191',
            '#a05195',
            '#d45087',
            '#f95d6a',
            '#ff7c43',
            '#ffa600',
          ],
        },
      ],
      labels: MY_SKILLS.slice(0, 8),
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

    const newData = () => {
      const { labels } = chartData;
      const { data, backgroundColor } = chartData.datasets[0];
      data.forEach((_, index) => {
        data[index] = Math.floor(Math.random() * 100);
      });

      data.sort((a, b) => b - a);

      // idfk the types maan... this always returns true for me
      if (labels && Array.isArray(backgroundColor)) {
        shuffleArrays(MY_SKILLS);
        labels.forEach((_, index) => {
          labels[index] = MY_SKILLS[index];
        });
        shuffleArrays(labels, backgroundColor);
      }
    };

    onMounted(newData);

    return { chartData, newData, options, chartRef };
  },
});
</script>
