import {
  relogin
} from '../../util/util'
import {
  logout
} from '../../service/account'
Page({
  data: {},
  onLoad() {
    wx.hideHomeButton()
  },
  logout() {
    const app = getApp()
    logout(this, {
      id: app.globalData.user.id
    }, () => {
      wx.setStorageSync('userId', 0)
      wx.setStorageSync('token', '')
      wx.redirectTo({
        url: '/pages/login/index'
      })
    })
  },
  relogin() {
    relogin()
  }
})