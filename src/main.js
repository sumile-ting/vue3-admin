import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './assets/main.css'
import 'uno.css'

import * as request from '@/api/http'
import '@/permission.js'

const app = createApp(App)

for (const key in request) {
  app.config.globalProperties['$' + key] = request[key]
}


app.use(createPinia())
app.use(router)
app.use(ElementPlus, {lang: 'zh-cn'})
app.mount('#sumile-app')
