import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store';

let router = {
  // mode: 'history', // 需后端支持
  routes: [{
    path: '/',
    name: '/',
    redirect: '/Index', // 重定向
    component: resolve => { require(['@/views/layout/wrap'], resolve) },
    meta: {
      title: 'Admin'
    },
    children: [{
      path: 'Index',
      name: 'Index',
      component: resolve => { require(['@/views/home/index'], resolve) }
    }, {
      path: 'News',
      name: 'News',
      component: resolve => { require(['@/views/news/index'], resolve) }
    }, {
      path: 'Search',
      name: 'Search',
      component: resolve => { require(['@/views/news/search'], resolve) }
    }, {
      path: 'PersonalCenter',
      name: 'PersonalCenter',
      component: resolve => { require(['@/views/user'], resolve) }
    }, {
      path: 'SignUp',
      name: 'SignUp',
      component: resolve => { require(['@/views/user/signUp'], resolve) }
    }, {
      path: 'Form',
      name: 'Form',
      component: resolve => { require(['@/views/form/index'], resolve) }
    }]
  }, {
    path: '/404',
    name: '404',
    component: resolve => { require(['@/views/layout/404'], resolve) }
  }]
}

Vue.use(Router)
const self = Vue.prototype
router = new Router(router)
// 需要登录状态才能访问的页面
const needLoginList = ['/PersonalCenter']
router.beforeEach((to, from, next) => {
  // 登录后访问的页面
  if (needLoginList.indexOf(to.path) !== -1) {
    self.$http.get(self.API.getAccount).then(response => {
      // console.log(response)
      if (response.data.code === '000000') {
        /* 路由变化修改title */
        if (to.meta.title) {
          document.title = to.meta.title
        }
        next()
      } else {
        next(from.path)
      }
    })
  } else {
    // 如果未匹配到路由
    if (to.matched.length === 0) {
      // 如果上级也未匹配到路由则跳转页面，如果上级能匹配到则转上级路由
      from.name ? next({ name: from.name }) : next('/404')
    } else {
      /* 路由变化修改title */
      if (to.meta.title) {
        document.title = to.meta.title
      }
      next()
    }
  }
})
router.afterEach(() => {
  window.scrollTo(0, 0)
  // 获取最新系统时间
  // self.$http.get(self.API.getSystemTime).then(response => {
  //   // console.log(response)
  //   if (response.data.code === '000000') {
  //     store.commit('setSystemTime', response.data.data)
  //   }
  // })
})

export default router
