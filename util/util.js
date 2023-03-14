import dayjs from 'dayjs'
import Message from 'tdesign-miniprogram/message/index'

const formatTime = (date, template) => dayjs(date).format(template)

function myToast(that, msg) {
  Message.info({
    context: that,
    offset: ['20rpx', '32rpx'],
    duration: 2000,
    content: msg
  })
}

function relogin() {
  const app = getApp()
  app.globalData.token = null
  app.globalData.user = {}
  app.globalData.group = {}
  app.globalData.perms = []
  app.globalData.temp = {}
  wx.setStorageSync('userId', 0)
  wx.setStorageSync('token', '')
  wx.redirectTo({
    url: '/pages/login/index'
  })
}

function getOrderType(otype) {
  switch (otype) {
    case 1:
      return '采购仓储进货'
    case 2:
      return '采购仓储退货'
    case 3:
      return '采购云仓进货'
    case 4:
      return '采购云仓退货'
    case 10:
      return '仓储采购入库'
    case 11:
      return '仓储调度出库'
    case 12:
      return '仓储调度入库'
    case 13:
      return '仓储损耗'
    case 14:
      return '仓储采购退货'
    case 15:
      return '仓储履约退货'
    case 20:
      return '生产开始'
    case 21:
      return '生产完成'
    case 22:
      return '生产损耗'
    case 30:
      return '履约发货'
    case 31:
      return '履约退货'
    case 40:
      return '云仓采购入库'
    case 41:
      return '云仓采购退货'
    case 42:
      return '云仓损耗'
    case 43:
      return '云仓履约退货'
    case 44:
      return '云仓履约入库'
    case 50:
      return '销售售后'
    default:
      return ''
  }
}

function getOrderShow(otype) {
  switch (otype) {
    case 1: // 采购仓储进货
    case 3: // 采购云仓进货
      return [1, 0, 1, 0, 1, '']
    case 2: // 采购仓储退货
    case 4: // 采购云仓退货
    case 10: // 仓储采购入库
    case 14: // 仓储采购退货
    case 40: // 云仓采购入库
    case 41: // 云仓采购退货
      return [1, 0, 1, 0, 0, '采购单']
    case 11: // 仓储调度出库
    case 13: // 仓储损耗
      return [1, 1, 1, 1, 1, '']
    case 12: // 仓储调度入库
      return [1, 1, 1, 1, 1, '调度单']
    case 20: // 生产开始
      return [0, 0, 1, 1, 1, '']
    case 21: // 生产完成
    case 22: // 生产损耗
      return [0, 1, 1, 1, 1, '']
    case 30: // 履约发货
    case 42: // 云仓损耗
    case 50: // 销售售后
      return [1, 1, 0, 0, 1, '']
    case 15: // 仓储履约退货
    case 31: // 履约退货
    case 43: // 云仓履约退货
    case 44: // 云仓履约入库
      return [1, 1, 0, 0, 1, '发货单']
    default:
      break
  }
}

function handleOrderCommodity(otype, pfunc, rfunc, nfunc) {
  switch (otype) {
    case 1: // 采购仓储进货
    case 3: // 采购云仓进货
      pfunc()
      break
    case 2: // 采购仓储退货
    case 4: // 采购云仓退货
      rfunc()
      break
    case 10: // 仓储采购入库
    case 11: // 仓储调度出库
    case 12: // 仓储调度入库
    case 13: // 仓储损耗
    case 14: // 仓储采购退货
    case 15: // 仓储履约退货
    case 20: // 生产开始
    case 21: // 生产完成
    case 22: // 生产损耗
    case 30: // 履约发货
    case 31: // 履约退货
    case 40: // 云仓采购入库
    case 41: // 云仓采购退货
    case 42: // 云仓损耗
    case 43: // 云仓履约退货
    case 44: // 云仓履约入库
    case 50: // 销售售后
      nfunc()
      break
    default:
      break
  }
}

function handleOrderPrice(otype, pfunc, nfunc) {
  switch (otype) {
    case 1: // 采购仓储进货
    case 2: // 采购仓储退货
    case 3: // 采购云仓进货
    case 4: // 采购云仓退货
    case 11: // 仓储调度出库
    case 14: // 仓储采购退货
    case 15: // 仓储履约退货
    case 30: // 履约发货
    case 31: // 履约退货
    case 41: // 云仓采购退货
    case 43: // 云仓履约退货
      pfunc()
      break
    case 10: // 仓储采购入库
    case 12: // 仓储调度入库
    case 13: // 仓储损耗
    case 20: // 生产开始
    case 21: // 生产完成
    case 22: // 生产损耗
    case 40: // 云仓采购入库
    case 42: // 云仓损耗
    case 44: // 云仓履约入库
    case 50: // 销售售后
      nfunc()
      break
    default:
      break
  }
}

module.exports = {
  formatTime,
  myToast,
  relogin,
  getOrderType,
  getOrderShow,
  handleOrderCommodity,
  handleOrderPrice
}