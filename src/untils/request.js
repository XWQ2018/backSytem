import $http from 'axios';
import Qs from 'qs';

// process.env.VUE_APP_API_URL

var service = $http.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }, //针对node后台=>mongod数据库
    /* 以下配置针对PHP=>Mysql数据库(关系型数据库)设置 */
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    /* transformResponse: [function (data) {
        // Do whatever you want to transform the data
        data = Qs.stringify(data);
        return data;
    }], */
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
    const response = res.data;
    console.dir(response);  //打印对象
    // console.table(response); //打印数组对象
    if (response.status != 200) {
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