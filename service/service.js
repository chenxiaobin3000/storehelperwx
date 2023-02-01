import Message from 'tdesign-miniprogram/message/index'
import {
  myToast
} from '../util/util'

let baseUrl = ''
if (typeof __wxConfig == 'object') {
  const version = __wxConfig.envVersion;
  if (version == 'develop') {
    baseUrl = 'http://192.168.0.100:8080/api/'
  } else if (version == 'trial') {
    baseUrl = 'https://www.jishuzhushou.com/api/'
  } else if (version == 'release') {
    baseUrl = 'https://www.jishuzhushou.com/api/'
  }
}

/**
 * 访问后端接口
 * @param {*} url 地址
 * @param {*} data 数据
 * @param {*} success 成功回调
 */
function post(url, that, data, success) {
  const app = getApp()
  wx.showLoading({
    mask: true // 防止重复操作
  })
  wx.request({
    url: url,
    method: 'post',
    timeout: 5000,
    header: {
      token: app.globalData.token
    },
    data: data,
    success(res) {
      if (res.data.code === 0) {
        // 成功
        success(res.data.data)
      } else {
        if (res.data.code === -3) {
          // 重新登录
          Message.info({
            context: that,
            offset: [20, 32],
            icon: false,
            content: res.data.msg,
            duration: -1,
            action: '重新登陆',
          });
        } else {
          // 业务错误
          myToast(that, res.data.msg)
        }
      }
    },
    fail() {
      // 网络异常
      myToast(that, '网络异常')
    },
    complete() {
      wx.hideLoading()
    }
  })
}

module.exports = {
  baseUrl,
  post
}