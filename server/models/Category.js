const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  name: { type: String },
  // 这里mongoose.SchemaTypes.ObjectId 是专门存放id的类型，ref表示关联的还是自己这个模型，也就是通过id去找父级的关联
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Category', schema);
