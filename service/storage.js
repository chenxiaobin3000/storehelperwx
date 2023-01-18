import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'storage'

export function getGroupStorage(params, success) {
  return post(`${preUrl}/getGroupStorage`, params, success)
}