<template>
  <div>
    <template>
      <el-table
        :data="cate"
        row-key="id"
        :tree-props="{children: 'children'}"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
        <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img v-if="scope.row.pid !== 0" :src="$pre+scope.row.img" alt="图片" />
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <v-status :scope="scope"></v-status>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <v-opera @edit="edit(scope.row.id)" @del="del(scope.row.id)"></v-opera>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqCateDelete } from "../../../utils/http";
export default {
  props: ["cate"],
  data() {
    return {};
  },
  methods: {
    edit(id) {
      //告诉父组件要修改了
      this.$emit("edit", id);
    },
    del(id) {
      //删除
      reqCateDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //删除成功刷新页面
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>