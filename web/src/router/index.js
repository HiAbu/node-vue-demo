/*
 * @Author: your name
 * @Date: 2020-11-24 17:21:42
 * @LastEditTime: 2020-12-07 14:29:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\web\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{ path: '/', name: 'home', component: Home }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
