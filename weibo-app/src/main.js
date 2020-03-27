import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import './iconfont/iconfont.css'
import './css/animation.css'

import * as qiniu from 'qiniu-js'

import MintUI from 'mint-ui';
import "mint-ui/lib/style.css";
Vue.use(MintUI);

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://192.168.1.103:4000";
axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = false;

Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.md5 = md5;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
