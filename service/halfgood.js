import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'halfgood'

export function getHalfgood(that, params, success) {
  return post(`${preUrl}/getHalfgood`, that, params, success)
}

export function getGroupAllHalfgood(that, params, success) {
  return post(`${preUrl}/getGroupAllHalfgood`, that, params, success)
}