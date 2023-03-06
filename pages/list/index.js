import {
  relogin
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
          switch (v.type) {
            case 1:
              v.orderType = '采购进货'
              break
            case 2:
              v.orderType = '采购退货'
              break
            case 3:
              v.orderType = '仓储入库'
              break
            case 4:
              v.orderType = '调度出库'
              break
            case 5:
              v.orderType = '调度入库'
              break
            case 6:
              v.orderType = '仓储损耗'
              break
            case 7:
              v.orderType = '仓储退货'
              break
            case 8:
              v.orderType = '生产开始'
              break
            case 9:
              v.orderType = '生产完成'
              break
            case 10:
              v.orderType = '生产损耗'
              break
            case 11:
              v.orderType = '履约入库'
              break
            case 12:
              v.orderType = '履约出库'
              break
            case 13:
              v.orderType = '云仓入库'
              break
            case 14:
              v.orderType = '云仓退货'
              break
            case 16:
              v.orderType = '云仓损耗'
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
      url: '/pages/list/detail/index'
    })
  },
  relogin() {
    relogin()
  }
})