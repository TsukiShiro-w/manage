<template>
  <div class="login">
      <div class="left">
        <div class="title">
          <img src="@/assets/img/login-logo.png" alt />
          <span class="titleText">黑马面面</span>
          <span class="titleLine">|</span>
          <span class="titleLogin">用户登录</span>
        </div>
      </div>
      <div class="right">
        <img src="@/assets/img/login_banner_ele.png" alt />
      </div>
    </div>
</template>

<script>
export default {

}
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
}
</style>