<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list :info="info" :banner="banner" @init="init" @edit="edit"></v-list>
    <v-operat :info="info" @init="init" ref="banner"></v-operat>
  </div>
</template>

<script>
import { getBannerList } from "../../utils/http";
import vList from "./components/list";
import vOperat from "./components/operaTable";
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      banner: [],
    };
  },
  components: {
    vList,
    vOperat,
  },
  methods: {
    init() {
      //请求数据
      getBannerList().then((res) => {
        if (res.data.code === 200) {
          this.banner = res.data.list;
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
      //调用子组件的getDetail方法
      this.$refs.banner.getDetail(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>