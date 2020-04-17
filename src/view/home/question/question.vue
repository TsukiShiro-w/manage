<template>
  <div id="question">
    <el-card>
      <el-form ref="form" :model="form" label-width="70px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select palceholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(item, index) in subjectData"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="难度" prop="difficulty">
              <el-select palceholder="请选择难度" v-model="form.difficulty">
                <el-option
                  v-for="(value,key, index) in difficultyObj"
                  :key="index"
                  :value="+key"
                  :label="value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="form.step">
                <el-option
                v-for="(value,key, index) in stepObj"
                :key="index"
                :value="+key"
                :label="value"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select palceholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item, index) in businessData"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select palceholder="请选择状态" v-model="form.status">
                <el-option :value="1" label="启用"></el-option>
                <el-option :value="0" label="禁用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select palceholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(value,key,index) in typeObj"
                  :key="index"
                  :value="+key"
                  :label="value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="序号" width="50">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目" width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="100px">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型" width="100px">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name" width="100px"></el-table-column>
        <el-table-column label="创建者" prop="username" width="150px"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">
            <div
              :class="{red:scope.row.status==0,green:scope.row.status==1}"
            >{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads" width="100px"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button>编辑</el-button>
            <el-button
              :type="scope.row.status==1?'info':'success'"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addQuestion
      ref="addQuestion"
      :subjectData="subjectData"
      :difficultyObj="difficultyObj"
      :businessData="businessData"
      :stepObj="stepObj"
      :typeObj="typeObj"
    ></addQuestion>
  </div>
</template>

<script>
import { getSubjectList } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
import { getQuestionList, setQuestionStatus } from "@/api/question.js";
import addQuestion from "@/view/home/question/addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      value: "",
      form: {
        subject: "",
        difficulty: "",
        step: "",
        username: "",
        enterprise: "",
        status: "",
        type: "",
        create_date: "",
        title: ""
      },
      tableData: [],
      subjectData: [],
      businessData: [],
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }
    };
  },
  methods: {
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagination.pageSize = size;
      this.search();
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.pagination.currentPage = page;
      this.getData();
    },
    getData() {
      let _page = {
        limit: this.pagination.pageSize,
        page: this.pagination.currentPage,
        ...this.form
      };
      getQuestionList(_page).then(res => {
        console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 修改状态
    setStatus(id) {
      setQuestionStatus({ id: id }).then(() => {
        this.$message.success("状态修改成功");
        this.getData();
      });
    },
    // 添加
    add() {
      this.$refs.addQuestion.dialogFormVisible = true;
    }
  },
  created() {
    // 获取学科
    getSubjectList({ limit: 1000 }).then(res => {
      // console.log(res);
      this.subjectData = res.data.items;
    });
    // 获取企业
    getBusinessData({ limit: 1000 }).then(res => {
      console.log(res);
      this.businessData = res.data.items;
    });
    // 获取题目
    this.getData();
  }
};
</script>

<style lang='less'>
#question {
  .table {
    margin-top: 20px;
    .red {
      color: red;
      font-weight: 600;
    }
    .green {
      color: #67c23a;
      font-weight: 600;
    }
    .block {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>