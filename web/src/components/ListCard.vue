<!--
 * @Author: your name
 * @Date: 2020-12-25 15:55:13
 * @LastEditTime: 2021-03-04 10:06:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\web\src\components\ListCard.vue
-->
<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        v-for="(category, i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
        class="nav-item"
        :class="{ active: active === i }"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
          <!-- <div class="py-2" v-for="n in 5" :key="n">
            <span>[新闻]</span>
            <span>|</span>
            <span>夏日新版本 “姬下星之队” 即将6月上线</span>
            <span>06/02</span>
          </div> -->
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
import Card from '@/components/Card';
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    'm-card': Card
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style></style>
