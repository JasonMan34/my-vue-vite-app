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
const Hamming = AsyncComponent('Hamming');
const AddToCalendar = AsyncComponent('AddToCalendar');

const Minesweeper = defineAsyncComponent({
  loader: () => import(`./components/Minesweeper/Minesweeper.vue`),
  loadingComponent: Loading,
  delay: 200,
});

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
    path: '/add-to-calendar',
    name: 'Add To Calendar',
    meta: {
      title: 'Jason Web',
    },
    component: AddToCalendar,
  },
  {
    path: '/covid-bet-results',
    name: 'CovidBetResults',
    meta: {
      title: 'הימורי קורונה',
    },
    component: CovidBetResults,
  },
  {
    path: '/minesweeper',
    name: 'Minesweeper',
    meta: {
      title: 'Minesweeper',
    },
    component: Minesweeper,
  },
  {
    path: '/minesweeper/sandbox',
    name: 'MinesweeperSandbox',
    meta: {
      title: 'Minesweeper Sandbox',
    },
    component: Minesweeper,
  },
  {
    path: '/hamming',
    name: 'Hamming',
    meta: {
      title: 'Hamming',
    },
    component: Hamming,
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
