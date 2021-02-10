import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [

  { path: '*', redirect: '/404', hidden: true }
  ,{
    path: '/area', component: Layout, redirect: '/area',
    meta: { title: '地区', icon: 'el-icon-place', roles: ['admin'] },
    children: [
      {path: '/area', component: () => import('../views/area/index'),
        name: 'area',
        children: [
          {
            path: '/area/list', component: () => import('../views/area/list'), name: 'List', meta: { title: '地区列表', icon: 'el-icon-s-unfold', roles: ['admin'] }
          }
        ]
      },{path: '/area/add', component: () => import('../views/area/create'), name: 'Add', meta: { title: '新增地区', icon: 'el-icon-circle-plus', roles: ['admin'] }}
      ,{path: '/area/update', component: () => import('../views/area/edit'), hidden:true,name: 'Add', meta: { title: '修改地区', roles: ['admin'] ,activeMenu:'/area/list'}}
    ]
  }, {
    path: '/goods', component: Layout, redirect: '/goods',
    meta: { title: '商品', icon: 'el-icon-shopping-bag-1', roles: ['admin'] },
    children: [
      {path: '/goods', component: () => import('../views/goods/index'),
        name: 'area',
        children: [
          {path: '/goods/list', component: () => import('../views/goods/product/list'), name: 'List', meta: { title: '商品列表', icon: 'el-icon-s-unfold', roles: ['admin'] }}
        ]
      },{path: '/goods/add', component: () => import('../views/goods/product/add'), name: 'Add', meta: { title: '新增商品', icon: 'el-icon-circle-plus', roles: ['admin'] }}
      ,{path: '/goods/category', component: () => import('../views/goods/category/index'), name: 'Add', meta: { title: '商品类别', icon: 'el-icon-menu', roles: ['admin'] }}]
  },
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
