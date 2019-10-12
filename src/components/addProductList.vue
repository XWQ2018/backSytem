<!--
 * @Description: 添加分类
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-12 14:05:00
 -->
<template>
    <div id="addProductList">
        <h4>添加分类</h4>
        <div class="form-update">
            <el-form status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID">
                    <el-input type="text" v-model="productList.ID" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="商品类名">
                    <el-input type="text" v-model="productList.name" autocomplete="off" required></el-input>
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
            productList: {
                ID: "",
                name: ""
            }
        };
    },
    methods: {
        sbmit() {
            for (let key in this.productList) {
                if (!this.productList[key]) return false;
            }
            this.$axios
                .get(`/admin/product/addList?ID= ${ID}&name= ${name}`)
                .then(res => {
                    if (res.data === "yes") {
                        this.$message.success("数据插入成功");
                        this.$router.push({ name: "productList" });
                    }
                });
        },
        resetForm() {
            this.productList = {
                ID: "",
                name: ""
            };
        }
    }
};
</script>
<style lang='scss' scoped>
#addProductList {
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
