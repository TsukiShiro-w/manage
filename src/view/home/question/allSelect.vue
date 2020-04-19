<template>
  <div id="allSelect">
    <!-- 单选 -->
    <div v-if="form.type==1">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <!-- 使用change事件，在改变的时候触发父组件表单验证 -->
        <el-radio v-model="form.single_select_answer" :label="item.label" @change="selectChange"></el-radio>
        <el-input class="input" v-model="item.text"></el-input>
        <uploads v-model="item.image"></uploads>
      </div>
    </div>
    <!-- 多选 -->
    <div v-if="form.type==2">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-checkbox
          v-model="form.multiple_select_answer"
          :label="item.label"
          @change="selectChange"
        ></el-checkbox>
        <el-input class="input" v-model="item.text"></el-input>
        <uploads v-model="item.image"></uploads>
      </div>
    </div>
    <div v-if="form.type==3">
      <el-input v-model="form.short_answer" type="textarea" rows="10" @change="selectChange"></el-input>
    </div>
  </div>
</template>

<script>
import uploads from "@/view/home/question/uploads.vue";
export default {
  components: {
    uploads
  },
  props: ["form"],
  methods: {
    selectChange() {
      this.$emit("change");
    }
  }
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