import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'account'

export function login(that, params, success) {
  return post(`${preUrl}/login`, that, params, success)
}

export function logout(that, params, success) {
  return post(`${preUrl}/logout`, that, params, success)
}