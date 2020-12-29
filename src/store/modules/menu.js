import { getMenuList } from "../../utils/http"

let state = {
    list: []
}

let mutations = {
    setList(state, arr) {
        console.log(arr);
        state.list = arr;
    }
}

let actions = {
    reqMenuListAction(context) {
        getMenuList().then(res => {
            if (res.data.code === 200) {
                context.commit("setList", res.data.list)
            }
        })
    }
}

let getters = {
    list(state) {
        return state.list;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}