<template>
  <div>
    <el-table :data="specs" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <v-status :scope="scope"></v-status>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <v-opera @del="del(scope.row.id)" @edit="edit(scope.row.id)"></v-opera>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqSpecsDelete } from "../../../utils/http";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info", "specs"],
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      //删除操作
      reqSpecsDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
    ...mapActions({
      reqList: "specs/reqList",
    }),
  },
};
</script>

<style scoped>
.spec {
  display: inline-block;
  padding: 0 10px;
  background: #ecf5ff;
  border-radius: 5px;
  font: 15px/30px "微软雅黑";
  color: #409eff;
  border: 1px solid #d9ecff;
}
</style>