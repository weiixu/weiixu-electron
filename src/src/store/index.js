import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = {
  state: {
    version: '1.0.0',
    user: {
      name: '',
      token: ''
    },
    theme: '',
    showLogin: false,
    // 系统时间
    systemTime: '',
    // 时间备注
    timeRemark: '(GMT+8)'
  },
  getters: {},
  mutations: {
    login(state, value) {
      state.user = value;
    },
    logout(state) {
      state.user.token = '';
    },
    setTheme(state, value) {
      state.theme = value;
    },
    setSystemTime(state, value) {
      state.systemTime = value;
    },
    showLogin(state, value) {
      state.showLogin = value;
    }
  },
  actions: {}
};
export default new Vuex.Store(store);
