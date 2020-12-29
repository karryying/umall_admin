<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list :cate="cate" @edit="edit" @init="init"></v-list>
    <v-operat :info="info" :cateList="cate" ref="cate" @init="init"></v-operat>
  </div>
</template>

<script>
import { getCateList } from "../../utils/http";
import vList from "./components/list";
import vOperat from "./components/operaTable";
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
      cate: [],
    };
  },
  methods: {
    init() {
      //获取列表
      getCateList().then((res) => {
        if (res.data.code === 200) {
          this.cate = res.data.list;
        }
      });
    },
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.info.isadd = false;
      this.info.isshow = true;
      //调用子组件的方法
      this.$refs.cate.getDetail(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>