<template>
  <div>
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="menu">
        <el-form-item label="菜单名称" label-width="120px" required>
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px" required>
          <el-select v-model="menu.pid" @change="changePid(menu.pid)">
            <el-option value label="--请选择--"></el-option>
            <el-option :value="0" label="顶级菜单">顶级菜单</el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            >{{item.title}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="menu.type" :label="1" name="type" disabled>目录</el-radio>
          <el-radio v-model="menu.type" :label="2" name="type" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="120px" v-if="menu.type === 1">
          <el-select v-model="menu.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路径" label-width="120px" v-else>
          <el-select v-model="menu.url">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :value="item.path"
              :label="item.name+'--'+item.path"
            >{{item.name+'---'+item.path}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <v-switch :obj="menu"></v-switch>
        </el-form-item>
      </el-form>
      <v-footer :info="info" @add="add" @edit="edit" @cancel="cancel"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import { reqMenuAdd, getMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { indexRouter } from "../../../router/index";
import { errorAlert, successAlert } from "../../../utils/alert";
import { valitMenu } from "../../../utils/validate";
export default {
  props: ["info", "list"],
  data() {
    return {
      menu: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      value: true,
      indexRouter,
      icons: [
        "el-icon-user-solid",
        "el-icon-video-camera-solid",
        "el-icon-s-order",
        "el-icon-s-release",
        "el-icon-s-opportunity",
        "el-icon-s-check",
        "el-icon-s-grid",
      ],
    };
  },
  methods: {
    clearMenu() {
      this.menu = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    cancel() {
      if (!this.info.isadd) {
        //修改
        //清空
        this.clearMenu();
      }
      this.info.isshow = false;
    },
    add() {
      valitMenu(this.menu).then(() => {
        //添加操作
        reqMenuAdd(this.menu).then((res) => {
          if (res.data.code == 200) {
            //添加成功
            successAlert(res.data.msg);
            //告诉父组件更新列表
            this.$emit("init");
            //关闭弹框
            this.cancel();
            //清空
            this.clearMenu();
          }
        });
      });
    },
    // 当
    changePid(pid) {
      if (pid == 0) {
        //顶级菜单  顶级菜单有图标没有路径
        this.menu.type = 1;
      } else {
        // 否则 不是顶级菜单  没有图标有路径
        this.menu.type = 2;
      }
    },
    getDetail(id) {
      this.info.isshow = true;
      getMenuDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.menu = res.data.list;
          this.menu.id = id;
        }
      });
    },
    edit() {
      valitMenu(this.menu).then((res) => {
        reqMenuUpdate(this.menu).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            //弹窗关闭
            this.cancel();
            //清空
            this.clearMenu();
            this.$emit("init");
          }
        });
      });
    },
    closed() {
      console.log(this.info);
    },
  },
};
</script>

<style>
</style>