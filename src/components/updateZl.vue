<template>
    <div id="uplateZl">
        <h4>设置我的资料</h4>
        <div class="updateZl">
            <el-form label-width="80px">
                <el-form-item label="我的角色">
                    <el-select v-model="form.juse" style="width:20% " disabled>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input style="width:20%" v-model="form.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input style="width:20%" v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input style="width:20%" v-model="form.imgurl"></el-input>
                    <el-upload
                        class="upload-demo"
                        action
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        list-type="picture"
                        style="display:inline-block"
                    >
                        <el-button size="large" icon="el-icon-upload" type="defeault">上传图片</el-button>
                        <el-button size="large" type="defeault">查看图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input style="width:20%" v-model="form.userTel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input style="width:20%" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="upSubmit">确认修改</el-button>
                    <el-button type="warning" @click="reset">重新填写</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import requestApi from "@/api/requestInfo";
import { deepCopy } from "@/untils/commonJs";
export default {
    data() {
        return {
            form: {
                username: "",
                juse: "",
                nickname: "",
                imgurl: "",
                userTel: "",
                email: "",
                gender: "",
                desc: ""
            },
            copy: "",
            username: ""
        };
    },
    created() {
        this.getUserInfo();
        this.username = this.$session.get("name");
    },
    mounted() {},
    methods: {
        handlePreview(val) {
            // console.log(val);
        },
        handleRemove(val) {
            // console.log(val);
        },
        /**
         * @Description: 提交修改信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-20 17:14:57
         */
        upSubmit() {
            let userInfo = this.form;
            let nowDate = new Date();
            let dateTime = nowDate.toLocaleDateString();
            let params = {
                username: this.username,
                Info: {
                    userTel: userInfo.userTel,
                    email: userInfo.email,
                    gender: userInfo.gender,
                    nickname: userInfo.nickname,
                    imgurl: userInfo.imgurl,
                    desc: userInfo.desc,
                    dateTime: dateTime
                }
            };
            requestApi.UserEdit(params).then(res => {
                if (res.data === "yes") {
                    this.$message.success("资料修改成功");
                    this.$router.push({ name: "toUser" });
                } else {
                    this.$message.error("资料修改失败");
                }
            });
        },
        /**
         * @Description: 重置表单
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-20 17:14:44
         */
        reset() {
            for (let k in this.form) {
                this.form[k] = this.copy[k];
            }
        },
        /**
         * @Description: 获取用户信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-20 17:14:31
         */
        getUserInfo() {
            requestApi.getUserInfo(this.username).then(res => {
                let userData = res.data[0];
                this.form = userData;
                // this.copy = JSON.parse(JSON.stringify(userData));
                this.copy = deepCopy(userData);
            });
        }
    }
};
</script>
<style lang='scss' scoped>
#uplateZl {
    h4 {
        margin: 0 20px;
        padding: 20px;
        border-bottom: 1px dotted #ccc;
        text-align: left;
        font-size: 14px;
    }
    .updateZl {
        padding: 20px;
        .el-form-item {
            margin-bottom: 5px;
        }
    }
}
</style>
