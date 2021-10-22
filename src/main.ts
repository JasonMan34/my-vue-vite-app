import './tailwind.css';
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

library.add(faSun, faMoon);

const app = createApp(App);
app.mount('#app');
