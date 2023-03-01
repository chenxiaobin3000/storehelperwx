import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'agreement'

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

export function areturn(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setAReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delAReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewAReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}