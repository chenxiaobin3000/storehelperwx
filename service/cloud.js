import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'cloud'

export function getGroupAllCloud(that, params, success) {
  return post(`${preUrl}/getGroupAllCloud`, that, params, success)
}

export function cpurchase(that, params, success) {
  return post(`${preUrl}/purchase`, that, params, success)
}

export function setCPurchase(that, params, success) {
  return post(`${preUrl}/setPurchase`, that, params, success)
}

export function delCPurchase(that, params, success) {
  return post(`${preUrl}/delPurchase`, that, params, success)
}

export function reviewCPurchase(that, params, success) {
  return post(`${preUrl}/reviewPurchase`, that, params, success)
}

export function closs(that, params, success) {
  return post(`${preUrl}/loss`, that, params, success)
}

export function setCLoss(that, params, success) {
  return post(`${preUrl}/setLoss`, that, params, success)
}

export function delCLoss(that, params, success) {
  return post(`${preUrl}/delLoss`, that, params, success)
}

export function reviewCLoss(that, params, success) {
  return post(`${preUrl}/reviewLoss`, that, params, success)
}

export function creturn(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setCReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delCReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewCReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}