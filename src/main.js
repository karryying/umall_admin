// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from "jquery"

Vue.config.productionTip = false
Vue.prototype.$ = $;

//过滤器
import "./filters"

//store
import store from "./store"

//公共组件
import "./components"

//样式重置
import "./assets/css/reset.css"

//数据交互 axios
import "./utils/http"

// 富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor);

//ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
