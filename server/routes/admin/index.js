/*
 * @Author: your name
 * @Date: 2020-11-25 10:07:54
 * @LastEditTime: 2020-12-01 16:24:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\server\routes\admin\index.js
 */
module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  //2.更改为通用接口，不在此处引入模型
  // const Category = require('./../../models/Category');
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

  //获取分类列表接口
  router.get('/', async (req, res) => {
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
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items); // 发送回前台
  });
  //获取分类详情接口
  router.get('/:id', async (req, res) => {
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
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource);
      // 3.挂载到req上 不然后面路由接收不到
      req.Model = require(`./../../models/${modelName}`);
      // 一定要注意next，不然不会往下走
      next();
    },
    router
  );

  //专门搞个路由用来存放上传的图片
  const multer = require('multer');
  //dest目标地址放在：upload下 dirname指的是当前文件所在文件夹 也就是admin
  const upload = multer({ dest: __dirname + '/../../uploads' });
  //upload.single就是用multer单个接受一个文件，前端的network里携带的file
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    //拼一个url返回前台，让前台可显示图片
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });
};
