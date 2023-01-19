const baseUrl = 'http://127.0.0.1:8080/api/'
if (typeof __wxConfig == 'object') {
  let version = __wxConfig.envVersion;
  if (version == 'develop') {
    const baseUrl = 'http://127.0.0.1:8080/api/'
  } else if (version == 'trial') {
    const baseUrl = 'http://127.0.0.1:8080/api/'
  } else if (version == 'release') {
    const baseUrl = 'http://127.0.0.1:8080/api/'
  }
}

/**
 * 访问后端接口
 * @param {*} url 地址
 * @param {*} data 数据
 * @param {*} success 成功回调
 */
function post(url, data, success) {
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
        // 业务错误
        wx.showToast({
          icon: 'error',
          duration: 1000,
          title: res.data.msg
        })
      }
    },
    fail() {
      // 网络异常
      wx.showToast({
        icon: 'error',
        duration: 1000,
        title: '网络异常'
      })
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