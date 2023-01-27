import TabData from './data'
import {
  getMyWait,
  getMyComplete
} from '../../service/order'
Page({
  data: {
    tabList: TabData,
    tabIndex: 0,
    total: 0,
    orderList: [],
    orderListLoadStatus: 0,
    backTopVisible: false,
    id: 0,
    page: 1,
    pageLimit: 10,
    search: null,
    rightWidth: 60
  },
  onLoad() {
    wx.hideHomeButton()
    this.setData({
      id: getApp().globalData.user.id
    })
    this.getOrderList()
  },
  onShow() {
    this.getTabBar().init()
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
  search(event) {
    console.log('search' + event)
  },
  getOrderList() {
    this.setData({
      orderListLoadStatus: 1
    })
    const that = this.data
    if (that.tabIndex === 0) {
      getMyWait({
        id: that.id,
        page: that.page,
        limit: that.pageLimit,
        search: that.search
      }, data => {
        this.getOrderListSuccess(that, data)
      })
    } else {
      getMyComplete({
        id: that.id,
        page: that.page,
        limit: that.pageLimit,
        search: that.search
      }, data => {
        this.getOrderListSuccess(that, data)
      })
    }
  },
  getOrderListSuccess(that, data) {
    if (data.list && data.list.length > 0) {
      data.list.forEach(v => {
        switch (v.type) {
          case 1:
            v.orderType = '进货入库'
            break
          case 3:
            v.orderType = '生产出库'
            break
          case 5:
            v.orderType = '履约出货'
            break
        }
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
    }
  },
  handleTabChange(e) {
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      tabIndex: e.detail.value,
      page: 1,
      orderList: []
    })
    this.getOrderList()
  },
  clickOrder(item) {
    getApp().globalData.temp = {
      action: 'order',
      data: item.currentTarget.dataset.value
    }
    wx.navigateTo({
      url: './edit/index'
    })
  },
  delOrder(item) {
    console.log(item)
  }
})