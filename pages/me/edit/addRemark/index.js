import {
  relogin
} from '../../../../util/util'
import {
  addCPurchaseInfo,
  addCLossInfo,
  addCAgreementInfo
} from '../../../../service/cloud'
import {
  addProcessInfo,
  addCompleteInfo,
  addPLossInfo
} from '../../../../service/product'
import {
  addSPurchaseInfo,
  addSPurchase2Info,
  addSLossInfo
} from '../../../../service/storage'
import {
  addMReturn
}from '../../../../service/sale'
Page({
  data: {
    id: 0,
    type: 0,
    oid: 0,
    batch: '',
    remark: '',
    submitActive: false
  },
  onLoad(options) {
    wx.hideHomeButton()
    this.setData({
      id: getApp().globalData.user.id,
      type: parseInt(options.type),
      oid: parseInt(options.id),
      batch: options.batch
    })
    if (options.num > 0) {
      this.setData({
        lock: true,
        num: options.num,
        submitActive: true,
        btnText: '修 改'
      })
    }
  },
  checkSubmitActive() {
    const that = this.data
    if (that.remark.length > 0) {
      this.setData({
        submitActive: true
      })
    } else {
      this.setData({
        submitActive: false
      })
    }
  },
  onInputValue(event) {
    this.setData({
      [`${event.currentTarget.dataset.item}`]: event.detail.value
    })
    this.checkSubmitActive()
  },
  addInfo() {
    const that = this.data
    const data = {
      id: that.id,
      oid: that.oid,
      remark: that.remark
    }
    switch (that.type) {
      case 10: // 仓储采购入库
        addSPurchaseInfo(this, data, this.handleData)
        break
      case 12: // 仓储调度入库
        addSPurchase2Info(this, data, this.handleData)
        break
      case 13: // 仓储损耗
        addSLossInfo(this, data, this.handleData)
        break
      case 20: // 生产开始
        addProcessInfo(this, data, this.handleData)
        break
      case 21: // 生产完成
        addCompleteInfo(this, data, this.handleData)
        break
      case 22: // 生产损耗
        addPLossInfo(this, data, this.handleData)
        break
      case 40: // 云仓采购入库
        addCPurchaseInfo(this, data, this.handleData)
        break
      case 42: // 云仓损耗
        addCLossInfo(this, data, this.handleData)
        break
      case 44: // 云仓履约入库
        addCAgreementInfo(this, data, this.handleData)
        break
      case 50: // 销售售后
        addMReturn(this, data, this.handleData)
        break
      default:
        break
    }
  },
  handleData() {
    const that = this.data
    getApp().globalData.temp = {
      action: 'info',
      remark: that.remark
    }
    wx.navigateBack()
  },
  relogin() {
    relogin()
  }
})