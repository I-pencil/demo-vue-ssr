import Vue from 'vue'
import Vuex from 'vuex'

// import bilibiliHome from '../pages/bilili/store'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    // modules: {
    //   bilibiliHome
    // }
  })
}
