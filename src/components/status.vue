<template>
  <div>
    <el-button type="primary" v-if="scope.row.status === 1">启用</el-button>
    <el-button type="info" v-else disabled>禁用</el-button>
  </div>
</template>

<script>
export default {
  props: ["scope"],
};
</script>

<style>
</style>