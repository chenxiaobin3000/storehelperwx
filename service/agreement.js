import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'storage'

export function shipped(that, params, success) {
  return post(`${preUrl}/shipped`, that, params, success)
}

export function setShipped(that, params, success) {
  return post(`${preUrl}/setShipped`, that, params, success)
}

export function delShipped(that, params, success) {
  return post(`${preUrl}/delShipped`, that, params, success)
}

export function reviewShipped(that, params, success) {
  return post(`${preUrl}/reviewShipped`, that, params, success)
}

export function returnc(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}