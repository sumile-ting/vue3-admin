import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//自定义组件
import SumileMessageBox from './components/sumile-message-box'

import './assets/main.css'
import 'uno.css'

import * as request from '@/api/http'
import '@/permission.js'

const app = createApp(App)

for (const key in request) {
  app.config.globalProperties['$' + key] = request[key]
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(SumileMessageBox)
app.mount('#sumile-app')
