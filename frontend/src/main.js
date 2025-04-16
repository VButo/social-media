import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import socket from './socket'

const app = createApp(App)

app.config.globalProperties.$socket = socket

app.use(createPinia())
app.use(router)

app.mount('#app')