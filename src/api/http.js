import axios from './axios'

export function get (url, params, config) {
  return axios({
    url,
    method: 'get',
    params,
    ...config
  })
}

export function post (url, params, queryParams, config) {
  return axios({
    url,
    method: 'post',
    data: params,
    params: queryParams,
    ...config
  })
}
