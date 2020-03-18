import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './iconfont/iconfont.css'
import './css/animation.css'
import axios from 'axios'
import qs from 'qs'

import MintUI from "mint-ui";
//console.log(MintUI);
//2:单独引入mint-ui组件库中样式文件
import "mint-ui/lib/style.css"
//3:注册MintUI对象
Vue.use(MintUI);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
