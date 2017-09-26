// pages/launch/launch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current: 0,
    images: {
      topBrand: './images/top_brand.png',
      backColor1: './images/back_color_1.png',
      backColor2: './images/back_color_2.png',
      backColor3: './images/back_color_3.png',
      shadow: './images/shadow.png',
      page1: {
        bottom: './images/page1/bottom_font.png',
        document1: './images/page1/document_1.png',
        document2: './images/page1/document_2.png',
        document3: './images/page1/document_3.png',
        document4: './images/page1/document_4.png',
        document5: './images/page1/document_5.png',
        mglass: './images/page1/mglass.png'
      },
      page2: {
        bottom: './images/page2/bottom_font.png',
        block1: './images/page2/block_1.png',
        block2: './images/page2/block_2.png'
      },
      page3: {
        bottom: './images/page3/bottom_font.png',
        document: './images/page3/document_center.png',
        chatBottom: './images/page3/chat_bottom.png',
        chatTop: './images/page3/chat_top.png'
      },
      page4: {
        bottom: './images/page4/bottom_font.png',
        chat1: './images/page4/chat_1.png',
        chat2: './images/page4/chat_2.png',
        chat3: './images/page4/chat_3.png',
        chat4: './images/page4/chat_4.png',
        out1: './images/page4/out_1.png',
        out2: './images/page4/out_2.png',
        out3: './images/page4/out_3.png',
        tel: './images/page4/tel.png'
      }
    },
    blocks: [],
    page4: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createPage4()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  change: function (e) {

    // 动态计算并加载图2的动画
    if (e.detail.current === 1) {
      this.createBlocks()
      this.setDifBlocks()
      this.createBlockAnimation()
    } else if (e.detail.current === 3) {
      this.createPage4()
      this.createPage4Animation()
    } else {

    }


    this.setData({
      current: e.detail.current
    })
  },
  createBlocks: function () {
    let arr = []
    for (let i = 0; i < 16; ++i) {
      arr.push({ value: 1 })
    }

    this.setData({
      blocks: arr
    })
  },
  setDifBlocks: function () {
    let arr = this.data.blocks
    for (let i = 0; i < 4; ++i) {
      let rd = Math.floor(Math.random() * 16)
      arr[rd].value = 0
    }

    this.setData({
      blocks: arr
    })
  },
  createBlockAnimation: function () {
    let arr = this.data.blocks
    for (let i = 0; i < 16; ++i) {
      let left = 10 + parseInt(i / 4) * 120
      let top = 10 + i % 4 * 120
      let delay = 100 * i
      let cls = `transition: all ${delay}ms ease;\
                 transform: translate(${left}%, ${top}%);\
                 opacity: 1;`
      arr[i].cls = cls
    }

    this.setData({
      blocks: arr
    })
  },
  createPage4: function () {
    let arr = []
    Object.keys(this.data.images.page4).forEach((value, index) => {
      if (value !== 'bottom' && value !== 'tel') {
        arr.push({src: this.data.images.page4[value]})
      }
    })

    this.setData({
      page4: arr
    })
  },
  createPage4Animation: function () {
    let arr = this.data.page4
    for (let i = 0; i < arr.length; ++i) {
      let delay
      if (i < 4) {
        delay = 300 * (i + 1)
      } else {
        delay = 300 * 5
      }
      let cls = `transition: all 300ms ease ${delay}ms;\
                 opacity: 1;\
                 width: 100%;\
                 height: 100%;`
      arr[i].cls = cls
    }

    this.setData({
      page4: arr
    })
  },
  /**
   * 欢迎界面跳转至首页
   */
  enter: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  }
})
