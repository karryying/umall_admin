<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="size"
    :total="total"
    @current-change="change"
    :current-page="page"
    ref="page"
    class="page"
  ></el-pagination>
</template>

<script>
export default {
  props: ["page", "size", "total"],
  methods: {
    change(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style scoped>
.page {
  float: right;
  margin: 20px;
}
</style>