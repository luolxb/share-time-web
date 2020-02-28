// pages/user/editUserinfo/head/head.js

let serverurl = getApp().serverurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: ""

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
      avatarUrl: getApp().globalData.userInfo.avatarUrl
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
  handleUploadImage() {

    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url: serverurl + '/sysUser/uploadPice',
          filePath: tempFilePaths,
          name: 'file',
          success: function(res) {
            var jsonObj = JSON.parse(res.data);
            console.log(jsonObj)
            that.setData({
              avatarUrl: serverurl + jsonObj.msg
            })
          }
        })
      }
    })
  },
  hanleBtn() {
    this.updatePhoto(this.data.avatarUrl);
  },

  updatePhoto(avatarUrl) {
    wx.showLoading({
      title: '更新中',
    })

    wx.request({
      url: serverurl + '/sysUser/updateUserInfo',
      method: "post",
      data: {
        openId: getApp().globalData.openid,
        signature: getApp().globalData.signature,
        avatarUrl: avatarUrl,
        city: getApp().globalData.userInfo.city,
        country: getApp().globalData.userInfo.country,
        language: getApp().globalData.userInfo.language,
        nickName: getApp().globalData.userInfo.nickName,
        province: getApp().globalData.userInfo.province,
        phone: getApp().globalData.userInfo.phone,
        gender: getApp().globalData.userInfo.gender
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
        })
      }
    })


    getApp().globalData.userInfo.avatarUrl = this.data.avatarUrl;

  },
  bindGetUserInfo(ev) {
    let userInfo = ev.detail.userInfo;
    // console.log(userInfo)
    this.setData({
      avatarUrl: userInfo.avatarUrl
    })
    this.updatePhoto(this.data.avatarUrl)
  }
})