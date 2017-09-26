let WxParse = require('../../wxParse/wxParse.js')
let api = require('../../api/api')

Page({
  data: {
    data: {
      // title: '佛山市 “专利导航计划”实施方案',
      // department: '佛山市科技局',
      // createTime: '2017-06-01',
      // description: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
      // content: '<p>(一)进一步完善知识产权工作体系和政策体系<br>围绕佛山产业和企业现状，结合其专利数据等，进行多角度分析，根据产业和企业在专利导航发展的实际需求，完善政府、行业和企业“三方联动、互补互促”的知识产权工作体系。</p><br><p>（二）全面推进专利导航产业发展实验区建设<br>1.进一步完善专利导航工作机制。以佛山市知识产权局工作联席会议为佛山市建设国家专利导航产业发展实验区协调机构，联席会议办公室（佛山市知识产权局）为牵头单位，组织、协调和实施管理佛山市国家专利导航实验区建设和运营工作，并将建设专利导航产业发展实验区纳入为佛山市知识产权重点工作。</p><br><p>（三）大力实施产业规划类和企业运营类专利导航项目<br>以实施“珠江三角洲地区重点产业转型升级专利导航工程项目”为基础，结合自身需求和优势，大力推广在高端制造装备产业、汽车产业、陶瓷装备产业等领域开展专利导航项目，提高产业创新决策和企业专利运营的科学性和精准度。</p>',
      // file: 'http://www.baidu.com'
    }
  },
  onShareAppMessage: function (option) {
    console.log('option: ', option)
    return {
      title: this.data.data.title,
      desc: this.data.data.description,
      path: `/pages/detail/detail?id=${this.data.id}`
    }
  },
  onLoad: function (option) {
    console.log('getCurrentPages: ', getCurrentPages())
    WxParse.wxParse('article', 'html', this.data.data.content, this)
    let id = option.id
    api.getArticleDetail(id).then((res) => {
      WxParse.wxParse('article', 'html', res.content, this)
      if (res.file && res.file.length > 0) {
        let files = res.file
        for (let index = 0; index < files.length; ++index) {
          res.file[index].name = decodeURI(files[index].name)
        }
      }
      this.setData({
        id: id,
        data: res
      })
    })
  },
  downloadFile: function (e) {
    let url = e.target.dataset.url
    // let url = this.data.data.file
    if (url && url !== '') {
      wx.showLoading({
        title: '下载文件中，请稍后...',
      })
      wx.downloadFile({
        url: api.fileBaseUrl + url,
        header: {},
        success: function (res) {
          let filePath = res.tempFilePath
          console.log('success: ', res)
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: (res) => {
              console.log('打开文档失败：', res)
            }
          })
        },
        fail: function (res) {
          wx.showModal({
            title: '下载失败',
            content: res.errMsg,
            showCancel: false
          })
        },
        complete: function (res) {
          wx.hideLoading()
          // console.log(res)
          // wx.showModal({
          //   title: '完成下载',
          //   content: res,
          //   showCancel: false
          // })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '没有文件可供下载',
        showCancel: false
      })
    }
  },
  bindLink: function () {
    console.log('bindlink')
  }
})