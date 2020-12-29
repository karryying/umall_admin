<template>
  <div>
    <el-dialog :title="info.isadd?'轮播图添加':'轮播图修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="banner">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <v-file @changeFile="changeFile" :imgUrl="imgUrl"></v-file>
          <!-- <el-upload
            class="avatar-uploader"
            action="#"
            :on-change="changeFile"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>-->
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <v-switch :obj="banner"></v-switch>
        </el-form-item>
      </el-form>
      <v-footer :info="info" @add="add" @edit="edit" @cancel="cancel"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import {
  getBannerDetail,
  reqBannerUpdate,
  reqBannerAdd,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      banner: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
      formLabelWidth: "120px",
      dialogVisible: true,
    };
  },
  methods: {
    clearBanner() {
      this.banner = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    cancel() {
      if (!this.info.isadd) {
        this.clearBanner();
      }
      this.info.isshow = false;
    },
    add() {
      console.log(this.banner);
      reqBannerAdd(this.banner).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //更新页面
          this.$emit("init");
          //清空
          this.clearBanner();
          this.cancel();
        }
      });
    },
    getDetail(id) {
      //获取详情
      getBannerDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          //赋值
          this.banner = res.data.list;
          this.banner.id = id;
          this.imgUrl = this.$pre + this.banner.img;
        }
      });
    },
    edit() {
      console.log(this.banner);
      //修改操作
      reqBannerUpdate(this.banner).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.$emit("init");
          this.cancel();
          this.clearBanner();
        }
      });
    },
    changeFile(file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.banner.img = file.raw;
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>