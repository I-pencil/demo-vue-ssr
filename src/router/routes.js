const HelloWorld = () => import(/* webpackChunkName: "home" */ '@/components/HelloWorld')

const Bilibili = () => import(/* webpackChunkName: "bilibili" */ '@/pages/bilibili')
export default [
  {
    path: '/index',
    name: 'hello-world',
    component: HelloWorld
  },
  {
    path: '/bilibili/home',
    name: 'bilibili-home',
    component: Bilibili
  }
]
