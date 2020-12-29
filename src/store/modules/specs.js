import { getSpecsList, getSpecsCount } from "../../utils/http"
//商品规格
let state = {
    list: [],
    page: 1,
    size: 2,
    total: 0
};

let mutations = {
    setList(state, arr) {
        state.list = arr;
    },
    setPage(state, num) {
        state.page = num;
    },
    setSize(state, num) {
        state.size = num;
    },
    setTotal(state, num) {
        state.total = num;
    }
};

let actions = {
    reqList(context, bool) {
        //当bool为true时就不分页
        let data = bool ? {} : { page: context.state.page, size: context.state.size }
        getSpecsList(data).then(res => {
            if (res.data.code == 200) {
                if (res.data.list.length === 0 && context.state.page > 1) {
                    context.commit("setPage", context.state.page - 1);
                    context.dispatch("reqList");
                    return;
                }
                console.log(bool, res.data);
                res.data.list.map(item => {
                    item.attrs = JSON.parse(item.attrs);
                })
                context.dispatch("getTotal");
                context.commit("setList", res.data.list);
            }
        })
    },
    //获取总数
    getTotal(context) {
        getSpecsCount().then((res) => {
            if (res.data.code === 200) {
                context.commit("setTotal", res.data.list[0].total);
            }
        });
    },
    changePage(context, page) {
        context.commit("setPage", page);
        context.dispatch("reqList");
    }
};

let getters = {
    list(state) {
        return state.list;
    },
    total(state) {
        return state.total;
    },
    page(state) {
        return state.page;
    },
    size(state) {
        return state.size;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
