// app.js
App({
  onLaunch() {
    //云开发环境的初始化
    wx.redirectTo({
      url: "/pages/strat",
    })
    wx.cloud.init({
      env: "cloud1-4gbcbb614f3e02c0"
    })
    //获取用户的openid
    const that = this;
    wx.cloud.callFunction({
      name:'getOpenid',
      success:(res) => {
        console.log(res)
        const openid = res.result.openid
        const id = res.result.userInfo.openId
        that.globalData.openid = openid
        //查找数据库用户表里面是否有这个用户记录
        this.checkUser(openid,id);
      },
      fail: (error) => {
          console.error('获取用户 openid 失败：', error)
      }
    })
  },
  checkUser(openid,id) {
    const that = this;
    wx.cloud.database().collection('login_users').where({
      _openid: openid
    }).get({
      success: (result) => {
        console.log(result)
        console.log(id)
        const user = result.data.find(item => item._openid === id);
        if (user) {
          // 如果存在匹配的用户，直接设置全局用户信息
          that.globalData.userInfo = user;
          console.log('存在')
        } else {
          console.log('不存在')
        }
      },
      fail: (error) => {
        console.error('查询数据库失败:', error)
      }
    })
  },



  globalData: {
    userInfo: null,
    openid: null
  }
  
})
