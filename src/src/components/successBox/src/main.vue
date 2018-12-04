<template>
  <el-row :gutter="20">
    <el-col :span="24">
    <!-- <el-col :span="12" :offset="6"> -->
      <div class="success-box">
        <div class="account-box">
          <el-form label-position="top" label-width="80px">
            <el-form-item>
              <div class="settingTitle">{{ title }}</div>
              <div class="settingLine"></div>
            </el-form-item>
            <div class="settingMain">
              <img src="../../../assets/pic_success.png" alt="">
              <h3>Successful</h3>
              <p>You can use your new {{ msg }} to log into the website</p>
            </div>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'successBox',
  componentName: 'successBox',
  watch: {
    msg(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.msg = newVal
      }
    },
    title(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.title = newVal
      }
    }
  },
  props: {
    title: {
      type: String
    },
    msg: {
      type: String
    }
  },
  data() {
    return {
      msg1: '',
      title1: ''
    }
  },
  methods: {
    cb(msg) {
      this.msg1 = msg
    },
    cb1(title) {
      this.title = title
    }
  }
}
</script>
<style lang="scss">
.success-box{
.account-box{
  background-color: #F7F9FA;
  padding:2rem 2rem 7rem;
  .el-form{
  .el-form-item{
    max-width: 38rem;
    margin: 0 auto;
    margin-bottom:2rem;
  }
  .el-form-item:nth-child(1){
    margin:0;
    margin-bottom:2rem;
    .settingTitle{
    height: 2.5rem;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 2.5rem;
    color: #2F457C;
  }
  .settingLine{
    width: 3.125rem;
    height: 0.125rem;
    background-color: #2F457C;
    margin-top: 0.8125rem;
  }
  }
  .settingMain{
    // width: 30rem;
    // height: 15rem;
    margin:3rem auto 0;
    text-align: center;
    img{
      width: 9rem;
      height: 9rem;
    }
    h3{
      font-size: 1.88rem;
      height:2.5rem;
      line-height: 2.5rem;
      color:#04B259;
    }
    p{
      font-size: 1.13rem;
      color:#2F457C;
    }
  }
}
}
}
</style>
