<template>
  <div>
    <el-table :data="banner" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="状态">
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
import { reqBannerDelete } from "../../../utils/http";
export default {
  props: ["banner", "info"],
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    del(id) {
      reqBannerDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //更新页面
          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
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