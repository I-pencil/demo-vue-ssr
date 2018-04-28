<template>
  <div>
    <tab>
      <tab-item selected >首页</tab-item>
      <tab-item>动画</tab-item>
      <tab-item>番剧</tab-item>
      <tab-item>国创</tab-item>
      <tab-item>音乐</tab-item>
    </tab>
    <swiper :list="[]" class="banner" auto height="110px" dots-class="custom-bottom" dots-position="center"></swiper>
    <div class="data__bd">
      <div class="data-item">
        <div class="data-item__bd">
          <img src="" alt="">
        </div>
        <p class="data-item__ft">hahahah</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper } from 'vux'
import homeStore from './store'

export default {
  name: 'bilibili-home',
  asyncData({ store, route }) {
    store.registerModule('homeStore', homeStore)
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem')
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      // return this.$store.state.items[this.$route.params.id]
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
  },
  destroyed () {
    this.$store.unregisterModule('homeStore')
  }
}
</script>

<style lang="less" scoped>
.banner {
  margin-bottom: 10px;
}
.data__bd {
  display: flex;
  flex-wrap: wrap;
}
.data-item {
  padding: 0px 10px 10px;
  min-width: 50%;
  box-sizing: border-box;
}
</style>
