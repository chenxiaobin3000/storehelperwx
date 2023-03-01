import OrderData from '../../util/order'
import {
  myToast,
  formatTime,
  relogin
} from '../../util/util'
import {
  shipped,
  areturn
} from '../../service/agreement'
import {
  cpurchase,
  closs,
  creturn
} from '../../service/cloud'
import {
  process,
  complete,
  ploss
} from '../../service/product'
import {
  purchase,
  preturn
} from '../../service/purchase'
import {
  getGroupAllStorage,
  spurchase,
  dispatch,
  purchase2,
  loss,
  sreturn
} from '../../service/storage'
import {
  addAttach
} from '../../service/upload'
Page({
  data: {
    orderType: 0,
    orderVisible: false,
    orderValue: [],
    orders: [],
    orderShow: [],
    sid: 0,
    storageVisible: false,
    storageValue: [],
    storages: [],
    dateVisible: false,
    date: new Date().getTime(),
    dateText: '',
    commoditys: [],
    halfgoods: [],
    originals: [],
    standards: [],
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
    getGroupAllStorage(this, {
      id: app.globalData.user.id
    }, data => {
      const list = []
      data.list.forEach(v => {
        list.push({
          label: v.name,
          value: v
        })
      })
      this.setData({
        storages: list,
        dateText: formatTime(this.date, 'YYYY-MM-DD HH:mm:ss')
      })
    })
    this.filterOrder(app.globalData.perms)
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
      }
      app.globalData.temp = {}
      this.checkSubmitActive()
    }
  },
  reset() {
    this.setData({
      orderType: 0,
      orderVisible: false,
      orderValue: [],
      sid: 0,
      storageVisible: false,
      storageValue: [],
      dateVisible: false,
      date: new Date().getTime(),
      dateText: '',
      commoditys: [],
      halfgoods: [],
      originals: [],
      standards: [],
      uploadFiles: [],
      collapseValues: [],
      submitActive: false,
    })
  },
  filterOrder(perms) {
    const orders = []
    perms.forEach(p => {
      OrderData.forEach(v => {
        if (p == v.apply) {
          orders.push(v)
        }
      })
    })
    this.setData({
      orders
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
      that.originals.length > 0 || that.standards.length > 0) {
      check = true
    }
    if (check && that.orderValue.length > 0 && that.storageValue.length > 0 && that.dateText.length > 0) {
      this.setData({
        submitActive: true
      })
    } else {
      this.setData({
        submitActive: false
      })
    }
  },
  // 订单类型选择
  onOrderPicker() {
    this.setData({
      orderVisible: true
    })
  },
  onOrderChange(event) {
    let value = event.detail.value
    if (value.length > 0) {
      value = value[0]
    } else {
      value = 0
    }
    let orderShow = []
    switch (value) {
      case 1: // 采购进货
      case 2: // 采购退货
      case 3: // 仓储采购
      case 7: // 仓储退货
        orderShow = [1, 0, 1, 0]
        break
      case 4: // 调度出库
      case 5: // 调度入库
      case 6: // 仓储损耗
        orderShow = [1, 1, 1, 1]
        break
      case 8: // 生产开始
        orderShow = [0, 0, 1, 1]
        break
      case 9: // 生产完成
      case 10: // 生产损耗
        orderShow = [0, 1, 1, 1]
        break
      case 11: // 履约入库
      case 12: // 履约出库
      case 13: // 云仓入库
      case 14: // 云仓退货
      case 16: // 云仓损耗
        orderShow = [1, 1, 0, 0]
        break
      default:
        break
    }
    this.setData({
      orderVisible: false,
      orderType: value,
      orderValue: event.detail.label,
      orderShow: orderShow
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
    let value = event.detail.value
    if (value.length > 0) {
      value = value[0].id
    } else {
      value = 0
    }
    this.setData({
      storageVisible: false,
      sid: value,
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
    this.jumpAdd(1, id, price, num)
  },
  addCommodity() {
    this.jumpAdd(1, 0, 0, 0)
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
    this.jumpAdd(2, id, price, num)
  },
  addHalfgood() {
    this.jumpAdd(2, 0, 0, 0)
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
    this.jumpAdd(3, id, price, num)
  },
  addOriginal() {
    this.jumpAdd(3, 0, 0, 0)
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
    this.jumpAdd(4, id, price, num)
  },
  addStandard() {
    this.jumpAdd(4, 0, 0, 0)
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
  jumpAdd(type, id, price, num) {
    const that = this.data
    switch (that.orderType) {
      case 1: // 采购进货
      case 2: // 采购退货
      case 7: // 仓储退货
      case 14: // 云仓退货
        wx.navigateTo({
          url: `/pages/add/editp/index?type=${type}&id=${id}&price=${price}&num=${num}`
        })
        break;
      case 3: // 仓储采购
      case 4: // 调度出库
      case 5: // 调度入库
      case 6: // 仓储损耗
      case 8: // 生产开始
      case 9: // 生产完成
      case 10: // 生产损耗
      case 11: // 履约发货
      case 12: // 履约退货
      case 13: // 云仓入库
      case 16: // 云仓损耗
        wx.navigateTo({
          url: `/pages/add/edit/index?type=${type}&id=${id}&num=${num}`
        })
        break;
      default:
        break;
    }
  },
  // 上传
  handleSuccess(event) {
    const that = this.data
    if (that.orderType === 0) {
      myToast(this, '请先选择订单类型')
      return;
    }
    const {
      files
    } = event.detail
    const file = files[files.length - 1]
    file.status = 'loading'
    this.setData({
      uploadFiles: files
    })

    // 启动上传
    const id = getApp().globalData.user.id
    addAttach(file.url, {
      id: id,
      type: that.orderType,
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
      sid: that.sid,
      date: that.dateText,
      types: [],
      commoditys: [],
      values: [],
      prices: [],
      attrs: []
    }
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
    that.uploadFiles.forEach(v => {
      data.attrs.push(v.id)
    })

    switch (that.orderType) {
      case 1: // 采购进货
        purchase(this, data, this.handleSubmit)
        break
      case 2: // 采购退货
        preturn(this, data, this.handleSubmit)
        break
      case 3: // 仓储采购
        spurchase(this, data, this.handleSubmit)
        break
      case 4: // 调度出库
        dispatch(this, data, this.handleSubmit)
        break
      case 5: // 调度入库
        purchase2(this, data, this.handleSubmit)
        break
      case 6: // 仓储损耗
        sloss(this, data, this.handleSubmit)
        break
      case 7: // 仓储退货
        sreturn(this, data, this.handleSubmit)
        break
      case 8: // 生产开始
        process(this, data, this.handleSubmit)
        break
      case 9: // 生产完成
        complete(this, data, this.handleSubmit)
        break
      case 10: // 生产损耗
        ploss(this, data, this.handleSubmit)
        break
      case 11: // 履约发货
        shipped(this, data, this.handleSubmit)
        break
      case 12: // 履约退货
        areturn(this, data, this.handleSubmit)
        break
      case 13: // 云仓入库
        cpurchase(this, data, this.handleSubmit)
        break
      case 14: // 云仓退货
        creturn(this, data, this.handleSubmit)
        break
      case 16: // 云仓损耗
        closs(this, data, this.handleSubmit)
        break
    }
  },
  handleSubmit() {
    this.reset()
    wx.switchTab({
      url: '/pages/me/index'
    })
  },
  relogin() {
    relogin()
  }
})