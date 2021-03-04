<!--
 * @Author: your name
 * @Date: 2020-11-24 17:21:42
 * @LastEditTime: 2021-03-04 10:13:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-vue-demo\web\src\views\Home.vue
-->
<template>
  <div class="home">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>

    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3  pt-3 text-dark-1 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div>爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span class="">收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->

    <!-- <m-card icon="menu1" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>夏日新版本 “姬下星之队” 即将6月上线</span>
              <span>06/02</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <!-- !!!在父组件中直接使用子组件的变量  category ，穿透 -->
      <template #items="{category}">
        <div
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis">{{ news.title }}</span>
          <span class="text-gray-1">{{ news.createdAt | date }}</span>
        </div>
      </template>
    </m-list-card>
    <!-- 卡片 -->
    <!-- <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex">
        <i class="iconfont icon-menu1"></i>
        <div class="fs-xxl flex-1 px-2">新闻资讯</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body pt-3">
        
      </div>
    </div> -->
    <m-card icon="menu1" title="英雄列表"></m-card>
    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard';
import Card from '@/components/Card';
import dayjs from 'dayjs';
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD');
    }
  },
  name: 'Home',
  components: {
    // MCard
    'm-card': Card,
    'm-list-card': ListCard
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        paginationClickable: true
        // Some Swiper option/callback...
      },
      newsCats: [
        // {
        //   name: '热门',
        //   //创建新数组，把内容重复5遍
        //   newsList: new Array(5).fill({}).map((v) => ({
        //     categoryName: '热门',
        //     title: '6月2日全服不停机更新公告',
        //     date: '06/01'
        //   }))
        // },
        // {
        //   name: '新闻',
        //   //创建新数组，把内容重复5遍
        //   newsList: new Array(5).fill({}).map((v) => ({
        //     categoryName: '新闻',
        //     title: '6月2日全服不停机更新公告',
        //     date: '06/01'
        //   }))
        // },
        // {
        //   name: '公告',
        //   //创建新数组，把内容重复5遍
        //   newsList: new Array(5).fill({}).map((v) => ({
        //     categoryName: '公告',
        //     title: '6月2日全服不停机更新公告',
        //     date: '06/01'
        //   }))
        // },
        // {
        //   name: '活动',
        //   //创建新数组，把内容重复5遍
        //   newsList: new Array(5).fill({}).map((v) => ({
        //     categoryName: '活动',
        //     title: '6月2日全服不停机更新公告',
        //     date: '06/01'
        //   }))
        // },
        // {
        //   name: '赛事',
        //   //创建新数组，把内容重复5遍
        //   newsList: new Array(5).fill({}).map((v) => ({
        //     categoryName: '赛事',
        //     title: '6月2日全服不停机更新公告',
        //     date: '06/01'
        //   }))
        // }
      ]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    async fetchNewsCats() {
      let { data } = await this.$http.get('news/list');
      this.newsCats = data;
    }
  },
  created() {
    this.fetchNewsCats();
  }
};
</script>

<style lang="scss">
@import '../assets/_variables.scss';
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.153846rem;
    opacity: 1;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border: none;
    }
  }
}
</style>
