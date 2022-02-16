import './tailwind.css';
import 'chart.js/auto';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import cloneDeep from 'lodash.clonedeep';
import App from './App.vue';
import router from './router';
import type { Information } from './components/Minesweeper/game/information';

const i18n = createI18n({ legacy: false, fallbackLocale: 'en-US' });
const app = createApp(App);

app.use(i18n);
app.use(router);
app.mount('#app');

// TODO: Remove these

(globalThis as any).log = (data: any) => {
  console.log(cloneDeep(data));
};

(globalThis as any).logInfo = ({ data }: Information) => {
  data.forEach(node => {
    console.log({
      ...node.mines,
      tiles: JSON.stringify(node.tiles.map(a => ({ row: a.row, col: a.col }))),
    });
  });
};
