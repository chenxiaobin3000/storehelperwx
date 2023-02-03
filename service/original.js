import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'original'

export function getOriginal(that, params, success) {
  return post(`${preUrl}/getOriginal`, that, params, success)
}

export function getGroupAllOriginal(that, params, success) {
  return post(`${preUrl}/getGroupAllOriginal`, that, params, success)
}