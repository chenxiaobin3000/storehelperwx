import Toast from 'tdesign-miniprogram/toast/index'

function myToast(that, msg) {
  Toast({
    context: that,
    selector: '#t-toast',
    message: msg,
    duration: 1000
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
      success(res) {
        const tempFilePath = res.tempFilePaths[0]
        success(tempFilePath)
      }
    })
  }
}

module.exports = {
  myToast,
  pickImage
}