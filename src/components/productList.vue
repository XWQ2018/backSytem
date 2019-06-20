<template>
    <div id="productList">
        <h4>主页 / 商品管理 / 商品分类</h4>
        <div class="list">
            <el-button type="primary" class="btnAdd" @click="toAddproductList">添加</el-button>
            <el-table
                v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                border
                style="width: 100%"
            >
                <el-table-column type="index" label="#" align="center" width="60"></el-table-column>
                <el-table-column prop="ID" label="ID" align="center" sortable width="120"></el-table-column>
                <el-table-column prop="list" align="center" label="分类名"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            @click="toEditProductList(scope.$index, scope.row)"
                            type="primary"
                            size="small"
                            icon="el-icon-edit"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            size="small"
                            icon="el-icon-delete"
                            @click="delProductList(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
// import requestApi from "@/api/requestInfo";
export default {
    data() {
        return {
            tableData: [],
            loading2: false
        };
    },
    methods: {
        //获取数据库中的分类
        getProductList() {
            this.loading2 = true;
            this.$axios.get("/admin/product/getList").then(res => {
                this.tableData = res.data;
                this.loading2 = false;
            });
        },
        //增加分类
        toAddproductList() {
            this.$router.push({ name: "addProductList" });
        },
        //编辑分类
        toEditProductList(index, row) {
            this.$router.push({ name: "editProductList", params: row });
        },
        //删除分类
        delProductList(index, row) {
            let id = row._id;
            this.tableData.map((item, idx) => {
                if (item._id == id) {
                    this.tableData.splice(idx, 1);
                    this.$message.success("删除成功");
                }
            });
            this.$axios
                .get("/admin/product/delProductList?ID=" + id)
                .then(res => {
                    if (res.data === "yes") {
                        console.log(666);
                    }
                });
        }
    },
    created() {
        this.getProductList();
    }
};
</script>
<style lang='scss' scoped>
#productList {
    padding: 5px 20px;
    h4 {
        padding: 20px 0;
        text-align: left;
        font-size: 14px;
        border-bottom: 1px dotted #f60;
    }
    .btnAdd {
        margin-bottom: 15px;
        display: block;
    }
}
</style>
