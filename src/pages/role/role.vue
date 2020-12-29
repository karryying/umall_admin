<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list :list="list" @init="init" @getDetail="getDetail"></v-list>
    <v-operat :info="info" @init="init" ref="role"></v-operat>
  </div>
</template>

<script>
import vList from "./components/list";
import vOperat from "./components/operaTable";
import { getRoleList, getRoleDetail } from "../../utils/http";
import { successAlert } from "../../utils/alert";
export default {
  components: {
    vOperat,
    vList,
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
      //弹框显示
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      getRoleList().then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
    },
    getDetail(id) {
      //弹框显示
      this.info.isshow = true;
      this.info.isadd = false;
      //调用子组件的getDetail方法，获取一条数据
      this.$refs.role.getDetail(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>

</style>