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

module.exports = {
  formatTime,
  myToast,
  relogin
}