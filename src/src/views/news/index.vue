<template>
  <div class="page-news">
    <ww-search></ww-search>
    <el-row :gutter="32">
      <el-col :sm="12" :md="8" v-for="(card,index) in cardList" :key="index">
        <div class="card-box card-column">
          <div class="card-header">
            <div class="card-title" @click="handleClickColumn(card)" target="_blank">{{card.colName}}</div>
          </div>
          <div class="card-body">
            <!-- <el-scrollbar> -->
            <div v-for="(item,index) in card.newsListVOList" :key="index">
              <div :class="{'news-img-wrap': index===0, 'news-fixed-wrap': index===0, 'news-video-wrap':  index===0 && item.newsType===4}">
                <a :href="newsDetailHref(item.id)" target="_blank" v-if="index===0">
                      <img :src="newsImgSrc(item.coverImage)">
                      <!-- <p>《HOME专栏》</p> --></a>
              </div>              <div class="news-item">
                <a class="news-title" :href="newsDetailHref(item.id)" target="_blank"><i class="icon-play_circle_o" v-if="item.newsType === 4"></i> {{item.title}}</a>
                <span class="news-info-box">
                  <span class="news-time">{{item.pushTime | diffDate(new Date($store.state.systemTime))}}</span>
                <span><a :href="newsDetailHref(item.id)" class="news-source">{{item.provide}}</a></span>
                </span>
              </div>
            </div>
            <!-- </el-scrollbar> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import WwSearch from '@/components/search'
export default {
  name: 'PageNews',
  components: { WwSearch },
  data() {
    return {
      newsTopList: [],
      cardList: [],
      newsList: [],
      searchKey: ''
    }
  },
  watch: {
    // 监听路由跳转
    $route: function () {
      // console.log(value)
      this.initPage()
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
    }
  }
}
</script>
