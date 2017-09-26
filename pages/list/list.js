const api = require('../../api/api')
const storage = require('../../common/js/define').storage

Page({
  data: {
    lists: [],
    isLoaded: false,
    page: 1,
    params: {},
    // lists: [{
    //   id: 1,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }, {
    //   id: 2,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }, {
    //   id: 3,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }, {
    //   id: 4,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }, {
    //   id: 5,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }, {
    //   id: 6,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }, {
    //   id: 7,
    //   title: '佛山市 “专利导航计划”实施方案',
    //   desc: '佛山市知识产权局印发《佛山市 “专利导航计划”实施方案》，此方案目标将根据佛山市产业特色，选取本地重点产业开展专利导航计划，到2018年重点产业开展专利导航项目进行剖析与讲解。',
    //   updateTime: '2017-06-01'
    // }]
  },
  toDetail: function (e) {
    let id = e.target.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  onLoad: function () {
    this.onPullDownRefresh()
  },
  onPullDownRefresh: function () {
    wx.getStorage({
      key: storage.PARAMS_GET_LISTS,
      success: (res) => {
        let params = res.data
        console.log('params: ', params)
        api.getArticleList(params).then((res) => {
          this.data.lists = res.rows
          this.setData({
            lists: this.data.lists,
            isLoaded: true,
            params: params,
            page: 1
          })
          console.log(this.data.lists)
          wx.stopPullDownRefresh()
        }, (err) => {
          wx.stopPullDownRefresh()
        })
      }
    })
  },
  onReachBottom: function () {
    console.log('加载更多')
    let params = this.data.params
    this.setData({
      page: this.data.page + 1
    })
    params.page = this.data.page
    api.getArticleList(params).then((res) => {
      if (!res.rows || res.rows.length === 0) {
        wx.showModal({
          title: '提示',
          content: '没有更多数据',
          showCancel: false
        })
      } else {
        this.setData({
          lists: this.data.lists.concat(res.rows)
        })
      }
      console.log('lists', this.data.lists)
    })
  },
})