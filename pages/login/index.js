import md5 from '../../util/md5'
import {
  myToast,
  relogin
} from '../../util/util'
import {
  login
} from '../../service/account'
Page({
  data: {
    account: '',
    password: '',
    checkGroup: [],
    submitActive: false,
    logoSrc: '/image/login.png'
  },
  onLoad() {
    wx.hideHomeButton()
  },
  checkSubmitActive() {
    const that = this.data
    if (that.account.length > 0 && that.password.length > 0 && that.checkGroup.length > 0) {
      this.setData({
        submitActive: true
      })
    } else {
      this.setData({
        submitActive: false
      })
    }
  },
  onInputValue(event) {
    this.setData({
      [`${event.currentTarget.dataset.item}`]: event.detail.value
    })
    this.checkSubmitActive()
  },
  checkboxChange(event) {
    this.setData({
      checkGroup: event.detail.value
    })
    this.checkSubmitActive()
  },
  login() {
    const that = this.data
    if (that.checkGroup.length === 0) {
      myToast(this, '请勾选用户协议')
    } else {
      login(this, {
        account: that.account,
        password: md5(that.password)
      }, data => {
        getApp().globalData.token = data.token
        wx.setStorageSync('userId', data.id)
        wx.setStorageSync('token', data.token)
        wx.redirectTo({
          url: '/pages/index/index'
        })
      })
    }
  },
  relogin() {
    relogin()
  }
})