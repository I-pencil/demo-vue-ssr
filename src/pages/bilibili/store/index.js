import { get } from '@/utils/request'
import API from '@/utils/api'

export default {
  state: {
    items: {}
  },
  actions: {
    fetchItem ({ commit }) {
      // `store.dispatch()` 会返回 Promise，
      // 以便我们能够知道数据在何时更新
      const params = {
        jsonp: 'jsonp',
        pf: 7,
        id: 1695
      }
      get(API.homeBanner, params)
      console.log('action dispatch===========')
    }
  },
  mutations: {
    setItem (state, { id, item }) {
      console.log('mutations commit----------')
    }
  }

}
