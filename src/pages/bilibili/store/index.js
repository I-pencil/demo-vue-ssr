import { get } from '@/utils/request'
import API from '@/utils/api'

export default {
  state: {
    bannerList: []
  },
  actions: {
    fetchBanner ({ commit }) {
      // `store.dispatch()` 会返回 Promise，
      // 以便我们能够知道数据在何时更新
      get(API.homeBanner).then(data => {
        const bannerList = data
        commit('initBanner', { bannerList })
      })
    }
  },
  mutations: {
    initBanner (state, { bannerList }) {
      state.bannerList = bannerList
    }
  }

}
