<template>
  <el-switch
    v-model="obj.status"
    :active-value="1"
    :inactive-value="2"
    active-color="#13ce66"
    inactive-color="#ff4949"
  ></el-switch>
</template>

<script>
export default {
  props: ["obj"],
};
</script>

<style>
</style>