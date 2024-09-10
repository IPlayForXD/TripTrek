// pages/admin/admin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newuser: false, // 用于存储接收到的数据  
    userInfo: {},
    currentIndex: 0 ,// 默认显示喜欢的内容
    likedContents: [], // 用户喜欢的内容
    favoriteContents: [], // 用户收藏的内容
    dynamicContents: [], // 用户动态的内容
    followingCount: 0,
    followerCount:0
  },
  getAvatar(event){
    console.log(event.detail.avatarUrl)
    let avatarUrl = event.detail.avatarUrl
    wx.cloud.uploadFile({
      cloudPath: `loginImages/${Math.random()}_${Date.now()}.${avatarUrl.match(/\.(\w+)$/)[1]}`,
      filePath:avatarUrl
    })
    .then(res=>{
      console.log(res.fileID)
      this.setData({
        avatarUrl:res.fileID
      })
    })
  },
    // 点击不同栏目显示不同内容
    showContent: function(event) {
      let index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      });
    },
    getUserFollowInfo: function () {
      const db = wx.cloud.database();
      const openid = app.globalData.userInfo._openid; // 获取当前用户的 openid
      console.log(app.globalData.userInfo._openid)
  
      // 查询粉丝数量
      db.collection('follows').where({
        followingId: openid
      }).count().then(res => {
        console.log(res)
        const followerCount = res.total;
        console.log('粉丝数量：', followerCount);
        this.setData({
          followerCount: followerCount
        });
      }).catch(err => {
        console.error('查询粉丝数量失败：', err);
      });
    
      // 查询关注数量
      db.collection('follows').where({
        followerId: openid
      }).count().then(res => {
        const followingCount = res.total;
        console.log('关注数量：', followingCount);
        this.setData({
          followingCount: followingCount
        });
      }).catch(err => {
        console.error('查询关注数量失败：', err);
      });
    },    
  login(event){
    console.log(event.detail.value.nickName)
    let nickName = event.detail.value.nickName
    if(!nickName){
      wx.showToast({
        title: '请填写昵称',
        icon:'error'
      })
      return
    }
    if(!this.data.avatarUrl){
      wx.showToast({
        title: '请上传头像',
        icon:'error'
      })
      return
    }
    var that = this;
    wx.cloud.database().collection('login_users').where({
      _openid: app.globalData.openid
    }).get({
      success(res){
        console.log(res)
        if(res.data.length!=0 || that.data.newuser){
          wx.cloud.database().collection('login_users').add({
            data: {
              num: Date.now(),
              avatarUrl:that.data.avatarUrl,
              nickName:nickName,
            },
            success(res){
              console.log(res)
              wx.showToast({
                title: '登录成功',
              })
              let userInfo = {}
              userInfo.avatarUrl = that.data.avatarUrl
              userInfo.nickName = nickName
              userInfo.followCount = 100; // 假设用户关注数为 100
              userInfo.fansCount = 200;   // 假设用户粉丝数为 200
              userInfo.footprintsCount = 300; // 假设用户足迹数为 300
              app.globalData.userInfo = userInfo;
              that.setData({
                userInfo
              })
            }
          })
        }else{
          that.setData({
            userInfo:res.data[0]
          })
        }
      }
    })
  },
  logout() {
    app.globalData.userInfo = null,
    this.setData({
      userInfo: null,
      avatarUrl: ''
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
      newuser: options.newuser === 'true' // 将字符串 'true' 转换为布尔值
    })
    this.getUserLikedContents();
    this.getUserFavoriteContents();
    this.getUserContents();

  },
getUserContents(){
  const db = wx.cloud.database();
  const openid = app.globalData.userInfo._openid;
  console.log('当前用户的openid：',openid)
  db.collection("posts").where({
    _openid:openid
  }).get({
    success:res=>{
      console.log('成功获取用户发布的内容',res.data)
      const dynamicContents = res.data.map(item => item);
      console.log(dynamicContents)
      this.setData({
        dynamicContents: dynamicContents
      });
    }
  })
},
// 获取用户喜欢的内容
getUserLikedContents() {
  const db = wx.cloud.database();
  const openid = app.globalData.userInfo._openid;

  db.collection('userLikes').where({
    _openid: openid
  }).get({
    success: res => {
      console.log('成功获取用户喜欢的内容', res.data);
      const likedContents = res.data.map(item => item);
      console.log(likedContents)
      this.setData({
        likedContents: likedContents
      });
    },
    fail: err => {
      console.error('获取用户喜欢的内容失败', err);
    }
  });
},

// 获取用户收藏的内容
getUserFavoriteContents() {
  const db = wx.cloud.database();
  const openid = app.globalData.userInfo._openid;

  db.collection('userCollections').where({
    _openid: openid
  }).get({
    success: res => {
      console.log('成功获取用户收藏的内容', res.data);
      const favoriteContents = res.data.map(item => item);
      console.log(favoriteContents)
      this.setData({
        favoriteContents: favoriteContents
      });
    },
    fail: err => {
      console.error('获取用户收藏的内容失败', err);
    }
  });
},
goToPostDetail: function (event) {
  const postId = event.currentTarget.dataset.id;
  console.log(event.currentTarget.dataset)
  console.log('跳转到帖子详情页面，postId:', postId); // 测试输出
  wx.navigateTo({
    url: '/pages/contents/contents?postId=' + postId,
  });
},
attraction(event) {
  const url = event.currentTarget.dataset.url;
  const image = event.currentTarget.dataset.id;
  
  if (url) {
    wx.navigateTo({
      url: url,
      success: res => {
        console.log('跳转成功');
      },
      fail: err => {
        console.error('跳转失败', err);
      }
    });
  } else {
    console.log(image)
    wx.cloud.database().collection("posts").where({
      image:image
    }).get({
      success:res=>{
        console.log(res.data[0]._id)
        const id = res.data[0]._id
        wx.navigateTo({
          url: '/pages/contents/contents?postId=' + id,
        });
      }
    })
  }
},

onShow: function() {
  this.getUserLikedContents();
  this.getUserFavoriteContents();
  this.getUserFollowInfo();
  this.getUserContents();
},

})