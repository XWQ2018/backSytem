<template>
    <div id="editGoodsList">
        <h4>编辑商品信息</h4>
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
import { deepCopy } from "@/untils/commonJs";
export default {
    data() {
        return {
            productList: {
                ID: "",
                name: "",
                list: "",
                dateTime: "",
                price: ""
            },
            goodsListInfo: this.$route.params.Info,
            copy: ""
        };
    },
    methods: {
        sbmit() {
            let _id = this.goodsListInfo._id;
            let dateTime = this.productList.dateTime;
            this.productList.dateTime = dateTime.toLocaleDateString();
            for (let key in this.productList) {
                if (!this.productList[key]) return false;
            }
            this.$axios
                .post("/admin/product/editGoodsList", {
                    id: _id,
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
        //重置
        resetForm() {
            this.productList = {
                ID: this.copy.ID,
                name: this.copy.name,
                list: this.copy.list,
                price: this.copy.price,
                dateTime: this.copy.dateTime
            };
        }
    },
    mounted() {
        this.productList = this.goodsListInfo;
        // let copy = Object.assign({},this.goodsListInfo);//静态方法浅复制
        // this.copy = JSON.parse(JSON.stringify(this.goodsListInfo)); //深复制
        this.copy = deepCopy(this.goodsListInfo); //深复制
    }
};
</script>
<style lang='scss' scoped>
#editGoodsList {
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
