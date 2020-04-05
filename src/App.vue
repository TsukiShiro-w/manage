<template>
  <div id="app">
    <div class="login">
      <div class="left"></div>
      <div class="right">
        <img src="@/assets/img/login_banner_ele.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getRouter() {
      this.$router.push("/");
    }
  }
};
</script>


<style lang='less'>
@import url(~@/style/base.css);
// 使用less,lang='less'
.login {
  display: flex;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
  justify-content: space-around;
  align-items: center;

  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
  }

  .right{

  }
}
</style>
