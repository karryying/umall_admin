<template>
  <div class="login">
    <div class="con">
      <h3 class="title">登录</h3>
      <el-form :model="user" :rules="rules" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="user.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="ipt"></div>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert } from "../../utils/alert";
import { reqUserLogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      reqUserInfo: "reqUserInfo",
    }),
    login() {
      if (this.user.username === "") {
        errorAlert("请输入账号");
        return;
      }
      if (this.user.password === "") {
        errorAlert("请输入密码");
        return;
      }
      reqUserLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          //设置值
          this.reqUserInfo(res.data.list);
          this.$router.push("/");
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #423a53, #2f3d60);
}
.con {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px 30px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
}
.con .ipt {
  /* margin: 20px 0; */
}
form {
  margin-top: 20px;
}
.el-form-item {
  /* margin-bottom: 20px; */
}
.title {
  font: 20px/30px "微软雅黑";
}
.con .el-input {
  margin: 10px 0;
}
.con .el-button {
  width: 100%;
}
</style>