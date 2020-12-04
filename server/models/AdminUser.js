/*
 * @Author: your name
 * @Date: 2020-12-01 16:07:35
 * @LastEditTime: 2020-12-03 11:15:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\models\Article.js
 */
const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  username: { type: String },
  selected: false,
  password: {
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 10);
    }
  }
});

module.exports = mongoose.model('AdminUser', schema);
