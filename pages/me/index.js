import TabData from './data'
import {
  relogin,
  getOrderType
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
  delCAgreement,
  delCLoss,
  delCReturn,
  delCBack
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
  delSPurchase2,
  delSAgreement,
  delSLoss,
  delSReturn
} from '../../service/storage'
import {
  delMReturn
} from '../../service/sale'
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
      case 10:
        delSPurchase(this, data, this.flushPage)
        break
      case 11:
        delDispatch(this, data, this.flushPage)
        break
      case 12:
        delSPurchase2(this, data, this.flushPage)
        break
      case 13:
        delSLoss(this, data, this.flushPage)
        break
      case 14:
        delSReturn(this, data, this.flushPage)
        break
      case 15:
        delSAgreement(this, data, this.flushPage)
        break
      case 20:
        delProcess(this, data, this.flushPage)
        break
      case 21:
        delComplete(this, data, this.flushPage)
        break
      case 22:
        delPLoss(this, data, this.flushPage)
        break
      case 30:
        delShipped(this, data, this.flushPage)
        break
      case 31:
        delAReturn(this, data, this.flushPage)
        break
      case 40:
        delCPurchase(this, data, this.flushPage)
        break
      case 41:
        delCReturn(this, data, this.flushPage)
        break
      case 42:
        delCLoss(this, data, this.flushPage)
        break
      case 43:
        delCBack(this, data, this.flushPage)
        break
      case 44:
        delCAgreement(this, data, this.flushPage)
        break
      case 50:
        delMReturn(this, data, this.flushPage)
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
          ret.push('采购仓储进货申请')
          break
        case 13:
          ret.push('采购仓储退货申请')
          break
        case 14:
          ret.push('采购云仓进货申请')
          break
        case 47:
          ret.push('采购云仓退货申请')
          break
        case 16:
          ret.push('仓储采购入库申请')
          break
        case 17:
          ret.push('仓储调度出库申请')
          break
        case 18:
          ret.push('仓储调度入库申请')
          break
        case 19:
          ret.push('仓储损耗申请')
          break
        case 20:
          ret.push('仓储采购退货申请')
          break
        case 21:
          ret.push('仓储履约退货申请')
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
        case 38:
          ret.push('云仓损耗申请')
          break
        case 39:
          ret.push('云仓采购退货申请')
          break
        case 40:
          ret.push('云仓履约退货申请')
          break
        case 50:
          ret.push('销售售后申请')
          break
        case 52:
          ret.push('采购仓储进货审核')
          break
        case 53:
          ret.push('采购仓储退货审核')
          break
        case 54:
          ret.push('采购云仓进货审核')
          break
        case 87:
          ret.push('采购云仓退货审核')
          break
        case 56:
          ret.push('仓储入库审核')
          break
        case 57:
          ret.push('仓储调度出库审核')
          break
        case 58:
          ret.push('仓储调度入库审核')
          break
        case 59:
          ret.push('仓储损耗审核')
          break
        case 60:
          ret.push('仓储采购退货审核')
          break
        case 61:
          ret.push('仓储履约退货审核')
          break
        case 66:
          ret.push('生产开始审核')
          break
        case 67:
          ret.push('生产完成审核')
          break
        case 68:
          ret.push('生产损耗审核')
          break
        case 71:
          ret.push('履约发货审核')
          break
        case 72:
          ret.push('履约退货审核')
          break
        case 76:
          ret.push('云仓采购入库审核')
          break
        case 77:
          ret.push('云仓采购退货审核')
          break
        case 78:
          ret.push('云仓损耗审核')
          break
        case 79:
          ret.push('云仓履约退货审核')
          break
        case 80:
          ret.push('云仓履约入库审核')
          break
        case 90:
          ret.push('销售售后审核')
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