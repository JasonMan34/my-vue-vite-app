<template>
  <div class="flex flex-col px-8 items-center">
    <Tabs v-model:activeTab="activeTab">
      <Tab v-for="(chart, key) in charts" :index="key + 1">{{
        chart.title
      }}</Tab>
    </Tabs>
    <TabPanel
      v-for="(chart, key) in charts"
      :index="key + 1"
      :active-tab="activeTab"
    >
      <div class="w-full max-w-screen-lg">
        <BarChart
          class="h-full"
          :chart-data="chart.data"
          :options="chart.options.value"
          :height="canvasHeight"
        />
      </div>

      <div class="px-4 py-4" dir="rtl">
        חיוביים בסבב:
        {{ chart.positives.map(a => peopleTranslator(a)).join(', ') }}
      </div>
    </TabPanel>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import { computed, defineComponent, ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import {
  getResults,
  getColors,
  peopleTranslator,
  LIGHT_GREEN,
  LIGHT_BLUE,
  DARK_GREEN,
  DARK_BLUE,
  getPositives,
  Person,
} from '../results';
import { useDarkTheme } from '../utils/dark-theme';
import Tabs from './Tabs/Tabs.vue';
import Tab from './Tabs/Tab.vue';
import TabPanel from './Tabs/TabPanel.vue';

export default defineComponent({
  name: 'CovidBettingResults',
  components: { BarChart, Tabs, Tab, TabPanel },
  setup() {
    const activeTab = ref(1);
    const isDark = useDarkTheme(true);

    const [people, scores] = getResults(1);
    const [wPeople, wScores] = getResults(1, true);

    const [peopleRoundTwo, scoresRoundTwo] = getResults(2);
    const [wPeopleRoundTwo, wScoresRoundTwo] = getResults(2, true);

    const [peopleRoundThree, scoresRoundThree] = getResults(3);
    const [wPeopleRoundThree, wScoresRoundThree] = getResults(3, true);

    const colors = computed(() => {
      if (isDark.value) {
        return getColors(people.length, LIGHT_GREEN, LIGHT_BLUE);
      }

      return getColors(people.length, DARK_GREEN, DARK_BLUE);
    });

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

    const getChartData = (
      people: Person[],
      scores: number[]
    ): ChartData<'bar'> => ({
      datasets: [
        {
          data: scores,
          backgroundColor: colors.value,
        },
      ],
      labels: people.map(person => peopleTranslator(person)),
    });

    const charts = computed(() => [
      {
        title: 'סבב ראשון - ניקוד מקורי',
        data: getChartData(people, scores),
        options: getChartOptions('סבב ראשון - ניקוד מקורי'),
        positives: getPositives(1),
      },
      {
        title: 'סבב ראשון - ניקוד משוקלל',
        data: getChartData(wPeople, wScores),
        options: getChartOptions('סבב ראשון - ניקוד משוקלל'),
        positives: getPositives(1),
      },

      {
        title: 'סבב שני - ניקוד מקורי',
        data: getChartData(peopleRoundTwo, scoresRoundTwo),
        options: getChartOptions('סבב שני - ניקוד מקורי'),
        positives: getPositives(2),
      },
      {
        title: 'סבב שני - ניקוד משוקלל',
        data: getChartData(wPeopleRoundTwo, wScoresRoundTwo),
        options: getChartOptions('סבב שני - ניקוד משוקלל'),
        positives: getPositives(2),
      },
      {
        title: 'סבב שלישי - ניקוד מקורי',
        data: getChartData(peopleRoundThree, scoresRoundThree),
        options: getChartOptions('סבב שלישי - ניקוד מקורי'),
        positives: getPositives(3),
      },
      {
        title: 'סבב שלישי - ניקוד משוקלל',
        data: getChartData(wPeopleRoundThree, wScoresRoundThree),
        options: getChartOptions('סבב שלישי - ניקוד משוקלל'),
        positives: getPositives(3),
      },
    ]);

    const canvasHeight = window.matchMedia('screen and (max-width: 1024px)')
      .matches
      ? 800
      : 700;

    return {
      charts,
      activeTab,
      peopleTranslator,
      canvasHeight,
    };
  },
});
</script>
