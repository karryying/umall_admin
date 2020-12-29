<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <v-status :scope="scope"></v-status>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <v-opera :info="info" @edit="edit(scope.row.id)" @del="del(scope.row.id)"></v-opera>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqSeckDelete } from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$emit("edit", id);
    },
    del(id) {
      //删除
      reqSeckDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //刷新页面
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>