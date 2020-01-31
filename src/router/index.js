import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
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
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },
  {
    path: '/daily',
    component: Layout,
    redirect: '/daily',
    children: [{
      path: 'daily',
      name: '每日业绩',
      component: () => import('@/views/daily/index'),
      meta: {title: '每日业绩', icon: 'daily'}
    }]
  },
  {
    path: '/data_show',
    component: Layout,
    redirect: '/data_show',
    children: [{
      path: 'data_show',
      name: 'data_show',
      component: () => import('@/views/data_show/index'),
      meta: {title: '数据可视化', icon: 'data_show'}
    }]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {title: '系统管理及工具', icon: 'system1'},
    children: [{
      path: 'accountManage',
      name: 'accountManage',
      component: () => import('@/views/system/accountManage/index.vue'),
      meta: { title: '账号管理', icon: 'accountManage'}
    }, {
      path: 'allocation',
      name: 'allocation',
      component: () => import('@/views/system/allocation/index.vue'),
      meta: { title: '企业账号分配', icon: 'allocation'}
    },{
      path: 'amazon',
      name: 'amazon',
      component: () => import('@/views/system/amazon/index.vue'),
      meta: { title: '亚马逊账号管理', icon: 'amazon' }
    }, {
      path: 'exchangeRate',
      name: 'exchangeRate',
      component: () => import('@/views/system/exchangeRate/index.vue'),
      meta: { title: '汇率查询', icon: 'exchangeRate' }
    }]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
