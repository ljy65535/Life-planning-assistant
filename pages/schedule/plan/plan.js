//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //滑动窗口数据设置
    
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100,
    noteData: []
  },
  //跳转页面
  gonextnote: function () {
    wx.navigateTo({
      url: '../nextplan/nextplan'
    })
  },
 
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  
  //显示缓存数据
  onShow: function () {
    var that = this
    var data = []
    wx.getStorage({
      key: 'note2',
      success: function (res) {
        data = res.data;
        that.setData({
          noteData: res.data
        })
      }
    })
  },
  //清空指定缓存
  clear: function () {
    wx.removeStorage({
      key: 'note2',
      success: function (res) {
        console.log(res.data)
      }
    })
    this.setData({noteData:[]})
  }
  
  })
