// 客户端 entry 只需创建应用程序，并且将其挂载到DOM中
import { createApp } from './main'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
