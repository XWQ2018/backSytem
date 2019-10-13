// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueWebStorage from 'vue-web-storage';
//引入Ui框架
import Elementui from 'element-ui';
Vue.use(Elementui);
// import axios from 'axios';
// import vueaxios from 'vue-axios';
// Vue.use(axios, vueaxios)
// Vue.prototype.$axios = axios;


/* 样式资源引入 */
import './lib/element-dev/packages/theme-chalk/src/index.scss';
import './lib/bootstrap.css';

/* 本地缓存 */
Vue.use(vueWebStorage, {
    prefix: 'BACKSYNC', // default `app_`
    drivers: ['session', 'local'], // 生成Vue.$localStorage以及Vue.$sessionStorage
});


Vue.prototype.$local = Vue.$localStorage; // 原型链加方法
Vue.prototype.$session = Vue.$sessionStorage;



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
