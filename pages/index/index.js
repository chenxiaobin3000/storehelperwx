import {
  relogin
} from '../../util/util'
import {
  getUser
} from '../../service/user'
Page({
  data: {
    logoSrc: '/image/logo.png'
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    const userId = wx.getStorageSync('userId')
    const token = wx.getStorageSync('token')
    if (userId > 0 && token && token.length > 0) {
      // 验证会话，获取权限
      app.globalData.token = token
      getUser(this, {
        id: userId
      }, data => {
        app.globalData.user = data.user
        app.globalData.group = data.group
        app.globalData.perms = data.permMps
        if (data.permMps.length === 0) {
          // 没有权限就去面壁
          wx.redirectTo({
            url: '/pages/forbid/index'
          })
        } else {
          // 根据权限跳转
          data.permMps.forEach(v => {
            if (v === 10) {
              wx.switchTab({
                url: '/pages/report/index'
              })
            }
          })
          wx.switchTab({
            url: '/pages/add/index'
          })
        }
      })
    } else {
      // 没有账号信息就去登陆
      wx.redirectTo({
        url: '/pages/login/index'
      })
    }
  },
  relogin() {
    relogin()
  }
})