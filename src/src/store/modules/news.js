import { GetNewsDataByID } from '../../fetch/news'
const news = {
  state: {
    data: {}
  },
  mutations: {
    GETNEWSDATABYID: (state, data) => {
      state.data = Object.assign({}, state.data, data)
    }
  },
  actions: {
    GetNewsDataByID: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        GetNewsDataByID(id).then(res => {
          const data = res.data.dataList[0]
          commit('GETNEWSDATABYID', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    getState: state => state.data
  }
}
export default news
