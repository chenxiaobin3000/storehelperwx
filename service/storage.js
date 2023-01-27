import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'storage'

export function getGroupStorage(params, success) {
  return post(`${preUrl}/getGroupStorage`, params, success)
}

export function purchase(params, success) {
  return post(`${preUrl}/purchase`, params, success)
}

export function setPurchase(params, success) {
  return post(`${preUrl}/setPurchase`, params, success)
}

export function delPurchase(params, success) {
  return post(`${preUrl}/delPurchase`, params, success)
}

export function reviewPurchase(params, success) {
  return post(`${preUrl}/reviewPurchase`, params, success)
}

export function returnc(params, success) {
  return post(`${preUrl}/returnc`, params, success)
}

export function setReturn(params, success) {
  return post(`${preUrl}/setReturn`, params, success)
}

export function delReturn(params, success) {
  return post(`${preUrl}/delReturn`, params, success)
}

export function reviewReturn(params, success) {
  return post(`${preUrl}/reviewReturn`, params, success)
}