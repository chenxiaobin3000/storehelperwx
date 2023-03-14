import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'storage'

export function getGroupAllStorage(that, params, success) {
  return post(`${preUrl}/getGroupAllStorage`, that, params, success)
}

export function spurchase(that, params, success) {
  return post(`${preUrl}/purchase`, that, params, success)
}

export function setSPurchase(that, params, success) {
  return post(`${preUrl}/setPurchase`, that, params, success)
}

export function delSPurchase(that, params, success) {
  return post(`${preUrl}/delPurchase`, that, params, success)
}

export function reviewSPurchase(that, params, success) {
  return post(`${preUrl}/reviewPurchase`, that, params, success)
}

export function addSPurchaseInfo(that, params, success) {
  return post(`${preUrl}/addPurchaseInfo`, that, params, success)
}

export function delSPurchaseInfo(that, params, success) {
  return post(`${preUrl}/delPurchaseInfo`, that, params, success)
}

export function dispatch(that, params, success) {
  return post(`${preUrl}/dispatch`, that, params, success)
}

export function setDispatch(that, params, success) {
  return post(`${preUrl}/setDispatch`, that, params, success)
}

export function delDispatch(that, params, success) {
  return post(`${preUrl}/delDispatch`, that, params, success)
}

export function reviewDispatch(that, params, success) {
  return post(`${preUrl}/reviewDispatch`, that, params, success)
}

export function addDispatchInfo(that, params, success) {
  return post(`${preUrl}/addDispatchInfo`, that, params, success)
}

export function delDispatchInfo(that, params, success) {
  return post(`${preUrl}/delDispatchInfo`, that, params, success)
}

export function spurchase2(that, params, success) {
  return post(`${preUrl}/purchase2`, that, params, success)
}

export function setSPurchase2(that, params, success) {
  return post(`${preUrl}/setPurchase2`, that, params, success)
}

export function delSPurchase2(that, params, success) {
  return post(`${preUrl}/delPurchase2`, that, params, success)
}

export function reviewSPurchase2(that, params, success) {
  return post(`${preUrl}/reviewPurchase2`, that, params, success)
}

export function addSPurchase2Info(that, params, success) {
  return post(`${preUrl}/addPurchase2Info`, that, params, success)
}

export function delSPurchase2Info(that, params, success) {
  return post(`${preUrl}/delPurchase2Info`, that, params, success)
}

export function sagreement(that, params, success) {
  return post(`${preUrl}/agreement`, that, params, success)
}

export function setSAgreement(that, params, success) {
  return post(`${preUrl}/setAgreement`, that, params, success)
}

export function delSAgreement(that, params, success) {
  return post(`${preUrl}/delAgreement`, that, params, success)
}

export function reviewSAgreement(that, params, success) {
  return post(`${preUrl}/reviewAgreement`, that, params, success)
}

export function addSAgreementInfo(that, params, success) {
  return post(`${preUrl}/addAgreementInfo`, that, params, success)
}

export function delSAgreementInfo(that, params, success) {
  return post(`${preUrl}/delAgreementInfo`, that, params, success)
}

export function sloss(that, params, success) {
  return post(`${preUrl}/loss`, that, params, success)
}

export function setSLoss(that, params, success) {
  return post(`${preUrl}/setLoss`, that, params, success)
}

export function delSLoss(that, params, success) {
  return post(`${preUrl}/delLoss`, that, params, success)
}

export function reviewSLoss(that, params, success) {
  return post(`${preUrl}/reviewLoss`, that, params, success)
}

export function addSLossInfo(that, params, success) {
  return post(`${preUrl}/addLossInfo`, that, params, success)
}

export function delSLossInfo(that, params, success) {
  return post(`${preUrl}/delLossInfo`, that, params, success)
}

export function sreturn(that, params, success) {
  return post(`${preUrl}/returnc`, that, params, success)
}

export function setSReturn(that, params, success) {
  return post(`${preUrl}/setReturn`, that, params, success)
}

export function delSReturn(that, params, success) {
  return post(`${preUrl}/delReturn`, that, params, success)
}

export function reviewSReturn(that, params, success) {
  return post(`${preUrl}/reviewReturn`, that, params, success)
}

export function addSReturnInfo(that, params, success) {
  return post(`${preUrl}/addReturnInfo`, that, params, success)
}

export function delSReturnInfo(that, params, success) {
  return post(`${preUrl}/delReturnInfo`, that, params, success)
}