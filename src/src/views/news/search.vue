<template>
  <div class="page-news-search">
    <!-- <ww-search></ww-search> -->
    <div class="news-search" :class="{'news-searching':searchKey}">
      <div class="news-search-btn" @click="handleSerarch()"><i class="icon-search_o"></i></div>
      <input class="news-search-input" type="text" maxlength="99" v-model.trim="searchKey" @keyup.enter="handleSerarch()">
      <div class="news-search-icon" v-show="!searchKey"><i class="icon-search_o"></i> <span>Search</span></div>
    </div>
    <el-row :gutter="32">
      <el-col :sm="searchCol">
        <div class="search-info"><span class="search-length">{{total}}</span> Results</div>
        <div class="news-no-results" v-show="searchNewsList.length < 1">
          <img src="@/assets/pic_search.png">
          <p class="results-text">No Results</p>
          <p>Please try other key words</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import WwSearch from '@/components/search'

export default {
  name: 'PageNewsSearch',
  components: { WwSearch },
  data() {
    return {
      hotNewsList: [],
      searchNewsList: [],
      total: 0,
      currentPage: 1,
      hasNext: true,
      pageSize: 10,
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
  computed: {
    timeRemark: function () {
      return this.$store.state.timeRemark
    },
    searchCol: function () {
      return this.searchNewsList.length > 0 ? 16 : 24
    }
  },
  mounted() {
    this.initPage()
    this.searchNewsByTagName({
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      tagName: this.$route.query.tagNames
    });
  },
  methods: {
    initPage() {
      this.searchKey = this.$route.query.tagNames
      this.getHotNews()
      this.onLoadMore();
    },
    defaultPage() {
      this.hasNext = true
      this.currentPage = 1
      this.pageSize = 10
      this.total = 0
      this.searchNewsList = []
    },
    handleSerarch() {
      if (this.searchKey) {
        this.defaultPage()
        this.$router.push('/newsSearch?tagNames=' + encodeURIComponent(this.searchKey))
        this.searchNewsByTagName({
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          tagName: this.searchKey
        });
      }
    },
    searchNewsByTagName(params) {
      if (!this.hasNext) return;
      this.$http.get(this.API.searchNewsByTagName, {
        params: params
      }).then(res => {
        const oData = res.data
        if (oData && oData.code === '000000') {
          // console.log(oData)
          if (oData.data) {
            const dataList = oData.data.dataList || []
            this.searchNewsList = this.searchNewsList.concat(dataList)
            this.hasNext = oData.data.hasNext
            this.total = oData.data.total
            this.currentPage = this.currentPage + 1
          } else {
            this.defaultPage()
          }
        }
      })
    },
    getHotNews() {
      this.$http.get(this.API.getHotNews, {
        params: {
          tagName: this.$route.query.tagNames
        }
      }).then((response) => {
        var Data = response.data
        if (Data.code === '000000') {
          // console.log(Data)
          this.hotNewsList = Data.data || []
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    newsDetailHref(id) {
      return '/NewsDetail?newsId=' + id;
    },
    newsImgSrc(src) {
      if (src) {
        return src.split(',')[0]
      } else {
        return ''
      }
    },
    formatDateNewsTime(date) {
      return this.$formatDate(date, 'dd/MM')
    },
    isToday(val, now) {
      if (new Date(val).toDateString() === new Date(now).toDateString()) {
        return true;
      } else {
        return false;
      }
    },
    formatDate(date, systemTime) {
      const dates = {
        // days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        // daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        // months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
      date = new Date(date);
      if (this.isToday(date, new Date(systemTime))) {
        date = this.$formatDate(date, 'hh:mm')
      } else {
        date = this.$formatDate(date, `dd ${dates.monthsShort[date.getMonth()]}`);
      }
      return date + ' ' + this.timeRemark
    },
    // 监听滚动，加载更多
    onLoadMore() {
      const winScroll = () => {
        this.debounce(() => {
          // bot是底部距离的高度
          var bot = 200;
          if ((bot + window.pageYOffset) >= (document.body.scrollHeight - document.documentElement.clientHeight)) {
            this.searchNewsByTagName({
              pageSize: this.pageSize,
              currentPage: this.currentPage,
              tagName: this.searchKey
            });
          }
        }, 600);
      }
      window.removeEventListener('scroll', winScroll, false);
      window.addEventListener('scroll', winScroll, false);
    },
    /**
     * 控制频率 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
     * @param idle   {number}    空闲时间，单位毫秒
     * @param action {function}  请求关联函数，实际应用需要调用的函数
     * @return {function}    返回调用函数
     */
    debounce(action, idle) {
      clearTimeout(this.debounceLast);
      this.debounceLast = setTimeout(function () {
        action();
      }, idle);
    }
  }
}

</script>
