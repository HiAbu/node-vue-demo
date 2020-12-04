/*
 * @Author: your name
 * @Date: 2020-11-25 16:04:19
 * @LastEditTime: 2020-12-04 16:26:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\http.js
 */
import axios from 'axios';
import Vue from 'vue';
import router from '@/router';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
  // timeout: 6000
});

//request拦截器
http.interceptors.request.use(
  (config) => {
    //每次请求后端，都要携带token 一般习惯加上Bearer来作为token的头部 方便识别
    //有token就传token 没有就不传，不传的话，后端会提示请登录
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// response拦截器
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    //后台返回的错误信息没有在err上，在err的response上
    // console.log(err.response);
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      });
    }
    if (err.response.status === 401) {
      router.push('/login');
    }

    return Promise.reject(err);
  }
);

export default http;
