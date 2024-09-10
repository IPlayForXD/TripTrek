// pages/attractions/attraction_1/attractions_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDOTS: true, // 是否显示面板指示点  
    autoplay: false, // 是否自动切换  
    interval: 5000, // 自动切换时间间隔  
    duration: 500, // 滑动动画时长  
    background: [ 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/attractions/attraction_4/images/attractions_4/1.jpg',
    'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/attractions/attraction_4/images/attractions_4/2.jpg',
    'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/attractions/attraction_4/images/attractions_4/3.jpg',
    'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/attractions/attraction_4/images/attractions_4/4.jpg',
    ] ,
    likeIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (1).png', // 初始喜欢按钮图标
    collectIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏.png' // 初始收藏按钮图标
  },
// 判断用户是否已经喜欢当前页面
checkLike: function() {
  const db = wx.cloud.database();
  const openid = getApp().globalData.openid;
  const pageUrl = "/attraction_4/pages/attractions/attractions_4"; // 替换为页面的 URL
  
  db.collection('userLikes').where({
    _openid: openid,
    url: pageUrl
  }).get({
    success: res => {
      if (res.data.length > 0) {
        // 如果已经喜欢，则更新喜欢按钮图标
        this.setData({
          likeIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收 藏.png'
        });
      }
    },
    fail: err => {
      console.error('查询喜欢失败', err);
    }
  });
},

// 判断用户是否已经收藏当前页面
checkCollect: function() {
  const db = wx.cloud.database();
  const openid = getApp().globalData.openid;
  const pageUrl = "/attraction_4/pages/attractions/attractions_4"; // 替换为页面的 URL
  
  db.collection('userCollections').where({
    _openid: openid,
    url: pageUrl
  }).get({
    success: res => {
      if (res.data.length > 0) {
        // 如果已经收藏，则更新收藏按钮图标
        this.setData({
          collectIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (2).png'
        });
      }
    },
    fail: err => {
      console.error('查询收藏失败', err);
    }
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkLike();
    this.checkCollect();
  },

  collect: function(event) {
    // 判断当前页面的收藏状态
    if (this.data.collectIcon === 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (2).png') {
      // 如果已经收藏，则执行取消收藏的操作
      this.cancelCollect();
    } else {
      // 如果未收藏，则执行收藏的操作
      this.doCollect();
    }
  },
  
  like: function(event) {
    // 判断当前页面的喜欢状态
    if (this.data.likeIcon === 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收 藏.png') {
      // 如果已经喜欢，则执行取消喜欢的操作
      this.cancelLike();
    } else {
      // 如果未喜欢，则执行喜欢的操作
      this.doLike();
    }
  },  

  // 点击喜欢按钮事件处理函数
  doLike: function(event) {
    this.checkLike();
    // 如果已经喜欢，则不再重复上传
    if (this.data.likeIcon === 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收 藏.png') {
      return;
    }
    // 获取当前页面的信息
    const pageData = {
      url: "/attraction_4/pages/attractions/attractions_4",
      image: "cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/attractions/attraction_4/images/attractions_4/1.jpg",
    };

    // 将页面信息存储到云数据库中
    const openid = getApp().globalData.openid;
    const db = wx.cloud.database();
    db.collection('userLikes').add({
      data: pageData,
      openid: openid,
      success: res => {
        console.log('已添加到喜欢', res);
        // 提示用户操作成功
        wx.showToast({
          title: '已添加到喜欢',
          icon: 'success',
          duration: 1000
        });
        this.setData({
          likeIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收 藏.png'
        });
      },
      fail: err => {
        console.error('添加到喜欢失败', err);
      }
    });
  },

  // 点击收藏按钮事件处理函数
  doCollect: function(event) {
    // 判断用户是否已经收藏当前页面
    this.checkCollect();
    // 如果已经收藏，则不再重复上传
    if (this.data.collectIcon === 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (2).png') {
      return;
    }
    // 获取当前页面的信息
    const pageData = {
      url: "/attraction_4/pages/attractions/attractions_4",
      image: "cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/attractions/attraction_4/images/attractions_4/1.jpg",
    };

    // 将页面信息存储到云数据库中
    const openid = getApp().globalData.openid;
    const db = wx.cloud.database();
    db.collection('userCollections').add({
      data: pageData,
      openid: openid,
      success: res => {
        console.log('已添加到收藏', res);
        // 提示用户操作成功
        wx.showToast({
          title: '已添加到收藏',
          icon: 'success',
          duration: 1000
        });
        this.setData({
          collectIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (2).png'
        });
      },
      fail: err => {
        console.error('添加到收藏失败', err);
      }
    });
  },
// 取消收藏
cancelCollect() {
  const db = wx.cloud.database();
  const collection = db.collection('userCollections');
  const openid = getApp().globalData.openid;
  const pageUrl = "/attraction_4/pages/attractions/attractions_4"; // 替换为页面的 URL

  collection.where({
    _openid: openid,
    url: pageUrl
  }).get({
    success: res => {
      if (res.data.length > 0) {
        // 找到了要取消收藏的文档，获取其 ID 并执行删除操作
        const docId = res.data[0]._id; // 这里假设只有一个文档
        collection.doc(docId).remove({
          success: res => {
            console.log('取消收藏成功', res);
            this.setData({
              collectIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏.png'
            });
          },
          fail: err => {
            console.error('取消收藏失败', err);
          }
        });
      } else {
        console.log('未找到要取消收藏的文档');
      }
    },
    fail: err => {
      console.error('查询失败', err);
    }
  });
},

// 取消喜欢
cancelLike() {
  const db = wx.cloud.database();
  const collection = db.collection('userLikes');
  const openid = getApp().globalData.openid;
  const pageUrl = "/attraction_4/pages/attractions/attractions_4"; // 替换为页面的 URL

  collection.where({
    _openid: openid,
    url: pageUrl
  }).get({
    success: res => {
      console.log(res.data)
      if (res.data.length > 0) {
        // 找到了要取消喜欢的文档，获取其 ID 并执行删除操作
        const docId = res.data[0]._id; // 这里假设只有一个文档
        collection.doc(docId).remove({
          success: res => {
            console.log('取消喜欢成功', res);
            this.setData({
              likeIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (1).png'
            });
          },
          fail: err => {
            console.error('取消喜欢失败', err);
          }
        });
      } else {
        console.log('未找到要取消喜欢的文档');
      }
    },
    fail: err => {
      console.error('查询失败', err);
    }
  });
},

})