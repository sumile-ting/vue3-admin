import axios from 'axios'
import router from '../router'
import { getStore } from '@/util/store'
import { ElMessage } from 'element-plus'
function myAxios (axiosConfig, customOptions) {
  const service = axios.create({
    baseURL: '', // 设置统一的请求前缀
    timeout: 10000 // 设置统一的超时时长
  })

  service.interceptors.request.use(
    config => {
      config.headers.Authorization = 'Basic c2FiZXI6c2FiZXJfc2VjcmV0'
      const meta = config.meta || {}
      const isToken = meta.isToken === false
      // 让每个请求携带token
      if (getStore({ name: 'access_token' }) && !isToken) {
        config.headers[`${import.meta.env.VITE_REQUEST_PREFIX}-Auth`] = 'bearer ' + getStore({ name: 'access_token' })
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    res => {
      const status = res.data.code || res.status
      const message = res.data.msg || res.data.error_description || '未知错误'
      // 如果是401则跳转到登录页面
      if (status === 401) { router.push({ path: '/login' }) }
      // 如果请求为非200否者默认统一处理
      if (status !== 200) {
        ElMessage({
          message: message,
          type: 'error'
        })
        return Promise.reject(new Error(message))
      }
      return res
    },
    error => {
      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}
export default myAxios
