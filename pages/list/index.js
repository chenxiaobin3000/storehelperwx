import {
  relogin,
  getOrderType
} from '../../util/util'
import {
  getMyComplete
} from '../../service/order'
Page({
  data: {
    total: 0,
    orderList: [],
    orderListLoadStatus: 0,
    backTopVisible: false,
    id: 0,
    page: 1,
    pageLimit: 10,
    search: null
  },
  onLoad() {
    wx.hideHomeButton()
    this.setData({
      id: getApp().globalData.user.id
    })
  },
  onShow() {
    this.getTabBar().init()
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
    getMyComplete(this, {
      id: that.id,
      page: that.page,
      limit: that.pageLimit,
      search: that.search
    }, data => {
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          v.orderType = getOrderType(v.type)
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
      url: '/pages/list/detail/index'
    })
  },
  relogin() {
    relogin()
  }
})