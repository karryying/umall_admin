import { getCateList } from "../../utils/http"
let state = {
    list: [],
    children: []
}

let mutations = {
    setList(state, arr) {
        state.list = arr;
    },
    setChildren(state, arr) {
        state.children = arr;
    }
}

let actions = {
    //请求数据
    reqList(context) {
        getCateList().then(res => {
            if (res.data.code === 200) {
                context.commit("setList", res.data.list);
            }
        })
    },
    getCateChildren(context, id) {
        //获取对应的
        context.state.list.forEach(item => {
            if (item.id === id) {
                // children = item.children
                context.commit("setChildren", item.children);
            }
        })
    }
}

let getters = {
    //导出数据
    list(state) {
        return state.list;
    },
    children(state) {
        return state.children;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}