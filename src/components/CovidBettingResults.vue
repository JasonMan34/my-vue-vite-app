<template>
  <div>
    <BarChart :chart-data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import { computed, defineComponent, reactive, ref } from 'vue';
import { BarChart, ExtractComponentData } from 'vue-chart-3';
import { calculateResults, getColors, peopleTranslator } from '../results';
import { useDarkTheme } from '../utils/dark-theme';

const [people, scores] = calculateResults();

const colors = getColors(people.length);

export default defineComponent({
  name: 'CovidBettingResults',
  components: { BarChart },
  setup() {
    const isDark = useDarkTheme(true);
    const chartRef = ref<ExtractComponentData<typeof BarChart>>();
    const chartData = reactive<ChartData<'bar', number[]>>({
      datasets: [
        {
          data: scores,
          backgroundColor: colors,
        },
      ],
      labels: people.map(person => peopleTranslator(person)),
    });

    const options = computed<ChartOptions>(() => {
      const textColor = isDark.value ? '#EEE' : '#333';
      return {
        color: textColor,
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: textColor,
            },
          },
          x: {
            ticks: {
              color: textColor,
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
            },
          },
          title: {
            color: textColor,
            display: true,
            text: 'לא יודע עוד',
          },
        },
      };
    });

    return { chartData, options, chartRef };
  },
});
</script>
