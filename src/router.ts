import MainPage from './components/MainPage.vue';
import CovidBetResults from './components/CovidBetResults.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
  },
  {
    path: '/covid-bet-results',
    name: 'CovidBetResults',
    component: CovidBetResults,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
