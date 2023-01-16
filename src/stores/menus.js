import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { setStore, getStore } from '@/util/store'
import { get as $get } from '@/api/http'

export const useMenusStore = defineStore('menus', () => {
  let menus = reactive(getStore({ name: 'menus' }) || [])
  const activeMenuId = ref(getStore({ name: 'active_menu_id' }) || '')
  const isMenuCollapse = ref(getStore({ name: 'menu_collapsed' }) || false)
  /**
   * 获取系统菜单
   * @returns
   */
  function getMenus () {
    return new Promise(
      (resolve) => {
        $get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-system/menu/routesAdmin`, {
          topMenuId: '1610517983698395138'
        }).then(({ data }) => {
          const result = data.data
          Object.assign(menus, result)
          setStore({ name: 'menus', content: result })
          if (result.length) {
            setActiveMenuId(result[0].id)
          }
          resolve(result)
        })
      },
      (reject) => {
        reject()
      }
    )
  }

  function setMenus (info) {
    menus = info
    setStore({ name: 'menus', content: menus })
  }

  /**
   * 设置顶部激活的菜单id
   * @param {*} menuId
   */
  function setActiveMenuId (menuId) {
    activeMenuId.value = menuId
    setStore({ name: 'active_menu_id', content: menuId })
  }

  /**
   * 设置左侧菜单栏收缩状态
   */
  function setMenuCollapse (collapse) {
    isMenuCollapse.value = collapse
    setStore({ name: 'menu_collapsed', content: collapse })
  }

  return {
    menus,
    setMenus,
    activeMenuId,
    setActiveMenuId,
    isMenuCollapse,
    setMenuCollapse,
    getMenus
  }
})
