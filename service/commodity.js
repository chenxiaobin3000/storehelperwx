import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'commodity'

export function getCommodity(params, success) {
  return post(`${preUrl}/getCommodity`, params, success)
}

export function getGroupCommodity(params, success) {
  return post(`${preUrl}/getGroupCommodity`, params, success)
}