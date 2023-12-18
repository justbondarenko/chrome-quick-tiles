import './index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab);

const app = createApp(App);

app.use(VueAxios, axios);

const pinia = createPinia();
app.use(pinia);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
