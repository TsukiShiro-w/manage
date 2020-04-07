<template>
  <!-- 注册组件 -->
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <el-form :model='form' :rules='rules'>
      <span style="color:red">*</span>头像:
      <el-form-item label-width='100px'>
        
        <el-upload
          class="avatar-uploader"
          :action="baseURL+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

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
      dialogFormVisible: false,
      imageUrl: "",
      baseURL: process.env.VUE_APP_URL,
      form:{

      }
    };
  },
  methods: {
    // 成功执行后
    handleAvatarSuccess(res) {
      console.log(res);
      console.log(this.baseURL);
      this.imageUrl = this.baseURL + "/" + res.data.file_path;
      // 保存到form表单中
      this.form.avatar = res.data.file_path;
    },
    // 上传前
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='less' scoped>
.register {
  .title {
    height: 53px;
    color: white;
    text-align: center;
    background: linear-gradient(to right, #02c6fc, #1495fd);
    line-height: 53px;
  }
}
</style>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader{
    width: 178px;
    margin-left: 85px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>