<template>
  <div>
    <el-button type="primary" class="add" @click="willAdd">添加</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    willAdd() {
      this.$emit("willAdd");
    },
  },
};
</script>

<style scoped>
.add {
  margin: 20px;
}
</style>