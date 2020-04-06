<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login-logo.png" alt />
        <span class="titleText">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleLogin">用户登录</span>
      </div>
      <el-form :model="form">
        <el-form-item>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-user-solid"
            v-model="form.phone"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="18">
            <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="6">
            <img src="" alt="">
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <a href="#">用户协议</a>
            和
            <a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        checked: false
      }
    };
  }
};
</script>

<style lang='less'>
@import url("~@/style/base.css");
// 使用less,lang='less'
.login {
  display: flex;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 42px;

    .title {
      margin-bottom: 30px;

      .titleText {
        width: 94px;
        height: 22px;
        font-size: 24px;
        font-weight: 500;
        margin-left: 15px;
        color: rgba(12, 12, 12, 1);
      }

      .titleLine {
        color: #ccc;
        font-size: 24px;
        margin-left: 12px;
      }

      .titleLogin {
        width: 87px;
        height: 21px;
        margin-left: 12px;
        font-size: 22px;
        font-weight: 500;
        color: rgba(12, 12, 12, 1);
      }
    }
    a {
      color: #409eff;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>