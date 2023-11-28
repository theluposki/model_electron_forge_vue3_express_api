import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './index.css'

import App from './App.vue'
import { router } from './routes.js'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')