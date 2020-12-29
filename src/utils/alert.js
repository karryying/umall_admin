import Vue from "vue"
let vm = new Vue();

//成功的弹窗
export let successAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'success'
    });
};

//失败的弹窗
export let errorAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'warning'
    });
};

//删除的弹窗
export let deleteAlert = () => {
    return vm.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
}