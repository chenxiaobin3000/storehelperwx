import {
  relogin
} from '../../util/util'
Page({
  data: {

  },
  onLoad() {
    wx.hideHomeButton()
  },
  onShow() {
    this.getTabBar().init()
  },
  relogin() {
    relogin()
  }
})