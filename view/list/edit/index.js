import OrderData from '../../../util/order'
import {
  myToast
} from '../../../util/util'
import {
  imageSrc
} from '../../../util/imagesrc'
Page({
  data: {
    orderId: 0,
    orderValue: [],
    storageValue: [],
    batch: '',
    dateText: '',
    commoditys: [],
    halfgoods: [],
    originals: [],
    standards: [],
    uploadFiles: [],
    collapseValues: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    maxUpload: 3
  },
  onLoad() {

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
        orderValue: orderValue,
        storageValue: data.sname,
        batch: data.batch,
        date: new Date(data.applyTime).getTime(),
        dateText: data.applyTime,
        commoditys: commoditys,
        halfgoods: halfgoods,
        originals: originals,
        standards: standards,
        uploadFiles: attrs,
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
  }
})