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
  },
  data: {
    show: false,
    buttons: [
      { text: '取消' },
      { text: '确认' }
    ]
  },
  methods: {
    login() {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  }
})
