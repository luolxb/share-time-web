// pages/login/login.js
let serverurl = getApp().serverurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid :"",
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindGetUserInfo(ev) {
    // console.log(ev)
    wx.showLoading({
      title: '登录中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 5000)

    let userInfo = ev.detail.userInfo;
    this.setData({
      userInfo: userInfo
    })

    // 发送登录请求到后台
    this.wxlogin();
  },

  // 手机号登陆
  phonelogin: function(ev) {
    console.log(ev)
    wx.navigateTo({
      url: '/pages/phonelogin/phonelogin',
    })
  },

  wxlogin: function() {
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: serverurl + "/sysUser/weixinLogin",
            data: {
              code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function(openIdRes) {
              console.info("openId：", openIdRes.data.msg);
              that.setData({
                openid: openIdRes.data.msg
              })

              that.login();
            },
            fail: function(error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })
  },

  login: function() {
    var userInfo = this.data.userInfo;
    wx.request({
      url: serverurl + '/sysUser/registerOrLogin',
      method: "post",
      data: {
        openId: this.data.openid,
        signature: userInfo.signature,
        avatarUrl: userInfo.avatarUrl,
        city: userInfo.city,
        country: userInfo.country,
        language: userInfo.language,
        nickName: userInfo.nickName,
        province: userInfo.province,
        gender: userInfo.gender
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.code != 0) {
          return;
        }
        wx.showToast({
          title: '登录成功',
        })
        console.log(res.data.data)
        getApp().globalData.userInfo = res.data.data;
        getApp().globalData.openid = res.data.data.openId;

        wx.setStorage({
          key: "userInfo",
          data: res.data.data
        });

        wx.setStorage({
          key: 'openid',
          data: res.data.data.openId,
        })

        // 登录成功后跳转到用户页面
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    })
  }
})