<!--
 * @Author: your name
 * @Date: 2020-12-03 11:15:49
 * @LastEditTime: 2020-12-03 15:14:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\views\Login.vue
-->
<template>
  <el-card class="login-card">
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit"> 登录</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'loginpage',
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.model);
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      if (token) {
        this.$router.push('/');
      }
      this.$message({
        type: 'success',
        message: '登录成功'
      });
    }
  }
};
</script>

<style>
.login-card {
  width: 320px;
  margin: 6rem auto;
}
</style>
