<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
    }),
  },
  mounted() {
    this.reqCateList();
  },
  watch: {
    list: {
      handler() {
        var mychart = require("echarts").init(
          document.getElementById("container")
        );
        if (this.list.length > 0) {
          console.log(this.list);
          //做操作
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "bar",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };
          mychart.setOption(option);
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#container {
  width: 80%;
  height: 400px;
}
</style>