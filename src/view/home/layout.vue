<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i @click="collapse=!collapse" class="el-icon-s-fold setIconsize"></i>
        <img src="@/assets/img/login-logo.png" class="logo" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userInfo.avatar" alt class="avatar" />
        <span class="user">{{$store.state.userInfo.username}}</span>
        <el-button class="btnOut" @click="exit" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <el-row class="tac">
          <el-col>
            <el-menu
              :router="true"
              :default-active="$route.fullPath"
              class="el-menu-vertical-demo"
              :collapse="collapse"
            >
              <el-menu-item
                :index="'/layout/'+item.path"
                v-for="(item,index) in this.$router.options.routes[1].children"
                :key="index"
                v-show="item.meta.role.includes($store.state.role)"
              >
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
              <!-- <el-menu-item index="/layout/userList">
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item index="/layout/question">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">题库列表</span>
              </el-menu-item>
              <el-menu-item index="/layout/business">
                <i class="el-icon-office-building"></i>
                <span slot="title">企业列表</span>
              </el-menu-item>
              <el-menu-item index="/layout/subject">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">学科列表</span>
              </el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from "@/api/home.js";
import { removeToken, getToken } from "@/utils/token.js";
import { exitLogin } from "@/api/home.js";
export default {
  data() {
    return {
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
    console.log(this.$router);
    if (!getToken()) {
      this.$router.push("/");
      return;
    }
    getUserInfo().then(res => {
      this.$store.state.userInfo = res.data;
      this.$store.state.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + res.data.avatar;
        this.$store.state.role = res.data.role;
      if (res.data.status == 0) {
        this.$message.error("该账号已被禁用,联系管理员");
        removeToken();
        this.$router.push("/");
      }else{
        if (!this.$route.meta.role.includes(this.$store.state.role)) {
            this.$message.warning('无权访问的页面')
            this.$router.push('/layout/subject');
        }
      }
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

  .main {
    background: rgba(232, 233, 236, 1);
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>