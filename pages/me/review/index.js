import OrderData from '../../../util/order'
import {
  imageSrc
} from '../../../util/imagesrc'
import {
  myToast,
  relogin
} from '../../../util/util'
import {
  reviewShipped,
  reviewReturn
} from '../../../service/agreement'
import {
  reviewProcess,
  reviewComplete
} from '../../../service/product'
import {
  reviewPurchase,
  reviewSReturn
} from '../../../service/storage'
Page({
  data: {
    orderId: 0,
    orderType: 0,
    orderValue: [],
    storageValue: [],
    batch: '',
    dateText: '',
    commoditys: [],
    halfgoods: [],
    originals: [],
    standards: [],
    destroys: [],
    uploadFiles: [],
    collapseValues: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    maxUpload: 3
  },
  onLoad() {},
  onShow() {
    const app = getApp()
    const temp = app.globalData.temp
    if (temp && temp.action === 'order') {
      const data = temp.data
      const orderValue = []
      OrderData.forEach(v => {
        if (v.value === data.type) {
          orderValue.push(v.label)
        }
      })

      const commoditys = []
      const halfgoods = []
      const originals = []
      const standards = []
      const destroys = []
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
              destroys.push(item)
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

      const collapseValues = []
      if (commoditys.length > 0) {
        collapseValues.push(1)
      }
      if (standards.length > 0) {
        collapseValues.push(2)
      }
      if (originals.length > 0) {
        collapseValues.push(3)
      }
      if (halfgoods.length > 0) {
        collapseValues.push(4)
      }
      if (destroys.length > 0) {
        collapseValues.push(5)
      }
      this.setData({
        orderId: data.id,
        orderType: data.type,
        orderValue: orderValue,
        storageValue: data.sname,
        batch: data.batch,
        date: new Date(data.applyTime).getTime(),
        dateText: data.applyTime,
        commoditys: commoditys,
        halfgoods: halfgoods,
        originals: originals,
        standards: standards,
        destroys: destroys,
        uploadFiles: attrs,
        collapseValues: collapseValues,
        maxUpload: attrs.length
      })
    }
  },
  // 下拉列表
  handleCollapseChange(event) {
    this.setData({
      collapseValues: event.detail.value
    })
  },
  // 上传
  handleSuccess() {
    myToast(this, '不能修改附件')
  },
  handleRemove() {
    myToast(this, '不能修改附件')
  },
  clickSubmit() {
    const that = this.data
    const data = {
      id: getApp().globalData.user.id,
      oid: that.orderId
    }
    switch (that.orderType) {
      case 1:
        reviewPurchase(this, data, () => {
          wx.navigateBack()
        })
        break
      case 2:
        reviewSReturn(this, data, () => {
          wx.navigateBack()
        })
        break
      case 4:
        reviewProcess(this, data, () => {
          wx.navigateBack()
        })
        break
      case 3:
        reviewComplete(this, data, () => {
          wx.navigateBack()
        })
        break
      case 6:
        reviewShipped(this, data, () => {
          wx.navigateBack()
        })
        break
      case 5:
        reviewReturn(this, data, () => {
          wx.navigateBack()
        })
        break
    }
  },
  relogin() {
    relogin()
  }
})