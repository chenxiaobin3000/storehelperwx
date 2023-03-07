import {
  relogin
} from '../../../../util/util'
import {
  addShippedInfo,
  addAReturnInfo
} from '../../../../service/agreement'
import {
  addCReturnInfo
} from '../../../../service/cloud'
import {
  addPurchaseInfo,
  addPReturnInfo
} from '../../../../service/purchase'
import {
  addDispatchInfo,
  addSReturnInfo
} from '../../../../service/storage'
Page({
  data: {
    id: 0,
    type: 0,
    oid: 0,
    batch: '',
    fare: '',
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
    if (that.fare.length > 0 || that.remark.length > 0) {
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
      fare: that.fare,
      remark: that.remark
    }
    switch (that.type) {
      case 1: // 采购进货
        addPurchaseInfo(this, data, this.handleData)
        break
      case 2: // 采购退货
        addPReturnInfo(this, data, this.handleData)
        break
      case 4: // 调度出库
        addDispatchInfo(this, data, this.handleData)
        break
      case 7: // 仓储退货
        addSReturnInfo(this, data, this.handleData)
        break
      case 11: // 履约发货
        addShippedInfo(this, data, this.handleData)
        break
      case 12: // 履约退货
        addAReturnInfo(this, data, this.handleData)
        break
      case 14: // 云仓退货
        addCReturnInfo(this, data, this.handleData)
        break
      default:
        break
    }
  },
  handleData() {
    const that = this.data
    getApp().globalData.temp = {
      action: 'info',
      fare: that.fare,
      remark: that.remark
    }
    wx.navigateBack()
  },
  relogin() {
    relogin()
  }
})