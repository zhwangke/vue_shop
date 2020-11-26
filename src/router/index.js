import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  // 路由重定向：监听/路径实现跳转
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: Home
  }
]
const router = new VueRouter({
  routes
})

export default router
// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login

router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})
