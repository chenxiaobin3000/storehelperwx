import {
  pickImage
} from '../../util/util'
import {
  getUser
} from '../../service/user'
Page({
  data: {
    show: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确认'
    }]
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    const userId = wx.getStorageSync('userId')
    const token = wx.getStorageSync('token')
    if (userId > 0 && token && token.length > 0) {
      // 验证会话，获取权限
      app.globalData.token = token
      getUser({
        id: userId
      }, data => {
        app.globalData.user = data.user
        app.globalData.group = data.group
        app.globalData.perms = data.permMps

        if (data.permMps.length === 0) {
          // 没有权限就去面壁
          wx.redirectTo({
            url: '../forbid/forbid'
          })
        }
      })
    } else {
      // 没有账号信息就去登陆
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  chooseImage() {
    pickImage(path => {
      console.log(path)
    })
  }
})