/*
 * @Author: your name
 * @Date: 2020-11-24 17:21:42
 * @LastEditTime: 2021-03-04 09:56:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\web\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/style.scss';
import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;

import VueAwesomeSwiper from 'vue-awesome-swiper';
//4.xx版本都是这样导入css
// import 'swiper/css/swiper.css';
//6.xx以后改成了
import 'swiper/swiper-bundle.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import axios from 'axios';
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
