<template>
  <div>
    <BarChart
      :chart-data="originalScoringData"
      :options="originalScoringOptions"
    />
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

    const getChartOptions = (title: string) =>
      computed<ChartOptions>(() => {
        const textColor = isDark.value ? '#EEE' : '#333';
        const gridColor = isDark.value ? '#333' : '#EEE';

        return {
          color: textColor,
          responsive: true,

          scales: {
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
          },
          plugins: {
            legend: { display: false },
            title: {
              color: textColor,
              padding: 24,
              font: { size: 14 },
              display: true,
              text: title,
            },
          },
        };
      });

    const originalScoringData = reactive<ChartData<'bar', number[]>>({
      datasets: [
        {
          data: scores,
          backgroundColor: colors,
        },
      ],
      labels: people.map(person => peopleTranslator(person)),
    });

    const originalScoringOptions = getChartOptions('תוצאות לפי ניקוד מקורי');

    return {
      originalScoringData,
      originalScoringOptions,
    };
  },
});
</script>
