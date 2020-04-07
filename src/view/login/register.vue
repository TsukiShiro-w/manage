<template>
  <!-- 注册组件 -->
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="70px">
      <el-form-item prop="avatar" label="头像:">
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

      <el-form-item label="昵称:" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机:" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="图形码:" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="codeImg" :src="codeImg" @click="changeCodeImg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码:" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="checkSms">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="submitClickFalse">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import getRegisterSms from "@/api/register.js";
export default {
  data() {
    // 邮箱自定义校验规则
    let checkEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value)) {
        callback();
      } else {
        callback("请输入正确邮箱");
      }
    };
    // 手机号自定义校验规则
    let checkPhone = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback("请输入正确的手机号");
      }
    };
    return {
      dialogFormVisible: false,
      imageUrl: "",
      codeImg: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      baseURL: process.env.VUE_APP_URL,
      form: {
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      rules: {
        avatar: [{ required: true, message: "请上传图片", triggle: "change" }],
        username: [{ required: true, message: "请输入昵称", triggle: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", triggle: "blur" },
          { validator: checkEmail, triggle: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", triggle: "blur" },
          { validator: checkPhone, triggle: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", triggle: "blur" },
          { min: 6, max: 12, message: "请输入6-12位密码", triggle: "blur" }
        ],
        code: [
          { required: true, message: "请输入正确图形码", triggle: "blur" },
          { min: 4, max: 4, message: "请输入正确图形码", triggle: "blur" }
        ],
        rcode: [
          { required: true, message: "请输入手机验证码", triggle: "blur" },
          { min: 4, max: 4, message: "请输入正确手机验证码", triggle: "blur" }
        ]
      }
    };
  },
  methods: {
    // 验证手机号和图形码是否填写
    checkSms() {
      let _pass = true;
      this.$refs.form.validateField(["phone", "code"], err => {
        if (err != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        getRegisterSms({
          phone: this.form.phone,
          code: this.form.code
        }).then(res => {
          this.$message.success(res.data.data.captcha + "");
        });
      }
    },
    // 刷新图形码
    changeCodeImg() {
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 取消按钮
    submitClickFalse() {
      this.imageUrl = '';
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    },
    // 全局验证
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success("注册成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("注册失败");
        }
      });
    },
    // 图片上传成功执行后
    handleAvatarSuccess(res) {
      console.log(res);
      console.log(this.baseURL);
      this.imageUrl = this.baseURL + "/" + res.data.file_path;
      // 保存到form表单中
      this.form.avatar = res.data.file_path;

      // 主动验证
      this.$refs.form.validateField("avatar");
    },
    // 图片上传前
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
  .codeImg {
    width: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
</style>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin-left: 130px;
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
  .dialog-footer {
    text-align: center;
  }
}
</style>