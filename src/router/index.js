import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'
import Home from '@/views/dashboard/index'
import DeviceList from '@/views/deviceManage/device_list'
import DeviceRecycle from '@/views/deviceManage/device_recycle'
import HighManage from '@/views/deviceManage/high_manage'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      name: 'home',
      alwaysShow:true,
      component: Home,
      meta: { title: '首页', icon: 'home' }
    },
    ]
  },
  {
    path: '/device_manage',
    component: Layout,
    alwaysShow:true,
    noShowingChildren:false,
    meta: { title: '设备管理', icon: 'user' },
    children: [
      {
        path: 'device_list',
        name: 'deviceList',
        component: DeviceList,
        meta: { title: '设备列表', icon: 'table' }
      },
      {
        path: 'device_recycle',
        name: 'deviceRecycle',
        component:DeviceRecycle,
        meta: { title: '设备回收', icon: 'tree' }
      },
      {
        path: 'high_manage',
        name: 'highManage',
        component: HighManage,
        meta: { title: '高级管理', icon: 'nested' }
      },
    ]
  },
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
