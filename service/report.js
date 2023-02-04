import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'report'

export function getToday(that, params, success) {
  return post(`${preUrl}/getToday`, that, params, success)
}