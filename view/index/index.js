import {
  getGroupStorage
} from '../../service/storage'
import {
  getUser
} from '../../service/user'
import {
  addAttach
} from '../../service/upload'
Page({
  data: {
    orderVisible: false,
    orderValue: [],
    orders: [{
      label: '进货入库订单',
      value: 1
    }, {
      label: '进货退货订单',
      value: 2
    }, {
      label: '生产出库订单',
      value: 4
    }, {
      label: '生产完成订单',
      value: 3
    }, {
      label: '履约出货订单',
      value: 6
    }, {
      label: '履约退货订单',
      value: 5
    }],
    storageVisible: false,
    storageValue: [],
    storages: [],
    batch: '',
    dateVisible: false,
    date: new Date().getTime(),
    dateText: '',
    commoditys: [],
    halfgoods: [],
    originals: [],
    standards: [],
    originFiles: [],
    uploadFiles: [],
    collapseValues: [],
    submitActive: false,
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    maxUpload: 3,
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
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })

      // 添加商品
      const app = getApp()
      const temp = app.globalData.temp
      if (temp && temp.action === 'commodity') {
        let find = false
        this.data.commoditys.forEach(v => {
          if (v.id === temp.commodity.id) {
            v.price = temp.price
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.commoditys.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            num: temp.num
          })
        }
        this.setData({
          commoditys: this.data.commoditys
        })
        app.globalData.temp = {}
      }
    }
  },
  // 订单类型选择
  onOrderPicker() {
    this.setData({
      orderVisible: true
    })
  },
  onOrderChange(event) {
    this.setData({
      orderVisible: false,
      orderValue: event.detail.label,
    })
  },
  onOrderCancel() {
    this.setData({
      orderVisible: false,
    })
  },
  // 仓库选择
  onStoragePicker() {
    this.setData({
      storageVisible: true
    })
  },
  onStorageChange(event) {
    this.setData({
      storageVisible: false,
      storageValue: event.detail.label,
    })
  },
  onStorageCancel() {
    this.setData({
      storageVisible: false,
    })
  },
  // 日期选择
  showDatePicker() {
    this.setData({
      dateVisible: true,
    })
  },
  hideDatePicker() {
    this.setData({
      dateVisible: false,
    })
  },
  onDateConfirm(event) {
    this.setData({
      dateText: event.detail.value,
    })
    this.hideDatePicker()
  },
  // 下拉列表
  handleCollapseChange(event) {
    this.setData({
      collapseValues: event.detail.value,
    })
  },
  setCommodity(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=1&id=${id}&price=${price}&num=${num}`,
    })
  },
  addCommodity() {
    wx.navigateTo({
      url: './edit/index?type=1&id=0'
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
  setHalfgood(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=2&id=${id}&price=${price}&num=${num}`,
    })
  },
  addHalfgood() {
    wx.navigateTo({
      url: './edit/index?type=2&id=0'
    })
  },
  delHalfgood(event) {
    const id = event.currentTarget.dataset.value.id
    let list = []
    this.data.halfgoods.forEach(v => {
      if (v.id !== id) {
        list.push(v)
      }
    })
    this.setData({
      halfgoods: list
    })
  },
  setOriginal(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=3&id=${id}&price=${price}&num=${num}`,
    })
  },
  addOriginal() {
    wx.navigateTo({
      url: './edit/index?type=3&id=0'
    })
  },
  delOriginal(event) {
    const id = event.currentTarget.dataset.value.id
    let list = []
    this.data.originals.forEach(v => {
      if (v.id !== id) {
        list.push(v)
      }
    })
    this.setData({
      originals: list
    })
  },
  setStandard(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=4&id=${id}&price=${price}&num=${num}`,
    })
  },
  addStandard() {
    wx.navigateTo({
      url: './edit/index?type=4&id=0'
    })
  },
  delStandard(event) {
    const id = event.currentTarget.dataset.value.id
    let list = []
    this.data.standards.forEach(v => {
      if (v.id !== id) {
        list.push(v)
      }
    })
    this.setData({
      standards: list
    })
  },
  // 上传
  handleSuccess(event) {
    const {
      files
    } = event.detail
    const file = files[files.length - 1]
    file.status = 'loading'
    this.setData({
      originFiles: files,
    })

    // 启动上传
    this.data.uploadFiles.push(file)
    const app = getApp()
    const {
      id
    } = app.globalData.user
    addAttach(file.url, {
      id: id,
      type: 1,
      name: id + '-' + file.name
    }, data => {
      console.log(data)
    })
  },
  handleRemove(event) {
    const {
      index
    } = event.detail
    const {
      originFiles
    } = this.data
    originFiles.splice(index, 1)
    this.setData({
      originFiles,
    })
  }
})