import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'order'

export function getMyWait(that, params, success) {
  return post(`${preUrl}/getMyWait`, that, params, success)
}

export function getMyCheck(that, params, success) {
  return post(`${preUrl}/getMyCheck`, that, params, success)
}

export function getMyComplete(that, params, success) {
  return post(`${preUrl}/getMyComplete`, that, params, success)
}