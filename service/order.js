import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'order'

export function getPurchaseOrder(that, params, success) {
  return post(`${preUrl}/getPurchaseOrder`, that, params, success)
}

export function getMyWait(that, params, success) {
  return post(`${preUrl}/getMyWait`, that, params, success)
}

export function getMyCheck(that, params, success) {
  return post(`${preUrl}/getMyCheck`, that, params, success)
}

export function getMyComplete(that, params, success) {
  return post(`${preUrl}/getMyComplete`, that, params, success)
}

export function getOrder(that, params, success) {
  return post(`${preUrl}/getOrder`, that, params, success)
}