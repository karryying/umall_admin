<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="member">
        <el-form-item label="手机号" :label-width="formLabelWidth" required>
          <el-input v-model="member.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" required>
          <el-input v-model="member.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" required>
          <el-input v-model="member.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" required>
          <v-switch :obj="member"></v-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edit" :disabled="member.password.length===0">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { getMemberDetail, reqMemberUpdate } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      member: {
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancel() {
      this.member = {
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      };
      this.info.isshow = false;
    },
    getDetail(id) {
      //获取一条信息
      //获取详细信息
      getMemberDetail({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.member = res.data.list;
          this.member.password = "";
          this.member.id = id;
        }
      });
    },
    edit() {
      //修改
      reqMemberUpdate(this.member).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //更新页面
          this.$emit("init");
          this.cancel();
        }
      });
    },
  },
};
</script>

<style>
</style>