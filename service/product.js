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

export function addProcessInfo(that, params, success) {
  return post(`${preUrl}/addProcessInfo`, that, params, success)
}

export function delProcessInfo(that, params, success) {
  return post(`${preUrl}/delProcessInfo`, that, params, success)
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

export function addCompleteInfo(that, params, success) {
  return post(`${preUrl}/addCompleteInfo`, that, params, success)
}

export function delCompleteInfo(that, params, success) {
  return post(`${preUrl}/delCompleteInfo`, that, params, success)
}

export function ploss(that, params, success) {
  return post(`${preUrl}/loss`, that, params, success)
}

export function setPLoss(that, params, success) {
  return post(`${preUrl}/setLoss`, that, params, success)
}

export function delPLoss(that, params, success) {
  return post(`${preUrl}/delLoss`, that, params, success)
}

export function reviewPLoss(that, params, success) {
  return post(`${preUrl}/reviewLoss`, that, params, success)
}

export function addPLossInfo(that, params, success) {
  return post(`${preUrl}/addLossInfo`, that, params, success)
}

export function delPLossInfo(that, params, success) {
  return post(`${preUrl}/delLossInfo`, that, params, success)
}