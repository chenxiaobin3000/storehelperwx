import OrderData from '../../util/order'
import {
  myToast,
  formatTime,
  relogin,
  getOrderShow,
  handleOrderCommodity
} from '../../util/util'
import {
  shipped,
  areturn
} from '../../service/agreement'
import {
  getGroupAllCloud,
  cpurchase,
  cagreement,
  closs,
  creturn,
  cback
} from '../../service/cloud'
import {
  process,
  complete,
  ploss
} from '../../service/product'
import {
  purchase,
  preturn,
  purchase2,
  preturn2
} from '../../service/purchase'
import {
  getGroupAllStorage,
  spurchase,
  dispatch,
  spurchase2,
  sagreement,
  sloss,
  sreturn
} from '../../service/storage'
import {
  mreturn
} from '../../service/sale'
import {
  addAttach
} from '../../service/upload'
Page({
  data: {
    orderType: 0,
    orderVisible: false,
    orderValue: '',
    orders: [],
    orderShow: [],
    dateVisible: false,
    date: new Date().getTime(),
    dateText: '',
    sid: 0, // 仓库id
    storageVisible: false,
    storageValue: '',
    storages: [],
    clouds: [],
    pid: 0, // 进货单id
    purchaseValue: '',
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
      height: 160
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
        storages: list
      })
    })
    getGroupAllCloud(this, {
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
        clouds: list
      })
    })
    this.filterOrder(app.globalData.perms)
  },
  onShow() {
    this.getTabBar().init()
    this.setData({
      dateText: formatTime(this.date, 'YYYY-MM-DD HH:mm:ss')
    })
    const app = getApp()
    const temp = app.globalData.temp
    if (temp) {
      if (temp.action === 'commodity') {
        // 添加商品
        let find = false
        this.data.commoditys.forEach(v => {
          if (v.id === temp.commodity.id) {
            v.price = temp.price
            v.weight = temp.weight
            v.norm = temp.norm
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.commoditys.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            weight: temp.weight,
            norm: temp.norm,
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
            v.weight = temp.weight
            v.norm = temp.norm
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.halfgoods.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            weight: temp.weight,
            norm: temp.norm,
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
            v.weight = temp.weight
            v.norm = temp.norm
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.originals.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            weight: temp.weight,
            norm: temp.norm,
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
            v.weight = temp.weight
            v.norm = temp.norm
            v.num = temp.num
            find = true
          }
        })
        if (!find) {
          this.data.standards.push({
            id: temp.commodity.id,
            name: temp.commodity.name,
            price: temp.price,
            weight: temp.weight,
            norm: temp.norm,
            num: temp.num
          })
        }
        this.setData({
          standards: this.data.standards
        })
      } else if (temp.action === 'purchase') {
        // 进货单
        this.setData({
          pid: temp.id,
          purchaseValue: temp.value,
          originals: temp.originals,
          standards: temp.standards
        })
      } else if (temp.action === 'dispatch') {
        // 调度单
        this.setData({
          pid: temp.id,
          purchaseValue: temp.value,
          commoditys: temp.commoditys,
          halfgoods: temp.halfgoods,
          originals: temp.originals,
          standards: temp.standards
        })
      } else if (temp.action === 'agreement') {
        // 进货单
        this.setData({
          pid: temp.id,
          purchaseValue: temp.value,
          commoditys: temp.commoditys,
          standards: temp.standards
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
      orderValue: '',
      orderShow: [],
      dateVisible: false,
      date: new Date().getTime(),
      dateText: '',
      sid: 0, // 仓库id
      storageVisible: false,
      storageValue: '',
      pid: 0,
      purchaseValue: '',
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
    OrderData.forEach(v => {
      perms.forEach(p => {
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
      if (that.orderShow[4] === 1 && that.orderShow[5].length > 0) {
        if (that.storageValue.length > 0 && that.purchaseValue.length > 0) {
          check = true
        }
      } else {
        if (that.orderShow[4] === 1) {
          if (that.storageValue.length > 0) {
            check = true
          }
        }
        if (that.orderShow[5].length > 0) {
          if (that.purchaseValue.length > 0) {
            check = true
          }
        }
      }
    }

    if (check && that.orderValue.length > 0 && that.dateText.length > 0) {
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
    let orderShow = getOrderShow(value)
    this.setData({
      orderVisible: false,
      orderType: value,
      orderValue: event.detail.label,
      orderShow: orderShow,
      sid: 0,
      storageValue: ''
    })
    this.checkSubmitActive()
  },
  onOrderCancel() {
    this.setData({
      orderVisible: false
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
  // 下拉列表
  handleCollapseChange(event) {
    this.setData({
      collapseValues: event.detail.value
    })
  },
  selectOrder() {
    const that = this.data
    if (that.orderShow[5] === '采购单') {
      console.log(that.orderType)
      switch (that.orderType) {
        case 2: // 采购仓储退货
        case 10: // 仓储采购入库
        case 14: // 仓储采购退货
          wx.navigateTo({
            url: '/pages/add/purchase/index?type=1'
          })
          break
        case 4: // 采购云仓退货
        case 40: // 云仓采购入库
          wx.navigateTo({
            url: '/pages/add/purchase/index?type=3'
          })
          break
        default:
          break
      }
    } else if (that.orderShow[5] === '调度单') {
      wx.navigateTo({
        url: '/pages/add/dispatch/index'
      })
    } else if (that.orderShow[5] === '发货单') {
      wx.navigateTo({
        url: '/pages/add/agreement/index'
      })
    }
  },
  setCommodity(event) {
    const {
      id,
      price,
      weight,
      norm,
      num
    } = event.currentTarget.dataset.value
    this.jumpAdd(1, id, price, weight, norm, num)
  },
  addCommodity() {
    this.jumpAdd(1, 0, 0, 0, 0, 0)
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
      weight,
      norm,
      num
    } = event.currentTarget.dataset.value
    this.jumpAdd(2, id, price, weight, norm, num)
  },
  addHalfgood() {
    this.jumpAdd(2, 0, 0, 0, 0, 0)
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
      weight,
      norm,
      num
    } = event.currentTarget.dataset.value
    this.jumpAdd(3, id, price, weight, norm, num)
  },
  addOriginal() {
    this.jumpAdd(3, 0, 0, 0, 0, 0)
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
      weight,
      norm,
      num
    } = event.currentTarget.dataset.value
    this.jumpAdd(4, id, price, weight, norm, num)
  },
  addStandard() {
    this.jumpAdd(4, 0, 0, 0, 0, 0)
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
  jumpAdd(type, id, price, weight, norm, num) {
    const that = this.data
    handleOrderCommodity(that.orderType, () => {
      wx.navigateTo({
        url: `/pages/add/editp/index?type=${type}&id=${id}&price=${price}&weight=${weight}&norm=${norm}&num=${num}`
      })
    }, () => {
      wx.navigateTo({
        url: `/pages/add/editr/index?type=${type}&id=${id}&price=${price}&weight=${weight}&norm=${norm}&num=${num}`
      })
    }, () => {
      wx.navigateTo({
        url: `/pages/add/edit/index?type=${type}&id=${id}&price=${price}&weight=${weight}&norm=${norm}&num=${num}`
      })
    }, () => {
      wx.navigateTo({
        url: `/pages/add/edito/index?type=${type}&id=${id}&price=${price}&weight=${weight}&norm=${norm}&num=${num}`
      })
    })
  },
  // 上传
  handleSuccess(event) {
    const that = this.data
    if (that.orderType === 0) {
      myToast(this, '请先选择订单类型')
      return
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
    if (!that.submitActive) {
      myToast(this, '请填写全部信息')
      return
    }
    let data = {
      id: app.globalData.user.id,
      gid: app.globalData.group.id,
      sid: that.sid,
      rid: that.pid,
      pid: that.pid,
      did: that.pid,
      date: that.dateText,
      types: [],
      commoditys: [],
      prices: [],
      weights: [],
      norms: [],
      values: [],
      attrs: []
    }
    that.commoditys.forEach(v => {
      data.types.push(1)
      data.commoditys.push(v.id)
      data.prices.push(v.price)
      data.weights.push(v.weight * 1000)
      data.norms.push(v.norm)
      data.values.push(v.num)
    })
    that.halfgoods.forEach(v => {
      data.types.push(2)
      data.commoditys.push(v.id)
      data.prices.push(v.price)
      data.weights.push(v.weight * 1000)
      data.norms.push(v.norm)
      data.values.push(v.num)
    })
    that.originals.forEach(v => {
      data.types.push(3)
      data.commoditys.push(v.id)
      data.prices.push(v.price)
      data.weights.push(v.weight * 1000)
      data.norms.push(v.norm)
      data.values.push(v.num)
    })
    that.standards.forEach(v => {
      data.types.push(4)
      data.commoditys.push(v.id)
      data.prices.push(v.price)
      data.weights.push(v.weight * 1000)
      data.norms.push(v.norm)
      data.values.push(v.num)
    })
    that.uploadFiles.forEach(v => {
      data.attrs.push(v.id)
    })

    switch (that.orderType) {
      case 1: // 采购仓储进货
        purchase(this, data, this.handleSubmit)
        break
      case 2: // 采购仓储退货
        preturn(this, data, this.handleSubmit)
        break
      case 3: // 采购云仓进货
        purchase2(this, data, this.handleSubmit)
        break
      case 4: // 采购云仓退货
        preturn2(this, data, this.handleSubmit)
        break
      case 10: // 仓储采购入库
        spurchase(this, data, this.handleSubmit)
        break
      case 11: // 仓储调度出库
        dispatch(this, data, this.handleSubmit)
        break
      case 12: // 仓储调度入库
        spurchase2(this, data, this.handleSubmit)
        break
      case 13: // 仓储损耗
        sloss(this, data, this.handleSubmit)
        break
      case 14: // 仓储采购退货
        sreturn(this, data, this.handleSubmit)
        break
      case 15: // 仓储履约退货
        sagreement(this, data, this.handleSubmit)
        break
      case 20: // 生产开始
        process(this, data, this.handleSubmit)
        break
      case 21: // 生产完成
        complete(this, data, this.handleSubmit)
        break
      case 22: // 生产损耗
        ploss(this, data, this.handleSubmit)
        break
      case 30: // 履约发货
        shipped(this, data, this.handleSubmit)
        break
      case 31: // 履约退货
        areturn(this, data, this.handleSubmit)
        break
      case 40: // 云仓采购入库
        cpurchase(this, data, this.handleSubmit)
        break
      case 41: // 云仓采购退货
        creturn(this, data, this.handleSubmit)
        break
      case 42: // 云仓损耗
        closs(this, data, this.handleSubmit)
        break
      case 43: // 云仓履约退货
        cback(this, data, this.handleSubmit)
        break
      case 44: // 云仓履约入库
        cagreement(this, data, this.handleSubmit)
        break
      case 50: // 销售售后
        mreturn(this, data, this.handleSubmit)
        break
      default:
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