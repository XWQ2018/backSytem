<!--
 * @Description: 修改密码
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-13 15:47:22
 -->
<template>
    <div id="updateMm">
        <h4>修改密码</h4>
        <div class="form-update">
            <el-form status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码">
                    <el-input type="password" v-model="uppasw.ypasw" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="uppasw.npasw" autocomplete="off" required></el-input>
                    <el-span style="color:#f00">6-16个字符</el-span>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="uppasw.spasw" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-Submit" @click="sbmit">提交</el-button>
                    <el-button class="btn-reset" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import userApi from "@/api/user";
export default {
    data() {
        return {
            uppasw: {
                ypasw: "",
                npasw: "",
                spasw: ""
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 密码修改确认提交
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-20 16:59:02
         */
        sbmit() {
            let username = this.$session.get("name");
            for (let k in this.uppasw) {
                if (!this.uppasw[k]) {
                    this.messageInfo(this.uppasw[k]);
                    return;
                }
            }

            let params = {
                username,
                password: this.uppasw.npasw
            };
            userApi.uppasw(params).then(res => {
                if (res.data === "yes") {
                    this.$message.success("修改密码成功");
                    this.$router.push({ name: "toUser" });
                }
            });
        },
        /**
         * @Description: 重置表单信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-20 16:59:24
         */
        resetForm() {
            for (let k in this.uppasw) {
                this.uppasw[k] = "";
            }
        },
        /**
         * @Description: 信息提示
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-20 16:59:46
         */
        messageInfo(val) {
            switch (val) {
                case ypasw:
                    this.$message.warning("原密码不能为空");
                    break;
                case npasw:
                    this.$message.warning("新密码不能为空");
                    break;
                case spasw:
                    this.$message.warning("确认密码不能为空");
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style lang='scss' scoped>
#updateMm {
    h4 {
        margin: 0 20px;
        padding: 20px;
        border-bottom: 1px dotted #ccc;
        text-align: left;
        font-size: 14px;
    }
    .form-update {
        padding: 20px;
        width: 50%;
        .el-input {
            width: 60%;
        }
    }
}
</style>
