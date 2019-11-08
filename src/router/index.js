import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'
import Home from '@/views/dashboard/index'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      alwaysShow:true,
      component: Home,
      meta: { title: '首页', icon: 'home' }
    },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
