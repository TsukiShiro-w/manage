<template>
  <div id="addQuestion">
    <el-dialog title="收货地址" :fullscreen="true" :visible.sync="dialogFormVisible">
      <div slot="title" class="title">新增题库测试</div>
      <el-form :model="form" class="form" :rules="rules" ref="form">
        <el-form-item label="学科" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择学科" class="subject">
            <el-option
              v-for="(item,index) in subjectData"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="form.step" placeholder="请选择阶段" class="step">
            <el-option
              v-for="(value,key,index) in stepObj"
              :key="index"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="form.enterprise" placeholder="请选择企业" class="business">
            <el-option
              v-for="(item, index) in businessData"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            v-model="form.city"
            :props="{value:'label'}"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="key" v-for="(value,key,index) in typeObj" :key="index">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="key" v-for="(value,key,index) in difficultyObj" :key="index">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <hr />
        </el-form-item>
        <el-form-item label="试题标题"></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    }
  },
  props: ["subjectData", "businessData", "stepObj", "typeObj", "difficultyObj"],
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      dialogFormVisible: false,
      form: {
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: "",
        difficulty: ""
      },
      rules: {
        subject: [
          { required: true, message: "请输入选择学科", trigger: "blur" }
        ],
        step: [{ required: true, message: "请输入选择阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请输入选择企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入选择城市", trigger: "blur" }],
        type: [{ required: true, message: "请输入选择题型", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请输入选择难度", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addSubmit() {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success("提交成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("请完成表单");
        }
      });
    },
    // 级联选择器
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang='less'>
#addQuestion {
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .title {
    height: 53px;
    line-height: 53px;
    color: white;
    background: linear-gradient(to right, #02c5fa, #1394fa);
    padding-left: 20px;
  }
  .subject,
  .step,
  .business,
  .city {
    width: 365px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .dialog-footer {
    text-align: center;
  }
  .el-icon-close {
    color: white;
  }
}
</style>