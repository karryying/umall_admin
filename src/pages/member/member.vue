<template>
  <div>
    <v-list @edit="edit" :member="member"></v-list>
    <v-operat ref="member" :info="info" @init="init"></v-operat>
  </div>
</template>

<script>
import { getMemberList, getMenuList } from "../../utils/http";
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
        isadd: false,
      },
      member: [],
    };
  },
  methods: {
    init() {
      //请求会员
      getMemberList().then((res) => {
        if (res.data.code === 200) {
          //赋值
          this.member = res.data.list;
          console.log(this.member);
        }
      });
    },
    edit(id) {
      console.log("触发", id);
      this.info.isshow = true;
      //调用子组件的方法
      this.$refs.member.getDetail(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>