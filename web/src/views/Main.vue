<!--
 * @Author: your name
 * @Date: 2020-12-07 14:17:57
 * @LastEditTime: 2021-01-04 10:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\web\src\Main.vue
-->
<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30" />
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-gray-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse jc-around pb-1">
        <div class="nav-item active">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar {
  /**新的吸顶效果 新手机里支持 */
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
