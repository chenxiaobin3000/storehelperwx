import OrderData from '../../../util/order'
import {
  imageSrc
} from '../../../util/imagesrc'
import {
  formatTime,
  relogin
} from '../../../util/util'
import {
  setShipped,
  setAReturn
} from '../../../service/agreement'
import {
  setCPurchase,
  setCLoss,
  setCReturn
} from '../../../service/cloud'
import {
  setProcess,
  setPLoss,
  setComplete
} from '../../../service/product'
import {
  setPurchase,
  setPReturn
} from '../../../service/purchase'
import {
  getGroupAllStorage,
  setSPurchase,
  setDispatch,
  setPurchase2,
  setSLoss,
  setSReturn
} from '../../../service/storage'
import {
  getOrder
} from '../../../service/order'
import {
  addAttach
} from '../../../service/upload'
Page({
  data: {
    orderId: 0,
    orderType: 0,
    orderValue: '',
    orderShow: [],
    sid: 0,
    storageVisible: false,
    storageValue: '',
    storages: [],
    batch: '',
    purchaseValue: '',
    dateVisible: false,
    date: '',
    dateText: '',
    commoditys: [],
    halfgoods: [],
    originals: [],
    standards: [],
    uploadFiles: [],
    fares: [],
    remarks: [],
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
  },
  onShow() {
    const app = getApp()
    const temp = app.globalData.temp
    if (temp) {
      if (temp.action === 'order') {
        const data = temp.data
        const orderValue = []
        OrderData.forEach(v => {
          if (v.value === data.type) {
            orderValue.push(v.label)
          }
        })

        let orderShow = []
        switch (data.type) {
          case 1: // 采购进货
          case 3: // 仓储采购
            orderShow = [1, 0, 1, 0, 1]
            break
          case 2: // 采购退货
          case 7: // 仓储退货
            orderShow = [1, 0, 1, 0, 0]
            break
          case 4: // 调度出库
          case 5: // 调度入库
          case 6: // 仓储损耗
            orderShow = [1, 1, 1, 1, 1]
            break
          case 8: // 生产开始
            orderShow = [0, 0, 1, 1, 1]
            break
          case 9: // 生产完成
          case 10: // 生产损耗
            orderShow = [0, 1, 1, 1, 1]
            break
          case 11: // 履约入库
          case 12: // 履约出库
          case 13: // 云仓入库
          case 16: // 云仓损耗
            orderShow = [1, 1, 0, 0, 1]
            break
          case 14: // 云仓退货
            orderShow = [1, 1, 0, 0, 0]
            break
          default:
            break
        }

        if (orderShow[4] === 0) {
          getOrder(this, {
            id: app.globalData.user.id,
            type: 1,
            oid: data.rid
          }, data => {
            this.setData({
              purchaseValue: data.batch
            })
          })
        }

        const commoditys = []
        const halfgoods = []
        const originals = []
        const standards = []
        if (data.comms && data.comms.length > 0) {
          data.comms.forEach(v => {
            const item = {
              id: v.cid,
              name: v.name,
              price: v.price,
              num: v.value
            }
            switch (v.ctype) {
              case 1:
                commoditys.push(item)
                break
              case 2:
                halfgoods.push(item)
                break
              case 3:
                originals.push(item)
                break
              case 4:
                standards.push(item)
                break
              default:
                break
            }
          })
        }

        const attrs = []
        if (data.attrs && data.attrs.length > 0) {
          data.attrs.forEach(v => {
            attrs.push({
              duration: undefined,
              height: undefined,
              id: v.id,
              name: v.name.substring(2, v.name.length),
              percent: 0,
              size: 0,
              status: '',
              thumb: undefined,
              type: 'image',
              url: imageSrc[v.src] + v.path + '/' + v.name,
              width: undefined
            })
          })
        }

        this.setData({
          orderId: data.id,
          orderType: data.type,
          orderValue: orderValue,
          orderShow: orderShow,
          sid: data.sid,
          storageValue: data.sname,
          batch: data.batch,
          date: new Date(data.applyTime).getTime(),
          dateText: data.applyTime,
          commoditys: commoditys,
          halfgoods: halfgoods,
          originals: originals,
          standards: standards,
          uploadFiles: attrs,
          fares: data.fares,
          remarks: data.remarks
        })
      } else if (temp.action === 'commodity') {
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
      orderId: 0,
      orderValue: '',
      orderShow: [],
      sid: 0,
      storageVisible: false,
      storageValue: '',
      batch: '',
      purchaseValue: '',
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
    this.jumpEdit(1, id, price, num)
  },
  addCommodity() {
    this.jumpEdit(1, 0, 0, 0)
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
    this.jumpEdit(2, id, price, num)
  },
  addHalfgood() {
    this.jumpEdit(2, 0, 0, 0)
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
    this.jumpEdit(3, id, price, num)
  },
  addOriginal() {
    this.jumpEdit(3, 0, 0, 0)
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
    this.jumpEdit(4, id, price, num)
  },
  addStandard() {
    this.jumpEdit(4, 0, 0, 0)
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
  jumpEdit(type, id, price, num) {
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
    const {
      files
    } = event.detail
    const file = files[files.length - 1]
    file.status = 'loading'
    this.setData({
      uploadFiles: files
    })

    // 启动上传
    const that = this.data
    const {
      id
    } = getApp().globalData.user
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
    const data = {
      id: app.globalData.user.id,
      gid: app.globalData.group.id,
      oid: that.orderId,
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
      case 1:
        setPurchase(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 2:
        setPReturn(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 3:
        setSPurchase(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 4:
        setDispatch(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 5:
        setPurchase2(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 6:
        setSLoss(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 7:
        setSReturn(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 8:
        setProcess(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 9:
        setComplete(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 10:
        setPLoss(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 11:
        setShipped(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 12:
        setAReturn(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 13:
        setCPurchase(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 14:
        setCReturn(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      case 16:
        setCLoss(this, data, () => {
          this.reset()
          wx.navigateBack()
        })
        break
      default:
        break
    }
  },
  clickSubmitInfo() {
    const that = this.data
    switch (that.orderType) {
      case 1: // 采购进货
      case 2: // 采购退货
      case 7: // 仓储退货
      case 14: // 云仓退货
        wx.navigateTo({
          url: `/pages/me/edit/addInfo/index?type=${that.orderType}&id=${that.orderId}&batch=${that.batch}`
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
          url: `/pages/me/edit/addInfo/index?type=${that.orderType}&id=${that.orderId}&batch=${that.batch}`
        })
        break;
      default:
        break;
    }
  },
  relogin() {
    relogin()
  }
})