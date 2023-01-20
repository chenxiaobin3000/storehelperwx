import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'original'

export function getOriginal(params, success) {
  return post(`${preUrl}/getOriginal`, params, success)
}

export function getGroupOriginal(params, success) {
  return post(`${preUrl}/getGroupOriginal`, params, success)
}