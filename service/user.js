import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'user'

export function getUser(that, params, success) {
  return post(`${preUrl}/getUser`, that, params, success)
}