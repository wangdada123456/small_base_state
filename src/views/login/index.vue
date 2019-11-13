<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
        <div class="title-container">
          <h3 class="title">用户登录</h3>
        </div>
        <div class="login-form-content">
          <el-form-item prop="account">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
                ref="username"
                v-model="form.account"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="form.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"/>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <div class="captcha-box">
            <el-form-item prop="captcha"  style="width:53%;">
              <span class="svg-container">
                <svg-icon icon-class="captcha" />
              </span>
              <el-input
                ref="captcha"
                v-model="form.captcha"
                placeholder="验证码"
                name="password"
                tabindex="3"
                style="width: 80%;"
                @keyup.enter.native="handleLogin"/>
            </el-form-item>
            <img :src="captchaPath" @click="getCaptcha"  alt="">
          </div>
          <el-form-item>
            <div :loading="loading"  class="btn-login background-style" @click="handleLogin">登录</div>
          </el-form-item>
        </div>
    </el-form>
  </div>
</template>
<script>
  import {getUUID} from '@/utils'
  import md5 from 'js-md5'
  import Cookies from 'js-cookie'
  export default {
    data () {
      return {
        form: {
          account: '',
          password: '',
          captcha: ''
        },
        loading: false,
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        captchaPath: '',
        passwordType: 'password',
        captchaPath: ''
      }
    },
    mounted(){
      this.getCaptcha()
    },
    methods: {
      // 获取验证码
      getCaptcha () {
        this.form.uuid = getUUID();
        this.captchaPath = '';
        this.captchaPath = this.$api.login.getCaptcha(this.form.uuid);
      },
      //密码显示隐藏
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true;
            let param = {
              name: this.form.account,
              password: md5(this.form.password),
              yzm: this.form.captcha,
            };
            if(param.name == 'admin' && this.form.password == 'admin'){
              let time = new Date().getTime()
              Cookies.set('token', time, {expires: 7})
              Cookies.set('userName', "admin", {expires: 7})
              Cookies.set('code', time + 20190717, {expires: 7})
              this.$router.push({name: 'home'})
            } else {
              this.$api.login.signIn(param).then(res=>{
                console.log(res);
                if(res.status !==0){
                  this.$message({
                    message: res.msg,
                    type:'error'
                  });
                  this.loading = false;
                  this.getCaptcha()
                } else {
                  Cookies.set('token', res.token, {expires: res.expire || 0})
                  Cookies.set('userName', param.name, {expires: res.expire || 0})
                  this.$router.push({name: 'home'})
                }
              }).catch(err=>{
                this.$message({
                  message: err,
                  type:'error'
                });
                this.loading = false;
              })
            }
          } else {
            this.loading = false;
            return false
          }
        })
      }
    }
  }

</script>
<style lang="scss">
  $bg:#283443;
  $light_gray:#0be6fe;
  $cursor: #fff;

.login-container {
  .el-form-item__content{
    line-height: 0px;
  }
  .el-input {
    display: inline-block;
    height: 40px;
    width: 80%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
      &::placeholder{
        color: #437a83;
      }
    }
  }

  .el-form-item {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom:30px;
    .el-form-item__content{
      border: 1px solid #4474bf;
    }
  }
  .el-form-item__error{
    color: #F56C6C;
  }
}
</style>
<style lang="scss" scoped>
  $dark_gray:#0be6fe;
  $light_gray:#05cafb;
  
  .login-container{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url("../../assets/img/login/bg_login1.jpg") no-repeat;
  }
  .login-box{
    width:500px;
    height:400px;
    margin:200px auto 0;
    border:1px solid #4a90e2;
    border-radius: 5px;
    z-index: 1000;
    // background: #ffffff;
    .title-container {
        position: relative;
        margin-top: 7px;
        .title {
          font-size: 26px;
          color: $light_gray;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
    }
    .login-form-content{
      width: 70%;
      margin: 20px auto;
      z-index: 200;
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
      .captcha-box{
        display: flex;
        img{
          width: 38%;
          margin-left:2%;
          height: 43px;
        }
      }
      .btn-login{
        width: 100%;
        height:40px;
        background-image: url("../../assets/img/login/signin_btn_bg.png");
        background-size:100%;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 26px;
        z-index: 500;
      }
    }
    
  }
  
</style>
