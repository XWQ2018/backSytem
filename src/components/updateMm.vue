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
    methods: {
        sbmit() {
            let username = sessionStorage.getItem("name");
            console.log(this.spasw, this.npasw, this.spasw);
            if (
                this.ypasw !== undefined &&
                this.npasw !== undefined &&
                this.spasw !== undefined
            ) {
                this.$axios
                    .post("/admin/user/uppasw", {
                        username,
                        password: this.uppasw.npasw
                    })
                    .then(res => {
                        if (res.data === "yes") {
                            this.$message.success("修改密码成功");
                            this.$router.push({ name: "toUser" });
                        }
                    });
            } else {
                this.$message.error("内容不能为空");
                return false;
            }
        },
        resetForm() {
            console.log(this.uppasw.npasw);
            this.uppasw = {
                ypasw: "",
                npasw: "",
                spasw: ""
            };
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
