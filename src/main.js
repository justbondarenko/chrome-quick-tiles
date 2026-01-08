import './assets/main.scss';
import 'animate.css';
import "vue-advanced-cropper/dist/style.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './plugins/fontawesome';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';

const app = createApp(App);

app.use(VueAxios, axios);

const pinia = createPinia();
app.use(pinia);

app.use(Vue3ColorPicker);

app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
});

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
