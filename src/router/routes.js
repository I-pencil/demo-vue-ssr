const HelloWorld = () => import(/* webpackChunkName: "home" */ '@/components/HelloWorld')
const BilibiliHome = () => import(/* webpackChunkName: "bilibili" */ '@/pages/bilibili')

export default [
  {
    path: '/',
    redirect: '/bilibili/home'
  },
  {
    path: '/index',
    name: 'hello-world',
    component: HelloWorld
  },
  {
    path: '/bilibili/home',
    name: 'bilibili-home',
    component: BilibiliHome
  }
]
