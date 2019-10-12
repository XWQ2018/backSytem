import $http from 'axios';
import Qs from 'qs';

// process.env.VUE_APP_API_URL

var service = $http.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 2000,
    // headers: { 'X-Custom-Header': 'foobar' },
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        data = Qs.stringify(data);
        return data;
    }],
});

// const totastCode = {
//     40000: function () {
//        
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
    const response = res;
    console.log(response);
    if (response.code != 20000) {
        /* if (responseCode[response.code]) {
            responseCode[response.code](response.msg);
        } */
        return Promise.reject(response).catch(erro => {
            return erro;
        });
    } else {
        return response;
    }

}, error => {
    return Promise.reject(error).catch(errorInfo => {
        return errorInfo;
    });
});




export default service;