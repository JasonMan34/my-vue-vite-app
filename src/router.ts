import MainPage from './components/MainPage.vue';
import CovidBetResults from './components/CovidBetResults.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Jason Web',
    },
    component: MainPage,
  },
  {
    path: '/covid-bet-results',
    name: 'CovidBetResults',
    meta: {
      title: 'הימורי קורונה',
    },
    component: CovidBetResults,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  }

  next();
});

export default router;
