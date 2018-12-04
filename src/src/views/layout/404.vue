<template>
  <div :class="{'page404-box':true}" ref="articleBox">
    <h1>404 <small>Page</small></h1>
    <router-link to="/"><el-button type="primary">返回首页</el-button></router-link>
  </div>
</template>
<script>
export default {
  name: 'page404'
}

</script>
<style lang="scss">
.page404-box {
  padding: 15px;
  font-size: 14px;
  font-size: .875rem;
  min-height: 100vh;
  text-align: center;
  background-color: #f2f2f2;
  color: #666;
  h1 {
    position: relative;
    z-index: 100;
    margin-top: 30%;
    border-radius: 4px;
    font-size: 2rem;
    padding: 1rem;
  }
}

</style>
