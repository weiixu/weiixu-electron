import profiles from '../../config/profiles';
profiles.newsPath = profiles.basePath
const API = {
  // ---------------News---------------
  // 一级栏目列表
  getNewsColList: profiles.newsPath + '/rest/news/web/getNewsColList',
  // 首页资讯列表
  getHomeNewsList: profiles.newsPath + '/rest/news/web/getHomeNewsList',
  // 二级栏目资讯列表
  getNewsList: profiles.newsPath + '/rest/news/web/getNewsList',
  // 获取新闻详情
  getNewsDetail: profiles.newsPath + '/rest/news/web/getNewsDetail',
  // 获取首页热门新闻
  getHomeNewsTop: profiles.newsPath + '/rest/news/web/getHomeNewsTop',
  // 获取热门新闻
  getHotNews: profiles.newsPath + '/rest/news/web/getHotNews',
  // 根据一级栏目id获取二级栏目列表
  getNode2ColList: profiles.newsPath + '/rest/news/web/getNode2ColList',
  // 二级栏目置顶资讯列表
  getNode2NewsTop: profiles.newsPath + '/rest/news/web/getNode2NewsTop',
  // 根据标签搜索资讯
  searchNewsByTagName: profiles.newsPath + '/rest/news/web/searchNewsByTagName',
  // 查询web二级栏目资讯列表更多
  getNode2NewsMoreList: profiles.newsPath + '/rest/news/web/getNode2NewsMoreList',
  // 获取系统时间接口
  getSystemTime: profiles.newsPath + '/rest/news/web/getSystemTime',
  // ----------------User------------------
  // 获取验证码
  getEmailCode: profiles.ssoPath + '/emailcode/regist',
  // 判断email是否存在
  getCheckRegistEmail: profiles.ssoPath + '/checkregistEmail',
  // 验证码是否有效
  getEmailCodeValid: profiles.ssoPath + '/emailcode/valid',
  // 注册事件
  submitRegister: profiles.ssoPath + '/enregist',
  // 获取个人信息
  getAccount: profiles.ssoPath + '/secure/rest/account',
  // 登录
  loginSubmit: profiles.ssoPath + '/enlogin',
  // 登出
  loginOut: profiles.ssoPath + '/secure/rest/logout',
  // 重置密码
  resetPassWord: profiles.ssoPath + '/enresetpwd',
  // 更换邮箱
  changeEmail: profiles.ssoPath + '/secure/rest/user/sendEmail',
  // 修改邮箱
  updateEmail: profiles.ssoPath + '/secure/rest/user/updateEmail',
  // 修改密码
  updatePwd: profiles.ssoPath + '/secure/rest/user/updatepwd',
  // 忘记密码获取验证码
  getEmailCodeReset: profiles.ssoPath + '/emailcode/reset'
}
export default API
