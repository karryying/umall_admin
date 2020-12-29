<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <!-- 一定要开启路由 router -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="(item) in userInfo.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <el-submenu v-if="item.children" :index="item.id+''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          {{userInfo.username}}
          <i class="el-icon-setting"></i>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="router"></router-view>
          <!-- {{user}} -->
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    ...mapActions({
      reqUserInfo: "reqUserInfo",
    }),
    init() {
      //获取当前登录用户的权限
    },
    logout() {
      this.reqUserInfo({});
      this.$router.replace("/login");
    },
  },
  mounted() {
    // this.init();
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  background: #20222a;
}
.el-menu {
  border: 1px solid #20222a;
}
.el-header {
  background: #b3c0d1;
  text-align: right;
  line-height: 60px;
}
.router {
  padding-top: 20px;
}
</style>