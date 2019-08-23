import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

Vue.use(VueRouter)

// 创建路由对象
export default new VueRouter({
  routes: [{
    name: 'default',
    path: '/',
    component: Login
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  }
  ]
})
