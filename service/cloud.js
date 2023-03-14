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

export function addCPurchaseInfo(that, params, success) {
  return post(`${preUrl}/addPurchaseInfo`, that, params, success)
}

export function delCPurchaseInfo(that, params, success) {
  return post(`${preUrl}/delPurchaseInfo`, that, params, success)
}

export function cagreement(that, params, success) {
  return post(`${preUrl}/agreement`, that, params, success)
}

export function setCAgreement(that, params, success) {
  return post(`${preUrl}/setAgreement`, that, params, success)
}

export function delCAgreement(that, params, success) {
  return post(`${preUrl}/delAgreement`, that, params, success)
}

export function reviewCAgreement(that, params, success) {
  return post(`${preUrl}/reviewAgreement`, that, params, success)
}

export function addCAgreementInfo(that, params, success) {
  return post(`${preUrl}/addAgreementInfo`, that, params, success)
}

export function delCAgreementInfo(that, params, success) {
  return post(`${preUrl}/delAgreementInfo`, that, params, success)
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

export function addCLossInfo(that, params, success) {
  return post(`${preUrl}/addLossInfo`, that, params, success)
}

export function delCLossInfo(that, params, success) {
  return post(`${preUrl}/delLossInfo`, that, params, success)
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

export function addCReturnInfo(that, params, success) {
  return post(`${preUrl}/addReturnInfo`, that, params, success)
}

export function delCReturnInfo(that, params, success) {
  return post(`${preUrl}/delReturnInfo`, that, params, success)
}

export function cback(that, params, success) {
  return post(`${preUrl}/backc`, that, params, success)
}

export function setCBack(that, params, success) {
  return post(`${preUrl}/setBack`, that, params, success)
}

export function delCBack(that, params, success) {
  return post(`${preUrl}/delBack`, that, params, success)
}

export function reviewCBack(that, params, success) {
  return post(`${preUrl}/reviewBack`, that, params, success)
}

export function addCBackInfo(that, params, success) {
  return post(`${preUrl}/addBackInfo`, that, params, success)
}

export function delCBackInfo(that, params, success) {
  return post(`${preUrl}/delBackInfo`, that, params, success)
}