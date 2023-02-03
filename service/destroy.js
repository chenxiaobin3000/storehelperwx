import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'destroy'

export function getDestroy(that, params, success) {
  return post(`${preUrl}/getDestroy`, that, params, success)
}

export function getGroupAllDestroy(that, params, success) {
  return post(`${preUrl}/getGroupAllDestroy`, that, params, success)
}