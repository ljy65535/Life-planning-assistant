//获取应用实例
var app = getApp()
Page({
  data: {
    title: '',
    content: ''
  },
  onShow: function () {
    wx.getStorage({
      key:'note2',
      fail: function (res) {
        wx.setStorage({
          key:'note2',
          data: []
        })
      }
    })
  },
  //标题赋值
  bindTitle: function (e) {
    
    this.setData({
      title: e.detail.value
    })
  },
  //内容赋值
  bindContent: function (e) {

    this.setData({
      content: e.detail.value
    })
  },
  //数据缓存
  save: function (e) {
    var that = this
    var noteData = {
      title: that.data.title,
      content: that.data.content,
    }
    var data = []
    wx.getStorage({
      key:'note2',
      success: function (res) {
        data = res.data;
        data.push(noteData);
        console.log(data);
        wx.setStorage({
          key:'note2',
          data: data,
          success: function () {
            wx.showModal({
              title: '保存成功',
              content: '确定之后去查看',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        })
      },
    })
  }
})
