import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'destroy'

export function getDestroy(that, params, success) {
  return post(`${preUrl}/getDestroy`, that, params, success)
}

export function getGroupDestroy(that, params, success) {
  return post(`${preUrl}/getGroupDestroy`, that, params, success)
}