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

export function addPurchaseInfo(that, params, success) {
  return post(`${preUrl}/addPurchaseInfo`, that, params, success)
}

export function delPurchaseInfo(that, params, success) {
  return post(`${preUrl}/delPurchaseInfo`, that, params, success)
}

export function purchase2(that, params, success) {
  return post(`${preUrl}/purchase2`, that, params, success)
}

export function setPurchase2(that, params, success) {
  return post(`${preUrl}/setPurchase2`, that, params, success)
}

export function delPurchase2(that, params, success) {
  return post(`${preUrl}/delPurchase2`, that, params, success)
}

export function reviewPurchase2(that, params, success) {
  return post(`${preUrl}/reviewPurchase2`, that, params, success)
}

export function addPurchase2Info(that, params, success) {
  return post(`${preUrl}/addPurchase2Info`, that, params, success)
}

export function delPurchase2Info(that, params, success) {
  return post(`${preUrl}/delPurchase2Info`, that, params, success)
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

export function addPReturnInfo(that, params, success) {
  return post(`${preUrl}/addReturnInfo`, that, params, success)
}

export function delPReturnInfo(that, params, success) {
  return post(`${preUrl}/reviewPurchase`, that, params, success)
}

export function preturn2(that, params, success) {
  return post(`${preUrl}/returnc2`, that, params, success)
}

export function setPReturn2(that, params, success) {
  return post(`${preUrl}/setReturn2`, that, params, success)
}

export function delPReturn2(that, params, success) {
  return post(`${preUrl}/delReturn2`, that, params, success)
}

export function reviewPReturn2(that, params, success) {
  return post(`${preUrl}/reviewReturn2`, that, params, success)
}

export function addPReturn2Info(that, params, success) {
  return post(`${preUrl}/addReturn2Info`, that, params, success)
}

export function delPReturn2Info(that, params, success) {
  return post(`${preUrl}/delPReturn2Info`, that, params, success)
}