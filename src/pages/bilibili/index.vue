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
    <div class="main-list">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <img :src="item.pic" alt="">
        <p class="item-desc">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import homeModule from './store/homeModule'

export default {
  name: 'bilibiliHome',
  asyncData({ store, route }) {
    store.registerModule('homeModule', homeModule)
    store.dispatch('getBanner')
    store.dispatch('getList')
  },
  computed: {
    banner () {
      const banneList = this.$store.state.homeModule.bannerData
      if (banneList) {
        return banneList
      }
    },
    list () {
      const listData = this.$store.state.homeModule.list
      if (listData) {
        return listData.list
      }
    }
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
.main-list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  padding-top: 10px;
  width: 50%;
  box-sizing: border-box;
}
.list-item:nth-child(odd) {
  padding-left: 10px;
  padding-right: 10px;
}
.list-item:nth-child(enve) {
  padding-right: 10px;
}
</style>
