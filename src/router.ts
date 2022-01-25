import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Loading from './components/Loading.vue';

const AsyncComponent = (route: string) =>
  defineAsyncComponent({
    // The component to load (should be a Promise)
    loader: () => import(`./components/${route}.vue`),
    // A component to use while the async component is loading
    loadingComponent: Loading,
    // A component to use if the load fails
    // error: ErrorComponent,

    // Delay before showing the loading component. Default: 200ms.
    delay: 200,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    // timeout: 3000,
  });

const CovidMainPage = AsyncComponent('CovidMainPage');
const MainPage = AsyncComponent('MainPage');
const CovidBetResults = AsyncComponent('CovidBetResults');

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
