<template>
  <!-- log in 模态框 -->
  <el-dialog :visible.sync="showLogin" id="loginMask" @close='closeLogin'>
    <div class="login-main">
      <el-row>
        <el-col :sm="10">
          <div class="loginBanner">
            <img src="@/assets/pic_login_banner.png" alt="">
          </div>
        </el-col>
        <el-col :sm="14">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
            <el-form-item>
              <div class="loginTitle">Account Login</div>
              <div class="loginLine"></div>
            </el-form-item>
            <el-form-item label="E-mail Address" prop="email" class="emailLogin" :error="errorEmailMsg">
              <el-input v-model="loginForm.email" placeholder="Enter your Email Address" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" class="passLogin" :error="errorPassMsg">
              <el-input v-model="loginForm.password" placeholder="password" type="password" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
            <!-- <el-form-item class="checkForm">
              <el-checkbox v-model="checked">Remember Me</el-checkbox>
            </el-form-item> -->
            <el-form-item class="loginButton" :class="{'disbled':disbledSubmit}">
              <el-button type="primary" @click="submitForm('loginForm')" :disabled="loginForm.password.length === 0">Login</el-button>
            </el-form-item>
            <el-form-item class="loginLink">
              <a @click="handleClick('SignUp') " class="newAccount">Create new account</a>
              <a @click="handleClick('RetrievePassword')" class="forgotPass">Forgot your password?</a>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'WwLogin',
  componentName: 'WwLogin',
  data() {
    return {
      // 错误信息
      errorEmailMsg: '',
      errorPassMsg: '',
      showLogin: false,
      labelPosition: 'top',
      checked: true,
      disbledSubmit: false,
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [{
          required: true,
          message: 'Enter your Email Address',
          trigger: 'change'
        },
        {
          validator: (rule, value, callback) => {
            if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)) || !(/^((\(\d{2,3}\))|(\d{3}\-))?1[3,4,5,6,7,8,9]{1}\d{9}$/)) {
              callback(new Error('Invalid Email Address Format'))
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: 'Enter your password',
          trigger: 'change'
        },
        { min: 6, max: 30, message: 'Use 6-30 characters with a mix of letters&numbers', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Enter your password'))
            } else if (!/^[A-Za-z0-9]+$/.test(value)) {
              callback(new Error('Invalid Email Address Format'))
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
        ]
      }
    }
  },
  // watch: {
  //   loginForm: function (value, oldValue) {
  //     console.log(value)
  //     if (!this.loginForm.email && !this.loginForm.password) {
  //       this.disbledSubmit = true;
  //     }
  //   }
  // },
  created() {
    this.loginForm.email = localStorage.getItem('loginEmail')
  },
  methods: {
    handleClick(url) {
      if (url) {
        this.$router.push(url)
      }
      this.closeLogin()
    },
    closeLogin() {
      this.$store.commit('showLogin', false)
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.checkEmail().then((res) => {
            if (res) {
              this.loginSubmit()
            }
          })
        } else {
          return false;
        }
      });
    },
    loginSubmit() {
      this.errorPassMsg = '';
      this.$http.post(this.API.loginSubmit, this.loginForm).then((res) => {
        const data = res.data
        if (data.code === '000000') {
          const token = data.data.tokenLoginKey
          localStorage.setItem('tokenLoginKey', token)
          this.$store.commit('login', {
            name: this.loginForm.email,
            token: token
          })
          this.closeLogin()
        } else {
          this.errorPassMsg = data.message
          return false
        }
      })
    },
    checkEmail() { // 校验账号是否注册过
      this.errorEmailMsg = '';
      return new Promise((resolve, reject) => {
        this.$http.get(this.API.getCheckRegistEmail, { params: { email: this.loginForm.email }}).then((res) => {
          const data = res.data
          if (data.code === '000000' && data.data) {
            resolve(true)
          } else {
            this.errorEmailMsg = data.message
            resolve(false)
          }
        })
      })
    },
    userDropdown() {
      this.showUserInfo = !this.showUserInfo
    }
  }
}

</script>
<style lang="scss">
#loginMask {
  .el-dialog {
    min-width: 20rem;
    width: 90%;
    @media (min-width: $screen-sm) {
      width: 45.625rem;
    }
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn {
    z-index: 10;
  }
  .el-dialog__body {
    padding: 0;
    @media (min-width: $screen-sm) {
      width: 45.625rem; // height: 26.875rem;
    }
  }

  .login-main {
    @media (min-width: $screen-sm) {
      width: 45.625rem;
    } // height: 26.875rem;
    margin: 8.125rem auto 0;
    box-shadow: 0px 0.25rem 0.75rem 0px rgba(0, 0, 0, 0.2);
  }
  .loginBanner {
    width: 19.1875rem;
    float: left;
    @media (max-width: $screen-sm) {
      display: none;
    }
  }
  .el-form {
    @media (min-width: $screen-sm) {
      width: 26.4375rem; // float: right;
    }
    padding: 1.25rem 2.5rem;
    .loginTitle {
      height: 2.5rem;
      font-size: 1.875rem;
      font-weight: 700;
      line-height: 2.5rem;
      color: #2f457c;
    }
    .loginLine {
      width: 3.125rem;
      height: 0.125rem;
      background-color: #2f457c;
      margin-top: 0.8125rem;
    }
    .el-form-item__label {
      font-size: 1.125rem;
      color: #2f457c;
      height: 1.5rem;
      line-height: 1.5rem;
    }
    .el-form-item__label::before {
      display: none;
    }
    .el-checkbox__label {
      color: #111111;
      font-size: 0.75rem;
      height: 1rem;
      line-height: 1rem;
      padding-left: 0.375rem;
    }
    .passLogin {
      margin-bottom: 2rem;
    }
    .el-form-item {
      text-align: left;
    }
    .emailLogin,
    .passLogin {
      .el-form-item__error {
        background-color: #f95256;
        color: #ffffff;
        border-radius: 0.25rem; // height: 2rem;
        font-size: 0.75rem;
        padding: 0.625rem 0.9375rem;
        right: 0.5rem;
        left: auto;
        top: 90%;
        z-index: 99;
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
        &::before {
          content: "\e913";
          position: absolute;
          right: 1rem;
          top: -1.6rem;
          color: #f95256;
          font-size: 1rem;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: 'icomoon' !important;
          font-style: normal;
        }
      }
    }
    .checkForm {
      margin-bottom: 0;
      line-height: 1;
    }
    .loginButton {
      margin-bottom: 1.25rem;
      button {
        width: 100%;
        outline: none;
      }
    }
    .loginLink {
      margin-bottom: 0;
      a {
        font-size: 0.75rem;
        color: rgba(47, 69, 124, 1);
      }
      .newAccount {
        float: left;
        cursor: pointer;
        text-decoration: underline;
      }
      .forgotPass {
        float: right;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

</style>
