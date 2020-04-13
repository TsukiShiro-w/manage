<template>
  <div class="addSubject">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">{{mode=='add'?'新增':'编辑'}}学科</div>
      <el-form label-width="120px" :model="form" ref="form" :rules="rules">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogVisible: false,
      // 表单验证
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", triggle: "blur" }],
        name: [{ required: true, message: "请输入学科名称", triggle: "blur" }]
      }
    };
  },
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs.form.clearValidate();
        })
      }
    }
  },
  methods: {
    // 表单提交加验证
    submitForm() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              this.$message.success("新增成功");
              this.$emit("addSubject");
              this.dialogVisible = false;
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.$emit("addSubject");
              this.dialogVisible = false;
            });
          }
        } else {
          this.$message.error("失败");
        }
      });
    }
  }
};
</script>

<style lang='less' scope>
.addSubject {
  .title {
    text-align: center;
    width: 600px;
    height: 53px;
    background: linear-gradient(to right, #00c6f7, #1396fb);
    line-height: 53px;
    color: white;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-icon-close {
    color: white;
  }
}
</style>