<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{scope.row.price | filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
        <template slot-scope="scope">
          <span>{{scope.row.market_price | filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button class="btn" size="mini" v-if="scope.row.isnew" type="primary">是</el-button>
          <el-button class="btn" size="mini" v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button class="btn" v-if="scope.row.ishot" type="primary">是</el-button>
          <el-button class="btn" v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <v-status :scope="scope"></v-status>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <v-opera :scope="scope" @edit="edit(scope.row.id)" @del="del(scope.row.id)"></v-opera>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDelete } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      //删除操作
      reqGoodsDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //重新刷新页面
          this.reqGoodsList();
        }
      });
    },
    ...mapActions({
      reqGoodsList: "goods/reqList",
    }),
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/list",
    }),
  },
  mounted() {},
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
.btn {
  padding: 0;
  padding: 10px;
  text-align: center;
}
</style>