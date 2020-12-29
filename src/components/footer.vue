<template>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
    <el-button type="primary" @click="edit" v-else>修 改</el-button>
  </div>
</template>

<script>
export default {
  props: ["info"],
  methods: {
    cancel() {
      //触发父组件绑定的方法
      this.$emit("cancel");
    },
    add() {
      this.$emit("add");
    },
    edit() {
      this.$emit("edit");
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  float: right;
  margin-top: -20px;
}
</style>