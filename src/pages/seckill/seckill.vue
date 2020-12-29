<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list :info="info" @edit="edit" :list="list" @init="init"></v-list>
    <v-operat :info="info" ref="seckill" @init="init"></v-operat>
  </div>
</template>

<script>
import { getSeckList } from "../../utils/http";
import vOperat from "./components/operaTable";
import vList from "./components/list";
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
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.$refs.seckill.getDetail(id);
    },
    init() {
      getSeckList().then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>