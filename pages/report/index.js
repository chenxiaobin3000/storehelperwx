import {
  relogin
} from '../../util/util'
Page({
  data: {
    market: [],
    agreement: {},
    product: {},
    storage: {},
    collapseValues: []
  },
  onLoad() {
    wx.hideHomeButton()
  },
  onShow() {
    this.getTabBar().init()
  },
  // 下拉列表
  handleCollapseChange(event) {
    this.setData({
      collapseValues: event.detail.value
    })
  },
  relogin() {
    relogin()
  }
})