<template>
  <div class="opera">
    <el-dialog :title="info.isadd?'商品分类添加':'商品分类修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="cate">
        <el-form-item label="上级分类" :label-width="formLabelWidth" required>
          <el-select v-model="cate.pid">
            <el-option value label="---请选择---"></el-option>
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="cate.catename" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 
          action:必选参数，上传的地址
          list-type:文件列表的类型 string 默认 text
        -->
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="cate.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :on-change="changeFile"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <v-switch :obj="cate"></v-switch>
        </el-form-item>
      </el-form>
      <v-footer :info="info" @cancel="cancel" @edit="edit" @add="add"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqCateAdd, getCateDetail, reqCateUpdate } from "../../../utils/http";
export default {
  props: ["info", "cateList"],
  data() {
    return {
      cate: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
      imgUrl: "",
    };
  },
  methods: {
    clearCate() {
      this.cate = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };

      this.imgUrl = "";
    },
    cancel() {
      //关闭页面
      if (!this.info.isadd) {
        this.clearCate();
      }
      this.info.isshow = false;
    },
    changeFile(file) {
      //获取到文件,生成一个url赋值给imgUrl 将图片展示在页面
      this.imgUrl = URL.createObjectURL(file.raw);
      //判断上传的是否是图片
      let arr = [".jpg", "jpeg", ".gif", ".png"];
      //获取文件的扩展名
      //倒着截取
      let extname = file.name.slice(file.name.lastIndexOf("."));
      if (!arr.some((item) => item === extname)) {
        //cuow
        errorAlert("请上传图片");
        return;
      }
      //将上传的文件存到img中
      this.cate.img = file.raw;
    },
    //商品分类添加
    add() {
      reqCateAdd(this.cate).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.clearCate();
          this.$emit("init");
          this.cancel();
        }
      });
    },
    getDetail(id) {
      //获取一条信息
      getCateDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.cate = res.data.list;
          this.cate.id = id;
          this.imgUrl = this.$pre + this.cate.img;
        }
      });
    },
    edit() {
      //执行编辑操作
      reqCateUpdate(this.cate).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //清空数据
          this.clearCate();
          //关闭页面
          this.cancel();
          //告诉父组件刷新页面
          this.$emit("init");
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped lang="stylus">
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
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