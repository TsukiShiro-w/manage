<template>
  <div id="app">
    <el-row>
      <el-button type="danger" @click="getRouter">危险按钮</el-button>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    getRouter(){
      this.$router.push('/');
    }
  },
};
</script>


<style lang='less'>
// 使用less,lang='less'

</style>
