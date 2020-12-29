<template>
  <div>
    <el-button type="primary" @click="edit">编辑</el-button>
    <el-button type="danger" @click="del">删除</el-button>
  </div>
</template>

<script>
import Vue from "vue";
let vm = new Vue();
import { errorAlert } from "../utils/alert";
export default {
  methods: {
    edit(id) {
      this.$emit("edit");
    },
    del(id) {
      vm.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          this.$emit("del");
        })
        .catch(() => {
          errorAlert("已取消删除");
        });
    },
  },
};
</script>

<style>
</style>