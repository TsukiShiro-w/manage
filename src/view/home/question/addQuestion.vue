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
            <el-radio :label="+key" v-for="(value,key,index) in typeObj" :key="index">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio
              :label="+key"
              v-for="(value,key,index) in difficultyObj"
              :key="index"
            >{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <hr />
        </el-form-item>
        <el-form-item prop="title" label="题目标题">
          <quillEditor v-model="form.title" :options="{placeholder:'请输入内容'}"></quillEditor>
        </el-form-item>
        <el-form-item :label="typeObj[form.type]">
          <allSelect :form="form"></allSelect>
        </el-form-item>
        <el-form-item>
          <hr />
        </el-form-item>
        <el-form-item label="解析视频">
          <uploads v-model="form.video" type="video"></uploads>
        </el-form-item>
        <el-form-item>
          <hr />
        </el-form-item>
        <el-form-item prop="answer_analyze" label="答案解析">
          <quillEditor v-model="form.answer_analyze" :options="{placeholder:'请输入内容'}"></quillEditor>
        </el-form-item>
        <el-form-item>
          <hr />
        </el-form-item>
        <el-form-item prop="remark" label="试题备注">
          <el-input class="remark" v-model="form.remark"></el-input>
        </el-form-item>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import allSelect from "@/view/home/question/allSelect.vue";
import uploads from "@/view/home/question/uploads.vue";
export default {
  components: {
    quillEditor,
    allSelect,
    uploads
  },
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
        type: 1,
        difficulty: 1,
        title: "",
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        remark: "",
        answer_analyze: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
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
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "blur" }
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
  .remark {
    width: 754px;
    float: right;
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
  .quill-editor {
    margin-top: 55px;
  }
  .el-form-item__label {
    margin-right: 50px;
  }
}
</style>