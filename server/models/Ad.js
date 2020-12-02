/*
 * @Author: your name
 * @Date: 2020-12-01 16:07:35
 * @LastEditTime: 2020-12-02 14:45:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\models\Article.js
 */
const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  name: { type: String },
  items: [
    {
      image: { type: String },
      url: { type: String }
    }
  ]
});

module.exports = mongoose.model('Ad', schema);
