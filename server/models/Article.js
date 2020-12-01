/*
 * @Author: your name
 * @Date: 2020-12-01 16:07:35
 * @LastEditTime: 2020-12-01 16:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\models\Article.js
 */
const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  title: { type: String },
  // 这里mongoose.SchemaTypes.ObjectId 是专门存放id的类型，ref表示关联的还是自己这个模型，也就是通过id去找父级的关联
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String }
});

module.exports = mongoose.model('Article', schema);
