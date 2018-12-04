// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import './utils'
import * as filters from './utils/filters'

import './style'
import './style/theme/element-variables.scss'

import container from '@/components/container';
import header from '@/components/header';
import main from '@/components/main';
import footer from '@/components/footer';
import table from '@/components/table';
import login from '@/components/login';
import successBox from '@/components/successBox';

Vue.use(ElementUI)

// 自定义组件
Vue.use(container)
Vue.use(header)
Vue.use(main)
Vue.use(footer)
Vue.use(table)
Vue.use(login)
Vue.use(successBox)

// 添加全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// eslint-disable-next-line
Es6Promise.polyfill()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

