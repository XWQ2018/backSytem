<!--
 * @Description: 商品分类
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-14 00:01:08
 -->
<template>
    <div id="goodsList">
        <div class="top">
            <span>关键字</span>
            <el-input
                placeholder="请输入商品名称"
                v-model="wordSpace"
                @input="byNameGetGoodsList"
                style="width:217px"
                class="topRight"
            ></el-input>
            <span>商品分类</span>
            <el-select v-model="select" slot="prepend" placeholder="请选择分类">
                <el-option
                    :label="item.list"
                    v-for="(item,key) in copy"
                    :key="key"
                    :value="item.list"
                >{{item.list}}</el-option>
                <!-- <el-option label="订单号" value="2"></el-option> -->
                <!-- <el-option label="用户电话" value="3"></el-option> -->
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="btnSearch"></el-button>
        </div>
        <div class="btnChange">
            <el-button type="primary" size="small" @click="removeProductList">删除</el-button>
            <el-button type="primary" size="small" @click="toAddGoodstList">添加</el-button>
        </div>
        <div class="listTable" style="padding:0 20px">
            <el-table
                v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                :height="tableHeader"
                border
                highlight-current-row
                @select="getId"
                style="width: 100% "
            >
                <el-table-column type="selection" align="center" width="60"></el-table-column>
                <el-table-column prop="ID" label="ID" align="center" sortable width="120"></el-table-column>
                <el-table-column prop="list" align="center" label="商品分类" width="100"></el-table-column>
                <el-table-column prop="name" align="center" label="商品名称"></el-table-column>
                <el-table-column prop="price" align="center" label="商品价格" width="100"></el-table-column>
                <el-table-column prop="dateTime" align="center" label="上传时间" sortable width="150"></el-table-column>
                <el-table-column prop="statu" align="center" label="发布状态" width="150">
                    <template slot-scope="scope">
                        <el-button type="default" size="small" @click="issue(scope.row)">待发布</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            @click="editGoodsList(scope.row)"
                            type="primary"
                            size="small"
                            icon="el-icon-edit"
                        >编辑</el-button>
                        <el-button
                            type="warning"
                            size="small"
                            icon="el-icon-delete"
                            @click="delGoodsList(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="handlePrevClick"
                    @next-click="handleNextClick"
                    :current-page="currentPage"
                    :page-sizes="[5,10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="copy.length"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { deepCopy } from "@/untils/commonJs";
import productApi from "@/api/product";
export default {
    data() {
        return {
            tableData: [],
            select: "",
            Id: [],
            wordSpace: "",
            statu: false,
            currentPage: 1, //当前页
            copy: "", //数据备份
            pageSize: 10, //每页条数默认10条
            loading2: false,
            tableHeader: 152
        };
    },
    created() {
        this.tableHeader =
            (document.documentElement.clientHeight ||
                document.body.clientHeight) -
            118 -
            120 -
            75;
        this.getProductList();
    },
    mounted() {},
    methods: {
        //分页逻辑
        //每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            let result = this.copy.slice(0, val);
            this.tableData = result;
        },
        //当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            // let page = Math.ceil(this.copy.length/this.pageSize);  //总页数
            let start = (this.currentPage - 1) * this.pageSize;
            let result = this.copy.slice(start, this.pageSize);
            this.tableData = result;
        },
        //上一页按钮
        handlePrevClick() {
            this.currentPage = this.currentPage - 1;
            let start = (this.currentPage - 1) * this.pageSize;
            let result = this.copy.slice(start, this.pageSize);
            this.tableData = result;
        },
        //下一页按钮
        handleNextClick() {
            let start = (this.currentPage - 1) * this.pageSize;
            let result = this.copy.slice(start, this.pageSize);
            this.tableData = result;
        },
        //=======================分页逻辑结束=======================
        //通过关键字获取列表数据
        byNameGetGoodsList() {
            productApi.byNameGetGoodsList(this.wordSpace).then(res => {
                // console.log(res.data)
                this.tableData = res.data;
            });
        },
        //根据商品分类搜索
        btnSearch() {
            productApi.byList(this.select).then(res => {
                this.tableData = res.data;
            });
        },
        //添加商品
        toAddGoodstList() {
            this.$router.push({ name: "addGoodsList" });
        },
        //编辑商品列表
        editGoodsList(row) {
            this.$router.push({
                name: "editGoodsList",
                query: { Info: row }
            });
        },
        //删除单个商品信息
        delGoodsList(row) {
            let ID = row._id;
            this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    productApi.delGoodsListById(ID).then(res => {
                        if (res.status == "200") {
                            this.tableData.map((item, idx) => {
                                if (item._id == ID) {
                                    this.tableData.splice(idx, 1);
                                    this.$message.success("删除成功");
                                }
                            });
                            this.$message({
                                type: "success",
                                message: res.msg
                            });
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
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
        //删除多个商品列表信息
        removeProductList() {
            this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    productApi.removeProductList({ ID: this.Id }).then(res => {
                        // console.log(res.data);
                        if (res.status == "200") {
                            this.$message.success(res.msg);
                            this.getProductList();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //获取商品列表信息
        getProductList() {
            this.loading2 = true;
            productApi.getGoodsList().then(res => {
                console.dir(res);
                if (res.status == 200) {
                    this.tableData = res.data;
                    this.copy = deepCopy(res.data);
                    this.loading2 = false;
                } else {
                    this.$message({
                        type: "fail",
                        message: res.msg
                    });
                }
            });
        },
        //发布点击
        issue(val) {
            console.log(val);
        }
    }
};
</script>
<style lang='scss' scoped>
#goodsList {
    .top {
        padding: 20px 40px;
        text-align: left;
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
}
</style>

