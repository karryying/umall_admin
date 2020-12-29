<template>
  <div>
    <el-dialog :title="info.isadd?'会员添加':'会员修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="manager">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="manager.roleid">
            <el-option :value="0" label="请选择" disabled>请选择</el-option>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            >{{item.rolename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="manager.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="manager.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <!-- 公共组件 -->
          <v-switch :obj="manager"></v-switch>
        </el-form-item>
      </el-form>
      <!-- 公共组件 -->
      <v-footer :info="info" @add="add" @edit="edit" @cancel="cancel"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserAdd, getUserDetail, reqUserUpdate } from "../../../utils/http";
import { errorAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info", "roles"],
  data() {
    return {
      manager: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    valitManager() {
      return new Promise((resolve, reject) => {
        if (this.manager.roleid === 0) {
          errorAlert("请选择所属角色");
          return;
        }
        if (this.manager.username === "") {
          errorAlert("请输入用户名");
          return;
        }
        if (this.manager.password === "") {
          errorAlert("请输入密码");
          return;
        }
        resolve();
      });
    },
    clearManager() {
      this.manager = {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },
    cancel() {
      if (!this.info.isadd) {
        //清空操作
        this.clearManager();
      }
      this.info.isshow = false;
    },
    add() {
      this.valitManager().then(() => {
        //添加操作
        this.manager.password = this.password;
        reqUserAdd(this.manager).then((res) => {
          if (res.data.code === 200) {
            //成功
            successAlert(res.data.msg);
            //告诉父组件刷新页面
            this.$emit("init");
            //关闭弹窗
            this.info.isshow = false;
            //清空操作
            this.clearManager();
          }
        });
      });
    },
    getDetail(id) {
      console.log(id);
      //获取一条会员的信息
      getUserDetail({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.manager = res.data.list;
          this.manager.uid = id;
          console.log(this.manager);
          //判断当前管理员所对应的角色有没有被删除
          let index = this.roles.findIndex((item) => {
            return this.manager.roleid === item.id;
          });
          if (index === -1) {
            this.manager.roleid = 0;
          }
          this.manager.password = "";
        }
      });
      //赋值
    },
    edit() {
      this.valitManager().then(() => {
        //做修改操作
        console.log(this.manager);
        reqUserUpdate(this.manager).then((res) => {
          if (res.data.code == 200) {
            console.log(this.manager.uid, this.userInfo);
            if (this.manager.uid === this.userInfo.uid) {
              //让用户重新登录
              successAlert(res.data.msg + "请重新登录");
              this.$router.replace("/login");
              return;
            }
            successAlert(res.data.msg);
            //告诉父组件刷新页面
            this.$emit("init");
            //关闭弹窗
            this.info.isshow = false;
            //清空操作
            this.clearManager();
          }
        });
      });
    },
  },
  computed: {
    roleid() {
      let role = this.roles.filter((item) => item.id === this.manager.roleid);
      if (role.length == 0) {
        return 0;
      } else {
        return role;
      }
    },
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  mounted() {},
};
</script>

<style>
</style>