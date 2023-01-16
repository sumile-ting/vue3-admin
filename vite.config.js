import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// mock服务
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    viteMockServe({
      // ↓解析根目录下的mock文件夹
      mockPath: 'mock',
      supportTs: false // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
    })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.148.12.166:19000',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
