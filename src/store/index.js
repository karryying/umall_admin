import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

import { actions } from "./actions"
import { mutations, getters, state } from "./mutations"
import menu from "./modules/menu"
import role from "./modules/role"
import specs from "./modules/specs"
import cate from "./modules/cate"
import goods from "./modules/goods"

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        menu,
        role,
        specs,
        cate,
        goods
    }
})