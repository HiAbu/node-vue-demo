/*
 * @Author: your name
 * @Date: 2020-12-04 16:36:16
 * @LastEditTime: 2020-12-04 16:40:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\middleware\resource.js
 */

module.exports = (options) => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource);
    // 3.挂载到req上 不然后面路由接收不到
    req.Model = require(`./../models/${modelName}`);
    // 一定要注意next，不然不会往下走
    next();
  };
};
