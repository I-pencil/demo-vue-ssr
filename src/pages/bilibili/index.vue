<template>
  <div>
    <tab>
      <tab-item selected >首页</tab-item>
      <tab-item>动画</tab-item>
      <tab-item>番剧</tab-item>
      <tab-item>国创</tab-item>
      <tab-item>音乐</tab-item>
    </tab>
    <swiper auto height="110px" dots-position="center">
      <swiper-item :key="index" v-for="(item, index) in banner">
        <img :src="item.pic">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import homeModule from './store/homeModule'

export default {
  name: 'bilibiliHome',
  asyncData({ store, route }) {
    store.registerModule('homeModule', homeModule)
    return store.dispatch('getBanner')
  },
  computed: {
    banner () {
      const banneList = this.$store.state.homeModule.bannerData
      if (banneList) {
        return banneList
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
  },
  destroyed() {
    this.$store.unregisterModule('homeModule')
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
</style>
