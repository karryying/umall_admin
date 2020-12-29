<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list :info="info" @edit="edit" :specs="specs"></v-list>
    <v-operat :info="info" ref="specs"></v-operat>
    <v-page @change="change" :page="page" :size="size" :total="total"></v-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      change: "specs/changePage",
    }),
    willAdd() {
      this.info.isadd = true;
      this.info.isshow = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      //调用子组件的方法
      this.$refs.specs.getDetail(id);
    },
  },
  computed: {
    ...mapGetters({
      specs: "specs/list",
      total: "specs/total",
      page: "specs/page",
      size: "specs/size",
    }),
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style scoped>
.page {
  float: right;
  margin: 20px;
}
</style>