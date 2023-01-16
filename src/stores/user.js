import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { setStore, getStore } from '@/util/store'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive(getStore({ name: 'user_info' }) || {})

  function setUserInfo (info) {
    Object.assign(userInfo, info)
    setStore({ name: 'user_info', content: info })
    setStore({ name: 'access_token', content: info.access_token })
  }

  return { userInfo, setUserInfo }
})
