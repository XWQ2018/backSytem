<!--
 * @Description: 首页
 * @Author: xwq
 * @Date: 2019-05-16 10:15:51
 * @LastEditTime: 2019-10-13 23:43:54
 -->
<template>
    <div id="Home">
        <header class="head">
            <div class="left">
                <img src="../assets/img/login.jpg" />
                <h1>美美箱后台管理系统</h1>
            </div>
            <div class="right">
                <p>
                    欢迎:
                    <span>{{userName}}</span>登入后台系统
                    <span @click="toLogin">退出</span>
                </p>
            </div>
        </header>
        <main class="homeMain">
            <aside class="asideLeft">
                <dl>
                    <dt @click="listJump(0)">商品管理</dt>
                    <dd @click="listJump(1)">商品分类</dd>
                    <dd @click="listJump(2)">商品列表</dd>
                </dl>
                <dl>
                    <dt @click="listJump(3)">用户管理</dt>
                    <dd @click="listJump(4)">修改密码</dd>
                    <dd @click="listJump(5)">资料修改</dd>
                </dl>
                <dl>
                    <dt>交易管理</dt>
                    <dd @click="listJump(6)">订单列表</dd>
                </dl>
            </aside>
            <div class="asideRight">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            userName: this.$route.query["userName"],
            listInfo: {
                0: "goodsList",
                1: "productList",
                2: "goodsList",
                3: "toUser",
                4: "updateMm",
                5: "UpdateZl",
                6: "dingdangl"
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        listJump(val) {
            this.$router.push({ name: this.listInfo[val] });
        },
        toLogin() {
            if (confirm("确定要退出吗？")) {
                this.$axios.get("admin/login/loginOut").then(res => {
                    if (res.data === "yes") {
                        this.$router.push({ name: "Login" });
                        sessionStorage.clear();
                    }
                });
            } else {
                return false;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
#Home {
    .head {
        border: 1px solid #999;
        padding: 8px 8px;
        overflow: hidden;
        .left {
            height: 100px;
            margin-left: 25px;
            float: left;
            img {
                width: 100px;
            }
            h1 {
                display: inline-block;
                margin-top: 26px;
                font-size: 26px;
                font-weight: bold;
                vertical-align: middle;
                text-shadow: 2px 2px 10px #ccc;
            }
        }
        .right {
            float: right;
            font-size: 14px;
            padding: 70px 0 0 0;
            p {
                margin: 0 10px 0 0;
                text-shadow: 0 2px 2px #62e4f5;
                span {
                    font-weight: bold;
                    color: #f00;
                    padding: 0 5px;
                }
                :last-child {
                    color: #00f;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
    }
    .homeMain {
        display: flex;
        .asideLeft {
            width: 200px;
            height: calc(100vh - 118px);
            border: 1px solid #999;
            border-top: 0 none;
            text-align: center;
            dl {
                margin: 0;
            }
            dt {
                font-size: 20px;
                padding: 10px 0;
                font-weight: normal;
                border-bottom: 1px solid #ccc;
                background-color: #f2f2f2;
                cursor: pointer;
            }
            dd {
                margin: 0;
                font-size: 16px;
                padding: 5px 0;
                border-bottom: 1px solid #ccc;
                cursor: pointer;
            }
        }
        .asideRight {
            flex: 1;
            height: calc(100vh - 118px);
            overflow-y: scroll;
            background-color: #fff;
        }
    }
}
</style>
