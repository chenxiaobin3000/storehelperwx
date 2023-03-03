import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'standard'

export function getStandard(that, params, success) {
  return post(`${preUrl}/getStandard`, that, params, success)
}

export function getGroupStandard(that, params, success) {
  return post(`${preUrl}/getGroupStandard`, that, params, success)
}