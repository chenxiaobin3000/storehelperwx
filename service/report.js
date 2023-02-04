import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'report'

export function getYesterday(that, params, success) {
  return post(`${preUrl}/getYesterday`, that, params, success)
}