import $http from 'axios';
import Qs from 'qs';
// import { Toast } from 'vant';
// import Vue from 'vue';

// Vue.use(Toast);

// process.env.VUE_APP_API_URL

var service = $http.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' },
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        data = Qs.stringify(data);
        return data;
    }],
});

// const totastCode = {
//     40000: function () {
//         Toast('xxxxx')
//     }
// };
//interceptors.request
service.interceptors.request.use(function (config) {
    // eslint-disable-next-line no-console
    if (!config.data) {
        config.data = {};
    }
    return config;
}, error => {
    return Promise.rejiect(error)
});

//interceptors.response
service.interceptors.response.use(function (res) {
    // eslint-disable-next-line no-console
    // console.log(res)
    /*   if (totastCode[res.code]) {
          totastCode[res.code]();
      } */

}, error => {
    return Promise.reject(error)
});



export default service;