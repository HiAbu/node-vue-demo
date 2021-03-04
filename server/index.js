/*
 * @Author: your name
 * @Date: 2020-11-25 09:29:16
 * @LastEditTime: 2021-01-04 14:23:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\index.js
 */
// 服务端入口文件
const express = require('express');

const app = express();
//设置一个加密token用的一串字符 原应该设置在环境变量里，这里放在全局的app下，为了方便
app.set('secret', '231a2df1a2sdfasdf');

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

require('./routes/web')(app);

app.listen(3000, (res, req) => {
  console.log('执行');
  console.log('http://localhost:3000');
});
