// 首页 - 登陆
const app = getApp()

Page({
  data: {
    introduction: '请点击授权微信账号信息\n\n仅用来绑定集数助手账号',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // 如需尝试获取用户信息可改为false
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },
  // 事件处理函数
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '集数助手获取微信信息仅用于关联集数账号',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})
