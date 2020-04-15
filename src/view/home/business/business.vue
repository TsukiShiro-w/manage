<template>
  <div id="business">
    <el-card>
      <el-form :inline="true" label-width="70px" ref="form" :model="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid" class="eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name" class="name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username" class="username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" class="status">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="50">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.PageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="150"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="150"></el-table-column>
        <el-table-column prop="username" label="创建者" width="150"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status==1?'info':'success'"
              v-if="$store.state.role.includes('管理员')"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)" type="danger" v-if="$store.state.role.includes('管理员')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addBusiness ref="addBusiness" @add="search" :mode="mode"></addBusiness>
  </div>
</template>

<script>
import {
  getBusinessData,
  setBusinessStatus,
  delBusinessData
} from "@/api/business.js";
import addBusiness from "@/view/home/business/addBusiness.vue";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      mode: "add",
      pagination: {
        currentPage: 1,
        PageSize: 10,
        total: 100
      },
      tableData: [],
      form: {
        status: "",
        eid: "",
        name: "",
        username: ""
      }
    };
  },
  methods: {
    getPaginationData() {
      let _page = {
        limit: this.pagination.PageSize,
        page: this.pagination.currentPage,
        ...this.form
      };
      getBusinessData(_page).then(res => {
        console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 改变页容量
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagination.PageSize = size;
      this.pagination.currentPage = 1;
      this.search();
    },
    // 改变页码
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.pagination.currentPage = page;
      this.getPaginationData();
    },
    search() {
      // 如果不写，在搜索的时候，如果页码在其他页有可能出现没有数据的情况
      this.pagination.currentPage = 1;
      this.getPaginationData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    setStatus(id) {
      setBusinessStatus({ id: id }).then(() => {
        this.$message.success("状态修改成功");
        this.getPaginationData();
      });
    },
    // 删除内容
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delBusinessData({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    // 添加内容
    add() {
      this.mode = "add";
      this.$refs.addBusiness.form = {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      this.$refs.addBusiness.dialogFormVisible = true;
    },
    // 编辑内容
    edit(row) {
      this.mode = "edit";
      this.$refs.addBusiness.dialogFormVisible = true;
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
    }
  },
  created() {
    this.getPaginationData();
  }
};
</script>

<style lang='less'>
#business {
  .status {
    width: 150px;
  }
  .eid {
    width: 150px;
  }
  .username {
    width: 150px;
  }
  .name {
    width: 150px;
  }
  .table {
    margin-top: 30px;

    .red {
      color: red;
      font-weight: 600;
    }

    .block {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>