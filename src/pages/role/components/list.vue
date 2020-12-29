<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- <el-button type="primary" v-if="scope.row.status === 1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>-->
            <v-status :scope="scope"></v-status>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>-->
            <v-opera @edit="edit(scope.row.id)" @del="del(scope.row.id)"></v-opera>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { reqRoleDelete } from "../../../utils/http";
import { successAlert, deleteAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    edit(id) {
      //告诉父组件要修改了,先获取一条详细信息
      this.$emit("getDetail", id);
    },
    del(id) {
      //做删除操作
      reqRoleDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.$emit("init");
        }
      });
    },
  },
  mounted() {},
};
</script>

<style>
</style>