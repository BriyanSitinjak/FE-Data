import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path:'/home',
    name: 'home',
    component: () => import('@/views/pages/home/Home.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path:'/detailsResult/:id',
    name: 'detailsResult',
    component: () => import('@/views/pages/home/demos/DetailsResult.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path:'/homeTransaction',
    name: 'homeTransaction',
    component: () => import('@/views/pages/home/demos/HomeTransaction.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path:'/homeDeposit',
    name: 'homeDeposit',
    component: () => import('@/views/pages/home/demos/HomeDeposit.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path:'/homeProfileSettings',
    name: 'homeProfileSettings',
    component: () => import('@/views/pages/home/profile-settings/HomeProfileSettings.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path:'/homeHistory',
    name: 'homeHistory',
    component: () => import('@/views/pages/home/demos/HomeHistory.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },

  {
    path: '/repositoryDashboard',
    name: 'repositoryDashboard',
    component: () => import('@/views/repository/SimpleTableDashboard.vue'),
  },
  {
    path: '/repository/:id',
    name: 'repository',
    component: () => import('@/views/repository/SimpleTable.vue'),
  },
  {
    path: '/repositoryDetail/:id',
    name: 'repositoryDetail',
    component: () => import('@/views/repository/Repository-detail.vue'),
  },
  {
    path: '/repositorySearch',
    name: 'repositorySearch',
    component: () => import('@/views/repository/SimpleTableSearch.vue'),
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import('@/views/transaction/Transaction.vue'),
  },
  {
    path: '/manage-admin',
    name: 'manage-admin',
    component: () => import('@/views/manage-admin/ManageAdmin.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
