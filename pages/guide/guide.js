// 坐标转换函数
function wgs84togcj02(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  }
  var dlat = transformlat(lng - 105.0, lat - 35.0);
  var dlng = transformlng(lng - 105.0, lat - 35.0);
  var radlat = lat / 180.0 * Math.PI;
  var magic = Math.sin(radlat);
  magic = 1 - 0.00669342162296594323 * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtmagic) * Math.PI);
  dlng = (dlng * 180.0) / (6378245.0 / sqrtmagic * Math.cos(radlat) * Math.PI);
  var mglat = lat + dlat;
  var mglng = lng + dlng;
  return [mglng, mglat];
}

function transformlat(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformlng(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
  return ret;
}

function out_of_china(lng, lat) {
  return (lng < 72.004 || lng > 137.8347) || (lat < 0.8293 || lat > 55.8271);
}

// pages/guide/guide.js
Page({
  data: {
    subKey: 'ERWBZ-XIOW5-RJYIC-I4OMN-J622S-7GBY2',
    enable3d: false,
    showLocation: false,
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolugon: false,
    enableSatellite: false,
    enableTraffic: false,
    latitude: '',
    longitude: '',
    circles: [],
    polylines: [],
    polygons: [],
    text:''
  },

  onLoad(options) {
    const {mapData} = options;
    console.log(options)
    this.loadMapData(mapData);
  },

  loadMapData(mapData) {
    wx.cloud.downloadFile({
      fileID: `cloud://cloud1-4gbcbb614f3e02c0.636c-cloud1-4gbcbb614f3e02c0-1324715525/mapData/${mapData}`,
      success: res => {
        console.log('下载文件成功:', res);
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath,
          encoding: 'utf8',
          success: fileRes => {
            try {
              const data = fileRes.data;
              console.log('读取文件成功:', data); // 打印原始数据
              const map = JSON.parse(data);
              console.log('解析后的数据:', map); // 打印解析后的数据
              if (map.polyline) {
                const polyline = map.polyline.map(line => {
                  return {
                    ...line,
                    points: line.points.map(point => {
                      const [lng, lat] = wgs84togcj02(point.longitude, point.latitude);
                      return { longitude: lng, latitude: lat };
                    })
                  };
                });
                console.log(polyline)
                console.log(map.latitude)
                console.log(map.longitude)
                this.setData({
                  polylines: polyline, // 确保设置正确的属性名
                  latitude: map.latitude,
                  longitude:map.longitude,
                  text:map.text
                });
              } else {
                console.error('数据格式不正确:', map);
              }
            } catch (e) {
              console.error('解析JSON失败:', e);
            }
          },
          fail: err => {
            console.error('读取文件失败:', err);
          }
        });
      },
      fail: err => {
        console.error('下载文件失败:', err);
      }
    });    
  },
});
