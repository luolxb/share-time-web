// pages/user/editUserinfo/phone/phone.js

let serverurl = getApp().serverurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ""
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
    this.setData({
      phone: getApp().globalData.userInfo.phone

    })
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
  handleText(ev) {
    let value = ev.detail.value;
    console.log(value)
    this.setData({
      phone: value
    });
  },
  hanleBtn() {
    this.updatephoneNumber();
  },
  updatephoneNumber() {
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast
      wx.showToast({
        icon: "none",
        title: '手机号不正确'
      })
      return;
    }
    wx.showLoading({
      title: '更新中',
    })

    console.log(getApp().globalData.openid)
    wx.request({
      url: serverurl + '/sysUser/updateUserInfo',
      method: "post",
      data: {
        openId: getApp().globalData.openid,
        signature: getApp().globalData.signature,
        avatarUrl: getApp().globalData.userInfo.avatarUrl,
        city: getApp().globalData.userInfo.city,
        country: getApp().globalData.userInfo.country,
        language: getApp().globalData.userInfo.language,
        nickName: getApp().globalData.userInfo.nickName,
        province: getApp().globalData.userInfo.province,
        phone: this.data.phone,
        gender: getApp().globalData.userInfo.gender
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading();
        // if (res.data.code != 0) {
        //   return;
        // }
        wx.showToast({
          icon: "none",
          title: res.data.msg,
        })
      }
    })


    getApp().globalData.userInfo.phone = this.data.phone;

  }
})