<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setIconsize"></i>
        <img src="@/assets/img/login-logo.png" class="logo" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt class="avatar" />
        <span class="user">xxx,你好</span>
        <el-button class="btnOut" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="201px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from "@/api/home.js";
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  created() {
    getUserInfo().then(res => {
      console.log(res);
      this.userInfo = res.data;
      this.userInfo.avatar = process.env.VUE_APP_URL + "/" + res.data.avatar;
    });
  }
};
</script>

<style lang='less'>
.layout {
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);

    .left {
      line-height: 60px;

      .setIconsize {
        font-size: 20px;
        margin-right: 22px;
      }

      .logo {
        margin-right: 15px;
      }

      .title {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }

    .right {
      line-height: 60px;
      .btnOut {
        margin-left: 20px;
      }
      .avatar {
        width: 43px;
        margin-right: 20px;
        vertical-align: middle;
        border-radius: 20px;
      }
    }
  }

  .aside {
    height: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
}
</style>