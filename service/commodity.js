import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'commodity'

export function getCommodity(that, params, success) {
  return post(`${preUrl}/getCommodity`, that, params, success)
}

export function getGroupCommodity(that, params, success) {
  return post(`${preUrl}/getGroupCommodity`, that, params, success)
}