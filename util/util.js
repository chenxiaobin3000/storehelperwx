import Toast from 'tdesign-miniprogram/toast/index'

function myToast(that, msg) {
  Toast({
    context: that,
    selector: '#t-toast',
    message: msg,
    duration: 1000
  })
}

module.exports = {
  myToast
}