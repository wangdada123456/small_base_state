<template>
  <div class="app-header">
    <div class="left">
      <img class="china-mobile" src="../../assets/img/header/china_mobile.png" alt="">
      <div class="time-box marL10">
        <span class="header-date fs16 c-light-word">{{nowDate}}<br>{{nowWeek}}</span>
        <span class="header-time fs24 c-light-word">{{nowHour}}:{{nowMinute}}</span>
      </div>
    </div>
    <div class="right-menu">
      <img src="../../assets/img/header/icon_user.png" alt="">
      <div class="user-box marL20">
        <span class="c-light-word fs16 name-wrap">{{userName}}</span>
        <span class="c-light-word fs16" @click="logout">注销</span>
      </div>
      <div class="help-center">
        <span class="c-light-word fs16">帮助中心</span>
      </div>
      <!-- <img src="../../assets/img/header/icon_signout.png" @click="logout" alt=""> -->
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'AppHeaderView',
  data() {
      return {
        nowDate: '',
        nowWeek: '',
        nowHour: '',
        nowMinute: '',
        userName: '',
      }
  },
  mounted() {
    this.userName = Cookies.get('userName');
    this.computeTime();
  },
  methods: {
    logout() {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookies.remove('token');
        Cookies.remove('userName');
        this.$router.push({name: 'login'})
      })
    },
    computeTime() {
      let nowTime = new Date();
      this.nowDate = new Date().toLocaleDateString();
      let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.nowWeek = weekday[nowTime.getDay()];
      this.nowHour = nowTime.getHours();
      this.nowMinute = nowTime.getMinutes().toString().length ==2 ? nowTime.getMinutes() : '0' + nowTime.getMinutes().toString();
    },
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 90px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-image: url("../../assets/img/header/header-backgorund.png");
  background-size:100% 100%;
}
.left{
    height: 100%;
    display: flex;
    align-items: center;
    .china-mobile{
      width:45px;
      height:45px;
      margin-left: 10px;
    }
    .time-box{
      margin-right: 10px;
      margin-top:6px;
      display: flex;
      justify-content: flex-end;
      .header-date{
        line-height:18px;
        padding-right:10px;
      }
    }
  }




  .right-menu {
    height: 100%;
    display: flex;
    padding-right: 20px;
    align-items: center;
    .help-center{
      padding-top:18px;
    }
    .name-wrap{
      padding-bottom:0.02rem;
    }
    img{
      width:35px;
      height:35px;
      cursor: pointer;
    }
    .user-box{
      display: flex;
      flex-direction: column;
      margin-right: 30px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 0.4rem;
          height:  0.4rem;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

</style>

