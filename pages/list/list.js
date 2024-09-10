// pages/list/list.js
Page({
  data: {
    postList: [], // 初始化帖子列表为空数组
    openid:''
  },
  onLoad: function () {
    // 从云数据库获取帖子列表数据
    this.getPostList();
  },
  // 获取帖子列表数据
  getPostList: function () {
    wx.cloud.database().collection('posts').get({
      success: res => {
        console.log(res)
        console.log(res.data)
        // 更新页面数据，渲染帖子列表
        this.setData({
          postList: res.data,
        });
      },
      fail: err => {
        console.error('获取帖子列表失败', err);
      }
    });
  },
    // 点击发帖按钮，跳转到发帖页面
    goToPostPage: function () {
      wx.navigateTo({
        url: '/pages/submit/submit',
        success: () => {
          console.log('成功')
          // 发帖成功后刷新页面
          this.getPostList();
        }
      });
    },
    goToPostDetail: function (event) {
      const postId = event.currentTarget.dataset.id;
      console.log(event.currentTarget.dataset.id)
      console.log('跳转到帖子详情页面，postId:', postId); // 测试输出
      wx.navigateTo({
        url: '/pages/contents/contents?postId=' + postId,
      });
    },
    onShow(){
      this.getPostList();
    }
});


