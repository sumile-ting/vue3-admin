import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Login from '../views/login/Login.vue'
import Layout from '../views/layout/index.vue'
import staticRoutes from './static'

const modules = import.meta.glob(['../views/**/*.vue',  '!../views/layout/**/*.vue',  '!../views/login/**/*.vue'])
const baseUrl = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(baseUrl),
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0, left: 0 }
  },
  routes: [
    ...staticRoutes,
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          meta: {
            title: '首页'
          },
          component: HomeView
        }
      ]
    },
    {
      path: '/user-info',
      component: Layout,
      redirect: '/user-info/index',
      children: [
        {
          path: 'index',
          name: 'userInfo',
          meta: {
            title: '个人信息'
          },
          component: () => import(/* webpackChunkName: "userInfo" */'../views/user/info.vue')
        }
      ]

    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */'../views/pages/404.vue'),
      meta: {
        isAuth: false,
        isTab: false
      }
    }
  ]
})

// Hard-reload the page when chunk load errors match the navigation error
router.onError((error, to) => {
  const errors = ['Failed to load module script', 'Failed to fetch dynamically imported module', 'Unable to preload CSS'];

  if (errors.some((e) => error.message.includes(e))) {
    window.location = to.fullPath;
  }
});

// 这个的作用是 为了检查出网页链接
function isURL(s) {
  if (s.includes('html')) return true
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 递归的构造动态路由
 * @param {*} menus
 * @param {*} topLevel
 * @returns
 */
export function generatorRouterTree (menus, topLevel) {
  if (!menus || menus.length === 0) return
  const routers = []
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i]
    let path = (() => {
      if (topLevel) {
        // 将 '/index' 替换为 ''
        return item.path.replace(/\/index$/, '')
      } else {
        return item.path
      }
    })()
    const componentPath  = item.path
    const isChild = !!(item.children && item.children.length !== 0)
    const routeComponent = (() => {
        // 判断是否为首路由
        if (topLevel) return () => import('../views/layout/index.vue')
        // // 判断是否为多层路由
        if (isChild && !topLevel) {
          return ''
        }
        // 判断是否为最终的页面视图
        return modules[`../views${componentPath}.vue`]
    })()

    const routerMap = {
      name: item.code || '',
      path: path,
      meta: {
        title: item.name || ''
      },
      component: routeComponent,
      redirect: (() => {
        // 第一次进来但是没有子路由的 需要添加redirect
        if (!isChild && topLevel && !isURL(path)) return `${path}/index`
        else return ''
      })(),
      // 整理子路由的route 配置
      // 处理是否为一级路由
      children: !isChild
        ? (() => {
            if (topLevel) {
              // 这里的isURL判断，因为这个网站有使用 iframe。所以需要判断是否为网页链接
              if (!isURL(path)) item.path = `${path}/index`
              return [
                {
                  component: modules[`../views${componentPath}.vue`],
                  name: item.name,
                  meta: {},
                  path: 'index'
                }
              ]
            }
            return []
          })()
        : (() => {
            /**
             * 这里是重点，当有子路由的时候 会再去执行 generatorRouterTree 方法，然后又会有一个新的 aMenu for循环。
             * 最后返回的是一个数组 aRouter 这个数组就会作为 childen的值被 return
             */
            return generatorRouterTree(item.children, false)
          })()
    }

    routers.push(routerMap)
  }

  if (topLevel) {
    routers.forEach((ele) => {
      router.addRoute(ele)
    })
  } else {
    return routers
  }
}
const menus = JSON.parse(window.localStorage.getItem('system-menus') || '[]')
generatorRouterTree(menus, true)

// 延迟加载兜底路由，防止同时开两个页签， 其中一个退出。另一个跳转404
setTimeout(() => {
  router.addRoute(
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  )
  // 重载当前路由，因为vue-router4动态加载路由，需要手动调用 router.replace() 来改变当前的位置
  router.replace(router.currentRoute.value.fullPath)
}, 500)
export default router
