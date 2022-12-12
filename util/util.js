/**
 * 访问后端接口
 * @param {*} url 地址
 * @param {*} token 登陆可以为空，其他必须有
 * @param {*} data 数据
 * @param {*} success 成功回调
 */
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

/**
 * 拍照或相册选取
 * @param {*} success 成功回调
 */
function pickImage(success) {
  const canUse = wx.canIUse('chooseMedia')
    if (canUse) {
      // 新版
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePath = res.tempFiles[0].tempFilePath
          success(tempFilePath)
        }
      })
    } else {
      // 兼容旧版
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          const tempFilePath = res.tempFilePaths[0]
          success(tempFilePath)
        }
      })
    }
}

module.exports = {
  post,
  pickImage
}