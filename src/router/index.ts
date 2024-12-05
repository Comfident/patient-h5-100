import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Notify from '@/views/Notify/index.vue'
import User from '@/views/User/index.vue'
import Article from '@/views/Article/index.vue'
import PatientPage from '@/views/User/PatientPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login, meta: { title: '登录' } },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home, meta: { title: '首页' } },
        { path: '/article', component: Article, meta: { title: '健康百科' } },
        { path: '/notify', component: Notify, meta: { title: '消息通知' } },
        { path: '/user', component: User, meta: { title: '个人中心' } },
        {
          path: '/user/patient',
          component: PatientPage,
          meta: { title: '家庭档案' }
        }
      ]
    }
  ]
})

// 前置导航守卫
router.beforeEach((to) => {
  NProgress.start()
  const store = useUserStore()
  const whiteList = ['/login', '/register']

  // 如果没有user token，并且此时目的路径不是login，则取消跳转
  if (!store.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
})

// 后置守卫，切换路由时实现页面标题改变
router.afterEach((to) => {
  document.title = `${to.meta.title} -- U1`
  NProgress.done()
})

// 关闭旋转
NProgress.configure({
  showSpinner: false
})

export default router
