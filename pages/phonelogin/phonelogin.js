// pages/phonelogin/phonelogin.js
let serverurl = getApp().serverurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "",
    phone: "",
    disabled: false,
    codename: '获取验证码'
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

  phoneinput: function(ev) {
    let phone = ev.detail.value;

    this.setData({
      phone: phone
    })
  },

  codebtn: function() {
    this.sendCode()
  },

  sendCode: function() {
    let phone = this.data.phone;
    console.log(phone)
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast
      wx.showToast({
        icon: "none",
        title: '手机号不正确'
      })
      return;
    }

    // 发送获取严重吗请求到后端
    console.log(serverurl)
    var that = this;
    wx.request({
      url: serverurl + '/sysUser/getCode?phone=' + this.data.phone,
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == 0) {
          // 登录成功跳转 
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            code: res.data.data
          })

          that.getVerificationCode();
        }
      }
    })
  },

  //button
  getVerificationCode: function() {
    var that = this
    var num = 60;
    that.setData({
      codename: num + "s",
      disabled: true

    })
    var timer = setInterval(function() {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        that.setData({
          codename: '重新发送',
          disabled: false
        })
      } else {
        that.setData({
          codename: num + "s",
          disabled: true
        })
      }
    }, 1000)
  },

  codeinput:function(ev){
    let code = ev.detail.value;

    this.setData({
      code: code
    })
  },
  hanleBtn:function() {
    if (this.data.phone == "" ) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast
      wx.showToast({
        icon: "none",
        title: '手机号不正确'
      })
      return;
    }

    if (this.data.code == "" ) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      });
    }
    var that = this;
    wx.request({
      url: serverurl + '/sysUser/valid',
      method: "POST",
      data:{
        mobile:that.data.phone,
        validCode:that.data.code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == 0) {
         wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          });
          getApp().globalData.userInfo = res.data.data;
          getApp().globalData.openid = res.data.data.openId;
          getApp().globalData.userInfo.nickName = res.data.data.nickName;
          if (res.data.data.avatarUrl == null){
            getApp().globalData.userInfo.avatarUrl = "/images/user/user-unlogin.png";
          }else{
            getApp().globalData.userInfo.avatarUrl = res.data.data.avatarUrl;
          }

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

        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }
})