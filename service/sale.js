import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'sale'

export function mreturn(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setMReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delMReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewMReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}

export function addMReturnInfo(that, params, success) {
  return post(`${preUrl}/addReturnInfo`, that, params, success)
}

export function delMReturnInfo(that, params, success) {
  return post(`${preUrl}/delReturnInfo`, that, params, success)
}