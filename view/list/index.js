import TabData from './data'
import {
  getMyWait,
  getMyComplete
} from '../../service/order'
Page({
  data: {
    baseRefresh: {
      value: false,
    },
    loadingProps: {
      size: '50rpx',
    },
    tabList: TabData,
    tabIndex: 0,
    orderList: [],
    orderListLoadStatus: 0,
    backTopVisible: false,
    listQuery: {},
    rightWidth: 60
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    this.setData({
      listQuery: {
        id: app.globalData.user.id,
        page: 1,
        limit: 20,
        search: null
      }
    })
    this.getOrderList(null)
  },
  onShow() {
    this.getTabBar().init()
  },
  onPullDownRefresh() {
    this.setData({
      orderList: []
    })
    this.getOrderList(() => {
      this.setData({
        'baseRefresh.value': false
      })
    })
  },
  onScroll(e) {
    const {
      scrollTop
    } = e.detail
    this.setData({
      backTopVisible: scrollTop > 600,
    })
  },
  search(event) {
    console.log('search' + event)
  },
  getOrderList(success) {
    getMyWait(this.data.listQuery, data => {
      this.setData({
        orderList: this.data.orderList.concat(data.list)
      })
      if (success) {
        success(data)
      }
    })
  },
  handleTabChange(e) {
    this.tabIndex = e.detail
    console.log(this.tabIndex)
  },
  onReTry() {
    console.log('retry')
  }
})