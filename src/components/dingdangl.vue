<!--
 * @Description: 商品分类
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-12 14:06:53
 -->
<template>
    <div id="dingdangl">
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
                border
                highlight-current-row
                @select="getId"
                style="width: 100% "
            >
                <el-table-column type="selection" align="center" width="60"></el-table-column>
                <el-table-column prop="id" label="ID" align="center" sortable width="120"></el-table-column>
                <el-table-column prop="super" align="center" label="商品分类" width="100"></el-table-column>
                <el-table-column prop="name" align="center" label="商品名称"></el-table-column>
                <el-table-column prop="detail" align="center" label="商品价格" width="100"></el-table-column>
                <el-table-column prop="price" align="center" label="上传时间" sortable width="150"></el-table-column>
                <el-table-column prop="super" align="center" label="发布状态" width="150">
                    <template slot-scope="scope">
                        <el-button type="default" size="small">待发布</el-button>
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
export default {
    name: "dingdangl",
    data() {
        return {
            name: sessionStorage.name,
            tableData: [
                {
                    id: 1,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "一加手机6T",
                    detail:
                        "黑鲨游戏手机 8GB+128GB 极夜黑 液冷更快 全网通4G 双卡双待",
                    price: "888",
                    super: "新上市，限量发售",
                    timer: "11237342"
                },
                {
                    id: 2,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "荣耀10",
                    detail: "荣耀10湿哒哒湿哒哒4G双卡双待 ",
                    price: "777",
                    super: "不超过2000元",
                    timer: "11234242"
                },
                {
                    id: 3,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "oppo",
                    detail: "大时代大舍大得脚本众多左右",
                    price: "666",
                    super: "年轻时尚值得买",
                    timer: "11233452"
                },
                {
                    id: 4,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "小米",
                    detail: "基基本面湿哒哒阿斯达左右",
                    price: "555",
                    super: "土豪金闪瞎双眼",
                    timer: "112345442"
                },
                {
                    id: 5,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "诺基亚",
                    detail: "上上上上上上上合适的枯萎大大萨达要",
                    price: "444",
                    super: "不超过1000元",
                    timer: "11234342"
                },
                {
                    id: 6,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "摩托罗拉",
                    detail: "全网通4G 双卡双待一一加格",
                    price: "333",
                    super: "价格很实惠",
                    timer: "1112342"
                },
                ,
                {
                    id: 7,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "黑莓",
                    detail: "古巨基止上上一五一一一加格达奇枯棋枯萎",
                    price: "222",
                    super: "快到没有朋友",
                    timer: "112342"
                },
                ,
                {
                    id: 8,
                    imgurl:
                        "https://img11.360buyimg.com/n7/jfs/t1/5554/30/15803/218752/5bdfc640E2d26aafd/ab8ab3e4cdae6007.jpg",
                    name: "vivo",
                    detail: "枯萎湿哒哒撒大声地在在在在在在在在在",
                    price: "111",
                    super: "流量免费送",
                    timer: "113453342"
                }
            ],
            select: "",
            Id: [],
            wordSpace: "",
            statu: false,
            currentPage: 1, //当前页
            copy: "", //数据备份
            pageSize: 10, //每页条数默认10条
            loading2: false
        };
    },
    methods: {
        btnSearch() {
            console.log(this.wordSpace);
            let wordSpace = { id: 1 };
            // let result;
            // this.tableData.forEach(item=>{
            // let result = Object.values(item)
            // console.log(result)
            console.log(this.tableData[0].id);
            // })
            // console.log(JSON.stringify(this.tableData).indexOf(JSON.stringify(wordSpace)))
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
#dingdangl {
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
