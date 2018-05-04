// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './vuex'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// 导出一个工厂函数，用于创建新的应用程序、router和store实例
export function createApp () {
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
