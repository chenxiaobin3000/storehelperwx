import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'halfgood'

export function getHalfgood(that, params, success) {
  return post(`${preUrl}/getHalfgood`, that, params, success)
}

export function getGroupHalfgood(that, params, success) {
  return post(`${preUrl}/getGroupHalfgood`, that, params, success)
}