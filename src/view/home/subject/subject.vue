<template>
  <div id="subject">
    <!-- elementUI卡片 -->
    <el-card>
      <!-- element表单 -->
      <el-form label-width="70px" :inline="true" :model="form" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="subEdit" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="subName" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="subCreate" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- 选择器 -->
          <el-select v-model="form.status" placeholder="请选择" class="subSelect">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="tableCard">
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid" width="150px"></el-table-column>
        <el-table-column label="学科名称" prop="name" width="150px"></el-table-column>
        <el-table-column label="创建者" prop="username" width="200px"></el-table-column>
        <el-table-column label="创建日期" prop="create_time" width="200px"></el-table-column>
        <el-table-column label="状态" width="150px">
          <template slot-scope="scope">{{scope.row.status == 1 ? '启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
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
    <addSubject ref="addSubject" @addSubject="search" :mode="mode"></addSubject>
  </div>
</template>

<script>
import {
  getSubjectList,
  setSubjectStatus,
  delSubjectData
} from "@/api/subject.js";
import addSubject from "@/view/home/subject/addSubject.vue";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add",
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      value: "",
      tableData: [],
      form: {
        rid: "",
        name: "",
        username: "",
        status: ""
      }
    };
  },
  created() {
    this.getSubjectData();
  },
  methods: {
    add() {
      this.mode = "add";
      this.$refs.addSubject.form = {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      this.$refs.addSubject.dialogVisible = true;
    },
    getSubjectData() {
      let _page = {
        limit: this.pagination.pageSize,
        page: this.pagination.currentPage,
        ...this.form
      };
      getSubjectList(_page).then(res => {
        console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 编辑
    edit(row) {
      this.mode = "edit";
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
      this.$refs.addSubject.dialogVisible = true;
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delSubjectData({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.getSubjectData();
        });
      });
    },
    // 分页
    // 页面容量改变
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getSubjectData();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getSubjectData();
    },
    search() {
      this.pagination.currentPage = 1;
      this.getSubjectData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    setStatus(id) {
      setSubjectStatus({ id: id }).then(() => {
        this.$message.success("状态设置成功");
        this.getSubjectData();
      });
    }
  }
};
</script>

<style lang='less'>
#subject {
  .subEdit {
    width: 149px;
  }
  .subName {
    width: 149px;
  }
  .subCreate {
    width: 149px;
  }
  .subSelect {
    width: 149px;
  }
  .tableCard {
    margin-top: 20px;

    .block {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>