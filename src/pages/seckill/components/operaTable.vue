<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="seckill">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="seckill.first_cateid" @change="changeCate">
            <el-option value label="--请选择--" disabled>--请选择--</el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="seckill.second_cateid" @change="changeChildren">
            <el-option value label="--请选择--" disabled>--请选择--</el-option>
            <el-option
              v-for="item in children"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="seckill.goodsid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <v-switch :obj="seckill"></v-switch>
        </el-form-item>
      </el-form>`
      <v-footer :info="info" @edit="edit" @add="add" @cancel="cancel"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import { reqSeckAdd, getSeckDetail, reqSeckUpdate } from "../../../utils/http";
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      seckill: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
      time: [],
    };
  },
  computed: {
    //获取分类 分类二级菜单  和分类菜单所属的商品
    ...mapGetters({
      catelist: "cate/list",
      children: "cate/children",
      goodsList: "goods/list",
    }),
  },
  methods: {
    //点击取消  和关闭对话框
    cancel() {
      if (!this.info.isadd) {
        this.clearSeckill();
      }
      this.time = [];
      this.info.isshow = false;
    },
    //清空seckill
    clearSeckill() {
      this.seckill = {
        title: "",
        begintime: null,
        endtime: null,
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.time = [];
    },
    //获取时间戳
    getTime(time) {
      var date = null;
      if (typeof time === "object") {
        //转换成时间戳
        date = time;
      } else {
        //转换成日期对象
        date = new Date(parseInt(time));
      }
      var y = date.getFullYear();
      var m = this.zero(date.getMonth() + 1);
      var d = this.zero(date.getDate());

      var h = this.zero(date.getHours());
      var mi = this.zero(date.getMinutes());
      var s = this.zero(date.getSeconds());
      //当参数为时间对象时返回的数据和当参数为时间戳时返回的数据
      return typeof time === "object"
        ? new Date(`${y}-${m}-${d} ${h}:${mi}:${s}`).getTime()
        : `${y}-${m}-${d} ${h}:${mi}:${s}`;
    },
    zero(time) {
      //补零操作
      return time.toString().padStart(2, "0");
    },
    //添加
    add() {
      //分别给开始时间和结束时间赋值
      this.seckill.begintime = this.getTime(this.time[0]);
      this.seckill.endtime = this.getTime(this.time[1]);
      reqSeckAdd(this.seckill).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.clearSeckill();
          //刷新列表
          this.$emit("init");
        }
      });
    },
    //获取一条详细信息
    getDetail(id) {
      getSeckDetail({ id }).then((res) => {
        if (res.data.code === 200) {
          this.seckill = res.data.list;
          this.seckill.id = id;
          //把时间戳转换成日期
          this.time.push(this.getTime(this.seckill.begintime));
          this.time.push(this.getTime(this.seckill.endtime));
          //重新获取一下二级
          this.getChildren(this.seckill.first_cateid);
          //重新获取商品
          this.getGoodsList({
            fid: this.seckill.first_cateid,
            sid: this.seckill.second_cateid,
          });
        }
      });
    },
    //修改
    edit() {
      //给开始和结束时间赋值
      this.seckill.begintime = new Date(this.time[0]).getTime();
      this.seckill.endtime = new Date(this.time[1]).getTime();
      reqSeckUpdate(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.clearSeckill();
          //刷新页面
          this.$emit("init");
        }
      });
    },
    //当一级分类菜单发生改变时触发的函数
    changeCate(id) {
      //获取子列表
      this.seckill.second_cateid = "";
      //调用getChildren方法获取二级分类菜单
      this.getChildren(id);
    },
    //当二级分类菜单改变时，获取该菜单下所有的商品
    changeChildren(id) {
      this.seckill.goodsid = "";
      this.getGoodsList({ fid: this.seckill.first_cateid, sid: id });
    },
    ...mapActions({
      reqCateList: "cate/reqList",
      getChildren: "cate/getCateChildren",
      getGoodsList: "goods/reqList",
    }),
  },
  mounted() {
    //页面一挂载就请求菜单的数据
    this.reqCateList();
  },
};
</script>

<style>
</style>