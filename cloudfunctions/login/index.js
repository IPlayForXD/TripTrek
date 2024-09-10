// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化云开发环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 自动匹配当前云环境
})

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    openid: wxContext.OPENID
  }
}
