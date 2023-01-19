import {
  baseUrl,
  post
} from './service'
const preUrl = baseUrl + 'upload'

export function addAttach(path, params, success) {
  const app = getApp()
  return wx.uploadFile({
    url: `${preUrl}/addAttach`,
    header: {
      token: app.globalData.token
    },
    filePath: path,
    name: 'file',
    formData: params,
    success: (res) => {
      success(res)
    }
  })
}