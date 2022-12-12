function post(url, token, data, success) {
  wx.showLoading({
    mask: true // 防止重复操作
  })
  wx.request({
    method: 'post',
    timeout: 5000,
    url: url,
    data: data,
    header: {
      'token': token,
    },
    success (res) {
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
    fail () {
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
  post
}