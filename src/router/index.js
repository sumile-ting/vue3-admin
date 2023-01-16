import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Login from '../views/login/Login.vue'
import Layout from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
        isTab: false,
      }
    }
  ]
})

export default router
