import MainPage from './components/MainPage.vue';
import CovidMainPage from './components/CovidMainPage.vue';
import CovidBetResults from './components/CovidBetResults.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const IS_COVID = import.meta.env.VITE_IS_COVID === 'true';

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

if (IS_COVID) {
  routes[0] = {
    path: '/',
    name: 'Home',
    meta: {
      title: 'הימורי קורונה',
    },
    component: CovidMainPage,
  };
}

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
