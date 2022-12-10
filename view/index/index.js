// logs.js
const util = require('../../util/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },
  bindViewTap(tap) {
    var id = tap.currentTarget.id
    console.log(id)
  }
})
