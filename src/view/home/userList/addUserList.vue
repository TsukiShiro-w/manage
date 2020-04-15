<template>
  <div id="addUserList">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="600px">
      <div slot="title" class="title">{{mode=='add'?'新增':'编辑'}}用户</div>
      <el-form :rules="rules" ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option :value="1" label="启用"></el-option>
            <el-option :value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, editUserData } from "@/api/userList.js";
export default {
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == true) {
        this.$nextTick(()=>{
          this.$refs.form.clearValidate();
        })
      }
    }
  },
  props: ["mode"],
  data() {
    return {
      form: {
        role_id: "",
        status: "",
        username: "",
        email: "",
        phone: "",
        remark: ""
      },
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            //邮箱自定义验证
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            // 手机号自定义验证
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号");
              }
            },
            trigger: "change"
          }
        ],
        role_id: [
          { required: true, message: "请选择用户类型", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitUser() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addUser(this.form).then(() => {
              this.$message.success("新增成功");
              this.$emit("add");
              this.dialogFormVisible = false;
            });
          } else {
            editUserData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.$parent.getData();
              this.dialogFormVisible = false;
            });
          }
        } else {
          this.$message.error("新增失败");
        }
      });
    }
  }
};
</script>

<style lang='less'>
#addUserList {
  .title {
    width: 600px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: white;
    background: linear-gradient(to right, #00c6f7, #1396fb);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-icon-close {
    color: white;
  }
}
</style>