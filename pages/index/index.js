const api = require('../../api/api')
const storage = require('../../common/js/define.js').storage

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lists: [],
    dialog: {
      datas: [],
      title: '',
      visible: false
    },
    checkedIds: {},
    curTabIndex: 0
  },
  onTab: function (e) {
    let index = parseInt(e.target.dataset.index)
    this.setData({
      curTabIndex: index
    })
  },
  toDetail: function (e) {
    let id = e.target.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  // 全选改变
  ckChangeAll: function (e) {
    let values = e.detail.value
    let value = (values && values.length === 1) ? values[0] : ''
    let key = e.target.dataset.key
    let list = this.data.filter.value[key]
    if (value) {
      list.checked = true
    } else {
      list.checked = false
    }
    list.data.forEach((childItem) => {
      childItem.checked = list.checked
      this.data.checkedIds[key][childItem.id] = list.checked
    })
    this.setData({
      filter: this.data.filter,
      checkedIds: this.data.checkedIds
    })
    console.log('ckChangeAll: ', this.data.filterLists)
    console.log('ckChangeAll checkdIds: ', this.data.checkedIds)
  },
  // 选择框改变
  ckChange: function (e) {
    let values = e.detail.value
    let key = e.target.dataset.key
    let childList = this.data.filter.value[key].data
    let cnt = 0
    childList.forEach((childItem) => {
      childItem.checked = false
      this.data.checkedIds[key][childItem.id] = false
      values.forEach((value) => {
        if (childItem.name === value) {
          childItem.checked = true
          this.data.checkedIds[key][childItem.id] = true
          ++cnt
        }
      })
    })
    this.data.filter.value[key].checked = cnt === childList.length ? true : false
    this.setData({
      filter: this.data.filter,
      checkedIds: this.data.checkedIds
    })
    console.log('ckChange: ', this.data.filter)
  },
  tapCk: function (e) {
    // let title = e.target.dataset.title
    // let key = e.target.dataset.key
    // let childIndex = e.target.dataset.childIndex
    // console.log(title, index, childIndex)
    // let list = this.data.filterLists[index].child[childIndex].child
    // if (list) {
    //   this.data.dialog.title = title
    //   this.data.dialog.datas = list
    //   this.data.dialog.visible = true
    // }
    // this.setData({
    //   dialog: this.data.dialog
    // })
  },
  dialogConfirm: function (e) {
    this.dialogClose()
  },
  dialogCancel: function (e) {
    this.dialogClose()
  },
  dialogClose: function (e) {
    this.data.dialog.visible = false
    this.setData({
      dialog: this.data.dialog
    })
  },
  confirm: function () {
    let ids = this.data.checkedIds
    let params = {}
    console.log('this.ids:', this.data.checkedIds)
    Object.keys(ids).forEach((key) => {
      params[key] = []
      Object.keys(ids[key]).forEach((id) => {
        if (ids[key][id] == true) {
          params[key].push(id)
        }
      })
    })
    console.log('params: ', params)
    wx.setStorage({
      key: storage.PARAMS_GET_LISTS,
      data: params,
    })
    
    wx.navigateTo({
      url: '../list/list'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    console.log('decodeURI:', decodeURI('http://www.w3school.com.cn/My%20first/'))
    var that = this
    console.log(api)
    api.getParams().then((data) => {
      console.log('api getParams: ', data)
      data.fields.forEach((item) => {
        this.data.checkedIds[item] = {}
      })
      this.setData({
        filter: data,
        checkedIds: this.data.checkedIds
      })
    })
    api.getArticleList().then((data) => {
      console.log('getArticleList: ', data)
      this.setData({
        lists: data.rows
      })
    })
  },
  onPullDownRefresh: function () {
    console.log('开始下拉刷新')
    api.getParams().then((data) => {
      console.log('api getParams: ', data)
      data.fields.forEach((item) => {
        this.data.checkedIds[item] = {}
      })
      this.setData({
        filter: data,
        checkedIds: this.data.checkedIds
      })
    })
    api.getArticleList().then((data) => {
      console.log('getArticleList: ', data)
      this.setData({
        lists: data.rows
      })
      wx.stopPullDownRefresh()
    })
  },
  tapIndustry: function () {
    this.data.dialog.visible = true
    this.data.dialog.datas = this.data.filter.value['industry'].data
    console.log(this.data.dialog)
    this.setData({
      dialog: this.data.dialog
    })
  },
  tapScale: function () {
    api.getScalePic().then((data) => {
      wx.previewImage({
        current: api.fileBaseUrl + data.pic,
        urls: [api.fileBaseUrl + data.pic],
        success: function (res) {
          console.log(res)
        }
      })
    })
  }
})
