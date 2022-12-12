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
    const userId = wx.getStorageSync('userId')
    const token = wx.getStorageSync('token')
    if (userId > 0 && token && token.length > 0) {
      var app = getApp()
      app.globalData.userId = userId
      app.globalData.token = token

      // 验证会话，获取权限
      console.log(token)
    } else {
      // 没有账号信息就去登陆
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})