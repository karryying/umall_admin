import { getRoleList } from "../../utils/http"

let state = {
    list: [],
    detail: {}
}

let mutations = {
    setList(state, arr) {
        state.list = arr;
    }
}

let actions = {
    reqRoleListAction(context) {
        getRoleList().then(res => {
            if (res.data.code === 200) {
                context.commit("setList", res.data.list)
            }
        })
    },
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