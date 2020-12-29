<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow" @closed="cancel" @opened="opened">
      <el-form :model="goods">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="goods.first_cateid" @change="change">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            >{{item.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="goods.second_cateid">
            <el-option value label="--请选择--" disabled>--请选择--</el-option>
            <el-option
              v-for="item in children"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >{{item.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="goods.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="图片" label-width="120px">
          <v-file :imgUrl="imgUrl" @changeFile="changeFile"></v-file>
        </el-form-item>

        <!-- 上传图片 -->

        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="goods.specsid" @change="changeSpecs">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :label="item.specsname"
              :key="item.id"
              :value="item.id"
            >{{item.specsname}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="goods.specsattr" multiple>
            <el-option value label="--请选择--">--请选择--</el-option>
            <el-option v-for="item in attrs" :key="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio :value="1" v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio :value="2" v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="120px">
          <el-radio :value="1" v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio :value="2" v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item class="area" label="商品描述" label-width="120px">
          <div id="editor" v-if="info.isshow"></div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <v-switch :obj="goods"></v-switch>
        </el-form-item>
        <!--  -->
        <v-footer :info="info" @add="add" @edit="edit"></v-footer>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import {
  reqGoodsAdd,
  getGoodsDetail,
  reqGoodsUpdate,
  getCateList,
  reqGoodsDelete,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      n: 0,
      children: [],
      attrs: [],
      imgUrl: "",
    };
  },
  methods: {
    del(id) {
      //删除
      reqGoodsDelete({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
        }
      });
    },
    add() {
      //add操作
      //获取内容并赋值
      this.goods.description = this.editor.txt.html();
      let data = {
        ...this.goods,
        specsattr: JSON.stringify(this.goods.specsattr),
      };
      reqGoodsAdd(data).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //添加成功以后关闭弹窗，重新加载页面
          this.cancel();
          this.clearGoods();
          this.reqGoodsList();
        }
      });
    },
    getDetail(id) {
      //获取一条数据
      getGoodsDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          //重新赋值
          this.goods = res.data.list;
          this.imgUrl = this.$pre + this.goods.img;
          //重新获取一下商品分类的二级菜单
          this.change(this.goods.first_cateid);
          //重新获取一下商品规格的二级菜单
          this.changeSpecs(this.goods.specsid);
          //转换
          this.goods.specsattr = JSON.parse(this.goods.specsattr);
          //把imgUrl重新赋值
          this.goods.id = id;
          // 判断编辑器是否创建完成，如果创建完成就赋值description
          if (this.editor) {
            //设置富文本编辑器的内容
            this.editor.txt.html(this.goods.description);
          }
        }
      });
    },
    edit() {
      this.goods.description = this.editor.txt.html();
      let data = {
        ...this.goods,
        specsattr: JSON.stringify(this.goods.specsattr),
      };
      //修改
      reqGoodsUpdate(data).then((res) => {
        if (res.data.code === 200) {
          //
          successAlert(res.data.msg);
          this.cancel();
          this.clearGoods();
          this.reqGoodsList();
        }
      });
    },
    clearGoods() {
      this.goods = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    cancel() {
      if (!this.info.isadd) {
        this.clearGoods();
      }
      this.imgUrl = "";
      this.info.isshow = false;
    },
    //获取商品分类的二级菜单
    change(v) {
      getCateList(v).then((res) => {
        if (res.data.code === 200) {
          this.children = res.data.list;
        }
      });
    },
    //获取商品规格的二级菜单
    changeSpecs(v) {
      this.specsList.forEach((item) => {
        if (v === item.id) {
          this.attrs = item.attrs;
        }
      });
    },
    changeFile(file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.goods.img = file.raw;
    },
    //当弹框打开时新建一个富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      // 当编辑器加载完成之后，请求还未结束之前 先把description赋值
      this.editor.txt.html(this.goods.description);
    },
    ...mapActions({
      reqSpecsList: "specs/reqList",
      reqGoodsList: "goods/reqList",
    }),
  },
  computed: {
    ...mapGetters({
      specsList: "specs/list",
      cateList: "cate/list",
    }),
  },
  mounted() {
    this.reqSpecsList(true);
  },
};
</script>

<style scoped>
.area {
  height: 600px;
}
</style>