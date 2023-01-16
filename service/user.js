import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'user'

export function getUser(params, success) {
  return post(`${preUrl}/getUser`, params, success)
}