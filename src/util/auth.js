import Cookies from 'js-cookie'
const TokenKey = 'system-access-token'
const RefreshTokenKey = 'system-refresh-token'
export function getToken () {
  const cookieToken = Cookies.get(TokenKey)
  return cookieToken
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function getRefreshToken () {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken (token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function removeRefreshToken () {
  return Cookies.remove(RefreshTokenKey)
}
