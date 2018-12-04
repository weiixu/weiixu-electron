<template>
  <div class="ww-wrap ww-wrap-fixed">
    <ww-header ref='header'>
      <ww-container>
        <div class="ww-header-logo">
          <router-link to="/">
            Admin
            <!-- <span class="icon-logo"></span> -->
          </router-link>
        </div>
        <el-tabs class="ww-header-navbar ww-tabs" v-model="activeName" @tab-click="handleTabsClick" v-show="!hideNavbar">
          <el-tab-pane :label="item.colName" :name="item.colId + ''" v-for="(item,index) in navBarTabs" :key="index"></el-tab-pane>
        </el-tabs>
        <div class="ww-header-login" v-show="!userToken"><i class="icon-user_o" @click="login"></i></div>
        <ul class="ww-header-tool" v-show="!hideNavbar">
          <li class="user-login" v-show="!userToken">
            <!-- <router-link to="/Login" >Log in</router-link> -->
            <a href="javascript:;" @click="login">Log in</a>
          </li>
          <li v-show="!userToken">
            <router-link to="/SignUp">Sign up</router-link>
          </li>
          <li class="user-info" :class="{'active':showUserInfo}" v-show="userToken">
            <a>Hi, {{userName}} <i class="icon-down"></i></a>
            <ul class="user-info-dropdown">
              <li>
                <router-link to="/PersonalCenter">Personal center</router-link>
              </li>
              <li><a class="user-logout" href="javascript:void(0);" @click.prevent="logout">Log out</a></li>
            </ul>
          </li>
        </ul>
      </ww-container>
    </ww-header>
    <ww-main ref='main' class="ww-main">
      <el-container>
        <el-aside class="ww-aside" style="width:200px; ">
          <el-scrollbar style="height:100%">
            <el-menu :default-openeds="defaultOpeneds" :default-active="defaultActive" class="el-menu-vertical-demo" router background-color="#272D34" text-color="#fff" @open="handleOpen" @close="handleClose">
              <template v-for="item in menuData">
                <el-submenu :index="item.path" :key="item.path" v-if="item.key">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item :index="li.path" v-for="li in item.son" :key="li.path">
                    <template slot="title">
                      <i :class="li.icon"></i>
                      <span>{{li.name}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.path" :key="item.path" v-else>
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main class="ww-main-body">
          <ww-container>
            <router-view @hide-navbar="handleNavbar" />
          </ww-container>
        </el-main>
      </el-container>
    </ww-main>
    <!--   <ww-footer ref='footer'>
      <ww-container>
        <ul class="ww-footer-navbar">
          <li>
            <router-link to="/ContactUs">Contact Us</router-link>
          </li>
          <li>
            <router-link to="/ProductsServices">Products Services</router-link>
          </li>
          <li>
            <router-link to="/PrivacyPolicy">Privacy Policy</router-link>
          </li>
        </ul>
        <div class="ww-footer-copy-rights">Shanghai Metal Website Limited. All rights reserved.</div>
      </ww-container>
    </ww-footer> -->
    <ww-login ref="GjLogin"></ww-login>
  </div>
</template>
<script>
export default {
  name: 'WwWrap',
  data() {
    return {
      activeName: '',
      // isCollapse: false,
      defaultActive: '/index',
      defaultOpeneds: ['/Index/orders'],
      menuData: [{
        'name': '首页',
        'path': '/Index',
        'icon': 'el-icon-menu',
        'key': false,
        'son': []
      }, {
        'name': '选项1',
        'path': '/Index/orders1',
        'icon': 'el-icon-message',
        'key': true,
        'son': [{
          'name': '次选项',
          'path': '/Index/orders/orderCheck'
          // 'icon': 'el-icon-menu'
        }, {
          'name': '次选项',
          'path': '/Index/orders/finanCheck'
          // 'icon': 'el-icon-menu'
        }, {
          'name': '次选项',
          'path': '/Index/orders/allOrders'
          // 'icon': 'el-icon-menu'
        }]
      }, {
        'name': '表单',
        'path': '/Form',
        'icon': 'el-icon-menu',
        'key': true,
        'son': [{
          'name': '表单',
          'path': '/Form'
          // 'icon': 'el-icon-menu'
        }]
      }, {
        'name': '选项3',
        'path': '/Index/power3',
        'icon': 'el-icon-setting',
        'key': false,
        'son': []
      }, {
        'name': '选项4',
        'path': '/Index/finanCount4',
        'icon': 'el-icon-menu',
        'key': false,
        'son': []
      }, {
        'name': '选项5',
        'path': '/Index/power5',
        'icon': 'el-icon-setting',
        'key': false,
        'son': []
      }, {
        'name': '选项6',
        'path': '/Index/finanCount6',
        'icon': 'el-icon-menu',
        'key': false,
        'son': []
      }, {
        'name': '选项7',
        'path': '/Index/power7',
        'icon': 'el-icon-setting',
        'key': false,
        'son': []
      }, {
        'name': '选项8',
        'path': '/Index/finanCount8',
        'icon': 'el-icon-menu',
        'key': false,
        'son': []
      }, {
        'name': '选项9',
        'path': '/Index/power9',
        'icon': 'el-icon-setting',
        'key': false,
        'son': []
      }, {
        'name': '选项10',
        'path': '/Index/finanCount10',
        'icon': 'el-icon-menu',
        'key': false,
        'son': []
      }, {
        'name': '选项11',
        'path': '/Index/power11',
        'icon': 'el-icon-setting',
        'key': false,
        'son': []
      }, {
        'name': '选项12',
        'path': '/Index/finanCount12',
        'icon': 'el-icon-menu',
        'key': false,
        'son': []
      }],
      showUserInfo: false,
      hideNavbar: false,
      navBarTabs: [{
        colId: '000',
        colName: 'menu'
      }, {
        'colId': 1007,
        'colName': 'menu'
      }]
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    showLogin() {
      return this.$store.state.showLogin;
    },
    userToken() {
      return this.$store.state.user.token;
    }
  },
  watch: {
    $route: function (value) {
      // console.log(value)
      this.initPage();
    },
    showLogin: function (value) {
      const oLogin = this.$refs.GjLogin;
      oLogin.showLogin = value
      // console.log(oLogin)
      if (oLogin.$refs.loginForm) {
        // oLogin.$refs.loginForm.clearValidate()
        if (typeof oLogin.$refs.loginForm.resetFields === 'function') {
          oLogin.$refs.loginForm.resetFields()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.initPage();
    // this.$store.commit('showLogin');
    this.resize();
    // 已登录，调用用户信息
    if (localStorage.getItem('tokenLoginKey')) {
      this.getAccount()
    }
  },
  methods: {
    initPage() {
      this.selectTabsActive()
      setTimeout(() => {
        this.layoutFix(true);
      }, 100);
    },

    handleOpen(value) {
      console.log(value)
    },
    handleClose(value) {
      console.log(value)
    },
    handleNavbar(value) {
      // console.log(value)
      this.hideNavbar = value
    },
    // 选中菜单项
    selectTabsActive() {
      for (var i = 0; i < this.navBarTabs.length; i++) {
        const item = this.navBarTabs[i]
        if (this.$route.name.toLowerCase() === 'home') {
          this.activeName = '000'
          break
        } else if ((item.colId + '') === (this.$route.query.colId + '')) {
          this.activeName = item.colId + ''
          break
        } else {
          this.activeName = ''
        }
      }
    },
    handleTabsClick(tab) {
      // this.tabIndex = tab.index
      const item = this.navBarTabs[tab.index]
      // console.log(item);
      if (tab.index === '0') {
        this.$router.push('/')
      } else if (tab.index === '1') {
        this.$router.push({
          path: 'NewsList',
          query: {
            colId: item.colId,
            colType: item.colType,
            parentId: item.colId
          }
        })
      } else {
        this.$router.push({
          path: 'News',
          query: {
            colId: item.colId,
            colType: item.colType
          }
        })
      }
    },
    userDropdown() {
      this.showUserInfo = !this.showUserInfo
    },
    getAccount() {
      this.$http.get(this.API.getAccount).then((res) => {
        const data = res.data
        if (data.code === '000000') {
          const token = localStorage.getItem('tokenLoginKey')
          this.$store.commit('login', {
            name: data.data.email,
            token: token
          })
        }
      })
    },
    // 显示登录dialog
    login() {
      this.$store.commit('showLogin', true)
    },
    logout() {
      this.$http.get(this.API.loginOut).then((res) => {
        const data = res.data
        if (data.code === '000000') {
          localStorage.setItem('tokenLoginKey', '')
          this.$store.commit('logout')
          // location.reload()
          this.$router.push('/')
        }
      })
    },
    // 屏幕大小方向变化
    resize() {
      const evt = 'onorientationchage' in window ? 'orientationchage' : 'resize'
      window.addEventListener(evt, () => {
        setTimeout(() => {
          this.$nextTick(() => {
            this.layoutFix(true);
          })
        }, 100);
      }, false)
    },
    layoutFix(resize) {
      this.$nextTick(() => {
        const oHeader = this.$refs.header
        const oMain = this.$refs.main
        const oFooter = this.$refs.footer
        if (resize) {
          oMain.$el.style.minHeight = 'auto';
        }
        const windowHeight = document.documentElement.clientHeight;
        const oHeaderHeight = oHeader ? oHeader.$el.offsetHeight : 0
        const oMainHeight = oMain ? oMain.$el.offsetHeight : 0
        const oFooterHeight = oFooter ? oFooter.$el.offsetHeight : 0
        const neg = oHeaderHeight + oFooterHeight;
        // console.log(windowHeight, oMainHeight, oHeaderHeight, oFooterHeight)
        if (windowHeight > (oMainHeight + neg)) {
          oMain.$el.style.minHeight = windowHeight - neg + 'px';
        }
      });
    }
  }
}

</script>
