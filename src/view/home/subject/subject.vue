<template>
  <div id="subject">
    <!-- elementUI卡片 -->
    <el-card>
      <!-- element表单 -->
      <el-form label-width="70px" :inline="true">
        <el-form-item label="学科编号">
          <el-input class="subEdit"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="subName"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="subCreate"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <!-- 选择器 -->
          <el-select v-model="value" placeholder="请选择" class="subSelect">
            <el-option value='open' label='启用'></el-option>
            <el-option value='forbid' label='禁用'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type='primary'>搜索</el-button>
          <el-button>清除</el-button>
          <el-button type='primary'>+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:'',
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang='less'>
  #subject{

    .subEdit{
      width: 100px;
    }
    .subName{
      width: 149px;
    }
    .subCreate{
      width: 100px;
    }
    .subSelect{
      width: 149px;
    }
  }
</style>