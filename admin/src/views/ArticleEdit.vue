<!--
 * @Author: your name
 * @Date: 2020-12-01 15:32:03
 * @LastEditTime: 2020-12-01 17:17:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\views\ArticleEdit.vue
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <!-- .native修饰符是用来注册元素的原生事件 而不是自定义事件
    .prevent 是阻止表单提交自动刷新页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <!-- 同一篇文章可能会有多个分类 -->
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageadd"
          v-model="model.body"
        ></vue-editor>
        <!-- <el-input type="textarea" v-model="model.body"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
export default {
  // 这种方式路由传参可以更好的解耦，避免this,params.id这种复杂写法
  props: {
    id: {}
  },
  components: { VueEditor },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async handleImageadd(file, Editor, cursorLocation, resetUploader) {
      console.log('111');
      var formData = new FormData();
      //后端接收upload的参数是file 所以 append（'file'）
      formData.append('file', file);
      let res = await this.$http.post('/upload', formData);
      Editor.insertEmbed(cursorLocation, 'image', res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        // 修改数据
        res = await this.$http.put(`rest/article/${this.id}`, this.model);
      } else {
        //新增数据
        res = await this.$http.post('rest/article', this.model);
      }

      console.log(res);
      this.$router.push('/article/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/article/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
      // console.log(res.data);
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  }
};
</script>

<style></style>
