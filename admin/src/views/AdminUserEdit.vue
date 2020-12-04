<!--
 * @Author: your name
 * @Date: 2020-12-01 17:22:45
 * @LastEditTime: 2020-12-03 10:17:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\views\AdEdit.vue
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}用户</h1>
    <!-- .native修饰符是用来注册元素的原生事件 而不是自定义事件
    .prevent 是阻止表单提交自动刷新页面 -->
    <el-form label-width="140px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
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
    async save() {
      let res;
      if (this.id) {
        // 修改数据
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        //新增数据
        res = await this.$http.post('rest/admin_users', this.model);
      }

      console.log(res);
      this.$router.push('/admin_users/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style></style>
