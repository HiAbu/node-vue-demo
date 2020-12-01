/*
 * @Author: your name
 * @Date: 2020-11-25 09:29:16
 * @LastEditTime: 2020-11-30 15:04:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\index.js
 */
// 服务端入口文件
const express = require('express');

const app = express();

app.use(require('cors')()); //把跨域模块引进来直接使用
//express.json()解析请求体，算是bodyParser中的一部分功能
app.use(express.json());
//托管静态文件，意义是，所有uploads文件夹下的东西可以通过/uploads路由来访问
app.use('/uploads', express.static(__dirname + '/uploads'));
//使用数据库
require('./database/db')(app);
//分配路由
// 这样就直接调用了admin的index的方法。直接把app传进去
require('./routes/admin')(app);

app.listen(3000, (res, req) => {
  console.log('执行');
  console.log('http://localhost:3000');
});
