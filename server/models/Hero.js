/*
 * @Author: your name
 * @Date: 2020-11-30 16:43:57
 * @LastEditTime: 2020-12-01 09:56:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\models\Hero.js
 */
const mongoose = require('mongoose');

//这里创建的是模型，也就是数据库的表
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String }, // 这里是存的图片地址，而不是图片本身
  title: { type: String }, //称号
  //SchemaTypes.objectId是专门存放id的，ref是关联的模型
  // category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, 这是一个
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 一个英雄关联多个分类
  scores: {
    difficult: { type: Number }, //难度
    skills: { type: Number }, //技能
    attack: { type: Number }, //攻击度
    survive: { type: Number } //生存
  },
  //英雄技能一览
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String }
    }
  ],
  //顺丰出装和逆风出装的装备
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: { type: String }, // 使用技巧
  battleTips: { type: String }, // 对战技巧
  teamTips: { type: String }, // 团战技巧
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String }
    }
  ]
});

module.exports = mongoose.model('Hero', schema);
