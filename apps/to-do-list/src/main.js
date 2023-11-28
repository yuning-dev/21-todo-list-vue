import './assets/main.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(pinia)

app.mount('#app')
