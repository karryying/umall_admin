<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态">
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
  </div>
</template>

<script>
import { reqMenuDelete } from "../../../utils/http";
import { successAlert, errorAlert, deleteAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    //点击编辑弹框显示
    edit(id) {
      //告诉父组件去获取这个菜单的信息
      // console.log(id);
      this.$emit("getDetail", id);
    },
    del(id) {
      //做删除操作
      reqMenuDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          //成功的提示
          successAlert(res.data.msg);
          //告诉父组件刷新页面
          this.$emit("init");
        }
      });
    },
  },
  mounted() {
    console.log(this.list);
  },
};
</script>

<style>
</style>