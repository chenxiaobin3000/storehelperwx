import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'destroy'

export function getDestroy(params, success) {
  return post(`${preUrl}/getDestroy`, params, success)
}

export function getGroupDestroy(params, success) {
  return post(`${preUrl}/getGroupDestroy`, params, success)
}