<template>
  <!-- 注册组件 -->
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style lang='less'>
.register {
  .title {
    height: 53px;
    color: white;
    text-align: center;
    background: linear-gradient(to right, #02c6fc, #1495fd);
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
}
</style>