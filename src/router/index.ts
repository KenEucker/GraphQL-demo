import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      mainMenu: true,
      hideLeftMenu: true,
      hideRightMenu: true,
    },
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostsPage.vue'),
    meta: {
      mainMenu: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: {
      mainMenu: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsPage.vue'),
    meta: {
      mainMenu: true,
    },
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/GraphPage.vue'),
    meta: {
      mainMenu: true,
    },
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/DataPage.vue'),
    meta: {
      mainMenu: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: {
      mainMenu: true,
      hideLeftMenu: true,
      hideRightMenu: true,
    },
  },
  {
    path: '/404',
    name: 'Error',
    component: () => import('../views/ErrorPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

index.beforeEach(() => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
})

index.afterEach(() => {
  NProgress.done()
})

export default index
