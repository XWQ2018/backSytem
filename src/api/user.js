import $service from "@/untils/request";

export default {
    /* 
     用户登入
    */
    doLogin(params) {
        return $service.post("/admin/login/doLogin", params);
    },

    /* 
    获取用户信息
    */
    getuser() {
        return $service.post("/admin/user/getuser");
    },

    /* 
    删除用户
    */
    usersDelete(id) {
        return $service.post("/admin/user/usersDelete", { ID: id });
    },

    /* 
    
    用户密码修改
    */

    uppasw(params) {
        return $service.post("/admin/user/uppasw", params);
    },
    /* 
   
   用户编辑
   */

    UserEdit(params) {
        return $service.post("/admin/user/UserEdit", params);
    },
    /* 
   
   获取用户信息
   */

    getUserInfo(username) {
        return $service.post("/admin/user/getUserInfo", { username });
    },
    /* 
    添加用户
     */
    addUser(params) {
        return $service.post("/admin/user/doUserAdd", params);
    }

}