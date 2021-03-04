/*
 * @Author: your name
 * @Date: 2020-11-25 16:34:41
 * @LastEditTime: 2021-03-04 09:06:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\models\Category.js
 */
const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  name: { type: String },
  // 这里mongoose.SchemaTypes.ObjectId 是专门存放id的类型，ref表示关联的还是自己这个模型，也就是通过id去找父级的关联
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
});
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
});

module.exports = mongoose.model('Category', schema);
