/*
 * @Author: your name
 * @Date: 2020-12-04 16:32:20
 * @LastEditTime: 2020-12-04 16:46:42
 * @LastEditors: Please set LastEditors
 * @Description: 登录校验中间件
 * @FilePath: \node-vue-demo\server\middleware\auth.js
 */

module.exports = (options) => {
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../models/AdminUser');
  const assert = require('http-assert');
  return async (req, res, next) => {
    //5.token来请求接口的中间件
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop();
    assert(token, 401, '请提供 token');
    //verify方法是验证token是否正确，参1是要验证的对象，参2是加密字段
    const tokenData = jwt.verify(token, req.app.get('secret'));
    assert(token, 401, 'jwt token 校验不合法');
    req.user = await AdminUser.findById(tokenData.id);
    assert(req.user, 401, '请先登录');
    await next();
  };
};
