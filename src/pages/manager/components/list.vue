<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column label="所属角色">
        <template slot-scope="scope">
          <span style="color:#ccc" v-if="scope.row.rolename==null">暂无分配</span>
          <span v-else>{{scope.row.rolename}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" prop="status">
          <v-status :scope="scope"></v-status>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <v-opera @edit="edit(scope.row.uid)" @del="del(scope.row.uid)"></v-opera>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqUserDelete } from "../../../utils/http";
import { successAlert, deleteAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["list", "roles"],
  data() {
    return {};
  },
  methods: {
    edit(uid) {
      //告诉父组件要拿这个值了
      console.log(uid);
      this.$emit("getDetail", uid);
    },
    del(uid) {
      //删除操作
      console.log(uid);
      reqUserDelete({ uid: uid }).then((res) => {
        if (res.data.code === 200) {
          //删除成功
          successAlert(res.data.msg);
          //更新页面
          this.$emit("init");
        }
      });
    },
  },
  mounted() {
    this.list.map((item, index) => {
      if (item.roleid === this.roles[index].id) {
        this.list.rolename = this.roles[index].rolename;
      }
    });
  },
};
</script>

<style scoped>
</style>