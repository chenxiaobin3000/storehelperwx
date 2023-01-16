import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'account'

export function login(params, success) {
  return post(`${preUrl}/login`, params, success)
}

export function logout(params, success) {
  return post(`${preUrl}/logout`, params, success)
}