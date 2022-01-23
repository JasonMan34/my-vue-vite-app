import './tailwind.css';
import 'chart.js/auto';
import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import router from './router';

const i18n = createI18n({ legacy: false, fallbackLocale: 'en-US' });
const app = createApp(App);

app.use(i18n);
app.use(router);
app.mount('#app');
