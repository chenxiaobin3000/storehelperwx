import TabMenu from './data'
Component({
  data: {
    active: 0,
    list: TabMenu
  },
  methods: {
    onChange(event) {
      this.setData({
        active: event.detail.value
      })
      const list = this.data.list
      wx.switchTab({
        url: list[event.detail.value].url.startsWith('/') ?
          list[event.detail.value].url : `/${list[event.detail.value].url}`
      })
    },
    init() {
      const list = this.data.list
      if (list.length > 3) {
        let root = false
        getApp().globalData.perms.forEach(v => {
          if (v === 10) {
            root = true
          }
        })
        if (root) {
          list.splice(1, 1)
        } else {
          list.splice(0, 1)
        }
        this.setData({
          list
        })
      }

      const page = getCurrentPages().pop()
      const route = page ? page.route.split('?')[0] : ''
      const active = list.findIndex(
        (item) => (item.url.startsWith('/') ? item.url.substr(1) : item.url) === `${route}`
      )
      this.setData({
        active
      })
    }
  }
})