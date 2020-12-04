<!--
 * @Author: your name
 * @Date: 2020-12-01 17:22:45
 * @LastEditTime: 2020-12-04 17:07:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\views\AdEdit.vue
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <!-- .native修饰符是用来注册元素的原生事件 而不是自定义事件
    .prevent 是阻止表单提交自动刷新页面 -->
    <el-form label-width="140px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary" size="small" @click="model.items.push({})">
          <i class="el-icon el-icon-plus"></i> 添加广告</el-button
        >
        <el-row style="flex-wrap:wrap">
          <el-col :md="12" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="跳转连接（URL）">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:0.5rem">
              <el-upload
                :headers="getAuthHeaders()"
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(index, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 修改数据
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        //新增数据
        res = await this.$http.post('rest/ads', this.model);
      }

      console.log(res);
      this.$router.push('/ads/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style></style>
