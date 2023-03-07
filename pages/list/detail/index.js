import OrderData from '../../../util/order'
import {
  myToast,
  relogin
} from '../../../util/util'
import {
  imageSrc
} from '../../../util/imagesrc'
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
        batch: data.batch,
        unit: data.unit,
        curUnit: data.curUnit,
        price: data.price,
        curPrice: data.curPrice,
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
    } else if (temp.action === 'info') {
      const that = this.data
      if (temp.fare) {
        if (!that.fares) {
          that.fares = []
        }
        that.fares.push({
          id: 0,
          fare: temp.fare,
          cdate: ''
        })
        this.setData({
          fares: that.fares
        })
      }
      if (temp.remark) {
        if (!that.remarks) {
          that.remarks = []
        }
        that.remarks.push({
          id: 0,
          remark: temp.remark,
          cdate: ''
        })
        this.setData({
          remarks: that.remarks
        })
      }
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
    switch (that.orderType) {
      case 1: // 采购进货
      case 2: // 采购退货
      case 4: // 调度出库
      case 7: // 仓储退货
      case 11: // 履约发货
      case 12: // 履约退货
      case 14: // 云仓退货
        wx.navigateTo({
          url: `/pages/me/edit/addInfo/index?type=${that.orderType}&id=${that.orderId}&batch=${that.batch}`
        })
        break;
      case 3: // 仓储入库
      case 5: // 调度入库
      case 6: // 仓储损耗
      case 8: // 生产开始
      case 9: // 生产完成
      case 10: // 生产损耗
      case 13: // 云仓入库
      case 16: // 云仓损耗
        wx.navigateTo({
          url: `/pages/me/edit/addRemark/index?type=${that.orderType}&id=${that.orderId}&batch=${that.batch}`
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