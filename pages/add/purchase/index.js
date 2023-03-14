import {
  relogin
} from '../../../util/util'
import {
  getPurchaseOrder
} from '../../../service/order'
Page({
  data: {
    total: 0,
    otype: 0,
    orderList: [],
    orderListLoadStatus: 0,
    backTopVisible: false,
    id: 0,
    page: 1,
    pageLimit: 10,
    search: null
  },
  onLoad(options) {
    wx.hideHomeButton()
    this.setData({
      otype: options.type,
      id: getApp().globalData.user.id
    })
  },
  onShow() {
    this.flushPage()
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.setData({
      page: 1,
      orderList: []
    })
    this.getOrderList()
  },
  onReachBottom() {
    if (this.data.orderListLoadStatus === 0) {
      this.getOrderList()
    }
  },
  onPageScroll(e) {
    this.setData({
      backTopVisible: e.scrollTop > 80,
    })
  },
  flushPage() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      page: 1,
      orderList: []
    })
    this.getOrderList()
  },
  getOrderList() {
    this.setData({
      orderListLoadStatus: 1
    })
    const that = this.data
    getPurchaseOrder(this, {
      id: that.id,
      type: that.otype, // 订单类型
      page: that.page,
      limit: that.pageLimit,
      review: 2, // 已审核
      complete: 0, // 未完成
      search: that.search
    }, data => {
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          if (v.type === 1 || v.type === 3) {
            v.orderType = '采购单'
          }
          v.applyTime2 = v.applyTime.substring(0, 10)
        })
        const curPage = that.page
        this.setData({
          total: data.total,
          page: curPage + 1,
          orderList: that.orderList.concat(data.list),
          orderListLoadStatus: 0
        })
        if ((curPage * that.pageLimit) >= that.total) {
          this.setData({
            orderListLoadStatus: 2
          })
        }
      } else {
        this.setData({
          orderListLoadStatus: 0
        })
      }
    })
  },
  clickOrder(item) {
    getApp().globalData.temp = {
      action: 'order',
      data: item.currentTarget.dataset.value
    }
    wx.navigateTo({
      url: '/pages/add/purchase/detail/index'
    })
  },
  relogin() {
    relogin()
  }
})