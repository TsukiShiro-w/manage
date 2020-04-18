<template>
  <div id="allSelect">
    <!-- 单选 -->
    <div v-if="form.type==1">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-radio v-model="form.single_select_answer" :label="item.label"></el-radio>
        <el-input class="input" v-model="item.text"></el-input>
        <uploads v-model="item.image"></uploads>
      </div>
    </div>
    <!-- 多选 -->
    <div v-if="form.type==2">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-checkbox v-model="form.multiple_select_answer" :label="item.label"></el-checkbox>
        <el-input class="input" v-model="item.text"></el-input>
        <uploads v-model="item.image"></uploads>
      </div>
    </div>
    <div v-if="form.type==3">
      <el-input v-model="form.short_answer" type="textarea" rows="10"></el-input>
    </div>
  </div>
</template>

<script>
import uploads from "@/view/home/question/uploads.vue";
export default {
  components: {
    uploads
  },
  props: ["form"]
};
</script>

<style lang='less'>
#allSelect {
  margin-top: 50px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    .input {
      margin: 0 30px;
    }
  }
}
</style>