import OrderData from '../../util/order'
import {
  myToast,
  formatTime
} from '../../util/util'
import {
  shipped,
  returnc
} from '../../service/agreement'
import {
  process,
  complete
} from '../../service/product'
import {
  getGroupStorage,
  purchase
} from '../../service/storage'
import {
  addAttach
} from '../../service/upload'
Page({
  data: {
    orderVisible: false,
    orderValue: [],
    orders: OrderData,
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
    destroys: [],
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
  onShow() {
    this.getTabBar().init()
    const app = getApp()
    const temp = app.globalData.temp
    if (temp) {
      if (temp.action === 'commodity') {
        // 添加商品
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
      } else if (temp.action === 'halfgood') {
        // 添加半成品
        let find = false
        this.data.halfgoods.forEach(v => {
          if (v.id === temp.commodity.id) {
            v.price = temp.price
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.halfgoods.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            num: temp.num
          })
        }
        this.setData({
          halfgoods: this.data.halfgoods
        })
      } else if (temp.action === 'original') {
        // 添加原料
        let find = false
        this.data.originals.forEach(v => {
          if (v.id === temp.commodity.id) {
            v.price = temp.price
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.originals.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            num: temp.num
          })
        }
        this.setData({
          originals: this.data.originals
        })
      } else if (temp.action === 'standard') {
        // 添加标品
        let find = false
        this.data.standards.forEach(v => {
          if (v.id === temp.commodity.id) {
            v.price = temp.price
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.standards.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            num: temp.num
          })
        }
        this.setData({
          standards: this.data.standards
        })
      } else if (temp.action === 'destroy') {
        // 添加废料
        let find = false
        this.data.destroys.forEach(v => {
          if (v.id === temp.commodity.id) {
            v.price = temp.price
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.destroys.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            num: temp.num
          })
        }
        this.setData({
          destroys: this.data.destroys
        })
      }
      app.globalData.temp = {}
      this.checkSubmitActive()
    }
  },
  reset() {
    this.setData({
      orderVisible: false,
      orderValue: [],
      storageVisible: false,
      storageValue: [],
      batch: '',
      dateVisible: false,
      date: new Date().getTime(),
      dateText: '',
      commoditys: [],
      halfgoods: [],
      originals: [],
      standards: [],
      destroys: [],
      uploadFiles: [],
      collapseValues: [],
      submitActive: false,
    })
  },
  checkSubmitActive() {
    const that = this.data
    let check = false
    that.uploadFiles.forEach(v => {
      if (v.status && v.status.length > 0) {
        check = true
      }
    })
    if (check) {
      this.setData({
        submitActive: false
      })
      return
    }

    if (that.commoditys.length > 0 || that.halfgoods.length > 0 ||
      that.originals.length > 0 || that.standards.length > 0 ||
      that.destroys.length > 0) {
      check = true
    }
    if (check && that.orderValue.length > 0 && that.storageValue.length > 0 &&
      that.batch.length > 0 && that.dateText.length > 0) {
      this.setData({
        submitActive: true
      })
    } else {
      this.setData({
        submitActive: false
      })
    }
  },
  onInputValue(event) {
    this.setData({
      [`${event.currentTarget.dataset.item}`]: event.detail.value
    })
    this.checkSubmitActive()
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
      orderValue: event.detail.label
    })
    this.checkSubmitActive()
  },
  onOrderCancel() {
    this.setData({
      orderVisible: false
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
      storageValue: event.detail.label
    })
    this.checkSubmitActive()
  },
  onStorageCancel() {
    this.setData({
      storageVisible: false
    })
  },
  // 日期选择
  showDatePicker() {
    this.setData({
      dateVisible: true
    })
  },
  hideDatePicker() {
    this.setData({
      dateVisible: false
    })
  },
  onDateConfirm(event) {
    const date = formatTime(new Date(), ' HH:mm:ss')
    this.setData({
      dateVisible: false,
      dateText: event.detail.value + date
    })
    this.checkSubmitActive()
  },
  // 下拉列表
  handleCollapseChange(event) {
    this.setData({
      collapseValues: event.detail.value
    })
  },
  setCommodity(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=1&id=${id}&price=${price}&num=${num}`
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
    this.checkSubmitActive()
  },
  setHalfgood(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=2&id=${id}&price=${price}&num=${num}`
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
    this.checkSubmitActive()
  },
  setOriginal(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=3&id=${id}&price=${price}&num=${num}`
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
    this.checkSubmitActive()
  },
  setStandard(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=4&id=${id}&price=${price}&num=${num}`
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
    this.checkSubmitActive()
  },
  setDestroy(event) {
    const {
      id,
      price,
      num
    } = event.currentTarget.dataset.value
    wx.navigateTo({
      url: `./edit/index?type=5&id=${id}&price=${price}&num=${num}`
    })
  },
  addDestroy() {
    wx.navigateTo({
      url: './edit/index?type=5&id=0'
    })
  },
  delDestroy(event) {
    const id = event.currentTarget.dataset.value.id
    let list = []
    this.data.destroys.forEach(v => {
      if (v.id !== id) {
        list.push(v)
      }
    })
    this.setData({
      destroys: list
    })
    this.checkSubmitActive()
  },
  // 上传
  handleSuccess(event) {
    const {
      files
    } = event.detail
    const file = files[files.length - 1]
    file.status = 'loading'
    this.setData({
      uploadFiles: files
    })

    // 启动上传
    const app = getApp()
    const that = this.data
    const {
      id
    } = app.globalData.user
    addAttach(file.url, {
      id: id,
      type: 1,
      name: id + '-' + file.name
    }, data => {
      if (that.uploadFiles && that.uploadFiles.length > 0) {
        that.uploadFiles.forEach(v => {
          if (data.data.name === (id + '-' + v.name)) {
            v.id = data.data.id
            v.status = ''
            this.setData({
              uploadFiles: that.uploadFiles
            })
            this.checkSubmitActive()
          }
        })
      }
    })
  },
  handleRemove(event) {
    const {
      index
    } = event.detail
    const {
      uploadFiles
    } = this.data
    uploadFiles.splice(index, 1)
    this.setData({
      uploadFiles: uploadFiles
    })
    this.checkSubmitActive()
  },
  clickSubmit() {
    const app = getApp()
    const that = this.data
    let data = {
      id: app.globalData.user.id,
      gid: app.globalData.group.id,
      sid: 0,
      batch: that.batch,
      date: that.dateText,
      types: [],
      commoditys: [],
      values: [],
      prices: [],
      attrs: []
    }
    that.storages.forEach(v => {
      if (v.value.name == that.storageValue) {
        data.sid = v.value.id
      }
    })
    that.commoditys.forEach(v => {
      data.types.push(1)
      data.commoditys.push(v.id)
      data.values.push(v.num)
      data.prices.push(v.price)
    })
    that.halfgoods.forEach(v => {
      data.types.push(2)
      data.commoditys.push(v.id)
      data.values.push(v.num)
      data.prices.push(v.price)
    })
    that.originals.forEach(v => {
      data.types.push(3)
      data.commoditys.push(v.id)
      data.values.push(v.num)
      data.prices.push(v.price)
    })
    that.standards.forEach(v => {
      data.types.push(4)
      data.commoditys.push(v.id)
      data.values.push(v.num)
      data.prices.push(v.price)
    })
    that.destroys.forEach(v => {
      data.types.push(5)
      data.commoditys.push(v.id)
      data.values.push(v.num)
      data.prices.push(v.price)
    })
    that.uploadFiles.forEach(v => {
      data.attrs.push(v.id)
    })

    if (that.orderValue[0] === '进货入库订单') {
      if (that.commoditys.length > 0) {
        myToast(this, '进货不能包含商品')
        return
      }
      if (that.halfgoods.length > 0) {
        myToast(this, '进货不能包含半成品')
        return
      }
      if (that.destroys.length > 0) {
        myToast(this, '进货不能包含废料')
        return
      }
      purchase(data, () => {
        this.reset()
        wx.switchTab({
          url: '/view/me/index'
        })
      })
    } else if (that.orderValue[0] === '进货退货订单') {
      myToast(this, '暂不支持退货订单')
    } else if (that.orderValue[0] === '生产出库订单') {
      if (that.commoditys.length > 0) {
        myToast(this, '进货不能包含商品')
        return
      }
      if (that.standards.length > 0) {
        myToast(this, '进货不能包含标品')
        return
      }
      if (that.destroys.length > 0) {
        myToast(this, '进货不能包含废料')
        return
      }
      process(data, () => {
        this.reset()
        wx.switchTab({
          url: '/view/me/index'
        })
      })
    } else if (that.orderValue[0] === '生产完成订单') {
      if (that.standards.length > 0) {
        myToast(this, '进货不能包含标品')
        return
      }
      complete(data, () => {
        this.reset()
        wx.switchTab({
          url: '/view/me/index'
        })
      })
    } else if (that.orderValue[0] === '履约出货订单') {
      if (that.original.length > 0) {
        myToast(this, '进货不能包含原料')
        return
      }
      if (that.halfgoods.length > 0) {
        myToast(this, '进货不能包含半成品')
        return
      }
      if (that.destroys.length > 0) {
        myToast(this, '进货不能包含废料')
        return
      }
      shipped(data, () => {
        this.reset()
        wx.switchTab({
          url: '/view/me/index'
        })
      })
    } else if (that.orderValue[0] === '履约退货订单') {
      if (that.original.length > 0) {
        myToast(this, '进货不能包含原料')
        return
      }
      if (that.halfgoods.length > 0) {
        myToast(this, '进货不能包含半成品')
        return
      }
      if (that.destroys.length > 0) {
        myToast(this, '进货不能包含废料')
        return
      }
      returnc(data, () => {
        this.reset()
        wx.switchTab({
          url: '/view/me/index'
        })
      })
    }
  }
})