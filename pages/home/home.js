Page({  
  data: {  
    indicatorDOTS: true, // 是否显示面板指示点  
    autoplay: true, // 是否自动切换  
    interval: 5000, // 自动切换时间间隔  
    duration: 500, // 滑动动画时长  
    background: [ 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/swip/beach.jpg',
    'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/swip/sunrise.jpg'
    ]  
  },  
  map(){
    wx.navigateTo({
      url: '/pages/map/map'
    });    
  },
  luntan() {
    wx.navigateTo({
      url: '/pages/list/list'
    }); 
  },
  ai() {
    wx.navigateTo({
      url: '/pages/ai/ai',
    })
  },
  hotel() {
    wx.navigateToMiniProgram({
	    appId: 'wx336dcaf6a1ecf632',
	    envVersion: 'release', 
	    success(res) {
	      console.log("跳转小程序成功！",res);
	    } 
	})
  },
  recommend(){
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },
  onLoad(options) {

  },
  attraction_1() {  
    wx.navigateTo({  
      url: '/attraction_1/pages/attractions/attraction_1',
      success(res) {  
        console.log('成功跳转到 attractions_1 页面')  
      },  
      fail(err) {  
        console.error('跳转到 attractions_1 页面失败', err)  
      }  
    });  
  },
  attraction_2() {
    wx.navigateTo({
      url: '/attraction_2/pages/attractions/attractions_2',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_3() {
    wx.navigateTo({
      url: '/attraction_3/pages/attractions/attractions_3',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_4() {
    wx.navigateTo({
      url: '/attraction_4/pages/attractions/attractions_4',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_5() {
    wx.navigateTo({
      url: '/attraction_5/pages/attractions/attractions_5',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_6() {
    wx.navigateTo({
      url: '/attraction_6/pages/attractions/attractions_6',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_7() {
    wx.navigateTo({
      url: '/attraction_7/pages/attractions/attractions_7',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_8() {
    wx.navigateTo({
      url: '/attraction_8/pages/attractions/attractions_8',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_9() {
    wx.navigateTo({
      url: '/attraction_9/pages/attractions/attractions_9',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_10() {
    wx.navigateTo({
      url: '/attraction_10/pages/attractions/attractions_10',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_11() {
    wx.navigateTo({
      url: '/attraction_11/pages/attractions/attractions_11',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_12() {
    wx.navigateTo({
      url: '/attraction_12/pages/attractions/attractions_12',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_13() {
    wx.navigateTo({
      url: '/attraction_13/pages/attractions/attractions_13',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_14() {
    wx.navigateTo({
      url: '/attraction_14/pages/attractions/attractions_14',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_15() {
    wx.navigateTo({
      url: '/attraction_15/pages/attractions/attractions_15',
      success(res){
        console.log('成功')
      }
    })
  },
  attraction_16() {
    wx.navigateTo({
      url: '/attraction_16/pages/attractions/attractions_16',
      success(res){
        console.log('成功')
      }
    })
  },
  
});