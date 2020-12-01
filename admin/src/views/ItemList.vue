<!--
 * @Author: your name
 * @Date: 2020-11-26 16:52:14
 * @LastEditTime: 2020-11-30 16:27:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\admin\src\views\ItemList.vue
-->
<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <!-- prop是绑定的是数据的什么列 -->
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:4rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <!-- slot-scope不会自己写 -->
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/items');
      // console.log(res);
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类${row.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/items/${row._id}`);
        if (res) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.fetch();
        }
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style></style>
