/*
 * @Author: your name
 * @Date: 2020-11-25 10:08:45
 * @LastEditTime: 2021-03-02 10:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\database\db.js
 */
module.exports = (app) => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-demo', {
    useNewUrlParser: true
  });
  //如果A模型引用了B模型，B模型没有被引进来，就会报错，所以先全部引入 require-all

  require('require-all')(__dirname + '/../models');
};
