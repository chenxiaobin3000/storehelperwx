import dayjs from 'dayjs'
import Toast from 'tdesign-miniprogram/toast/index'

const formatTime = (date, template) => dayjs(date).format(template)

function myToast(that, msg) {
  Toast({
    context: that,
    selector: '#t-toast',
    message: msg,
    duration: 1000
  })
}

module.exports = {
  formatTime,
  myToast
}