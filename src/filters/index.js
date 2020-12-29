import Vue from "vue"
//过滤器  Vue.filter
import filterPrice from "./filterPrice"
Vue.filter("filterPrice", filterPrice);