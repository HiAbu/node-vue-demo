/*
 * @Author: your name
 * @Date: 2020-11-24 17:24:20
 * @LastEditTime: 2020-12-01 15:35:52
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

Vue.use(VueRouter);

const routes = [
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
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
