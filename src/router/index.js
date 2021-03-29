import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TestIndex from '../views/test/index.vue'
import t20200813 from '../views/test/t20200813.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    // redirect: '/test/index',
    component: TestIndex,
    children: [ //hN20200813 中括号要对称啊，这个错误干扰太久
      {
        path: 't20200813',
        name: 'T20200813',
        component: () => import('../views/test/t20200813.vue'),
        // component: t20200813 // hN20200813 这种语法也可
      },
      {
        path: 't20200820',
        name: 'T20200820',
        component: () => import('../views/test/t20200820.vue')
      },
      {
        path: 't20200824',
        name: 'T20200824',
        component: () => import('../views/test/t20200824.vue')
      },
      {
        path: 't20201015',
        name: 'T20201015',
        component: () => import('../views/test/t20201015.vue')
      },
      {
        path: 't20201016',
        name: 'T20201016',
        component: () => import('../views/test/t20201016.vue')
      },
      {
        path: 't20201030',
        name: 'T20201030',
        component: () => import('../views/test/t20201030.vue')
      },
      {
        path: 't20201102',
        name: 'T20201102',
        component: () => import('../views/test/t20201102.vue')
      },
      {
        path: 't20201103',
        name: 'T20201103',
        component: () => import('../views/test/t20201103.vue')
      },
      {
        path: 't20210308',
        name: 'T20210308',
        component: () => import('../views/test/t20210308.vue')
      },
      {
        path: 't20210326',
        name: 'T20210326',
        component: () => import('../views/test/t20210326.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
