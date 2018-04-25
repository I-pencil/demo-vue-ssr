const HelloWorld = () => import(/* webpackChunkName: "home" */ '@/components/HelloWorld')

export default [
  {
    path: '/index',
    name: 'hello-world',
    component: HelloWorld
  }
]
