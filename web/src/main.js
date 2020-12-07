/*
 * @Author: your name
 * @Date: 2020-11-24 17:21:42
 * @LastEditTime: 2020-12-07 10:13:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\web\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/style.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
