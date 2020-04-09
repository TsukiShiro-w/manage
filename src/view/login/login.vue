<template>
  <div class="login">
    <!-- 左边登录模块 -->
    <div class="left">
      <!-- 标题 -->
      <div class="title">
        <img src="@/assets/img/login-logo.png" alt />
        <span class="titleText">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleLogin">用户登录</span>
      </div>
      <!-- 登录表单内容 -->
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-user-solid"
            v-model="form.phone"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-col :span="18">
            <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="6">
            <img class="codeImg" :src="codeImg" @click="resetCode" alt />
          </el-col>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <a href="#">用户协议</a>
            和
            <a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="btn" type="primary" @click="subLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="getReg">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- 注册组件 -->
      <register ref="register" />
    </div>
    <!-- 右边图片 -->
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
import register from "@/view/login/register.vue";
import { loginStart } from "@/api/login.js";
import { saveToken } from "@/utils/token.js";
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback("请输入正确的手机号");
      }
    };
    let checked = (rule, value, callback) => {
      if (value === true) {
        callback();
      } else {
        callback("勾选了用户协议才能登陆");
      }
    };
    return {
      // 表单内容
      codeImg: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      // 表单验证规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "blur" }
        ],
        checked: [
          { required: true, message: "请确认勾选用户协议", trigger: "change" },
          { validator: checked, trigger: "blur" }
        ]
      }
    };
  },
  // 组件注册
  components: {
    register
  },
  methods: {
    //刷新验证码
    resetCode() {
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    // 表单提示框
    subLogin() {
      this.$refs.form.validate(result => {
        if (result) {
          loginStart(this.form).then(res => {
            console.log(res);
            this.$message.success("登录成功");
            saveToken(res.data.token);
            this.$router.push('/layout');
          });
        } else {
          this.$message.error("请输入必要的登录信息");
        }
      });
    },
    // 注册组件弹窗设置
    getReg() {
      this.$refs.register.dialogFormVisible = true;
    }
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
  .codeImg {
    width: 100px;
    height: 40px;
  }
}
</style>