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