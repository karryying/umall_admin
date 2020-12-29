<template>
  <div>
    <!-- 添加 -->
    <v-add @willAdd="willAdd"></v-add>

    <!-- 表格 -->
    <v-list :list="menuList" @getDetail="getDetail" @init="init"></v-list>
    <!-- 操作表格  添加或修改 -->
    <v-operat :info="info" :list="menuList" @init="init" ref="opera"></v-operat>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMenuList } from "../../utils/http";
import vList from "./components/list";
import vOperat from "./components/operatable";
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
    ...mapActions({
      reqMenuListAction: "menu/reqMenuListAction",
    }),
    willAdd() {
      this.info.isadd = true;
      this.info.isshow = true;
    },
    init() {
      //获取列表
      this.reqMenuListAction();
    },
    getDetail(id) {
      this.info.isadd = false;
      this.$refs.opera.getDetail(id);
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
</style>