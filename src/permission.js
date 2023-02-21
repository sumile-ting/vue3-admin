/**
 * 全站权限配置
 *
 */
import router, { generatorRouterTree } from './router'
import { getStore } from '@/util/store'
import { useTagsStore } from '@/stores/tags'
import { useMenusStore } from '@/stores/menus'
import config from '@/config/index'
import { getLeafPath } from '@/util/util'

router.beforeEach(async (to, from, next) => {
  const meta = to.meta || {}
  const token = getStore({ name: 'access_token' })
  if (token) {
    if (to.path === '/login') { // 如果登录成功访问登录页跳转到主页
      next({
        path: '/'
      })
    } else {
      const { menus, getMenus } = useMenusStore()
      if (!menus.length) {
        const result = await getMenus()
        if (result.length) {
          generatorRouterTree(result, true)
        } else {
          next('/404')
        }
      }

      const meta = to.meta || {}
      if (meta.isTab !== false && ((!config.showIndexPage && to.path !== '/index') || config.showIndexPage)) {
        meta.order = meta.order || 0
        const { addTag } = useTagsStore()
        addTag({
          value: to.query.src || to.fullPath,
          label: meta.title || to.name,
          meta
        })
      }

      if (!config.showIndexPage && to.path === '/index') {
        const { menus } = useMenusStore()
        const path = getLeafPath(menus)
        next({
          path: path, replace: true
        })
      } else {
        next()
      }
    }
  } else {
    // 判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
})
