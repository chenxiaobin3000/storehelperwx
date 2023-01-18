import {
  pickImage
} from '../../util/util'
import {
  getGroupStorage
} from '../../service/storage'
import {
  getUser
} from '../../service/user'
Page({
  data: {
    storageVisible: false,
    storageValue: [],
    storages: [],
    currentStorage: 0,
    batch: '',
    commoditys: [],
    commodityNum: 0,
    attachments: [],
    attachmentNum: 0,
    submitActive: false,
    rightWidth: 60
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
    const userId = wx.getStorageSync('userId')
    const token = wx.getStorageSync('token')
    if (userId > 0 && token && token.length > 0) {
      // 验证会话，获取权限
      app.globalData.token = token
      getUser({
        id: userId
      }, data => {
        app.globalData.user = data.user
        app.globalData.group = data.group
        app.globalData.perms = data.permMps

        if (data.permMps.length === 0) {
          // 没有权限就去面壁
          wx.redirectTo({
            url: '../forbid/index'
          })
        } else {
          getGroupStorage({
            id: app.globalData.user.id,
            page: 1,
            limit: 100,
            search: null
          }, data => {
            const list = []
            data.list.forEach(v => {
              list.push({
                label: v.name,
                value: v
              })
            })
            this.setData({
              storages: list
            })
          })
        }
      })
    } else {
      // 没有账号信息就去登陆
      wx.redirectTo({
        url: '../login/index'
      })
    }
  },
  onUnload() {
    console.log('unload')
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onStoragePicker() {
    this.setData({
      storageVisible: true
    })
  },
  onPickerChange(event) {
    this.setData({
      storageVisible: false,
      storageValue: event.detail.label,
      currentStorage: event.detail.value.id
    })
  },
  onPickerCancel() {
    this.setData({
      storageVisible: false,
    })
  },
  addCommodity() {
    wx.navigateTo({
      url: `/pages/usercenter/address/edit/index?id=${e.detail.id}`,
    })
  },
  delCommodity(event) {
    const id = event.currentTarget.dataset.value.id
    let list = []
    this.data.commoditys.forEach(v => {
      if (v.id !== id) {
        list.push(v)
      }
    })
    this.setData({
      commoditys: list
    })
  },
  addAttachment() {
    this.data.attachments.push({
      id: 1,
      name: '123',
      num: 10
    })
    this.setData({
      attachments: this.data.attachments
    })
  },
  delAttachment(event) {
    const id = event.currentTarget.dataset.value.id
    let list = []
    this.data.attachments.forEach(v => {
      if (v.id !== id) {
        list.push(v)
      }
    })
    this.setData({
      attachments: list
    })
  },
  chooseImage() {
    pickImage(path => {
      console.log(path)
    })
  }
})