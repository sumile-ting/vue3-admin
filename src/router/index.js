import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Login from '../views/login/Login.vue'
import Layout from '../views/layout/index.vue'
import staticRoutes from './static'

const modules = import.meta.glob('../**/**/*.vue')
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

/**
 * 递归的构造动态路由
 * @param {*} menus
 * @param {*} parent
 * @returns
 */
export function generatorRouterTree (menus, parent) {
  if (!menus || menus.length === 0) return
  const routers = []
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i]
    const routerMap = {
      name: item.code || '',
      path: item.path || `${parent && parent.path || ''}/${item.path}`,
      meta: {
        title: item.name || ''
      },
      query: item.query
    }
    const isChild = !!(item.children && item.children.length !== 0)
    if (parent) {
      const result = modules['../views/layout/index.vue']
      if (result) result().then(mod => mod.default.name = item.path)
      routerMap.component = result
    } else if (isChild && !parent) {
      const result = modules['../views/layout/RouterView.vue']
      if (result) result().then(mod => mod.default.name = item.path)
      routerMap.component = result
    } else {
      const result = modules[`../views${item.path}.vue`]
      if (result) result().then(mod => mod.default.name = item.path)
      else { console.log(item.path + '不存在') }
      routerMap.component = result
    }
    if (!isChild && parent) routerMap.redirect = `${item.path}`

    if (!isChild) {
      if (parent) {
        const result = modules[`../views${item.path}.vue`]
        if (result) result().then(mod => mod.default.name = item.path)
        else { console.log(item.path + '不存在') }
        routerMap.children = {
          component: result
        }
      } else {
        routerMap.children = []
      }
    } else {
      // 递归子菜单
      routerMap.children = generatorRouterTree(item.children, false)
    }
    routers.push(routerMap)
  }

  if (parent) {
    routers.forEach((ele) => router.addRoute(ele))
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
