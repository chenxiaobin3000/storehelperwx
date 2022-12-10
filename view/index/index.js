const util = require('../../util/util.js')

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }/*,
  data: {
    logs: []
   },
  methods: {
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
  }*/
})
