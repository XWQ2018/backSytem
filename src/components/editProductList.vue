<template>
    <div id="editProductList">
        <h4>编辑分类</h4>
        <div class="form-update">
            <el-form status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID">
                    <el-input type="text" v-model="productList.ID" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="类名">
                    <el-input type="text" v-model="productList.list" autocomplete="off" required></el-input>
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
import { deepCopy } from "@/untils/commonJs";
export default {
    data() {
        return {
            productList: {
                ID: "",
                list: ""
            },
            result: this.$route.params,
            copy: ""
        };
    },
    methods: {
        sbmit() {
            var id = this.productList.ID;
            var name = this.productList.name;
            var _id = this.result._id;
            if (id != "" && name != "") {
                // console.log(id);
                this.$axios
                    .get(
                        `/admin/product/editList?id=${_id}&ID=${id}&name=${name}`
                    )
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
                ID: this.copy.ID,
                list: this.copy.list
            };
        }
    },
    created() {
        this.productList = this.result;
        // this.copy = JSON.parse(JSON.stringify(this.result));
        this.copy = deepCopy(this.result);
    }
};
</script>
<style lang='scss' scoped>
#editProductList {
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
