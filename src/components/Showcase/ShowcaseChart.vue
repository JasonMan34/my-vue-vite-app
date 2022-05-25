<template>
  <div>
    <DoughnutChart
      ref="chartRef"
      :chart-data="chartData"
      :options="options"
      class="min-w-[400px]"
    />
    <div class="flex flex-row justify-between">
      <div
        class="rounded-xl p-2 hover:bg-black hover:bg-opacity-20 dark:hover:bg-opacity-40"
      >
        <button @click="newData">Roll data</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import { computed, defineComponent, reactive, ref } from 'vue';
import { DoughnutChart, ExtractComponentData } from 'vue-chart-3';
import { useDarkTheme } from '../../utils/dark-theme';

// https://stackoverflow.com/a/18194993
const shuffleArrays = (...args: any[]) => {
  let arrLength = 0;
  const argsLength = args.length;
  let rnd;
  let tmp;

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

const COLORS = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
];

export default defineComponent({
  name: 'ShowcaseChart',
  components: { DoughnutChart },
  setup() {
    const isDark = useDarkTheme(true);
    const chartRef = ref<ExtractComponentData<typeof DoughnutChart>>();
    const chartData = reactive<ChartData<'doughnut', number[]>>({
      datasets: [
        {
          data: new Array(8).fill(0),
          backgroundColor: COLORS,
        },
      ],
      labels: MY_SKILLS.slice(0, 8),
    });

    const options = computed<ChartOptions>(() => {
      const textColor = isDark.value ? '#EEE' : '#333';
      return {
        color: textColor,
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            color: textColor,
            display: true,
            text: 'Wowee',
          },
        },
      };
    });

    const generateNewData = () => {
      shuffleArrays(MY_SKILLS);
      shuffleArrays(COLORS);

      const newDataLength = 4 + Math.floor(Math.random() * 5);

      const newLabels = MY_SKILLS.slice(0, newDataLength);
      const newBackgroundColors = COLORS.slice(0, newDataLength);
      const newData = new Array(newDataLength)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
        .sort((a, b) => b - a);

      chartData.labels = newLabels;
      chartData.datasets[0].data = newData;
      chartData.datasets[0].backgroundColor = newBackgroundColors;
    };

    generateNewData();

    return { chartData, newData: generateNewData, options, chartRef };
  },
});
</script>
