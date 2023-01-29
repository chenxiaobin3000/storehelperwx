import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'storage'

export function getGroupStorage(that, params, success) {
  return post(`${preUrl}/getGroupStorage`, that, params, success)
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

export function sreturnc(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setSReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delSReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewSReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}