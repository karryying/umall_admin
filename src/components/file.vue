<template>
  <el-upload
    action="#"
    class="avatar-uploader file"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="changeFile"
  >
    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
    <i class="el-icon-plus icon"></i>
  </el-upload>
</template>

<script>
import path from "path";
import { errorAlert } from "../utils/alert";
export default {
  props: ["imgUrl"],
  methods: {
    changeFile(file) {
      //判断
      //获取文件的扩展名
      //判断文件的大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("图片大小不能超过2MB");
        return;
      }
      //imgUrl
      let extname = path.extname(file.name);
      //进行验证
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.some((item) => item === extname)) {
        errorAlert("请上传图片");
        return;
      }
      this.$emit("changeFile", file);
    },
  },
};
</script>

<style scoped>
.file {
  width: 178px;
  height: 178px;
  border: 1px dashed #ccc;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/* .form .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
} */
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>