Page({
  data: {

  },
  onLoad() {
    wx.hideHomeButton()
  },
  onShow() {
    this.getTabBar().init()
  },
})