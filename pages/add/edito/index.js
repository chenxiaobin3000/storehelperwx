import {
  myToast,
  relogin
} from '../../../util/util'
import {
  getCommodity
} from '../../../service/commodity'
import {
  getHalfgood
} from '../../../service/halfgood'
import {
  getOriginal
} from '../../../service/original'
import {
  getStandard
} from '../../../service/standard'
Page({
  data: {
    type: 0,
    cid: 0,
    id: 0,
    commodityValue: {},
    price: 0,
    weight: 0,
    norm: 0,
    num: 0,
    submitActive: false,
    nameText: '商品',
    btnText: '添 加'
  },
  onLoad(options) {
    wx.hideHomeButton()
    this.setData({
      type: parseInt(options.type),
      cid: parseInt(options.id),
      id: getApp().globalData.user.id
    })
    if (options.num > 0) {
      this.setData({
        price: options.price,
        weight: options.weight,
        norm: options.norm,
        num: options.num,
        submitActive: true,
        btnText: '修 改'
      })
    }
    this.getList()
  },
  getList() {
    const that = this.data
    this.setData({
      commodityListLoadStatus: 1
    })
    switch (that.type) {
      case 1: // commodity
        if (that.cid !== 0) {
          this.getCommodity()
        }
        this.setData({
          nameText: '商品'
        })
        break
      case 2: // halfgood
        if (that.cid !== 0) {
          this.getHalfgood()
        }
        this.setData({
          nameText: '半成品'
        })
        break
      case 3: // original
        if (that.cid !== 0) {
          this.getOriginal()
        }
        this.setData({
          nameText: '原料'
        })
        break
      case 4: // standard
        if (that.cid !== 0) {
          this.getStandard()
        }
        this.setData({
          nameText: '标品'
        })
        break
      default:
        break
    }
  },
  checkSubmitActive() {
    const that = this.data
    if (that.commodityValue && that.commodityValue.id && that.num > 0) {
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
  clickCommodity(event) {
    this.setData({
      commodityValue: event.currentTarget.dataset.value
    })
    this.checkSubmitActive()
  },
  addCommodity() {
    const that = this.data
    if (!that.submitActive) {
      myToast(this, '请填写全部信息')
      return
    }
    let action = null
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
        break
    }
    if (that.num && that.num > 0) {
      getApp().globalData.temp = {
        action: action,
        commodity: that.commodityValue,
        price: that.price,
        weight: that.weight,
        norm: that.norm,
        num: that.num
      }
      wx.navigateBack()
    } else {
      myToast(this, '请填写全部信息')
    }
  },
  getCommodity() {
    const that = this.data
    getCommodity(this, {
      id: that.id,
      cid: that.cid
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getHalfgood() {
    const that = this.data
    getHalfgood(this, {
      id: that.id,
      hid: that.cid
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getOriginal() {
    const that = this.data
    getOriginal(this, {
      id: that.id,
      oid: that.cid
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  getStandard() {
    const that = this.data
    getStandard(this, {
      id: that.id,
      sid: that.cid
    }, data => {
      this.setData({
        commodityValue: data
      })
    })
  },
  handleData(data) {
    const that = this.data
    if (data.list && data.list.length > 0) {
      const curPage = that.page
      this.setData({
        total: data.total,
        page: curPage + 1,
        commodityList: that.commodityList.concat(data.list),
        commodityListLoadStatus: 0
      })
      if ((curPage * that.pageLimit) >= that.total) {
        this.setData({
          commodityListLoadStatus: 2
        })
      }
    } else {
      this.setData({
        commodityListLoadStatus: 0
      })
    }
  },
  relogin() {
    relogin()
  }
})