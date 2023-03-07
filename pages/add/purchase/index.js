import {
  relogin
} from '../../../util/util'
import {
  getPurchaseOrder
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
    search: null
  },
  onLoad() {
    wx.hideHomeButton()
    this.setData({
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
      type: 1, // 采购单
      page: that.page,
      limit: that.pageLimit,
      review: 2, // 已审核
      search: that.search
    }, data => {
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          switch (v.type) {
            case 1:
              v.orderType = '采购单'
              break
            default:
              break
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