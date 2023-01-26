import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'order'

export function getMyWait(params, success) {
  return post(`${preUrl}/getMyWait`, params, success)
}

export function getMyComplete(params, success) {
  return post(`${preUrl}/getMyComplete`, params, success)
}