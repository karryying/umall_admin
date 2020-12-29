<template>
  <div>
    <el-dialog :title="info.isadd?'商品规格添加':'商品规格修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="specs">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="specs.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item,index) in input"
          :key="index"
          class="form"
          :label-width="formLabelWidth"
          ref="form"
        >
          <div class="iptbox">
            <el-input auto-complete="off" v-model="item.input" class="ipt"></el-input>
            <el-button type="primary" @click="addNode" class="btn" v-if="index==0">新增规格属性</el-button>
            <el-button type="danger" @click="delNode(index)" class="btn" v-else>删除</el-button>
          </div>
        </el-form-item>
        <!-- 
        -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <v-switch :obj="specs"></v-switch>
        </el-form-item>
      </el-form>
      <v-footer @edit="edit" @add="add" :info="info" @cancel="cancel"></v-footer>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  reqSpecsAdd,
  getSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      specs: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "120px",
      input: [{ input: "" }],
    };
  },
  methods: {
    //关闭对话框
    cancel() {
      if (!this.info.isadd) {
        this.clearSpecs();
      }
      this.info.isshow = false;
    },
    //清除specs
    clearSpecs() {
      this.specs = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.input = [];
      this.obj = {
        input: "",
      };
    },
    add() {
      this.specs.attrs = JSON.stringify(this.input.map((item) => item.input));
      //添加操作
      reqSpecsAdd(this.specs).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.clearSpecs();
          this.reqList();
        }
      });
    },
    getDetail(id) {
      getSpecsDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          //赋值
          this.specs = res.data.list[0];
          this.specs.id = id;
          this.specs.attrs = JSON.parse(this.specs.attrs);
          this.input = this.specs.attrs.map((item) => ({ input: item }));
        }
      });
    },
    edit() {
      this.specs.attrs = JSON.stringify(this.input.map((item) => item.input));
      reqSpecsUpdate().then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //更新
          this.cancel();
          this.clearSpecs();
          this.reqList();
        }
      });
    },
    addNode() {
      //点击新增规格  就在input上添加一个空对象
      this.input.push({ input: "" });
    },
    delNode(index) {
      this.input.splice(index, 1);
    },
    ...mapActions({
      reqList: "specs/reqList",
    }),
  },
};
</script>

<style scoped>
.iptbox {
  display: flex;
  flex-direction: row;
}
</style>