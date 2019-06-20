<template>
    <div id="addUser">
        <h4>添加用户</h4>
        <div class="form-addUser">
            <el-form
                status-icon
                :model="addUser"
                :rules="rules"
                ref="addUser"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="我的角色" prop="juse">
                    <el-select v-model="addUser.juse" style="width:60%">
                        <el-option label="超级管理员" value="超级管理员">超级管理员</el-option>
                        <el-option label="管理员" value="管理员">管理员</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input
                        type="text"
                        v-model="addUser.username"
                        @blur="regUsername"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input
                        type="text"
                        v-model="addUser.nickname"
                        @blur="regNickname"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        type="password"
                        v-model="addUser.password"
                        @blur="regPasw1"
                        autocomplete="off"
                    ></el-input>
                    <!-- <el-span style='color:#f00'>6-16个字符</el-span> -->
                </el-form-item>
                <el-form-item label="确认密码" prop="resetPassword">
                    <el-input
                        type="password"
                        v-model="addUser.resetPassword"
                        @blur="regPasw2"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="userTel">
                    <el-input
                        type="tel"
                        v-model.number="addUser.userTel"
                        @blur="regTel"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input
                        type="email"
                        v-model="addUser.email"
                        @blur="regEmail"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="性别" required>
                    <el-radio-group v-model="addUser.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选择日期" required>
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="addUser.dateTime"
                        style="width: 60%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder="请输入内容" v-model="addUser.desc"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:10px">
                    <el-button type="primary" class="btn-Submit" @click="Submit('addUser')">提交</el-button>
                    <el-button class="btn-reset" @click="resetAll">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import requestApi from "@/api/requestInfo";
export default {
    data() {
        return {
            addUser: {
                username: "",
                password: "",
                resetPassword: "",
                userTel: "",
                email: "",
                juse: "",
                dateTime: "",
                gender: "",
                nickname: "",
                imgurl: "",
                desc: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                resetPassword: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                userTel: [
                    { required: true, message: "请输入手机号", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" }
                ],
                juse: [
                    { required: true, message: "请选择角色", trigger: "change" }
                ]
            }
        };
    },
    methods: {
        resetAll() {
            for (let k in this.addUser) {
                if (this.addUser[k] != "dateTime") {
                    this.addUser[k] = "";
                }
            }
        },
        regUsername() {
            if (!/^[a-z][\w\-]{5,19}$/.test(this.addUser.username)) {
                this.$message.error("用户名不合法");
                return false;
            }
        },
        regNickname() {
            if (!/^[\u2E80-\u9FFF]+$/.test(this.addUser.nickname)) {
                this.$message.error("昵称只能为中文字符");
                return false;
            }
        },
        regPasw1() {
            if (!/^\S{6,16}$/.test(this.addUser.password)) {
                this.$message.error("密码不合法");
                return false;
            }
        },
        regPasw2() {
            if (this.addUser.resetPassword != this.addUser.password) {
                this.$message.error("两次输入的密码不一致");
            }
            if (!/^\S{6,16}$/.test(this.addUser.resetPassword)) {
                this.$message.error("密码不合法");
                return false;
            }
        },
        regTel() {
            if (!/^1[3-9]\d{9}$/.test(this.addUser.userTel)) {
                this.$message.error("手机号不合法");
                return false;
            }
        },
        regEmail() {
            if (
                !/^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(
                    this.addUser.email
                )
            ) {
                this.$message.error("邮箱不合法");
                return false;
            }
        },
        Submit(formName) {
            // console.log(this.addUser)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let userInfo = this.addUser;
                    // userInfo.dateTime = new Date();
                    // userInfo.dateTime=userInfo.dateTime.toLocaleDateString();
                    let params = {
                        username: userInfo.username,
                        password: userInfo.password,
                        userTel: userInfo.userTel,
                        email: userInfo.email,
                        juse: userInfo.juse,
                        gender: userInfo.gender,
                        nickname: userInfo.nickname,
                        imgurl: userInfo.imgurl,
                        desc: userInfo.desc,
                        dateTime: userInfo.dateTime.toLocaleDateString()
                    };
                    requestApi.addUser(params).then(res => {
                        // console.log(res)
                        if (res.data === "yes") {
                            this.resetAll();
                            this.$router.push({ name: "toUser" });
                            this.$message.success("数据插入成功");
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
#addUser {
    h4 {
        margin: 0 20px;
        padding: 20px;
        border-bottom: 1px dotted #ccc;
        text-align: left;
        font-size: 14px;
    }
    .form-addUser {
        padding: 20px;
        width: 50%;
        .el-input {
            width: 60%;
        }
    }
    .el-form-item {
        margin: 0;
    }
}
</style>