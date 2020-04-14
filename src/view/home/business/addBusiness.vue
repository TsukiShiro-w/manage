<template>
  <div id="addBusiness">
    <el-dialog title="收货地址" width="600px" :visible.sync="dialogFormVisible">
      <div slot="title" class="title">{{mode=='add'?'新增':'编辑'}}企业</div>
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="企业简称">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="企业简介">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="企业备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBusinessData, editBusinessData } from "@/api/business.js";
export default {
    // 侦听器
//   watch: {
//     dialogFormVisible(newVal) {
//         // 隐藏dialog框清空表单
//       if (newVal == false) {
//         this.$refs.form.resetFields();
//       } else {
//         //   等el-dialog中form表单加载完毕后再执行清除验证的操作
//         this.$nextTick(() => {
//           this.$refs.form.clearValidate();
//         });
//       }
//     }
//   },
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //表单验证
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业介绍", trigger: "blur" }]
      }
    };
  },
  methods: {
    //   表单提交全局验证
    SubmitData() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
              //添加内容
            addBusinessData(this.form).then(() => {
              this.$message.success("添加成功");
              this.$emit("add");
              this.dialogFormVisible = false;
            });
          } else {
            //   编辑内容接口
            editBusinessData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.$parent.getPaginationData();
              this.dialogFormVisible = false;
            });
          }
        } else {
          this.$message.error("添加失败");
        }
      });
    }
  }
};
</script>

<style lang='less'>
#addBusiness {
  .title {
    width: 600px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: white;
    background: linear-gradient(to right, #02c4f9, #1694fd);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-icon-close {
    color: white;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>