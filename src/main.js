import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义样式
import '@/styles/index.less'
import router from '@/router/router.js'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 添加导航守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  // 1.获取token
  let mytoken = localStorage.getItem('itcast-35-token')
  // 2.判断
  if (mytoken || to.path === '/login') {
    next()
  } else {
    // 重定向
    next({ path: '/login' })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
