import OrderData from './data'
Page({
  data: {
    tabList: OrderData,
    tabIndex: 0,
    orderList: [],
    orderListLoadStatus: 0
  },
  onLoad() {
    wx.hideHomeButton()
  },
  onShow() {
    this.getTabBar().init()
  },
  onPullDownRefresh() {
    console.log('refresh')
  },
  search(event) {
    console.log('search' + event)
  },
  handleTabChange(e) {
    this.tabIndex = e.detail;
    console.log(this.tabIndex)
  },
  onReTry() {
    console.log('retry')
  }
})