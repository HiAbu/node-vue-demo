/*
 * @Author: your name
 * @Date: 2020-11-24 17:24:20
 * @LastEditTime: 2020-12-04 16:59:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '@/views/Main';
import CategoryEdit from '@/views/CategoryEdit';
import CategoryList from '@/views/CategoryList';

import ItemEdit from '@/views/ItemEdit';
import ItemList from '@/views/ItemList';

import HeroEdit from '@/views/HeroEdit';
import HeroList from '@/views/HeroList';

import ArticleEdit from '@/views/ArticleEdit';
import ArticleList from '@/views/ArticleList';

import AdEdit from '@/views/AdEdit';
import AdList from '@/views/AdList';

import AdminUserEdit from '@/views/AdminUserEdit';
import AdminUserList from '@/views/AdminUserList';

import Login from '@/views/Login';
Vue.use(VueRouter);

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'Home',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/edit/:id',
        props: true,
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      //下面是物品
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        props: true,
        component: ItemEdit
      },
      {
        path: '/items/list',
        component: ItemList
      },
      //下面是英雄
      {
        path: '/heroes/create',
        component: HeroEdit
      },
      {
        path: '/heroes/edit/:id',
        props: true,
        component: HeroEdit
      },
      {
        path: '/heroes/list',
        component: HeroList
      },
      //下面是文章
      {
        path: '/article/create',
        component: ArticleEdit
      },
      {
        path: '/article/edit/:id',
        props: true,
        component: ArticleEdit
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      //下面是广告
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        props: true,
        component: AdEdit
      },
      {
        path: '/ads/list',
        component: AdList
      },
      //下面是用户
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/edit/:id',
        props: true,
        component: AdminUserEdit
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  // 如果非公开页面，且无token，就让返回登录页
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  next();
});

export default router;
