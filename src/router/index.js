import Vue from 'vue'
import VueRouter from 'vue-router'
// 当文件夹内为index时，不需要导入里面的内容 系统会自动导入 和你在写一层是一样的
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/List'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Categorization from '@/views/layout/categorization'

import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    // 二级路由
    children: [
      { path: '/home', component: Home },
      { path: '/categorization', component: Categorization },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }

    ]
  },
  { path: '/search', component: Search },
  { path: '/searchList', component: SearchList },
  { path: '/myorder', component: MyOrder },
  { path: '/pay', component: Pay },
  // 动态路由传参 确认是哪个商品 路由中携带参数
  { path: '/prodetail/:id', component: Prodetail }
]
const router = new VueRouter({
  routes
})

// 全局前置守卫
// to:  到哪儿去
// from：从哪儿来
// next(): 放行到to的路径
// next(路径): 进行拦截

// 定义一个数组 存储 权限路径
const authUrls = ['/pay', 'myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 不是权限页面 放行
    next()
    return
  }
  // 是权限页面 判断token是否存在 如果不存在则 拦截到登录页
  const token = store.getters.token
  if (!token) {
    next('/login')
  } else {
    // 放行
    next()
  }
})
export default router
