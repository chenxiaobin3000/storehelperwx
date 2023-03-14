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
  reviewAReturn
} from '../../../service/agreement'
import {
  reviewCPurchase,
  reviewCAgreement,
  reviewCLoss,
  reviewCReturn,
  reviewCBack
} from '../../../service/cloud'
import {
  reviewProcess,
  reviewPLoss,
  reviewComplete
} from '../../../service/product'
import {
  reviewPurchase,
  reviewPReturn,
  reviewPurchase2,
  reviewPReturn2
} from '../../../service/purchase'
import {
  reviewSPurchase,
  reviewDispatch,
  reviewSPurchase2,
  reviewSAgreement,
  reviewSLoss,
  reviewSReturn
} from '../../../service/storage'
import {
  reviewMReturn
} from '../../../service/sale'
Page({
  data: {
    orderId: 0,
    orderType: 0,
    orderValue: [],
    storageValue: [],
    batch: '',
    unit: '',
    curUnit: '',
    price: '',
    curPrice: '',
    dateText: '',
    commoditys: [],
    halfgoods: [],
    originals: [],
    standards: [],
    uploadFiles: [],
    fares: [],
    remarks: [],
    collapseValues: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160
    },
    maxUpload: 3
  },
  onShow() {
    const temp = getApp().globalData.temp
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
      if (data.comms && data.comms.length > 0) {
        data.comms.forEach(v => {
          const item = {
            id: v.cid,
            name: v.name,
            price: v.price,
            weight: v.weight / 1000,
            norm: v.norm,
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
      this.setData({
        orderId: data.id,
        orderType: data.type,
        orderValue: orderValue,
        storageValue: data.sname,
        unit: data.unit / 1000,
        curUnit: data.curUnit / 1000,
        price: data.price,
        curPrice: data.curPrice,
        batch: data.batch,
        date: new Date(data.applyTime).getTime(),
        dateText: data.applyTime,
        commoditys: commoditys,
        halfgoods: halfgoods,
        originals: originals,
        standards: standards,
        uploadFiles: attrs,
        fares: data.fares,
        remarks: data.remarks,
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
        reviewPurchase(this, data, wx.navigateBack)
        break
      case 2:
        reviewPReturn(this, data, wx.navigateBack)
        break
      case 3:
        reviewPurchase2(this, data, wx.navigateBack)
        break
      case 4:
        reviewPReturn2(this, data, wx.navigateBack)
        break
      case 10:
        reviewSPurchase(this, data, wx.navigateBack)
        break
      case 11:
        reviewDispatch(this, data, wx.navigateBack)
        break
      case 12:
        reviewSPurchase2(this, data, wx.navigateBack)
        break
      case 13:
        reviewSLoss(this, data, wx.navigateBack)
        break
      case 14:
        reviewSReturn(this, data, wx.navigateBack)
        break
      case 15:
        reviewSAgreement(this, data, wx.navigateBack)
        break
      case 20:
        reviewProcess(this, data, wx.navigateBack)
        break
      case 21:
        reviewPLoss(this, data, wx.navigateBack)
        break
      case 22:
        reviewComplete(this, data, wx.navigateBack)
        break
      case 30:
        reviewShipped(this, data, wx.navigateBack)
        break
      case 31:
        reviewAReturn(this, data, wx.navigateBack)
        break
      case 40:
        reviewCPurchase(this, data, wx.navigateBack)
        break
      case 41:
        reviewCReturn(this, data, wx.navigateBack)
        break
      case 42:
        reviewCLoss(this, data, wx.navigateBack)
        break
      case 43:
        reviewCBack(this, data, wx.navigateBack)
        break
      case 44:
        reviewCAgreement(this, data, wx.navigateBack)
        break
      case 50:
        reviewMReturn(this, data, wx.navigateBack)
        break
      default:
        break
    }
  },
  relogin() {
    relogin()
  }
})