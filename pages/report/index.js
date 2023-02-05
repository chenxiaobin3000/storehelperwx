import {
  relogin
} from '../../util/util'
import {
  getTodayReport
} from '../../service/report'
Page({
  data: {
    id: 0,
    gid: 0,
    market: null,
    agreement: null,
    product: null,
    storage: null,
    stock: null,
    collapseValues: []
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    this.setData({
      id: app.globalData.user.id,
      gid: app.globalData.group.id
    })
    this.getReport()
  },
  onShow() {
    this.getTabBar().init()
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.setData({
      collapseValues: []
    })
    this.getReport()
  },
  // 下拉列表
  handleCollapseChange(event) {
    this.setData({
      collapseValues: event.detail.value
    })
  },
  getReport() {
    const that = this.data
    getTodayReport(this, {
      id: that.id,
      gid: that.gid
    }, data => {
      let total = 0
      data.stock.forEach(v => {
        total += v.total
      })
      this.setData({
        market: data.market,
        agreement: data.agreement,
        product: data.product,
        storage: data.storage,
        stock: {
          total: total,
          list: data.stock
        }
      })
    })
  },
  relogin() {
    relogin()
  }
})