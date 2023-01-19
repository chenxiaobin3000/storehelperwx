import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'commodity'

export function getGroupCommodity(params, success) {
  return post(`${preUrl}/getGroupCommodity`, params, success)
}