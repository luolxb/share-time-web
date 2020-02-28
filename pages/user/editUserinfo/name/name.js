// pages/user/editUserinfo/name/name.js

let serverurl = getApp().serverurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: ""
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
      nickName: getApp().globalData.userInfo.nickName
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
    this.setData({
      nickName: value
    })
  },
  hanleBtn() {
    this.updateNickName(this.data.nickName);
  },
  updateNickName(nickName) {
    wx.showLoading({
      title: '更新中',
    })

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
        nickName: this.data.nickName,
        province: getApp().globalData.userInfo.province,
        phone: getApp().globalData.userInfo.phone,
        gender: getApp().globalData.userInfo.gender
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
          title: '更新成功',
        })
      }
    })


    getApp().globalData.userInfo.nickName = this.data.nickName;
  },
  bindGetUserInfo(ev) {
    let userInfo = ev.detail.userInfo;
    this.setData({
      nickName: userInfo.nickName
    })
    this.updateNickName(userInfo.nickName)
  }
})