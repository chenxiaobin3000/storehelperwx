import {
  myToast,
  relogin
} from '../../../util/util'
import {
  getCommodity,
  getGroupAllCommodity
} from '../../../service/commodity'
import {
  getHalfgood,
  getGroupAllHalfgood
} from '../../../service/halfgood'
import {
  getOriginal,
  getGroupAllOriginal
} from '../../../service/original'
import {
  getStandard,
  getGroupAllStandard
} from '../../../service/standard'
import {
  getDestroy,
  getGroupAllDestroy
} from '../../../service/destroy'
Page({
  data: {
    lock: false,
    type: 0,
    id: 0,
    commodityVisible: false,
    commodityValue: {},
    commoditys: [],
    price: 0,
    num: 0,
    submitActive: false,
    nameText: '商品',
    btnText: '添 加'
  },
  onLoad(options) {
    wx.hideHomeButton()
    const that = this.data
    this.setData({
      type: parseInt(options.type),
      id: parseInt(options.id)
    })
    if (options.price && options.num) {
      this.setData({
        lock: true,
        price: options.price,
        num: options.num,
        submitActive: true,
        btnText: '修 改'
      })
    }

    // 获取列表
    switch (that.type) {
      case 1: // commodity
        this.getGroupCommodity()
        this.setData({
          nameText: '商品'
        })
        if (that.id !== 0) {
          this.getCommodity(that.id)
        }
        break
      case 2: // halfgood
        this.getGroupHalfgood()
        this.setData({
          nameText: '半成品'
        })
        if (that.id !== 0) {
          this.getHalfgood(that.id)
        }
        break
      case 3: // original
        this.getGroupOriginal()
        this.setData({
          nameText: '原料'
        })
        if (that.id !== 0) {
          this.getOriginal(that.id)
        }
        break
      case 4: // standard
        this.getGroupStandard()
        this.setData({
          nameText: '标品'
        })
        if (that.id !== 0) {
          this.getStandard(that.id)
        }
        break
      default: // destroy
        this.getGroupDestroy()
        this.setData({
          nameText: '废料'
        })
        if (that.id !== 0) {
          this.getDestroy(that.id)
        }
        break
    }
  },
  checkSubmitActive() {
    const that = this.data
    if (that.commodityValue && that.commodityValue.id && that.price > 0 && that.num > 0) {
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
  onCommodityPicker() {
    const that = this.data
    if (that.lock) {
      myToast(this, '不能修改商品')
    } else {
      this.setData({
        commodityVisible: true
      })
    }
  },
  onCommodityChange(event) {
    this.setData({
      commodityVisible: false,
      commodityValue: event.detail.value[0]
    })
    this.checkSubmitActive()
  },
  onCommodityCancel() {
    this.setData({
      commodityVisible: false,
    })
  },
  addCommodity() {
    const that = this.data
    const app = getApp()
    let action
    switch (that.type) {
      case 1:
        action = 'commodity'
        break
      case 2:
        action = 'halfgood'
        break
      case 3:
        action = 'original'
        break
      case 4:
        action = 'standard'
        break
      default:
        action = 'destroy'
        break
    }
    app.globalData.temp = {
      action: action,
      commodity: that.commodityValue,
      price: that.price,
      num: that.num
    }
    wx.navigateBack()
  },
  getCommodity(id) {
    const app = getApp()
    getCommodity(this, {
      id: app.globalData.user.id,
      cid: id
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getGroupCommodity() {
    const app = getApp()
    getGroupAllCommodity(this, {
      id: app.globalData.user.id
    }, data => {
      const list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          list.push({
            label: v.name,
            value: v
          })
        })
        this.setData({
          commoditys: list
        })
      }
    })
  },
  getHalfgood(id) {
    const app = getApp()
    getHalfgood(this, {
      id: app.globalData.user.id,
      hid: id
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getGroupHalfgood() {
    const app = getApp()
    getGroupAllHalfgood(this, {
      id: app.globalData.user.id
    }, data => {
      const list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          list.push({
            label: v.name,
            value: v
          })
        })
        this.setData({
          commoditys: list
        })
      }
    })
  },
  getOriginal(id) {
    const app = getApp()
    getOriginal(this, {
      id: app.globalData.user.id,
      oid: id
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getGroupOriginal() {
    const app = getApp()
    getGroupAllOriginal(this, {
      id: app.globalData.user.id
    }, data => {
      const list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          list.push({
            label: v.name,
            value: v
          })
        })
        this.setData({
          commoditys: list
        })
      }
    })
  },
  getStandard(id) {
    const app = getApp()
    getStandard(this, {
      id: app.globalData.user.id,
      sid: id
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getGroupStandard() {
    const app = getApp()
    getGroupAllStandard(this, {
      id: app.globalData.user.id
    }, data => {
      const list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          list.push({
            label: v.name,
            value: v
          })
        })
        this.setData({
          commoditys: list
        })
      }
    })
  },
  getDestroy(id) {
    const app = getApp()
    getDestroy(this, {
      id: app.globalData.user.id,
      did: id
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getGroupDestroy() {
    const app = getApp()
    getGroupAllDestroy(this, {
      id: app.globalData.user.id
    }, data => {
      const list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          list.push({
            label: v.name,
            value: v
          })
        })
        this.setData({
          commoditys: list
        })
      }
    })
  },
  relogin() {
    relogin()
  }
})