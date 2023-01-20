import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'standard'

export function getStandard(params, success) {
  return post(`${preUrl}/getStandard`, params, success)
}

export function getGroupStandard(params, success) {
  return post(`${preUrl}/getGroupStandard`, params, success)
}