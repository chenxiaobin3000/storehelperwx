import {
  getGroupCommodity
} from '../../../service/commodity'
Page({
  data: {
    commodityVisible: false,
    commodityValue: {},
    commoditys: [],
    price: 0,
    num: 0,
    submitActive: false
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    getGroupCommodity({
      id: app.globalData.user.id,
      page: 1,
      limit: 100,
      search: null
    }, data => {
      const list = []
      data.list.forEach(v => {
        list.push({
          label: v.name,
          value: v
        })
      })
      this.setData({
        commoditys: list
      })
    })
  },
  checkSubmitActive() {
    const that = this.data
    if (that.commodityValue && that.commodityValue.id && that.price > 0 && that.num > 0) {
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
  onCommodityPicker() {
    this.setData({
      commodityVisible: true
    })
  },
  onCommodityChange(event) {
    this.setData({
      commodityVisible: false,
      commodityValue: event.detail.value[0]
    })
    this.checkSubmitActive()
  },
  onCommodityCancel() {
    this.setData({
      commodityVisible: false,
    })
  },
  addCommodity() {
    const that = this.data
    const app = getApp()
    app.globalData.temp = {
      action: 'addCommodity',
      commodity: that.commodityValue,
      price: that.price,
      num: that.num
    }
    wx.navigateBack({
      delta: 1
    })
  }
})