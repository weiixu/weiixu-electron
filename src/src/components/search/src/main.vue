<template>
  <div class="ww-search news-search" :class="{'news-searching':searchKey}">
    <div class="news-search-btn" @click="handleSearch()"><i class="icon-search_o"></i></div>
    <input class="news-search-input" type="text" maxlength="99" v-model.trim="searchKey" @keyup.enter="handleSearch()">
    <div class="news-search-icon" v-show="!searchKey"><i class="icon-search_o"></i> <span>Search</span></div>
  </div>
</template>
<script>
export default {
  name: 'WwSearch',
  componentName: 'WwSearch',
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    handleSearch() {
      if (this.searchKey && this.searchKey.length < 100) {
        // this.$emit('on-search', this.searchKey)
        this.$router.push({
          path: 'newsSearch',
          query: {
            tagNames: this.searchKey
          }
        })
      }
    }
  }
};

</script>
