import {
  relogin
} from '../../../util/util'
import {
  getStorageOrder
} from '../../../service/order'
Page({
  data: {
    total: 0,
    orderList: [],
    orderListLoadStatus: 0,
    backTopVisible: false,
    id: 0,
    page: 1,
    pageLimit: 10,
    complete: 0,
    search: null
  },
  onLoad() {
    wx.hideHomeButton()
    this.setData({
      id: getApp().globalData.user.id,
      complete: options.complete
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
    getStorageOrder(this, {
      id: that.id,
      type: 11, // 调度单
      page: that.page,
      limit: that.pageLimit,
      review: 2, // 已审核
      complete: that.complete,
      search: that.search
    }, data => {
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          if (v.type === 11) {
              v.orderType = '调度单'
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
      url: '/pages/add/dispatch/detail/index'
    })
  },
  relogin() {
    relogin()
  }
})