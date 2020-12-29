<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list :info="info" @edit="edit"></v-list>
    <v-operat :info="info" ref="goods"></v-operat>
    <v-page @change="change" :page="page" :size="size" :total="total"></v-page>
  </div>
</template>

<script>
import vList from "./components/list";
import vOperat from "./components/operaTable";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    vList,
    vOperat,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      //调用子组件的方法
      this.$refs.goods.getDetail(id);
    },
    ...mapActions({
      getCateList: "cate/reqList",
      getGoodsList: "goods/reqList",
      change: "goods/changePage",
    }),
  },
  mounted() {
    //页面加载完成就调用
    this.getGoodsList();
    this.getCateList();
  },
  computed: {
    ...mapGetters({
      total: "goods/total",
      size: "goods/size",
      page: "goods/page",
    }),
  },
};
</script>

<style scoped>
.page {
  float: right;
  margin: 20px;
}
</style>