import {
  myToast
} from '../../../util/util'
import {
  getCommodity,
  getGroupCommodity
} from '../../../service/commodity'
import {
  getHalfgood,
  getGroupHalfgood
} from '../../../service/halfgood'
import {
  getOriginal,
  getGroupOriginal
} from '../../../service/original'
import {
  getStandard,
  getGroupStandard
} from '../../../service/standard'
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
      default: // standard
        this.getGroupStandard()
        this.setData({
          nameText: '标品'
        })
        if (that.id !== 0) {
          this.getStandard(that.id)
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
        break;
      case 2:
        action = 'halfgood'
        break;
      case 3:
        action = 'original'
        break;
      default:
        action = 'standard'
        break;
    }
    app.globalData.temp = {
      action: action,
      commodity: that.commodityValue,
      price: that.price,
      num: that.num
    }
    wx.navigateBack({
      delta: 1
    })
  },
  getCommodity(id) {
    const app = getApp()
    getCommodity({
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
    getGroupCommodity({
      id: app.globalData.user.id,
      page: 1,
      limit: 100,
      search: null
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
    getHalfgood({
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
    getGroupHalfgood({
      id: app.globalData.user.id,
      page: 1,
      limit: 100,
      search: null
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
    getOriginal({
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
    getGroupOriginal({
      id: app.globalData.user.id,
      page: 1,
      limit: 100,
      search: null
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
    getStandard({
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
    getGroupStandard({
      id: app.globalData.user.id,
      page: 1,
      limit: 100,
      search: null
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
  }
})