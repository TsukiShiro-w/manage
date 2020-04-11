<template>
  <div id="subject">
    <!-- elementUI卡片 -->
    <el-card>
      <!-- element表单 -->
      <el-form label-width="70px" :inline="true">
        <el-form-item label="学科编号">
          <el-input class="subEdit" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="subName" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="subCreate" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <!-- 选择器 -->
          <el-select v-model="value" placeholder="请选择" class="subSelect">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="tableCard">
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid" width="200px"></el-table-column>
        <el-table-column label="学科名称" prop="name" width="200px"></el-table-column>
        <el-table-column label="创建者" prop="username" width="200px"></el-table-column>
        <el-table-column label="创建日期" prop="create_time" width="200px"></el-table-column>
        <el-table-column label="状态" width="150px">
          <template slot-scope="scope">{{scope.row.status == 1 ? '启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button>编辑</el-button>
            <el-button @click="forbid(scope)">禁用</el-button>
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
  </div>
</template>

<script>
import { getSubjectList } from "@/api/subject.js";
export default {
  data() {
    return {
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
    getSubjectList().then(res => {
      console.log(res);
      this.tableData = res.data.items;
      // this.pagination = res.data.pagination;
    });
  },
  methods: {
    // 分页
    // 页面容量改变
    handleSizeChange(size) {
      this.pagination.pageSize = size;
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
    },

    forbid(scope) {
      console.log(scope);
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