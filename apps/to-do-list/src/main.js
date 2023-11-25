import './assets/main.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import TodoList from './pages/TodoList/TodoList.vue'
import Account from './pages/Account/Account.vue'

const routes = [
    { path: '/', component: TodoList },
    { path: '/account', component: Account },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
