Page({
  data: {
    spots: [],
    cities: ["重庆", "成都", "杭州", "兰州"], // 支持的城市列表
    selectedCity: "成都", // 默认选中的城市
    points: [] // 存放推荐攻略的数组
  },
  onLoad: function () {
    // 页面加载时加载默认城市的攻略
    this.getStrategiesByCity(this.data.selectedCity);
  },
  changeCity: function (event) {
    const city = event.currentTarget.dataset.city;
    console.log(city)
    this.setData({
      selectedCity: city
    });
    // 根据选择的城市加载对应地区的攻略
    this.getStrategiesByCity(city);
  },
  // 根据城市从数据库中获取攻略数据
  getStrategiesByCity: function (city) {
    wx.cloud.database().collection('points').where({
      city: city
    }).get().then(res => {
      console.log(res.data);
      this.setData({
        points: res.data
      });
    }).catch(err => {
      console.error("获取攻略数据失败：", err);
      wx.showToast({
        title: '加载攻略数据失败',
        icon: 'none',
        duration: 2000
      });
    });
  },
  navigateToSpot(event) {
    const spot = event.currentTarget.dataset.spot;
    console.log(spot.name)
    if (!spot || !spot.mapData || !spot.name) {
      console.error('Invalid spot data');
      wx.showToast({
        title: '无效的景点数据',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/guide/guide?mapData=${encodeURIComponent(spot.mapData)}`,
      fail: function (err) {
        console.error('Navigation failed: ', err);
        wx.showToast({
          title: '导航失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});
