<template>
  <div>
    <v-add @willAdd="willAdd"></v-add>
    <v-list @getDetail="getDetail" :list="list" @init="init" :roles="roles"></v-list>
    <v-operat :info="info" ref="manager" @init="init" :roles="roles"></v-operat>

    <v-page @change="change" :page="obj.page" :size="obj.size" :total="obj.total"></v-page>
  </div>
</template>

<script>
import vList from "./components/list";
import vOperat from "./components/operaTable";
import { getUserList, getUserCount, getRoleList } from "../../utils/http";
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
      obj: {
        size: 2,
        page: 1,
        total: 0,
      },
      roles: [],
    };
  },
  methods: {
    init() {
      this.getTotal();
      this.getList();
    },
    getList() {
      getUserList({ page: this.obj.page, size: this.obj.size }).then((res) => {
        if (res.data.code === 200) {
          //重新赋值
          if (res.data.list.length === 0 && this.obj.page > 1) {
            //
            this.obj.page--;
            this.init();
            return;
          }
          this.list = res.data.list;
        }
      });
      //获取角色
      getRoleList().then((res) => {
        if (res.data.code === 200) {
          //赋值
          this.roles = res.data.list;
        }
      });
    },
    //获取管理员的总人数
    getTotal() {
      getUserCount().then((res) => {
        this.obj.total = res.data.list[0].total;
      });
    },
    change(val) {
      //页数获取到了
      this.obj.page = val;
      this.init();
    },
    //点击了添加按钮
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    //获取一个管理员的详细信息
    getDetail(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      //调用子元素的getDetail方法
      this.$refs.manager.getDetail(id);
    },
  },
  mounted() {
    this.init();
    this.getTotal();
  },
};
</script>

<style scoped>
</style>