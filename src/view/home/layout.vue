<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i @click="collapse=!collapse" class="el-icon-s-fold setIconsize"></i>
        <img src="@/assets/img/login-logo.png" class="logo" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt class="avatar" />
        <span class="user">{{userInfo.username}}</span>
        <el-button class="btnOut" @click="exit" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :collapse="collapse"
            >
              <el-menu-item index="1">
                <i class="el-icon-pie-chart"></i>
                <span slot="title">数据概览</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">题库列表</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-office-building"></i>
                <span slot="title">企业列表</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">学科列表</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from "@/api/home.js";
import { removeToken,getToken } from "@/utils/token.js";
import { exitLogin } from "@/api/home.js";
export default {
  data() {
    return {
      userInfo: "",
      collapse: true
    };
  },
  methods: {
    exit() {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        exitLogin().then(() => {
          removeToken();
          this.$router.push("/");
        });
        this.$message({
          type: "success",
          message: "退出成功!"
        });
      });
    }
  },
  created() {
    if (!getToken()) {
      this.$router.push('/');
      return;
    }
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

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>