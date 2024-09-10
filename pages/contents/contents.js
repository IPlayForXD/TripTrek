const db = wx.cloud.database(); // 获取数据库引用

Page({
  /**
   * 页面的初始数据
   */
  data: {
    post: {}, // 初始化帖子信息为空对象
    user: {}, // 初始化用户信息为空对象
    isFollowing: false, // 是否已关注
    currentUserId: '', // 当前用户的ID
    postUserId: '', // 帖子发布者的ID
    indicatorDots: true, // 是否显示面板指示点
    autoplay: false, // 是否自动切换
    interval: 5000, // 自动切换时间间隔
    duration: 500, // 滑动动画时长
    image: '',
    likeIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏 (1).png', // 初始喜欢按钮图标
    collectIcon: 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/icon/收藏.png', // 初始收藏按钮图标
    commentModalVisible: false,
    commentContent: '',
    id:'',
    comments: [], // 用于存储查询到的评论内容
  },
  checkComments(){
    wx.cloud.database().collection("comments").where({
      id:this.data.id
    }).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          comments: res.data
        });
      }
    })
  },
    // 点击确认评论按钮
    confirmComment() {
      // 这里可以处理评论内容的提交等逻辑
      console.log('评论内容：', this.data.commentContent);
      wx.cloud.database().collection("comments").add({
        data:{
          content: this.data.commentContent,
          id:this.data.id,
          avatarUrl:this.data.user.avatarUrl,
          nickName:this.data.user.nickName
        },
        success:res=>{
          console.log('评论上传成功', res);
          this.setData({
            commentContent: '',
            commentModalVisible: false
          });
          this.checkComments();
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.postId;
    this.setData({
      id:postId
    })
    this.getCurrentUserId();
    this.getPostData(postId);
    this.checkCollect();
    this.checkLike();
    this.checkComments();
  },
  onShow:function (options){
    this.checkComments();
  },

  /**
   * 获取当前用户的ID
   */
  getCurrentUserId: function () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        this.setData({
          currentUserId: res.result.openid
        });
        this.checkFollowStatus();
        this.checkLike();
        this.checkCollect();
      },
      fail: err => {
        console.error('获取当前用户ID失败：', err);
      }
    });
  },

  /**
   * 检查用户是否已经喜欢当前页面
   */
  checkLike: function () {
    const openid = this.data.currentUserId;
    const { image } = this.data;
    console.log(image)

    db.collection('userLikes').where({
      _openid: openid,
      image: image
    }).get({
      success: res => {
        if (res.data.length > 0) {
          // 如果存在该路径，则更新喜欢按钮图标
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

  /**
   * 检查用户是否已经收藏当前页面
   */
  checkCollect: function () {
    const openid = this.data.currentUserId;
    const { image } = this.data;
    console.log(image)

    db.collection('userCollections').where({
      _openid: openid,
      image: image
    }).get({
      success: res => {
        if (res.data.length > 0) {
          // 如果存在该路径，则更新收藏按钮图标
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
   * 处理喜欢和收藏操作
   */
  collect: function (event) {
    if (this.data.collectIcon.includes('收藏 (2).png')) {
      this.cancelCollect();
    } else {
      this.doCollect();
    }
  },

  like: function (event) {
    if (this.data.likeIcon.includes('收 藏.png')) {
      this.cancelLike();
    } else {
      this.doLike();
    }
  },

  /**
   * 执行喜欢操作
   */
  doLike: function (event) {
    this.checkLike();
    if (this.data.likeIcon.includes('收 藏.png')) {
      return;
    }

    const pageData = {
      image: this.data.image,
    };

    const openid = this.data.currentUserId;

    db.collection('userLikes').add({
      data: pageData,
      _openid: openid,
      success: res => {
        console.log('已添加到喜欢', res);
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

  /**
   * 执行收藏操作
   */
  doCollect: function (event) {
    this.checkCollect();
    if (this.data.collectIcon.includes('收藏 (2).png')) {
      return;
    }

    const pageData = {
      image: this.data.image,
    };

    const openid = this.data.currentUserId;

    db.collection('userCollections').add({
      data: pageData,
      _openid: openid,
      success: res => {
        console.log('已添加到收藏', res);
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

  /**
   * 取消收藏操作
   */
  cancelCollect: function () {
    const db = wx.cloud.database();
    const collection = db.collection('userCollections');
    const openid = this.data.currentUserId;

    collection.where({
      _openid: openid,
      image: this.data.image,
    }).get({
      success: res => {
        if (res.data.length > 0) {
          const docId = res.data[0]._id;
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

  /**
   * 取消喜欢操作
   */
  cancelLike: function () {
    const db = wx.cloud.database();
    const collection = db.collection('userLikes');
    const openid = this.data.currentUserId;

    collection.where({
      _openid: openid,
      image: this.data.image,
    }).get({
      success: res => {
        if (res.data.length > 0) {
          const docId = res.data[0]._id;
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

  /**
   * 获取帖子数据
   */
  getPostData: function (postId) {
    db.collection('posts').doc(postId).get({
      success: res => {
        const post = res.data;
        this.setData({
          post: post,
          postUserId: post._openid,
          image: post.image
        });
        this.getUserInfo(post._openid);
      },
      fail: err => {
        console.error('获取帖子信息失败：', err);
      }
    });
  },
    // 点击评论按钮，显示评论框
  showCommentModal() {
      this.setData({
        commentModalVisible: true
      });
    },
  
    // 点击取消按钮或者蒙层，隐藏评论框
    hideCommentModal() {
      this.setData({
        commentModalVisible: false
      });
    },
  
    // 监听输入评论内容
    inputComment(event) {
      this.setData({
        commentContent: event.detail.value
      });
    },
  /**
   * 获取用户信息
   */
  getUserInfo: function (userId) {
    db.collection('login_users').where({
      _openid: userId
    }).get({
      success: res => {
        this.setData({
          user: res.data[0]
        });
      },
      fail: err => {
        console.error('获取用户信息失败：', err);
      }
    });
  },

  /**
   * 检查关注状态
   */
  checkFollowStatus: function () {
    const { currentUserId, postUserId } = this.data;
    if (currentUserId && postUserId) {
      db.collection('follows').where({
        followerId: currentUserId,
        followingId: postUserId
      }).get({
        success: res => {
          if (res.data.length > 0) {
            this.setData({
              isFollowing: true
            });
          }
        },
        fail: err => {
          console.error('检查关注状态失败：', err);
        }
      });
    }
  },

  /**
   * 关注用户
   */
  followUser: function () {
    const { currentUserId, postUserId } = this.data;

    if (currentUserId !== postUserId) {
      const followsCollection = db.collection('follows');

      followsCollection.add({
        data: {
          followerId: currentUserId,
          followingId: postUserId,
          createdAt: new Date()
        },
        success: res => {
          console.log('关注用户成功：', res);
          this.setData({
            isFollowing: true
          });
        },
        fail: err => {
          console.error('关注用户失败：', err);
          wx.showToast({
            title: '关注用户失败，请稍后重试',
            icon: 'none'
          });
        }
      });
    } else {
      console.log('当前用户是帖子作者，无法关注自己');
    }
  },

  /**
   * 取消关注用户
   */
  unfollowUser: function () {
    const { currentUserId, postUserId } = this.data;
    const followsCollection = db.collection('follows');

    followsCollection.where({
      followerId: currentUserId,
      followingId: postUserId
    }).get({
      success: res => {
        if (res.data.length > 0) {
          const followId = res.data[0]._id;
          followsCollection.doc(followId).remove({
            success: res => {
              console.log('取消关注用户成功：', res);
              this.setData({
                isFollowing: false
              });
            },
            fail: err => {
              console.error('取消关注用户失败：', err);
              wx.showToast({
                title: '取消关注用户失败，请稍后重试',
                icon: 'none'
              });
            }
          });
        } else {
          console.log('关注关系数据不存在，无需取消关注');
        }
      },
      fail: err => {
        console.error('查询关注关系数据失败：', err);
      }
    });
  }
});
