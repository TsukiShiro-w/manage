<template>
  <div id="userList">
    <el-card>
      <el-form :model="form" ref="form" :inline="true">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :value="key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="50">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize + scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="role" label="角色" width="120">
          <template slot-scope="scope">{{scope.row.role}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0,green:scope.row.status==1}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status==0?'success':'info'"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
    <addUserList ref="addUserList" :mode="mode" @add="search"></addUserList>
  </div>
</template>

<script>
import addUserList from "@/view/home/userList/addUserList.vue";
import {
  getUserListData,
  delUserListData,
  setUserStatus
} from "@/api/userList.js";
export default {
  components: {
    addUserList
  },
  data() {
    return {
      mode: "add",
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      tableData: [],
      form: {
        role_id: "",
        username: "",
        email: ""
      }
    };
  },
  methods: {
    getData() {
      let _page = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserListData(_page).then(res => {
        console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
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
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    add() {
      this.mode = "add";
      this.$refs.addUserList.form = {
        role_id: "",
        status: "",
        username: "",
        email: "",
        phone: "",
        remark: ""
      };
      this.$refs.addUserList.dialogFormVisible = true;
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addUserList.dialogFormVisible = true;
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(row));
    },
    del(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message.success("删除成功");
        delUserListData({ id: id }).then(() => {
          this.search();
        });
      });
    },
    setStatus(id) {
      setUserStatus({ id: id }).then(() => {
        this.$message.success("状态修改成功");
        this.getData();
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
#userList {
  .table {
    margin-top: 20px;
  }
  .block {
    text-align: center;
    margin-top: 20px;
  }
  .red {
    color: red;
    font-weight: 600;
  }
  .green{
    color: #67C23A;
    font-weight: 600;
  }
}
</style>