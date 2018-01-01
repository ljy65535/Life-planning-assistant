var app = getApp()
Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: ''
  },
 
  getLottery: function () {
    var that = this
    var awardIndex = Math.random() * 6 >>> 0;
    // 获取事件配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    
    console.log(awardIndex)
    // 旋转抽签
    app.runDegs = app.runDegs || 0
    console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
    console.log('deg', app.runDegs)
//创建动画实例
    var animationRun = wx.createAnimation({
      duration: 4000,//动画持续时间
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

    // 事件记录
    var winAwards = wx.getStorageSync('winAwards') || { data: [] }
    winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
    wx.setStorageSync('winAwards', winAwards)

    // 弹出窗口
    setTimeout(function () {
      wx.showModal({
        title: '还记得你的目标吗',
        content:  (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })
      if (awardsConfig.chance) {
        that.setData({
          btnDisabled: ''
        })
      }
    }, 4000);
  },
  onReady: function (e) {

    var that = this;

    // getAwardsConfig
    app.awardsConfig = {
      chance: true,
      awards: [
        { 'index': 0, 'name': '自己安排吧' },
        { 'index': 1, 'name': '休息10分钟吧' },
        { 'index': 2, 'name': '再抽一次' },
        { 'index': 3, 'name': '别想啦快学习吧' },
        { 'index': 4, 'name': '锻炼锻炼吧' },
        { 'index': 5, 'name': '学30分钟去' },
      ]
    }


    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
      len = awardsConfig.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len  // 文字旋转 turn 值
    that.setData({
      btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
    })
    var ctx = wx.createContext()
    for (var i = 0; i < len; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false);

      // 恢复前一个状态
      ctx.restore();
      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
    }
    //传递事件数据
    that.setData({
      awardsList: html
    });
  }
})
