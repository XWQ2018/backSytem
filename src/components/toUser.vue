<template>
    <div id="user">
        <div class="top">
            <span>登入名</span>
            <el-input
                placeholder="请输入"
                v-model="checkInfo.username"
                style="width:15%"
                class="topRight"
            ></el-input>
            <span>手机</span>
            <el-input
                placeholder="请输入"
                v-model="checkInfo.userTel"
                style="width:15%"
                class="topRight"
            ></el-input>
            <span>邮箱</span>
            <el-input
                placeholder="请输入"
                v-model="checkInfo.email"
                style="width:15%"
                class="topRight"
            ></el-input>
            <span>角色</span>
            <el-select v-model="checkInfo.juse" slot="prepend" style="width:15%" placeholder="请选择">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="管理员" value="管理员"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="btnSearch"></el-button>
        </div>
        <div class="btnChange">
            <el-button type="primary" size="small" @click="removeUser">删除</el-button>
            <el-button type="primary" size="small" @click="toAddUser">添加</el-button>
        </div>
        <div class="listTable" style="padding:0 20px">
            <el-table
                v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                border
                highlight-current-row
                @select="getId"
                height="450"
                style="width: 100% "
            >
                <el-table-column fixed type="selection" align="center" width="40"></el-table-column>
                <el-table-column prop="_id" label="ID" align="center" sortable width="80"></el-table-column>
                <el-table-column prop="username" align="center" label="登录名" width="80"></el-table-column>
                <el-table-column prop="userTel" align="center" label="手机" width="120"></el-table-column>
                <el-table-column prop="email" align="center" label="邮箱" width="160"></el-table-column>
                <el-table-column prop="juse" align="center" label="角色" width="120"></el-table-column>
                <el-table-column prop="dateTime" align="center" label="加入时间" sortable></el-table-column>
                <el-table-column prop="status" align="center" label="审核状态" width="120">
                    <template slot-scope="scope">
                        <el-button type="default" size="small">未审核</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="small"
                            icon="el-icon-edit"
                            @click="editUser(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="warning"
                            size="small"
                            icon="el-icon-delete"
                            @click="delUser(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import requestApi from "@/api/requestInfo";
export default {
    data() {
        return {
            tableData: [],
            checkInfo: {
                username: "",
                userTel: "",
                email: "",
                juse: ""
            },
            Id: [],
            loading2: false
        };
    },
    methods: {
        //获取用户列表
        getUser() {
            this.loading2 = true;
            requestApi.getuser().then(res => {
                this.tableData = res.data;
                this.loading2 = false;
            });
        },
        //勾选获取用户id
        getId(val) {
            val.map(item => {
                if (!this.Id.includes(item._id)) {
                    this.Id.push(item._id);
                }
            });
        },
        //删除多个用户
        removeUser() {
            if (confirm("您确定要删除？")) {
                requestApi.usersDelete(this.Id).then(res => {
                    // console.log(res.data)
                    if (res.data == "yes") {
                        this.getUser();
                        this.$message.success("删除成功");
                    }
                });
            }
        },
        //筛选
        btnSearch() {
            let info = this.checkInfo;
            this.$axios
                .post("/admin/user/checkResult", {
                    username: info.username,
                    userTel: info.userTel,
                    email: info.email,
                    juse: info.juse
                })
                .then(res => {
                    this.tableData = res.data;
                    this.$message.success("查询数据成功");
                });
        },
        //增加用户
        toAddUser() {
            this.$router.push({ name: "addUser" });
        },
        //编辑用户信息
        editUser(index, row) {
            this.$router.push({
                name: "editUser",
                params: { username: row }
            });
        },
        //删除单个用户
        delUser(index, row) {
            if (confirm("您确定要删除？")) {
                let id = row._id;
                this.tableData.map((item, idx) => {
                    if (item._id == id) {
                        this.tableData.splice(idx, 1);
                        this.$message.success("删除成功");
                    }
                });
                this.$axios.get("/admin/user/userDelete?ID=" + id).then(res => {
                    if (res.data === "yes") {
                        console.log(666);
                    }
                });
            }
        }
    },
    created() {
        this.getUser();
    }
};
</script>
<style lang='scss' scoped>
#user {
    .top {
        padding: 20px 20px;
        margin: 0 20px;
        text-align: left;
        border-bottom: 1px dotted #ccc;
        span {
            margin-right: 10px;
        }
        .topRight {
            margin-right: 40px;
        }
    }
    .btnChange {
        padding: 20px;
        text-align: left;
    }
    .listTable {
        height: 450px;
        overflow: auto;
    }
}
</style>
