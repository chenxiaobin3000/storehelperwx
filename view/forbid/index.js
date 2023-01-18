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
    logout({
      id: app.globalData.user.id
    }, data => {
      wx.setStorageSync('userId', 0)
      wx.setStorageSync('token', '')
      wx.redirectTo({
        url: '../login/login'
      })
    })
  }
})