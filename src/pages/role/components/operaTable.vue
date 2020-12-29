<template>
  <div>
    <el-dialog :title="info.isadd?'添加角色':'修改角色'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="role">
        <el-form-item label="角色名称" label-width="120px" required>
          <el-input v-model="role.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <v-switch :obj="role"></v-switch>
        </el-form-item>
      </el-form>
      <v-footer :info="info" @add="add" @edit="edit" @cancel="cancel"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMenuList,
  reqRoleAdd,
  getRoleDetail,
  reqRoleUpdate,
} from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      role: {
        id: 0,
        rolename: "",
        menus: "",
        status: 1,
      },
      value: true,
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqMenuListAction",
    }),
    valitRole() {
      return new Promise((resolve, reject) => {
        if (this.role.rolename === "") {
          errorAlert("请输入角色名称");
          return;
        }
        if (
          this.$refs.tree.getCheckedNodes().map((item) => item.id).length === 0
        ) {
          errorAlert("请选择权限");
          return;
        }
        resolve();
      });
    },
    //清空
    clearRole() {
      this.clearDefaultKeys();
      this.role = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.clearRole();
      }
      this.info.isshow = false;
    },
    //添加
    add() {
      this.valitRole().then(() => {
        this.role.menus = this.getCheckedNodes();
        //添加了
        reqRoleAdd(this.role).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            //关闭弹框
            this.cancel();
            //清空数据
            this.clearRole();
            //更新页面
            this.$emit("init");
          }
        });
      });
    },
    //获取一个角色的信息
    getDetail(id) {
      getRoleDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          res.data.list.menus = JSON.parse(res.data.list.menus);
          this.role = res.data.list;
          this.role.id = id;
          this.setDefaultKeys();
        }
      });
    },
    edit() {
      this.valitRole().then(() => {
        this.role.menus = this.getCheckedNodes();
        reqRoleUpdate(this.role).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            //关闭窗口
            this.cancel();
            //刷新页面
            this.$emit("init");
            //清空
            this.clearRole();
          }
        });
      });
    },
    //获取选中的权限
    getCheckedNodes() {
      return JSON.stringify(
        this.$refs.tree.getCheckedNodes().map((item) => item.id)
      );
    },
    clearDefaultKeys() {
      this.role.menus = [];
      this.$refs.tree.setCheckedKeys([]);
    },
    setDefaultKeys() {
      this.$refs.tree.setCheckedKeys(this.role.menus);
    },
  },
  mounted() {
    //获取menus
    this.reqMenuListAction();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
};
</script>

<style>
</style>