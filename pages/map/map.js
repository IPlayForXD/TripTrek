// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  handleSearchInput(e) {
    console.log(e.detail.value)
    this.setData({
      keyword: e.detail.value
    });
  },
  handleSearch(){
    const keyword = this.data.keyword
    const markers = this.data.markers
    const searchResult = markers.filter(marker => {
     return marker.name.includes(keyword);
    });
    console.log(searchResult)
    this.setData({
      searchResult: searchResult
    });
    const points = searchResult.map(marker => ({
      latitude: marker.latitude,
      longitude: marker.longitude
    }));
    console.log(points)
    wx.createMapContext('map').includePoints({
      points: points,
      padding: [50, 50, 50, 50] // 可选，设置边距，确保所有标记点都在可视范围内
    });
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



  markPlaces(places) {
    const mapCtx = wx.createMapContext('map');
    const markers = places.map(place => ({
      id: place.id,
      latitude: place.latitude,
      longitude: place.longitude,
      title: place.name,
      iconPath: '/images/icon/location.png',
      width: 32,
      height: 32
    }));
    mapCtx.addMarkers({
      markers,
      fail: err => {
        console.error('添加标记失败', err);
      }
    });
  },
  
  data: {
    subKey: 'ERWBZ-XIOW5-RJYIC-I4OMN-J622S-7GBY2',
    enable3d: false,
    showLocation: true,
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolugon: false,
    enableSatellite: false,
    enableTraffic: false,
    latitude: '35.941729',
    longitude: '104.155593',
    markers: [{
      'id': 1,
      'name': '兰州',
      'latitude': 	36.0570,
      'longitude': 	103.8236,
      'iconPath': '/images/icon/location.png',
      'width': 32,
      'height': 32,
      'sights': [
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/14.jpg',
          'bind' : 'attraction_14'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/15.jpg',
        'bind' : 'attraction_15'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/16.jpg',
        'bind' : 'attraction_16'
        },
      ]
    },{
      'id': 2,
      'name': '重庆',
      'latitude': 29.5667,
      'longitude': 	106.5515,
      'iconPath': '/images/icon/location.png',
      'width': 32,
      'height': 32,
      'sights': [
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/5.jpg',
          'bind' : 'attraction_5'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/6.jpg',
        'bind' : 'attraction_6'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/7.jpg',
        'bind' : 'attraction_7'
        },
      ]
    },{
      'id': 3,
      'name': '成都',
      'latitude': 30.657318268655814,
      'longitude': 104.06471840600852,
      'iconPath': '/images/icon/location.png',
      'width': 32,
      'height': 32,
      'sights': [
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/8.jpg',
          'bind' : 'attraction_8'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/9.jpg',
        'bind' : 'attraction_9'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/10.jpg',
        'bind' : 'attraction_10'
        },
      ]
    },{
      'id': 4,
      'name': '杭州',
      'latitude':  30.256980852252894,
      'longitude': 120.20724910838686,
      'iconPath': '/images/icon/location.png',
      'width': 32,
      'height': 32,
      'sights': [
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/11.jpg',
        'bind' : 'attraction_11'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/12.jpg',
        'bind' : 'attraction_12'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/13.jpg',
        'bind' : 'attraction_13'
        },
      ]
    },
    {
      'id': 5,
      'name': '甘南',
      'latitude':  34.98448620124155,
      'longitude': 102.90979173228612,
      'iconPath': '/images/icon/location.png',
      'width': 32,
      'height': 32,
      'sights': [
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/1.jpg',
        'bind' : 'attraction_1'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/2.jpg',
        'bind' : 'attraction_2'
        },
      ]
    },
    {
      'id': 6,
      'name': '西宁',
      'latitude':  36.61747779455441,
      'longitude': 101.77623208062522,
      'iconPath': '/images/icon/location.png',
      'width': 32,
      'height': 32,
      'sights': [
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/3.jpg',
        'bind' : 'attraction_3'
        },
        {'src' : 'cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/home/attractions/4.jpg',
        'bind' : 'attraction_4'
        },
      ]
    },
    ],
    circles: [],
    polylines: [],
    polygons: [],
    showDialog: false,
    keyword: '',
    currentMarker: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const keyword = options.keyword;
    console.log('搜索关键字:', keyword);
    if (keyword) {
      this.searchPlaces(keyword);
    }
  },
  searchPlaces(keyword) {
    // 发送请求给后端，搜索匹配的地点
    wx.cloud.callFunction({
      name: 'searchPlaces',
      data: {
        keyword: keyword
      },
      success: res => {
        console.log('搜索成功', res.result);
        // 在地图上标记搜索到的地点
        const places = res.result;
        this.markPlaces(places);
      },
      fail: err => {
        console.error('搜索失败', err);
      }
    });
  },
  markPlaces(places) {
    const mapCtx = wx.createMapContext('map');
    const markers = places.map(place => ({
      id: place.id,
      latitude: place.latitude,
      longitude: place.longitude,
      title: place.name,
      iconPath: '/images/icon/location.png',
      width: 32,
      height: 32
    }));
    mapCtx.addMarkers({
      markers,
      fail: err => {
        console.error('添加标记失败', err);
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const map = wx.createMapContext("map");
    map.moveToLocation();
  },

  handleMarkerTap(e) {
    console.log(e);
    const marker = this.data.markers.find(item => item.id == e.markerId);
    marker && this.setData({
      currentMarker: marker,
      showDialog: true
    });
  },
  app() {
    const latitude = this.data.currentMarker.latitude;
    const longitude = this.data.currentMarker.longitude;
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    });
  },
  map_plugin() {
    let plugin = requirePlugin('routePlan');
    let key = 'ERWBZ-XIOW5-RJYIC-I4OMN-J622S-7GBY2';  //使用在腾讯位置服务申请的key
    let referer = 'wx7ad1963fe697091e';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': this.data.currentMarker.name,
        'latitude': this.data.currentMarker.latitude,
        'longitude': this.data.currentMarker.longitude
    });
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  }
})