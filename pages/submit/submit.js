const db = wx.cloud.database(); // 获取数据库引用
const app = getApp(); // 获取小程序实例
Page({
  // 页面的初始数据
  data: {
    title: '', // 标题
    content: '',// 内容
    image: '' ,// 图片路径
    address: '',
    latitude:'',
    longitude:'',
  },
  // 输入标题时触发
  inputTitle: function (event) {
    this.setData({
      title: event.detail.value
    });
  },
  // 输入内容时触发
  inputContent: function (event) {
    this.setData({
      content: event.detail.value
    });
  },

  // 选择图片

chooseImage: function () {
  wx.chooseImage({
    count: 1, // 限制只能选择一张图片
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
    success: res => {
      const tempFilePath = res.tempFilePaths[0];
      this.setData({
        image: tempFilePath
      });
    },
    fail: err => {
      console.error('选择图片失败', err);
    }
  });
},

submitForm: function () {
  console.log('标题:', this.data.title);
  console.log('内容:', this.data.content);
  console.log('图片:', this.data.image);
  console.log('点击了提交按钮');
  console.log('用户信息:', app.globalData.userInfo);

  // 检查用户是否登录
  if (!app.globalData.userInfo) {
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 2000
    });
    return;
  }

  // 检查是否选择了图片
  if (!this.data.image) {
    wx.showToast({
      title: '请上传图片',
      icon: 'none',
      duration: 2000
    });
    return;
  }


  // 上传图片到云存储
  const cloudPath = `posts/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}.png`;
  wx.cloud.uploadFile({
    cloudPath: cloudPath,
    filePath: this.data.image, // 选择图片的临时文件路径
    success: res => {
      const imageFileID = res.fileID;
      
      // 获取用户输入的标题和内容
      const formData = {
        title: this.data.title,
        content: this.data.content,
        image: imageFileID // 保存上传后的图片文件ID
      };

      // 将帖子数据上传到云数据库中的 posts 集合
      db.collection('posts').add({
        data: {
          title: formData.title,
          content: formData.content,
          image: formData.image,
          createTime: new Date(),
          openid: app.globalData.userInfo.openid ,// 上传用户的openid
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName
        },
        success: res => {
          wx.showToast({
            title: '发帖成功',
            icon: 'success',
            duration: 2000
          });
          // 发帖成功后，返回上一页
          wx.navigateBack({
          });
        },
        fail: err => {
          console.error('发帖失败', err);
        }
      });
    },
    fail: err => {
      console.error('上传图片失败', err);
      wx.showToast({
        title: '图片上传失败',
        icon: 'none',
        duration: 2000
      });
    }
  });
}

});
