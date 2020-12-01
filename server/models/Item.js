const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String } // 这里是存的图片地址，而不是图片本身
});

module.exports = mongoose.model('Item', schema);
