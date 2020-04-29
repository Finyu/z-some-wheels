import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return window.localStorage.token
}

export function setToken(token) {
  return window.localStorage.token = token
}

export function removeToken() {
  return window.localStorage.token = ''
}
