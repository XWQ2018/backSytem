<!--
 * @Description: 添加商品信息
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-13 15:49:42
 -->
<template>
    <div id="addGoodsList">
        <h4>添加商品信息</h4>
        <div class="form-update">
            <el-form status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID">
                    <el-input type="text" v-model="productList.ID" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="商品类名">
                    <el-input type="text" v-model="productList.list" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input type="text" v-model="productList.name" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input type="text" v-model="productList.price" autocomplete="off" required></el-input>
                </el-form-item>
                <el-form-item label="添加时间">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="productList.dateTime"
                        style="width: 60%;"
                    ></el-date-picker>
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
import productApi from "@/api/product";
export default {
    data() {
        return {
            productList: {
                ID: "",
                name: "",
                list: "",
                dateTime: "",
                price: ""
            }
        };
    },
    methods: {
        sbmit() {
            this.productList = this.productList.dateTime.toLocaleDateString();
            for (let key in this.productList) {
                if (!this.productList[key]) return false;
            }
            this.$axios
                .post("/admin/product/addGoodsList", {
                    goodsListInfo: {
                        ID,
                        name,
                        list,
                        price,
                        dateTime
                    }
                })
                .then(res => {
                    if (res.data === "yes") {
                        this.$message.success("数据插入成功");
                        this.$router.push({ name: "goodsList" });
                    }
                });
        },
        /**
         * @Description:  重置所有信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-31 09:09:18
         */
        resetForm() {
            for (let key in this.productList) {
                this.productList[key] = "";
            }
        }
    }
};
</script>
<style lang='scss' scoped>
#addGoodsList {
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
