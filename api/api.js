// let apiBaseUrl = 'http://192.168.17.107:8181/jeesite/api'
let apiBaseUrl = 'https://www.gov.besticity.com/jeesite/api'
let fileBaseUrl = 'https://www.gov.besticity.com'
// let fileBaseUrl = 'http://192.168.17.107:8181'

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

let httpPost = function (path, params) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: `${apiBaseUrl}/${path}`,
      data: params,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
          wx.hideLoading()
          console.log('res: ', res.data)
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '请求失败:' + res.statusCode,
            showCancel: false
          })
          reject(res)
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showModal({
          title: err.errMsg,
          showCancel: false
        })
      }
    })
  })
}

let httpGet = function (path, params) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: `${apiBaseUrl}/${path}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
          wx.hideLoading()
          console.log('res: ', res.data)
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '请求失败:' + res.statusCode,
            showCancel: false
          })
          reject(res)
        }
      },
      fail: (err) => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: err.errMsg,
          showCancel: false
        })
      }
    })
  })
}

module.exports = {
  getParams: (params) => {
    return httpGet('params', params)
  },
  getArticleList: (params) => {
    return httpPost('article', params)
  },
  getArticleDetail: (id) => {
    let path = `article/${id}`
    return httpGet(path)
  },
  getScalePic: () => {
    return httpGet('pic')
  },
  fileBaseUrl
}
