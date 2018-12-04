<template>
  <div class="page-retrieve-password">
    <div class="sub-title-box">
      <h3>Retrieve password</h3>
      <p>Your password according to the following procedure</p>
    </div>
    <div class="userPass-box">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
        <el-row :gutter="32">
          <el-col :sm="12">
            <el-form-item :class="{'form-item-email':formLabelAlign.email.length >= 1}" label="Email Address" prop="email" :error="errorEmailMsg">
              <el-input v-model="formLabelAlign.email" placeholder="myccemail@email.com"></el-input>
              <el-button @click="getCode" type="primary" :disabled="!show" v-show="formLabelAlign.email.length>= 1">
                <!-- Send Verification Code -->
                <span v-show="show">Send Verification Code</span>
                <span v-show="!show" class="count">{{minute}}:{{second}}</span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="Verification Code" prop="verifyCode" :error="errorCodeMsg">
              <el-input v-model="formLabelAlign.verifyCode" placeholder="Verification Code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="New Password" prop="password">
              <el-input v-model="formLabelAlign.password" placeholder="Password" type="password"></el-input>
              <p class="input-notice">Use 6-30 characters with a mix of letters&numbers</p>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="New Confirm Password" prop="confirmPass">
              <el-input v-model="formLabelAlign.confirmPass" placeholder="Confirm Password" type="password"  @keyup.enter.native="reset('formLabelAlign')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btn-box">
          <el-button type="primary" :disabled="formLabelAlign.confirmPass.length === 0" @click="reset('formLabelAlign')">Submit</el-button>
        </div>
      </el-form>
    </div>
    <!-- 重置密码成功   -->
    <el-dialog
    :visible.sync="successDialog"
    center
    id="success-dialog"
    :show-close="false"
    :sm="12"
    :xs="12">
      <div class="success-info">
        <!-- <img src="../../assets/pic_success.png" alt=""> -->
        <div class="success-img"></div>
        <h3>Successful</h3>
        <p>You can use your new password to log into the website</p>
      </div>
      <span slot="footer" class="dialog-footer" center>
        <el-button type="primary" @click="loginVisible">go</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'RetrievePassword',
  data() {
    return {
      disabled: false,
      checkShow: true,
      formLabelAlign: {
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
      labelPosition: 'top',
      successDialog: false,
      show: true,
      count: '',
      timer: null,
      isEmail: false,
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
                callback(new Error('Enter your Email address'))
              } else if (
                /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|net|com.cn)$/.test(
                  value
                ) === false
              ) {
                callback(new Error('Invalid Email Address Format'));
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
                callback(new Error('Enter your Verification Code'))
              } else if (value.length !== 4) {
                callback(
                  new Error(
                    'Verification code is incorrect'
                  )
                );
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
                callback(new Error('Invalid Password Format'))
              } else {
                if (this.formLabelAlign.confirmPass !== '') {
                  this.$refs.formLabelAlign.validateField('confirmPass');
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
              } else if (value !== this.formLabelAlign.password) {
                callback(
                  new Error(
                    'Your password and confirmation password do not match!'
                  )
                );
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
    second: {
      handler (newVal) {
        this.timeFormat(newVal)
      }
    },
    minute: {
      handler (newVal) {
        this.timeFormat(newVal)
      }
    }
  },
  computed: {
    second: function () {
      return this.timeFormat(this.seconds)
    },
    minute: function () {
      return this.timeFormat(this.minutes)
    }
  },
  mounted() {
    this.$emit('hide-navbar', true)
    this.$nextTick(() => {
      this.$emit('hide-navbar', false)
      document.querySelector('.ww-main').className += ' login-bg '
    })
  },
  destroyed() {
    this.$emit('hide-navbar', false)
    document.querySelector('.ww-main').className = document.querySelector('.ww-main').className.replace(/(?:^|\s)login-bg(?!\S)/g, '')
  },
  methods: {
    timeFormat (n) {
      return n < 10 ? '0' + n : n;
    },
    reset(formLabelAlign) { // 注册
      // debugger
      this.$refs[formLabelAlign].validate(valid => {
        if (valid) {
          this.errorCodeMsg = ''
          const form = this.formLabelAlign
          // 验证验证码和email
          this.errorEmailMsg = ''
          this.$http.get(this.API.getCheckRegistEmail, { params: { email: this.formLabelAlign.email }}).then((res) => {
            const data = res.data
            if (data.code === '000000' && data.data) {
              this.$http.get(this.API.getEmailCodeValid, { params: { email: form.email, emailcode: form.verifyCode }}).then(res => {
                const data = res.data
                if (data.code === '000000') {
                  form.signData = data.data
                  const token = data.data.tokenLoginKey
                  this.$store.commit('login', {
                    name: this.formLabelAlign.email,
                    token: token
                  })
                  localStorage.setItem('tokenLoginKey', token)
                  this.submitRegister();
                } else { // 错误信息需要处理,
                  this.errorCodeMsg = data.message
                }
              });
            } else {
              this.errorEmailMsg = data.message
            }
          })
        } else {
          return false;
        }
      });
    },
    submitRegister() { // 注册事件
      const url = this.API.resetPassWord
      this.$http.post(url, this.formLabelAlign).then(res => {
        const data = res.data
        if (data.code === '000000') {
          // const token = data.data.tokenLoginKey
          // this.$store.commit('login', {
          //   name: this.formLabelAlign.email,
          //   token: token
          // })
          // localStorage.setItem('tokenLoginKey', token)
          // 验证通过，跳出登录成功模态框
          this.successDialog = true;
        } else {
          this.errorEmailMsg = data.message
        }
      });
    },
    getCode() { // 判断email是否存在
      this.errorEmailMsg = ''
      if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|net|com.cn)$/.test(this.formLabelAlign.email) === false) {
        this.errorEmailMsg = 'Invalid Email Address Format'
        return
      }
      this.$http.get(this.API.getCheckRegistEmail, { params: { email: this.formLabelAlign.email }}).then((res) => {
        const data = res.data
        if (data.code === '000000' && data.data) {
          this.sendEmailCode()
        } else {
          this.errorEmailMsg = data.message
        }
      })
    },
    sendEmailCode() { // 发送验证码
      this.errorEmailMsg = ''
      this.errorCodeMsg = ''
      this.$http.get(this.API.getEmailCodeReset, { params: { email: this.formLabelAlign.email }}).then(response => {
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
    // 显示success-loginForm
    loginVisible() {
      this.successDialog = false
      this.$router.push('/')
    }
  }
};
</script>
<style lang="scss">
// 背景图片
.login-bg{
  background: url(../../assets/pic_signup_bg.png) no-repeat right top;
}
// successbox
// success-dialog
#success-dialog{
  .el-dialog {
    max-width: 32rem;
    background-color: #F7F9FA;
    @media (max-width: $screen-sm) {
      width: 24rem;
    }
    .el-dialog_header{
      .el-dialog__headerbtn{
        display:none;
        i::before{
          display:none;
        }
      }
    }
    .el-dialog__body{
      // width: 32rem;
      // height: 22rem;
      padding:0;
      .success-info{
        padding: 4rem 6rem 3rem;
        text-align: center;
        .success-img{
          margin:0 auto;
          max-width:9rem;
          height:9rem;
          background:url(../../assets/pic_success.png) no-repeat center center;
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
      // width: 32rem;
      height:17rem;
      padding:0;
      button{
        padding:0.5rem 2rem;
      }
    }
  }
}
// retrieve Passwoed
.sub-title-box {
  padding: 0 3rem 3rem;
  h3 {
    font-size: 1.88rem;
    color: $primary;
  }
  p {
    font-size: 1.38rem;
    color: $primary;
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
.userPass-box {
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
    color: #858aa0;
    height: 1rem;
    margin-top: 0.3em;
    line-height: 1rem;
    font-size: 0.75rem;
    position: absolute;
  }
  .el-form-item__label {
    margin-bottom: 0;
    margin-top: 1rem;
    color: $primary;
    font-size: 1.13rem; // height: 1rem;
    line-height: 1.5rem;
    &::before{
      display: none;
    }
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
      text-align: center;
      width: 11.25rem;
      position: absolute;
      right: 0;
      top: 0;
      padding:12px 0;
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
    .el-form-item__error::after {
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
  }
}
</style>

