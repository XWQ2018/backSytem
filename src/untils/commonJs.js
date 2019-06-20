
/**
* @Description: 获取全部地址栏参数
* @Param: 
* @Author: xwq
* @Date: 2019-02-19 09:15:53
* @LastEditors: Please set LastEditors
* @LastEditTime: 2019-05-13 09:38:33
* @return: 
*/
export function getUrlParams() {
    let reg = new RegExp('(^|&)*=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    let query = {};
    if (r) {
        r = unescape(decodeURIComponent(r.input));
        r = r.split('&');
        if (r.length > 0) {
            query = {};
            for (let i = 0; i < r.length; i++) {
                r[i] = r[i].split('=');
                query[r[i][0]] = r[i][1];
            }
        }
    }
    return query;
}
/**
 * @Description: 日期格式_格式化 (YYYY-MM-dd-HH-mm-ss)
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-06-12 15:24:23
 */
export function dateTimeFormate(val, timeFormate) {
    let t = new Date(val);
    let tf = function (val) {
        return val > 9 ? val : "0" + val;
    };
    if (val && timeFormate) {
        return timeFormate.replace(/YYYY|MM|dd|HH|mm|ss/g, v => {
            switch (v) {
                case "YYYY":
                    return t.getFullYear();
                case "MM":
                    return tf(t.getMonth() + 1);
                case "dd":
                    return tf(t.getDate());
                case "HH":
                    return tf(t.getHours());
                case "mm":
                    return tf(t.getMinutes());
                case "ss":
                    return tf(t.getSeconds());
                default: break;
            }
        });
    } else {
        // eslint-disable-next-line no-console
        console.log("缺少参数。。。");
    }
}
