import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faMoon);

const app = createApp(App);
app.component('FAIcon', FontAwesomeIcon);
app.mount('#app');
