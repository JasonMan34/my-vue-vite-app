<template>
  <div class="flex flex-col items-center">
    <Tabs v-model:activeTab="activeTab">
      <Tab v-for="(chart, key) in charts" :index="key + 1">{{
        chart.title
      }}</Tab>
    </Tabs>
    <div class="w-full max-w-screen-lg">
      <TabPanel
        v-for="(chart, key) in charts"
        :index="key + 1"
        :active-tab="activeTab"
      >
        <BarChart
          class="h-full"
          :chart-data="chart.data"
          :options="chart.options.value"
          :height="800"
        />
      </TabPanel>
    </div>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import {
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { BarChart } from 'vue-chart-3';
import {
  getResults,
  getColors,
  peopleTranslator,
  getWeightedResults,
} from '../results';
import { useDarkTheme } from '../utils/dark-theme';
import Tabs from './Tabs/Tabs.vue';
import Tab from './Tabs/Tab.vue';
import TabPanel from './Tabs/TabPanel.vue';

const [people, scores] = getResults();
const [wPeople, wScores] = getWeightedResults();

const colors = getColors(people.length);

export default defineComponent({
  name: 'CovidBettingResults',
  components: { BarChart, Tabs, Tab, TabPanel },
  setup() {
    const activeTab = ref(1);
    const isDark = useDarkTheme(true);

    const getChartOptions = (title: string) =>
      computed<ChartOptions>(() => {
        const textColor = isDark.value ? '#EEE' : '#333';
        const gridColor = isDark.value ? '#333' : '#EEE';

        return {
          color: textColor,
          responsive: true,
          indexAxis: 'y',
          scales: {
            y: {
              ticks: { color: textColor, font: { size: 18 } },
              grid: { color: gridColor },
            },
            x: {
              ticks: { color: textColor, font: { size: 18 } },
              grid: { color: gridColor },
            },
          },
          plugins: {
            legend: { display: false },
            title: {
              color: textColor,
              padding: 24,
              font: { weight: '500', size: 18 },
              display: true,
              text: title,
            },
          },
        };
      });

    const getChartData = (people: string[], scores: number[]) => ({
      datasets: [
        {
          data: scores,
          backgroundColor: colors,
        },
      ],
      labels: people.map(person => peopleTranslator(person)),
    });

    const charts = [
      {
        title: 'ניקוד מקורי',
        data: getChartData(people, scores),
        options: getChartOptions('תוצאות לפי ניקוד מקורי'),
      },
      {
        title: 'ניקוד משוקלל',
        data: getChartData(wPeople, wScores),
        options: getChartOptions('תוצאות לפי ניקוד משוקלל'),
      },
    ];

    return {
      charts,
      activeTab,
    };
  },
});
</script>
