<template>
    <div id="Home">
        <header class="head">
            <div class="left">
                <img src="../assets/img/login.jpg">
                <h1>美美箱后台管理系统</h1>
            </div>
            <div class="right">
                <p>欢迎:
                    <span>{{name}}</span>登入我们的美美箱后台系统。
                    <span @click="toLogin">退出</span>
                </p>
            </div>
        </header>
        <main class="homeMain">
            <aside class="asideLeft">
                <dl>
                    <dt @click="toGoodsList">商品管理</dt>
                    <dd @click="toProductList">商品分类</dd>
                    <dd @click="toGoodsList">商品列表</dd>
                </dl>
                <dl>
                    <dt @click="toUser">用户管理</dt>
                    <dd @click="toUpdateMm">修改密码</dd>
                    <dd @click="toUpdateZl">资料修改</dd>
                </dl>
                <dl>
                    <dt>交易管理</dt>
                    <dd @click="toDingDanGl">订单列表</dd>
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
    name: "HelloWorld",
    data() {
        return {
            name: sessionStorage.name
        };
    },
    methods: {
        toProductList() {
            this.$router.push({ name: "productList" });
        },
        toGoodsList() {
            this.$router.push({ name: "goodsList" });
        },
        toUpdateMm() {
            this.$router.push({ name: "updateMm" });
        },
        toUpdateZl() {
            this.$router.push({ name: "updateZl" });
        },
        toUser() {
            this.$router.push({ name: "toUser" });
        },
        toDingDanGl() {
            this.$router.push({ name: "dingdangl" });
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
                margin: 0;
                span {
                    font-weight: bold;
                    color: #f00;
                    padding: 0 5px;
                }
                :last-child {
                    color: #00f;
                    cursor: pointer;
                }
            }
        }
    }
    .homeMain {
        display: flex;
        .asideLeft {
            width: 200px;
            height: 600px;
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
            background-color: #fff;
        }
    }
}
</style>
