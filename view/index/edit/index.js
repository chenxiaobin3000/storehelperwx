import {
  getGroupStorage
} from '../../../service/storage'
Page({
  data: {
    storageVisible: false,
    storageValue: [],
    storages: [],
    currentStorage: 0,
    batch: '',
    submitActive: false,
    rightWidth: 60
  },
  onLoad() {
    wx.hideHomeButton()
    const app = getApp()
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
  }
})