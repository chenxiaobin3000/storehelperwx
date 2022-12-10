Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [{
      "pagePath": "/view/index/index",
      "iconPath": "../image/icon_tabbar.png",
      "selectedIconPath": "../image/icon_tabbar.png",
      "text": "主页"
    },{
      "pagePath": "/view/do/do",
      "iconPath": "../image/icon_tabbar.png",
      "selectedIconPath": "../image/icon_tabbar.png",
      "text": "功能"
    },{
      "pagePath": "/view/me/me",
      "iconPath": "../image/icon_tabbar.png",
      "selectedIconPath": "../image/icon_tabbar.png",
      "text": "我"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})