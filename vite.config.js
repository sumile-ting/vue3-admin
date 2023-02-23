import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// mock服务
import { viteMockServe } from 'vite-plugin-mock'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const localEnabled = process.env.USE_MOCK || false

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    viteMockServe({
      localEnabled: localEnabled,
      // ↓解析根目录下的mock文件夹
      mockPath: 'mock',
      supportTs: false // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      resolvers: [
        ElementPlusResolver(),
      ],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        secure: false,
        changeOrigin: true,
        target: 'https://mock.mengxuegu.com/mock/63f461cfc5a76a117cab125b/vue3Admin',
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
