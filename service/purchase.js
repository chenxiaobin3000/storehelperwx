import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'purchase'

export function getPurchaseOrder(that, params, success) {
  return post(`${preUrl}/getPurchaseOrder`, that, params, success)
}

export function purchase(that, params, success) {
  return post(`${preUrl}/purchase`, that, params, success)
}

export function setPurchase(that, params, success) {
  return post(`${preUrl}/setPurchase`, that, params, success)
}

export function delPurchase(that, params, success) {
  return post(`${preUrl}/delPurchase`, that, params, success)
}

export function reviewPurchase(that, params, success) {
  return post(`${preUrl}/reviewPurchase`, that, params, success)
}

export function preturn(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setPReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delPReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewPReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}