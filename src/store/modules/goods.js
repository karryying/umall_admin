import { getGoodsList, getGoodsCount } from "../../utils/http"
let state = {
    list: [],
    goods: [],
    page: 1,//当前页
    size: 2,//展示多少数据
    total: 0,//总数
}

let mutations = {
    setList(state, arr) {
        state.list = arr;
    },
    setGoods(state, arr) {
        state.goods = arr;
    },
    setTotal(state, num) {
        state.total = num;
    },
    setPage(state, num) {
        state.page = num;
    }
}

let actions = {
    reqList(context, obj) {
        let d = obj ? obj : { size: context.state.size, page: context.state.page };
        getGoodsList(d).then(res => {
            if (res.data.code === 200) {
                //获取秒杀活动中的商品
                // if (obj) {
                //     //只有一级分类和二级分类的id都相同时才返回对应的商品
                //     let goods = context.state.list.find((item) => {
                //         item.first_cateid === obj.fid &&
                //             item.second_cateid == obj.sid
                //     });
                //     goods = goods ? goods : []
                //     context.commit("setGoods", goods);
                //     return;
                // }
                //获取分页信息
                if (res.data.list === 0 && context.state.page > 1) {
                    context.commit("setPage", context.state.page - 1);
                    context.dispatch("getTotal");
                    return;
                }
                // 查找商品
                context.commit("setList", res.data.list);
                //获取总数
                context.dispatch("getTotal")
            }
        })
    },
    getTotal(context) {
        getGoodsCount().then((res) => {
            if (res.data.code == 200) {
                context.commit("setTotal", res.data.list[0].total);
            }
        });
    },
    changePage(context, page) {
        context.commit("setPage", page);
        context.dispatch("reqList");
    }
}

let getters = {
    list(state) {
        return state.list;
    },
    goods(state) {
        return state.goods
    },
    total(state) { return state.total },
    size(state) { return state.size },
    page(state) { return state.page }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}