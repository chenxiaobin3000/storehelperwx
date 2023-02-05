import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'report'

export function getTodayReport(that, params, success) {
  return post(`${preUrl}/getTodayReport`, that, params, success)
}