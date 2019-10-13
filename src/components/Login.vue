<!--
 * @Description: 登入
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-13 15:21:36
 -->
<template>
    <div id="login" class="container-fluid">
        <img src="../assets/img/login.jpg" alt="login" />
        <h1>后台管理系统</h1>
        <div style="margin-top: 15px;">
            <el-input
                placeholder="请输入用户名"
                maxlength="15"
                ref="userName"
                v-model="username"
                class="input-with-select"
            >
                <el-button slot="prepend" icon="el-icon-edit-outline"></el-button>
            </el-input>
            <el-input
                placeholder="请输入密码"
                maxlength="18"
                type="password"
                v-model="password"
                style="margin-top:20px"
                class="input-with-select"
            >
                <el-button slot="prepend" icon="el-icon-edit-outline"></el-button>
            </el-input>
            <el-button type="primary" plain style="margin-top:20px;width:100%" @click="backHome">登入</el-button>
        </div>
        <div class="box">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <a href="#">忘记密码了？</a>
        </div>
    </div>
</template>
<script>
import requestApi from "@/api/requestInfo";
export default {
    name: "Login",
    data() {
        return {
            checked: true,
            username: "",
            password: ""
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.userName.focus();
        });
    },
    created() {
        document.onkeydown = e => {
            var key = e.which || window.event.keyCode;
            if (key == 13) {
                this.backHome();
            }
        };
    },
    methods: {
        backHome() {
            let params = {
                username: this.username,
                password: this.password
            };
            requestApi.doLogin(params).then(res => {
                if (res.status == 200) {
                    console.dir(res);
                    this.$session.set("userName", res["list"]["username"]);
                    this.$router.push({
                        path: "Home/goodsList"
                    });
                    this.$message({
                        message: "登入成功",
                        type: "success"
                    });
                } else {
                    this.$message.error("登入失败");
                    this.username = "";
                    this.password = "";
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
#login {
    width: 600px;
    height: 600px;
    padding: 80px 150px;
    border: 1px solid #ccc;
    box-shadow: 5px 5px 10px #999;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
        width: 150px;
    }
    h1 {
        font-size: 24px;
        margin-bottom: 50px;
        font-weight: bold;
        text-shadow: 4px 4px 10px #ccc;
    }
    input {
        width: 100%;
        margin-bottom: 30px;
    }
    .btn {
        width: 100%;
    }
    .box {
        margin-top: 20px;
        text-align: left;
        font-size: 14px;
        a {
            margin-left: 130px;
        }
    }
}
</style>

