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
