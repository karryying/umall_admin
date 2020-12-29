<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <div class="ipt">
        <el-input placeholder="请输入内容" v-model="user.username" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
      </div>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserLogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      reqUserInfo: "reqUserInfo",
    }),
    login() {
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
  margin: 20px 0;
}
.con .el-input {
  margin: 10px 0;
}
.con .el-button {
  width: 100%;
}
</style>