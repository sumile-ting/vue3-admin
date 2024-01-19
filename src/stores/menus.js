import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get as $get } from '@/api/http'
import { useStorage } from '@vueuse/core'

export const useMenusStore = defineStore('menus', () => {
  const menus = ref(useStorage('system-menus', []))
  const isMenuCollapse = ref(false)

  /**
   * 获取系统菜单
   * @returns
   */
  function getMenus () {
    return new Promise(
      (resolve) => {
        $get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-system/menu/routesAdmin`, {
          topMenuId: '1610517983698395138' // 设备
          // 党建 1630735360625516546
        }).then(({ data }) => {
          const result = data.data
          menus.value = result
          resolve(result)
        })
      },
      (reject) => {
        reject()
      }
    )
  }

  function setMenus (info) {
    menus.value = info
  }

  /**
   * 设置左侧菜单栏收缩状态
   */
  function setMenuCollapse (collapse) {
    isMenuCollapse.value = collapse
  }

  return {
    menus,
    setMenus,
    isMenuCollapse,
    setMenuCollapse,
    getMenus
  }
})
