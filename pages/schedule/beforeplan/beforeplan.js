//index.js
//获取应用实例

var app = getApp()





Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    year: null,
    log: null,
    fillerData: 'none',
    textGray: 0
  },



  //页面跳转到to do list
  bindViewTap: function () {
    wx.navigateTo({
      url: '../plan/plan'
    })
  },
 
  




  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        name: userInfo.nickName,
      })
    })
    //调出并算出相关时间
    var time = new Date();
    var yearStart = new Date(time.getFullYear() + "/01/01 00:00:00");
    var nextYear = new Date((time.getFullYear() + 1) + "/01/01 00:00:00");
    var fullHours = Math.floor((nextYear.getTime() - yearStart.getTime()) / (3600 * 1000));
    var throughHours = Math.floor((time.getTime() - yearStart.getTime()) / (3600 * 1000));
    //得到过去的时间占全年时间的百分比
    var per = throughHours / fullHours;
    that.setData({
      year: time.getFullYear(),
      per: Math.floor(per * 100),
      textGray: per,
      textSpeed: per * 2,
    })
    if (per <= 0.5) {
      that.setData({
        spinerTrans: - per * 360,
        spinerSpeed: per * 2,
      })
    } else {
      that.setData({
        spinerTrans: - 180,
        spinerSpeed: 1,
      })
      setTimeout(function () {
        that.setData({
          fillerData: 'block',
        })
        setTimeout(function () {
          that.setData({
            fillerTrans: - (per - 0.5) * 360,
            fillerSpeed: per * 2 - 1,
          })
        }, 50)
      }, 1000)
    }
  }
})
