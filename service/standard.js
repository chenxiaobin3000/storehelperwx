import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'standard'

export function getStandard(that, params, success) {
  return post(`${preUrl}/getStandard`, that, params, success)
}

export function getGroupAllStandard(that, params, success) {
  return post(`${preUrl}/getGroupAllStandard`, that, params, success)
}