import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'storage'

export function shipped(params, success) {
  return post(`${preUrl}/shipped`, params, success)
}

export function setShipped(params, success) {
  return post(`${preUrl}/setShipped`, params, success)
}

export function delShipped(params, success) {
  return post(`${preUrl}/delShipped`, params, success)
}

export function reviewShipped(params, success) {
  return post(`${preUrl}/reviewShipped`, params, success)
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