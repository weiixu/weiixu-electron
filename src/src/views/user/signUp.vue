<template>
  <div class="page-sign-up">
    <div class="sub-title-box">
      <h3>Create your OWN Profile : </h3>
      <p>Enjoy a 15-day free trial NOW!</p>
      <p>Already have an account ? click here </p>
      <a href="javascript:;" @click="FormVisible">Log in</a>
    </div>
    <div class="userSign-box">
      <p class="form-notice">Fields marked with an asterisk(*)are required.Please use only letters and numbers.</p>
      <el-form label-position="top" label-width="80px" :model="signUpForm" :rules="rules" ref="signUpForm">
        <el-row :gutter="32">
          <el-col :sm="12">
            <el-form-item :class="{'form-item-email':signUpForm.email.length >= 1}" label="Email Address" prop="email" :error="errorEmailMsg">
              <el-input v-model="signUpForm.email" placeholder="myccemail@email.com"></el-input>
              <el-button @click="getCode" :disabled="!show" type="primary" v-show="signUpForm.email.length>= 1">
                <!-- Send Verification Code -->
                <span v-show="show">Send Verification Code</span>
                <span v-show="!show" class="count">{{minute}}:{{second}}</span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="Verification Code" prop="verifyCode" :error="errorCodeMsg">
              <el-input v-model="signUpForm.verifyCode" placeholder="Verification Code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="Password" prop="password">
              <el-input v-model="signUpForm.password" placeholder="Password" type="password"></el-input>
              <p class="input-notice">Use 6-30 characters with a mix of letters&numbers</p>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="Confirm Password" prop="confirmPass">
              <el-input v-model="signUpForm.confirmPass" placeholder="Confirm Password" type="password"  @keyup.enter.native="signUp('signUpForm')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="check-box">
          <el-checkbox v-model="checked">I agree</el-checkbox>
          <a href="javascript:;" @click="registerVisible">Registration Protocol</a>
        </div>
        <div class="btn-box">
          <el-button type="primary" :disabled="checked ? false : true" @click="signUp('signUpForm')">Submit</el-button>
        </div>
      </el-form>
    </div>
    <!-- 注册协议模态框 -->
    <el-dialog
    title="Registration Protocol"
    :visible.sync="protocolVisible"
    id="register-protocol"
    left>
      <el-scrollbar>
      <div class="Protocol-info">
        <h5>Protocol</h5>
      </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="protocolVisible = false">I Understand</el-button>
      </span>
    </el-dialog>
    <!-- 注册成功模态框 -->
    <el-dialog
    :visible.sync="successDialog"
    center
    id="success-dialog"
    :show-close="false">
      <div class="success-info">
        <img src="../../assets/pic_success.png" alt="">
        <h3>Successful</h3>
        <p>You will receive 15 days free trial,</p>
        <p>Please login with your new account</p>
      </div>
      <span slot="footer" class="dialog-footer" center>
        <el-button type="primary" @click="loginVisible">Log in</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'PageSignUp',
  data() {
    return {
      checked: true,
      disabled: false,
      checkShow: true,
      stop: false,
      signUpForm: {
        email: '',
        verifyCode: '',
        password: '',
        confirmPass: '',
        signData: ''
      },
      // signUp提示信息
      errorEmailMsg: '',
      errorCodeMsg: '',
      // login提示信息
      errorEmailLogMsg: '',
      errorPassMsg: '',
      loginForm: {
        email: '',
        password: ''
      },
      labelPosition: 'top',
      loginFormVisible: false,
      protocolVisible: false,
      successDialog: false,
      show: true,
      isEmail: false,
      // 倒计时
      minutes: 1,
      seconds: 0,
      rules: {
        email: [
          {
            required: true,
            message: 'Enter your Email address',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Enter your Email address'));
              } else if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|net|com.cn)$/.test(
                value
              ) === false) {
                callback(new Error('Invalid Email Address Format'))
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        verifyCode: [
          {
            required: true,
            message: 'Enter your Verification Code',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(
                  new Error(
                    'Enter your Verification Code'
                  )
                );
              } else if (value.length !== 4) {
                callback(new Error('Verification code is incorrect'))
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Enter your password', trigger: 'change' },
          {
            min: 6,
            max: 30,
            message: 'Use 6-30 characters with a mix of letters&numbers',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Enter your password'));
              } else if (!/^[A-Za-z0-9]+$/.test(value)) {
                callback(new Error('Use 6-30 characters with a mix of letters&numbers'))
              } else {
                if (this.signUpForm.confirmPass !== '') {
                  this.$refs.signUpForm.validateField('confirmPass');
                }
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        confirmPass: [
          {
            required: true,
            message: 'Enter your password again',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Enter your password again'));
              } else if (value !== this.signUpForm.password) {
                callback(
                  new Error(
                    'Your password and confirmation password do not match!'
                  )
                );
              } else if (!/^[A-Za-z0-9]+$/.test(value)) {
                callback(new Error('Invalid Password Format'))
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  watch: {
    minute: {
      handler (newVal) {
        this.timeFormat(newVal)
      }
    },
    second: {
      handler (newVal) {
        this.timeFormat(newVal)
      }
    }
  },
  computed: {
    minute: function() {
      return this.timeFormat(this.minutes)
    },
    second: function() {
      return this.timeFormat(this.seconds)
    }
  },
  created() {
    this.getAccount()
  },
  mounted() {
    this.$emit('hide-navbar', true)
    this.$nextTick(() => {
      document.querySelector('.ww-main').className += ' login-bgimg '
    })
  },
  destroyed() {
    this.$emit('hide-navbar', false)
    document.querySelector('.ww-main').className = document.querySelector('.ww-main').className.replace(/(?:^|\s)login-bgimg(?!\S)/g, '')
  },
  methods: {
    getAccount() {
      this.$http.get(this.API.getAccount).then((res) => {
        const data = res.data
        if (data.code === '000000') {
          this.$router.push('/')
        }
      })
    },
    timeFormat(n) {
      return n < 10 ? '0' + n : n;
    },
    signUp(signUpForm) { // 注册
      this.$refs[signUpForm].validate(valid => {
        if (valid) {
          if (this.checkUser()) {
            this.errorCodeMsg = ''
            const form = this.signUpForm
            // 验证验证码和email
            this.$http.get(this.API.getEmailCodeValid, { params: { email: form.email, emailcode: form.verifyCode }}).then(res => {
              const data = res.data
              if (data.code === '000000') {
                form.signData = data.data
                this.submitRegister();
              } else { // 错误信息需要处理,
                this.errorCodeMsg = data.message
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    checkUser() {
      return this.checked ? 1 : 0
    },
    submitRegister() { // 注册事件
      this.errorEmailMsg = ''
      const url = this.API.submitRegister
      this.$http.post(url, this.signUpForm).then(res => {
        const data = res.data
        if (data.code === '000000') {
          const token = data.data.tokenLoginKey
          this.$store.commit('login', {
            name: this.signUpForm.email,
            token: token
          })
          localStorage.setItem('tokenLoginKey', token)
          // 验证通过，跳出登录成功模态框
          this.successDialog = true;
        } else {
          this.errorEmailMsg = data.message
        }
      });
    },
    getCode() { // 判断email是否存在
      this.errorEmailMsg = ''
      if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|net|com.cn)$/.test(this.signUpForm.email) === false) {
        this.errorEmailMsg = 'Invalid Email Address Format'
        return
      }
      this.$http.get(this.API.getCheckRegistEmail, { params: { email: this.signUpForm.email }}).then((res) => {
        const data = res.data
        if (data.code === '000000' && !data.data) {
          this.sendEmailCode()
        } else {
          this.errorEmailMsg = data.message
        }
      })
    },
    sendEmailCode() { // 发送验证码
      this.errorCodeMsg = ''
      this.errorEmailMsg = ''
      this.$http.get(this.API.getEmailCode, { params: { email: this.signUpForm.email }}).then(response => {
        if (response.data.code === '000000' && response.data.data) {
          this.countdown()
        } else if (response.data.code === '000000' && !response.data.data) {
          this.errorEmailMsg = response.data.message
        } else {
          this.errorCodeMsg = response.data.message
        }
      });
    },
    countdown() {
      this.show = false;
      const that = this
      const time = window.setInterval(function () {
        if (that.seconds === 0 && that.minutes !== 0) {
          that.seconds = 59
          that.minutes -= 1
        } else if (that.minutes === 0 && that.seconds === 0) {
          that.seconds = 0
          window.clearInterval(time)
          that.show = true
          that.minutes = 1
          that.seconds = 0
        } else {
          that.seconds -= 1
        }
      }, 1000)
    },
    // 显示注册协议
    registerVisible() {
      this.protocolVisible = true;
    },
    // 显示success-loginForm
    loginVisible() {
      this.successDialog = false
      this.$router.push('/')
      // this.loginFormVisible = true;
    },
    // 显示登录dialog
    FormVisible() {
      this.$store.commit('showLogin', true)
    }
  }
};
</script>
<style lang="scss">
// 背景图片
.login-bgimg{
  background: url(../../assets/pic_signup_bg.png) no-repeat right top;
}
// success-dialog
#success-dialog{
  .el-dialog {
    width: 32rem;
    height: 39rem;
    background-color: #F7F9FA;
    .el-dialog_header{
      .el-dialog__headerbtn{
        display:none;
        i::before{
          display:none;
        }
      }
    }
    .el-dialog__body{
      width: 32rem;
      height: 22rem;
      .success-info{
        padding: 4rem 5rem 3rem;
        text-align: center;
        img{
          width: 9rem;
          height: 9rem;
        }
        h3{
          color:#04B259;
          font-size: 1.88rem;
          height:2.5rem;
          line-height: 2.5rem;
        }
        p{
          color:#2F457C;
          font-size: 1.13rem;
          height:1.5rem;
          line-height: 1.5rem;
          margin-bottom: 0;
        }
      }
    }
    .el-dialog__footer{
      padding:0;
      margin-top:1.5rem;
      .el-button{
        font-size: 400;
      }
    }
  }
}
// signUp
.sub-title-box {
  padding: 0 3rem 3rem;
  h3 {
    font-size: 1.88rem;
  }
  p {
    font-size: 1.38rem;
  }
  p:nth-child(3) {
    height: 1.31rem;
    font-size: 1rem;
    color: #858aa0;
    line-height: 1.31rem;
    display: inline-block;
  }
  a {
    display: inline-block;
    width: 4.63rem;
    height: 2rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.25rem;
    border: 0.06rem solid rgba(217, 217, 217, 1);
    text-align: center;
    line-height: 2rem;
    color: #858aa0;
  }
  a:hover {
    text-decoration: none;
  }
}
.userSign-box {
  padding: 3rem 5rem;
  background: rgba(247, 249, 250, 1);
  box-shadow: 0rem 0rem 0.5rem 0rem rgba(17, 17, 17, 0.3);
  border-radius: 0.25rem;
  margin-bottom: 2rem;
  @media (max-width: $screen-sm) {
    padding: 3rem 1rem;
  }
  .form-notice {
    color: #858aa0;
    height: 1rem;
    margin-top: 0.3em;
    line-height: 1rem;
    font-size: 0.75rem;
  }
  .btn-box {
    margin-top: 2rem;
    text-align: center;
    >button{
      width: 11.25rem;
    }
  }
  .input-notice {
    position:absolute;
    color: #858aa0;
    height: 1rem;
    margin-top: 0.3em;
    line-height: 1rem;
    font-size: 0.75rem;
  }
  .el-form-item__label {
    margin-bottom: 0;
    margin-top: 1rem;
    font-size: 1.13rem; // height: 1rem;
    line-height: 1.5rem;
  }
  .check-box {
    margin-top: 2rem;
    text-align: center;
    a {
      text-decoration: underline;
    }
  }
  .form-item-email{
    .el-form-item__content {
      .el-form-item__error{
        right: 12rem;
      }
    }
  }
  .el-form-item__content {
    button {
      width: 11.25rem;
      position: absolute;
      right: 0;
      top: 0;
      padding:12px 0;
      text-align: center
    }
    .el-form-item__error {
      background-color: #f95256;
      color: #ffffff;
      border-radius: 0.25rem;
      // height: 2rem;
      font-size: 0.75rem;
      padding: 0.625rem 0.9375rem;
      right: 0.5rem;
      left: auto;
      top: 90%;
      &::after {
        content: "";
        width: 0;
        height: 0;
        border-left: 0.25rem solid transparent;
        border-right: 0.25rem solid transparent;
        border-bottom: 0.375rem solid #f95256;
        position: absolute;
        right: 1.25rem;
        top: -0.375rem;
    }
     &::before{
      content: "\e913";
      position:absolute;
      right:1rem;
      top:-1.6rem;
      color: #f95256;
      font-size:1rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-family: 'icomoon' !important;
      font-style: normal;
      }
    }
  }
}
//register-protocol
#register-protocol {
  .el-dialog {
    width: 50rem;
    height: 38rem;
    .el-dialog__header {
      width: 50rem;
      height: 4rem;
      border-bottom: 1px solid rgba(0,0,0,.09);
      padding-top: 1rem;
      text-indent: 1rem;
      span {
        font-size: 1rem;
        height: 2rem;
        line-height: 2rem;
        font-weight: bold;
        color: #2f457c;
      }
    }
    .el-dialog__body {
      width: 50rem;
      height: 31rem;
      padding: 0 0.2rem;
      overflow-y: hidden;
      h5 {
        text-align: center;
        font-size: 1rem;
        color: #111111;
      }
      .el-scrollbar {
        height: 100%;
      }
      .el-scrollbar__wrap {
        overflow-x: hidden;
        padding-right: 1.5rem;
      }
    }
    .el-dialog__footer {
      width: 50rem;
      height: 3rem;
      border-top: 1px solid rgba(0,0,0,.09);
    }
  }
}
.Protocol-info{
  padding:1rem 2rem;
}
</style>

