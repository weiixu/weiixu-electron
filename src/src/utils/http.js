import axios from 'axios'
import Vue from 'vue'
import store from '../store';

// 配置请求,IE不缓存
const isIE = !!window.ActiveXObject || 'ActiveXObject' in window;
if (isIE) {
  const defaultHeaders = {
    // Accept: 'application/json, text/plain, */*; charset=utf-8',
    // 'Content-Type': 'application/json; charset=utf-8',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache'
  }
  // 设置默认头
  Object.assign(axios.defaults.headers.common, defaultHeaders)
}

// import { getToken } from '@/utils/auth'
Vue.prototype.$http = axios.create({
  // withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// http request 拦截器
Vue.prototype.$http.interceptors.request.use(
  config => {
    const token = store.state.user.token || localStorage.getItem('tokenLoginKey');
    // console.log('interceptors token: ' + token)
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['x-requested-with'] = token;
    }
    // IE不缓存
    if (isIE) {
      if (!config.params) {
        config.params = {}
      }
      config.params._ = new Date().getTime()
    }
    // console.log(config)
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// http response 拦截器
Vue.prototype.$http.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.code === '100000') {
      store.commit('logout');
      localStorage.setItem('tokenLoginKey', '')
      // 获取用户信息接口不提示登录框
      if (response.config.url.indexOf('secure/rest/account') === -1) {
        store.commit('showLogin', true);
      }
    } else if (response.data.code === '800000') {
      Vue.prototype.$notify({
        title: 'Notify',
        position: 'bottom-right',
        duration: 0,
        message: response.data.message
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  })
