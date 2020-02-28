//app.js
App({
  onLaunch:function(){
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.info(res)
      },
      fail:function(res){
        console.info(res)
      }
    })
  },

  globalData: {
    userInfo: null,
    openid: null,
    signature:null
  },
  serverurl: "http://192.168.1.106:8088",
})