import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'original'

export function getOriginal(that, params, success) {
  return post(`${preUrl}/getOriginal`, that, params, success)
}

export function getGroupOriginal(that, params, success) {
  return post(`${preUrl}/getGroupOriginal`, that, params, success)
}