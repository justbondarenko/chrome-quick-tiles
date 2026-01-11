import './assets/main.scss'
import 'primeicons/primeicons.css'
import 'animate.css'
import 'vue-advanced-cropper/dist/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

import PrimeVue from 'primevue/config'
import MyPreset from '@/assets/primevue/theme'

const app = createApp(App)

app.use(VueAxios, axios)

const pinia = createPinia()
app.use(pinia)

app.use(Vue3ColorPicker)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
})

app.mount('#app')
