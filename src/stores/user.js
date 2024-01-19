import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { setToken } from '@/util/auth'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(useStorage('system-user_info', {}))
  const accessToken = ref(useStorage('system-access_token', ''))

  function setUserInfo (info) {
    Object.assign(userInfo, info)
    userInfo.value = info
    accessToken.value = info.access_token
    setToken(info.access_token || '')
  }

  return { userInfo, setUserInfo, accessToken }
})
