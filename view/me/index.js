import TabData from './data'
import {
  relogin
} from '../../util/util'
import {
  logout
} from '../../service/account'
import {
  getMyWait,
  getMyCheck
} from '../../service/order'
import {
  delShipped,
  delReturn
} from '../../service/agreement'
import {
  delProcess,
  delComplete
} from '../../service/product'
import {
  delPurchase,
  delSReturn
} from '../../service/storage'
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
    user: {},
    group: {},
    perms: {},
    rightWidth: 60
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    this.setData({
      id: app.globalData.user.id,
      user: app.globalData.user,
      group: app.globalData.group,
      perms: this.perm2String(app.globalData.perms)
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
    switch (that.tabIndex) {
      case 0:
        getMyWait(this, {
          id: that.id,
          page: that.page,
          limit: that.pageLimit,
          search: that.search
        }, data => {
          this.getOrderListSuccess(that, data)
        })
        break
      case 1:
        getMyCheck(this, {
          id: that.id,
          page: that.page,
          limit: that.pageLimit,
          search: that.search
        }, data => {
          this.getOrderListSuccess(that, data)
        })
        break
      default:
        break
    }
  },
  getOrderListSuccess(that, data) {
    if (data.list && data.list.length > 0) {
      data.list.forEach(v => {
        switch (v.type) {
          case 1:
            v.orderType = '仓储入库'
            break
          case 2:
            v.orderType = '仓储退货'
            break
          case 4:
            v.orderType = '生产出库'
            break
          case 3:
            v.orderType = '生产完成'
            break
          case 6:
            v.orderType = '履约出货'
            break
          case 5:
            v.orderType = '履约退货'
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
  },
  handleTabChange(e) {
    this.setData({
      tabIndex: e.detail.value
    })
    this.flushPage()
  },
  clickOrder(item) {
    getApp().globalData.temp = {
      action: 'order',
      data: item.currentTarget.dataset.value
    }
    switch (this.data.tabIndex) {
      case 0:
        wx.navigateTo({
          url: '/view/me/edit/index'
        })
        break
      case 1:
        wx.navigateTo({
          url: '/view/me/review/index'
        })
        break
      default:
        break
    }
  },
  delOrder(item) {
    const order = item.currentTarget.dataset.value
    const data = {
      id: getApp().globalData.user.id,
      oid: order.id
    }
    switch (order.type) {
      case 1:
        delPurchase(this, data, () => {
          this.flushPage()
        })
        break
      case 2:
        delSReturn(this, data, () => {
          this.flushPage()
        })
        break
      case 4:
        delProcess(this, data, () => {
          this.flushPage()
        })
        break
      case 3:
        delComplete(this, data, () => {
          this.flushPage()
        })
        break
      case 6:
        delShipped(this, data, () => {
          this.flushPage()
        })
        break
      case 5:
        delReturn(this, data, () => {
          this.flushPage()
        })
        break
    }
  },
  clickLogout() {
    const app = getApp()
    logout(this, {
      id: app.globalData.user.id
    }, () => {
      wx.setStorageSync('userId', 0)
      wx.setStorageSync('token', '')
      wx.redirectTo({
        url: '/view/login/index'
      })
    })
  },
  perm2String(perms) {
    const ret = []
    perms.forEach(v => {
      switch (v) {
        case 11:
          ret.push('仓储入库申请')
          break
        case 12:
          ret.push('仓储退货申请')
          break
        case 13:
          ret.push('生产出库申请')
          break
        case 14:
          ret.push('生产完成申请')
          break
        case 15:
          ret.push('履约出货申请')
          break
        case 16:
          ret.push('履约退货申请')
          break
        case 17:
          ret.push('仓储入库审核')
          break
        case 18:
          ret.push('仓储退货审核')
          break
        case 19:
          ret.push('生产出库审核')
          break
        case 20:
          ret.push('生产完成审核')
          break
        case 21:
          ret.push('履约出货审核')
          break
        case 22:
          ret.push('履约退货审核')
          break
      }
    })
    return ret
  },
  relogin() {
    relogin()
  }
})