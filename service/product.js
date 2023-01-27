import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'product'

export function process(params, success) {
  return post(`${preUrl}/process`, params, success)
}

export function setProcess(params, success) {
  return post(`${preUrl}/setProcess`, params, success)
}

export function delProcess(params, success) {
  return post(`${preUrl}/delProcess`, params, success)
}

export function reviewProcess(params, success) {
  return post(`${preUrl}/reviewProcess`, params, success)
}

export function complete(params, success) {
  return post(`${preUrl}/complete`, params, success)
}

export function setComplete(params, success) {
  return post(`${preUrl}/setComplete`, params, success)
}

export function delComplete(params, success) {
  return post(`${preUrl}/delComplete`, params, success)
}

export function reviewComplete(params, success) {
  return post(`${preUrl}/reviewComplete`, params, success)
}