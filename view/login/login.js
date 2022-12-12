import { post } from '../../util/util'
import md5 from '../../util/md5'
import { login } from '../../api/account'
Page({
  data: {
    userInfo: null,
    hasUserInfo: true, // 设为true，暂时不关联微信账号
    canGetProfile: false,
    account: null,
    password: null,
    check: null,
  },
  onLoad() {
    wx.hideHomeButton()
    if (wx.getUserProfile) {
      this.setData({
        canGetProfile: true
      })
    }
  },
  bindAccountInput: function (e) {
    this.account = e.detail.value
  },
  bindPasswordInput: function (e) {
    this.password = e.detail.value
  },
  checkboxChange: function (e) {
    if (e.detail.value > 0) {
      this.check = true
    } else {
      this.check = false
    }
  },
  login: function () {
    console.log(md5('123456'))
    if (!this.check) {
      wx.showToast({
        title: '请勾选用户协议',
        icon: 'error',
        duration: 1000
      })
    } else {
      post(login, '', {
        account: this.account,
        password: md5(this.password)
      }, data => {
        var app = getApp()
        app.globalData.userId = data.id
        app.globalData.token = data.token
        wx.setStorageSync('userId', data.id)
        wx.setStorageSync('token', data.token)
        wx.switchTab({
          url: '/view/index/index'
        })
      })
    }
  },
  getUserProfile() {
    // 新接口
    wx.getUserProfile({
      desc: '集数助手仅在自动登陆时使用',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 旧接口
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})