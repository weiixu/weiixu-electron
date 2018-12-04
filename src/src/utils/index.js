import Vue from 'vue'
import API from './api'
import './http'
import { formatDate, handleValue } from './util'

Vue.prototype.$formatDate = formatDate
Vue.prototype.$handleValue = handleValue
Vue.prototype.API = API

// freeze 让对象只读, 防止属性被直接修改
Object.freeze(Vue.API);
Object.defineProperty(Vue, 'API', {
  configurable: false, // configurable 防止属性被重新定义
  writable: false // writable 防止属性被重新赋值
});
// console.log(Object.getOwnPropertyDescriptor(Vue, 'API'));
