<!--
 * @Author: Wangmh
 * @Date: 2020-11-26 16:46:21
 * @LastEditTime: 2020-11-30 16:22:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\views\ItemEdit.vue
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <!-- .native修饰符是用来注册元素的原生事件 而不是自定义事件
    .prevent 是阻止表单提交自动刷新页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 这种方式路由传参可以更好的解耦，避免this,params.id这种复杂写法
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    afterUpload(res) {
      console.log(res);
      //这样赋值不会成功的，因为原本model没有icon属性
      // this.model.icon = res.url;
      //可以这样
      this.$set(this.model, 'icon', res.url);
      // 最好的方法还是有什么属性的话，提前留坑
    },
    async save() {
      let res;
      if (this.id) {
        // 修改数据
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        //新增数据
        res = await this.$http.post('rest/items', this.model);
      }

      console.log(res);
      this.$router.push('/items/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
