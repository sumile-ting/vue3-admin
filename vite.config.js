import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
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
//自动导入
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default(({mode}) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_BASE_URL || '/',
    plugins: [vue(), vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        localEnabled: env.VITE_USE_MOCK === 'true' || false,
        prodEnabled: env.VITE_USE_MOCK === 'true' || false, // 设置打包是否启用 mock 功能
        // ↓解析根目录下的mock文件夹
        mockPath: 'src/mock',
        supportTs: false, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,//如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
        logger: true,//是否在控制台显示请求日志
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        resolvers: [
          ElementPlusResolver(),
        ],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.js',
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
          // target: 'http://172.17.30.201:19000',
          // rewrite: (path) => path.replace(/^\/api/, '/')
        }
      }
    }
  })
  
})
