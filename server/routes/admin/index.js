/*
 * @Author: your name
 * @Date: 2020-11-25 10:07:54
 * @LastEditTime: 2021-01-04 10:44:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\routes\admin\index.js
 */
module.exports = (app) => {
  const express = require('express');
  const router = express.Router();

  const jwt = require('jsonwebtoken');
  const AdminUser = require('../../models/AdminUser');
  const assert = require('http-assert');
  //2.更改为通用接口，不在此处引入模型
  // const Category = require('./../../models/Category');

  //登录校验中间件
  const authMiddleware = require('../../middleware/auth');
  //模型中间件
  const resourceMiddleware = require('../../middleware/resource');

  // 新增一条数据
  router.post('/', async (req, res) => {
    // body - {name:news}
    const model = await req.Model.create(req.body);
    console.log(model);
    // 我这里没有给前台发送model。跟老师的不一样
    res.send(model); // 发送回前台
  });
  // 修改一条数据
  router.put('/:id', async (req, res) => {
    // body - {name:news}
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model); // 发送回前台
  });
  // 删除一条数据
  router.delete('/:id', async (req, res) => {
    // body - {name:news}
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  // 5.加入验证是否携带了token来请求接口的中间件
  //获取分类列表接口
  router.get('/', authMiddleware(), async (req, res) => {
    // find() 是find所有，limit10是一次获取10条
    // populate('parent') 就是把模型关联的属性，作为整体拿出来，也就是parent作为完整对象给前端
    // const items = await Category.find().populate('parent').limit(10);
    //2.更改为通用的就是：
    // const modelName = require('inflection').classify(req.params.resource);
    // const Model = require(`./../../models/${modelName}`);
    //const items = await req.Model.find().populate('parent').limit(10);

    //4.为了满足通用又不多调用资源，只在categories调用方法下使用联查populate
    const queryOptions = {};
    // Model.modelName就是mongodb中定义模型的时候，mongoose.model('Category', schema);这里的命名
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    } else if (req.Model.modelName === 'Article') {
      // queryOptions.populate = 'categories';
      // 这里不能作为对象返回前端，可能因为categories关联的是数组
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100);
    res.send(items); // 发送回前台
  });
  //获取分类详情接口
  router.get('/:id', authMiddleware(), async (req, res) => {
    // find() 是find所有，limit10是一次获取10条
    const model = await req.Model.findById(req.params.id);
    res.send(model); // 发送回前台
  });

  // 当一个路径有多个匹配规则时，使用app.use（）
  // 用rest表示通用，也就是news，videos，heros的增删改查通用接口
  //3.改为通用接口，使用中间件方法，省略复制粘贴
  //todo 为什么这里路由写个冒号，就代表可以替换，可以传参 是不是只要加个冒号，就代表可以用params取出来？
  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  app.post('/admin/api/login', async (req, res) => {
    // res.send('ok');
    const { username, password } = req.body;
    // 1.根据用户名找用户
    // const AdminUser = require('../../models/AdminUser');
    // 数据库中的名字是username，这里定义的变量名也是username
    //因为模型里设置了selectfalse，所以这里要加上.select(+password),+就是加上的意思
    const user = await AdminUser.findOne({ username: username }).select(
      '+password'
    );
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户名不存在'
    //   });
    // }
    //6.所有的if判断，返回前端，改为assert简化 asset必须使用express5.0 因为是直接抛出错误
    assert(user, 422, '用户不存在');

    // 2.校验密码
    //compareSync方法是专门用来比较明文和密文是否一致
    const isValid = require('bcrypt').compareSync(password, user.password);
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      });
    }
    // 3.返回touken 安装jsonwebtoken插件
    // const jwt = require('jsonwebtoken');
    //生成token jwt.sign 校验token有没有被客户端篡改过 jwt.verify
    // 对本条的id进行加密，加密使用的密钥字符串是secret，app.get 与路由的get是重复的，如果（）里面只有一个参数，就是获取变量的意思
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    res.send({ token });
  });

  //专门搞个路由用来存放上传的图片
  const multer = require('multer');
  //dest目标地址放在：upload下 dirname指的是当前文件所在文件夹 也就是admin
  const upload = multer({ dest: __dirname + '/../../uploads' });
  //upload.single就是用multer单个接受一个文件，前端的network里携带的file
  app.post(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file;
      //拼一个url返回前台，让前台可显示图片
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  //7.设置一个错误处理函数 因为参数里面多了err 就是错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err);
    // if (err) {
    // 如果有状态码就发回前台，没有就报500 ，以防报状态码不存在的错误
    res.status(err.statusCode || 500).send({
      message: err
    });
    // }
  });
};
