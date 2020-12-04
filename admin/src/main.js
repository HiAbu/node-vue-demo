/*
 * @Author: your name
 * @Date: 2020-11-24 17:24:20
 * @LastEditTime: 2020-12-04 17:10:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';

import './assets/style.css';

import http from './http';
Vue.prototype.$http = http;

Vue.config.productionTip = false;

//因为element的upload组件自己用原生的ajax不通过axios，所以不携带token 这里设置个公共方法
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      };
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
