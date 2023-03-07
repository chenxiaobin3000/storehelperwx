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
  delAReturn
} from '../../service/agreement'
import {
  delCPurchase,
  delCLoss,
  delCReturn
} from '../../service/cloud'
import {
  delProcess,
  delPLoss,
  delComplete
} from '../../service/product'
import {
  delPurchase,
  delPReturn
} from '../../service/purchase'
import {
  delSPurchase,
  delDispatch,
  delPurchase2,
  delSLoss,
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
            v.orderType = '履约发货'
            break
          case 12:
            v.orderType = '履约退货'
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
          url: '/pages/me/edit/index'
        })
        break
      case 1:
        wx.navigateTo({
          url: '/pages/me/review/index'
        })
        break
      default:
        break
    }
  },
  delOrder(item) {
    const that = this.data
    const order = item.currentTarget.dataset.value
    const data = {
      id: that.id,
      oid: order.id
    }
    switch (order.type) {
      case 1:
        delPurchase(this, data, this.flushPage)
        break
      case 2:
        delPReturn(this, data, this.flushPage)
        break
      case 3:
        delSPurchase(this, data, this.flushPage)
        break
      case 4:
        delDispatch(this, data, this.flushPage)
        break
      case 5:
        delPurchase2(this, data, this.flushPage)
        break
      case 6:
        delSLoss(this, data, this.flushPage)
        break
      case 7:
        delSReturn(this, data, this.flushPage)
        break
      case 8:
        delProcess(this, data, this.flushPage)
        break
      case 9:
        delComplete(this, data, this.flushPage)
        break
      case 10:
        delPLoss(this, data, this.flushPage)
        break
      case 11:
        delShipped(this, data, this.flushPage)
        break
      case 12:
        delAReturn(this, data, this.flushPage)
        break
      case 13:
        delCPurchase(this, data, this.flushPage)
        break
      case 14:
        delCReturn(this, data, this.flushPage)
        break
      case 16:
        delCLoss(this, data, this.flushPage)
        break
      default:
        break
    }
  },
  clickLogout() {
    const that = this.data
    logout(this, {
      id: that.id
    }, () => {
      wx.setStorageSync('userId', 0)
      wx.setStorageSync('token', '')
      wx.redirectTo({
        url: '/pages/login/index'
      })
    })
  },
  perm2String(perms) {
    const ret = []
    perms.forEach(v => {
      switch (v) {
        case 12:
          ret.push('采购进货申请')
          break
        case 13:
          ret.push('采购退货申请')
          break
        case 16:
          ret.push('仓储入库申请')
          break
        case 17:
          ret.push('调度出库申请')
          break
        case 18:
          ret.push('调度入库申请')
          break
        case 19:
          ret.push('仓储损耗申请')
          break
        case 20:
          ret.push('仓储退货申请')
          break
        case 26:
          ret.push('生产开始申请')
          break
        case 27:
          ret.push('生产完成申请')
          break
        case 28:
          ret.push('生产损耗申请')
          break
        case 31:
          ret.push('履约发货申请')
          break
        case 32:
          ret.push('履约退货申请')
          break
        case 36:
          ret.push('云仓入库申请')
          break
        case 37:
          ret.push('云仓退货申请')
          break
        case 39:
          ret.push('云仓损耗申请')
          break
        case 42:
          ret.push('采购进货审核')
          break
        case 43:
          ret.push('采购退货审核')
          break
        case 46:
          ret.push('仓储入库审核')
          break
        case 47:
          ret.push('调度出库审核')
          break
        case 48:
          ret.push('调度入库审核')
          break
        case 49:
          ret.push('仓储损耗审核')
          break
        case 50:
          ret.push('仓储退货审核')
          break
        case 56:
          ret.push('生产开始审核')
          break
        case 57:
          ret.push('生产完成审核')
          break
        case 58:
          ret.push('生产损耗审核')
          break
        case 61:
          ret.push('履约发货审核')
          break
        case 62:
          ret.push('履约退货审核')
          break
        case 66:
          ret.push('云仓入库审核')
          break
        case 67:
          ret.push('云仓退货审核')
          break
        case 69:
          ret.push('云仓损耗审核')
          break
        default:
          break
      }
    })
    return ret
  },
  relogin() {
    relogin()
  }
})