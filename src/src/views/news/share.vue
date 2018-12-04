<template>
    <div class="news-share">
      <div class="share-bar">
        <span class="share-title">Share</span>
        <i class="share-icon" @mouseenter="shareTo('Wechat')" @mouseleave="showWechatCode=false">
          <i class="icon-wechat"></i>
        </i>
        <i class="share-icon" @click="shareTo('Twitter')"><i class="icon-twitter"></i></i>
        <i class="share-icon" @click="shareTo('Facebook')"><i class="icon-facebook"></i></i>
      </div>
      <div class="wechat-code-container" v-show="showWechatCode">
        <div class="caret-icon"></div>
        <p class="wechat-title">Scan,share to WeChat</p>
        <div class="share-code" id="shareCode"></div>
      </div>
    </div>
</template>
<script>
import $ from 'jquery'
import '../../plugins/jquery.qrcode'
export default {
  name: 'NewsShare',
  data() {
    return {
      showWechatCode: false,
      Facebook: 'https://www.facebook.com/sharer.php',
      Twitter: 'https://twitter.com/share'
    }
  },
  methods: {
    shareTo(point) {
      const currentUrl = window.location.href
      if (point === 'Wechat') {
        $('#shareCode').empty()
        $('#shareCode').qrcode({
          render: 'canvas',
          text: currentUrl,
          width: '160',
          height: '160'
        })
        this.showWechatCode = true
        return false
      }
      var shareUrl = `${this[point]}?url=` + encodeURIComponent(currentUrl)
      window.open(shareUrl, '_blank', 'left=600,top=200,width=530,height=600,toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0')
    }
  }
}
</script>

<style lang="scss" scoped>
$news-share-height: 4rem;
.news-share{
  position: relative;
  height: $news-share-height;
  border: 1px solid #D7E1EC;
  margin-bottom: 1rem;
  .wechat-code-container{
    z-index: 100;
    position: absolute;
    left: 30px;
    top: 58px;
    width: 200px;
    height: 230px;
    padding: 20px;
    border: 1px solid #D7E1EC;
    background-color: #fff;
    .caret-icon{
      position: absolute;
      left: 46px;
      top: -12px;
      display: block;
      width: 0;
      height: 0;
      content: '';
      border: 6px solid;
      border-color: transparent transparent  #D7E1EC transparent;
      &::before{
        position: absolute;
        left: -5px;
        top: -4px;
        display: block;
        width: 0;
        height: 0;
        content: '';
        border: 5px solid;
        border-color: transparent transparent  #fff transparent;
      }
    }
    .wechat-title{
      margin-bottom: 9px;
      text-align: center;
      font-weight: 600;
    }
    .share-code{
      width: 160px;
      height: 160px;
    }
  }
  .share-bar{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: $news-share-height;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    .share-title{
      margin-right: 1rem;
      color: #2E457C;
    }
    .share-icon{
      display: inline-flex;
      width: 36px;
      height: 36px;
      margin-right: 15px;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      background-color: #F7F9FA;
      cursor: pointer;
      font-size: 1.4rem;
      &:hover{
        background-color: #ECF0F5;
      }
    }
  }
  .icon-wechat{
    color: #39A940;
  }
  .icon-twitter{
    color: #1DA1F2;
  }
  .icon-facebook{
    color: #3A5998;
  }
  .news-content{
    margin-top: 50px;
    padding: 5px 39px;
    font-size: 18px;
    text-align: justify;
    color: #111111;
  }
}
</style>
