import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'product'

export function process(that, params, success) {
  return post(`${preUrl}/process`, that, params, success)
}

export function setProcess(that, params, success) {
  return post(`${preUrl}/setProcess`, that, params, success)
}

export function delProcess(that, params, success) {
  return post(`${preUrl}/delProcess`, that, params, success)
}

export function reviewProcess(that, params, success) {
  return post(`${preUrl}/reviewProcess`, that, params, success)
}

export function complete(that, params, success) {
  return post(`${preUrl}/complete`, that, params, success)
}

export function setComplete(that, params, success) {
  return post(`${preUrl}/setComplete`, that, params, success)
}

export function delComplete(that, params, success) {
  return post(`${preUrl}/delComplete`, that, params, success)
}

export function reviewComplete(that, params, success) {
  return post(`${preUrl}/reviewComplete`, that, params, success)
}