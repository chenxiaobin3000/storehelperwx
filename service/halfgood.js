import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'halfgood'

export function getHalfgood(params, success) {
  return post(`${preUrl}/getHalfgood`, params, success)
}

export function getGroupHalfgood(params, success) {
  return post(`${preUrl}/getGroupHalfgood`, params, success)
}