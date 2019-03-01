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
            var ID = this.productList.ID;
            var name = this.productList.name;
            console.log(ID, name);
            if (ID != "" && name != "") {
                this.$axios
                    .get(`/admin/product/addList?ID= ${ID}&name= ${name}`)
                    .then(res => {
                        if (res.data === "yes") {
                            this.$message.success("数据插入成功");
                            this.$router.push({ name: "productList" });
                        }
                    });
            } else {
                return false;
            }
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
