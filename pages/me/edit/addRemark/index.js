import {
  relogin
} from '../../../../util/util'
import {
  addPurchaseInfo,
  addPReturnInfo
} from '../../../../service/purchase'
import {
  addSPurchaseInfo
} from '../../../../service/storage'
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
      case 1: // 采购进货
        addPurchaseInfo(this, data, this.handleData)
        break
      case 2: // 采购退货
        addPReturnInfo(this, data, this.handleData)
        break
      case 3: // 仓储入库
        addSPurchaseInfo(this, data, this.handleData)
        break
      case 4: // 调度出库
        dispatch(this, data, this.handleData)
        break
      case 5: // 调度入库
        purchase2(this, data, this.handleData)
        break
      case 6: // 仓储损耗
        sloss(this, data, this.handleData)
        break
      case 7: // 仓储退货
        sreturn(this, data, this.handleData)
        break
      case 8: // 生产开始
        process(this, data, this.handleData)
        break
      case 9: // 生产完成
        complete(this, data, this.handleData)
        break
      case 10: // 生产损耗
        ploss(this, data, this.handleData)
        break
      case 11: // 履约发货
        shipped(this, data, this.handleData)
        break
      case 12: // 履约退货
        areturn(this, data, this.handleData)
        break
      case 13: // 云仓入库
        cpurchase(this, data, this.handleData)
        break
      case 14: // 云仓退货
        creturn(this, data, this.handleData)
        break
      case 16: // 云仓损耗
        closs(this, data, this.handleData)
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