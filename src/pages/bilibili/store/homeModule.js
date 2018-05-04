import { get } from '@/utils/request'
import API from '@/utils/api'

export default {
  state: {
    bannerData: []
  },
  actions: {
    getBanner ({ commit }) {
      get(API.getHomeBanner).then(result => {
        commit('initBanner', result.data)
      })
    }
  },
  mutations: {
    initBanner (state, bannerList) {
      state.bannerData = bannerList
    }
  }
}
