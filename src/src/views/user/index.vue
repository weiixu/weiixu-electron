<template>
  <div class="page-personal-center">
    <!-- <p>page-personal-center</p> -->
    <el-row :gutter="32">
      <el-col :span="5">
        <div class="setting-tab">
          <ul>
            <li style="font-size:1rem;"><i class="icon-down"></i>Account Settings</li>
            <li v-for="(item,index) in tabs" :key="index" :class="{'active':index !== num}" @click="tab(index)">{{item}}</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="setting-main">
        <!-- 修改账号 -->
        <div class="setting-box" v-show="num === 0 && !successBoxVisible">
          <el-form label-position="top" label-width="80px" :model="settingsForm" ref="settingsForm" :rules="rules">
            <el-form-item>
              <div class="settingTitle">Change Mailbox</div>
              <div class="settingLine"></div>
            </el-form-item>
            <el-form-item  :class="{'form-item-email':settingsForm.email.length >= 1}" label="New Email Address" prop="email" :error="errorEmailMsg">
              <el-input v-model="settingsForm.email" placeholder="myccemail@email.com"></el-input>
              <el-button @click.prevent="getCode" type="primary" :disabled="!show" v-show="settingsForm.email.length>= 1">
                <!-- Send Verification Code -->
                <span v-show="show">Send Verification Code</span>
                <span v-show="!show" class="count">{{minute}}:{{second}}</span>
              </el-button>
            </el-form-item>
             <el-form-item label="Verification Code" prop="code" :error="errorCodeMsg">
              <el-input v-model="settingsForm.code" placeholder="Verification Code" @keyup.enter.native="handleSetting('settingsForm')"></el-input>
            </el-form-item>
            <div class="btn-box">
              <el-button type="primary" :disabled="!settingsForm.code.length >= 1" @click="handleSetting('settingsForm')">Submit</el-button>
            </div>
          </el-form>
        </div>
        <!-- 修改密码 -->
        <div class="password-box" v-show="num === 1 && !successBoxVisible">
          <el-form label-position="top" label-width="80px" :model="passwordForm" ref="passwordForm" :rules="passRules">
            <el-form-item>
              <div class="settingTitle">Revise Password</div>
              <div class="settingLine"></div>
            </el-form-item>
            <el-form-item label="Old Password" prop="oldPass" :error="errorOldPassMsg">
              <el-input v-model="passwordForm.oldPass" placeholder="Old Password" type="password"></el-input>
            </el-form-item>
              <el-form-item label="New Password" prop="newPass">
              <el-input v-model="passwordForm.newPass" placeholder="New Password" type="password"></el-input>
              <p class="input-notice">Use 6-30 characters with a mix of letters&numbers</p>
            </el-form-item>
              <el-form-item label="Comfirm Password" prop="comPass">
              <el-input v-model="passwordForm.comPass" placeholder="Comfirm Password" type="password"  @keyup.enter.native="handlePassword('passwordForm')"></el-input>
            </el-form-item>
            <div class="btn-box">
              <el-button type="primary" :disabled="!passwordForm.comPass.length >= 1" @click="handlePassword('passwordForm')">Submit</el-button>
            </div>
          </el-form>
        </div>
        <!-- 修改账号成功 -->
        <successBox :msg="msg" :title="title" v-show="successBoxVisible"></successBox>
        <!-- 修改密码成功 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      msg: '',
      title: '',
      stop: false,
      errorEmailMsg: '',
      errorCodeMsg: '',
      errorOldPassMsg: '',
      show: true,
      count: '',
      visible: true,
      successBoxVisible: false,
      num: 0,
      tabs: ['Change Mailbox', 'Revise Password'],
      settingsForm: {
        email: '',
        code: ''
      },
      minutes: 1,
      seconds: 0,
      rules: {
        email: [
          { required: true, message: 'Enter your Email address', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (
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
        code: [
          { required: true, message: 'Enter your Verification Code', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value.length !== 4) {
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
        ]
      },
      passwordForm: {
        oldPass: '',
        newPass: '',
        comPass: ''
      },
      passRules: {
        oldPass: [
          { required: true, message: 'Enter your old Password', trigger: 'change' },
          { min: 6, max: 30, message: 'Use 6-30 characters with a mix of letters&numbers', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Enter your old Password'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        newPass: [
          { required: true, message: 'Enter your new Password', trigger: 'change' },
          { min: 6, max: 30, message: 'Use 6-30 characters with a mix of letters&numbers', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!(/^[0-9A-Za-z]{6,30}$/.test(value))) {
                callback(new Error('Use 6-30 characters with a mix of letters&numbers'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        comPass: [
          { required: true, message: 'Please comfirm your password', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passwordForm.newPass) {
                callback(new Error('Your password and confirmation password do not match!'));
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
  created() {
    this.init()
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
  methods: {
    timeFormat (n) {
      return n < 10 ? '0' + n : n;
    },
    init() {
      this.$http.get(this.API.getAccount).then((res) => {
        const data = res.data
        if (data.code !== '000000') {
          this.$router.push('home')
        }
      })
    },
    // 修改账号
    handleSetting(settingsForm) {
      this.errorCodeMsg = ''
      this.errorEmailMsg = ''
      this.$refs[settingsForm].validate((valid) => {
        if (valid) { // 跳转到成功页面
          this.$http.get(this.API.updateEmail, { params: { email: this.settingsForm.email, code: this.settingsForm.code }}).then(response => {
            const data = response.data
            if (data.code === '000000') {
              this.setAccountInfo()
              this.successBoxVisible = true;
              this.msg = 'email address'
              this.title = 'Change Email'
            } else if (data.code === '999999' && !data.data) {
              this.errorEmailMsg = data.message
            } else {
              this.errorCodeMsg = data.message
            }
          });
        } else {
          return false;
        }
      });
    },
    setAccountInfo() {
      this.$store.commit('login', {
        name: this.settingsForm.email,
        token: localStorage.getItem('tokenLoginKey') || ''
      })
    },
    cb(msg) {
      this.$emit('cb', msg)
    },
    cb1(title) {
      this.$emit('cb1', title)
    },
    getCode() { // 发送验证码
      this.errorEmailMsg = ''
      if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|net|com.cn)$/.test(this.settingsForm.email) === false) {
        this.errorEmailMsg = 'Invalid Email Address Format'
        return
      }
      this.$http.get(this.API.changeEmail, { params: { email: this.settingsForm.email }}).then((res) => {
        const data = res.data
        if (data.code === '000000' && data.data) {
          this.countdown()
        } else {
          this.errorEmailMsg = data.message
        }
      })
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
    // 修改密码
    handlePassword(passwordForm) {
      this.errorOldPassMsg = '';
      this.$refs[passwordForm].validate((valid) => {
        if (valid) {
          const { oldPass, newPass } = this.passwordForm
          this.$http.get(this.API.updatePwd, { params: { password: oldPass, newPassword: newPass }}).then(response => {
            const data = response.data
            if (data.code === '000000') {
              // this.$emit('cb', 'password')
              this.msg = 'password'
              this.cb(this.msg)
              this.title = 'Revise Password'
              this.cb1(this.title)
              this.successBoxVisible = true;
            } else {
              this.errorOldPassMsg = data.message
            }
          });
        } else {
          return false;
        }
      });
    },
    tab(index) {
      this.num = index
      this.successBoxVisible = false
      this.$refs.settingsForm.clearValidate()
      this.$refs.passwordForm.clearValidate()
    }
  }
}
</script>
<style lang="scss">
.setting-tab{
  // min-width: 8.5rem;
  min-width:13.13rem;
  // height:10rem;
  ul{
    padding:0;
  li{
    min-width:13.13rem;
    height:3rem;
    line-height: 3rem;
    list-style: none;
    background-color: #F7F9FA;
    text-indent: 1.5rem;
    border-right:0.13rem solid #BDC0CC;
    border-radius:0.25rem;
    font-size: 1rem;
    color:#2F457C;
    font-weight:700;
    cursor: pointer;
    position:relative;
    .icon-down{
      position:absolute;
      left:-8%;
      top:33%;
      width: 1rem;
      height: 1rem;
      display:inline-block;
    }
  }
  li.active{
    font-weight:400;
    border-color: #F7F9FA;
    color: #858AA0;
  }
  li:nth-child(2){
    margin-top:0.1rem;
    margin-bottom:0.1rem;
  }
  }
}

.setting-main{
.setting-box,
.password-box{
  background-color: #F7F9FA;
  padding:2rem;
}
  .el-form{
 .form-item-email{
.el-form-item__error{
  right:11.5rem !important;
}
}
}
  .el-form{
  .el-form-item{
    max-width: 38rem;
    margin: 0 auto;
    margin-bottom:2rem;
    .el-form-item__label{
      padding:0;
      margin:0;
      font-size: 1.13rem;
      color:#2F457C;
      &::before{
        display: none;
      }
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
      &::after{
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

    .el-form-item__content {
    button {
      width: 11.25rem;
      position: absolute;
      right: 0;
      top: 0;
      padding:12px 0;
      text-align: center
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
  .btn-box{
    text-align: center;
  }
}
.password-box{
  height: 34rem;
}
}
</style>
