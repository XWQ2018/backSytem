<template>
    <div class="page">
        <p>页面丢失了。。。。。</p>
    </div>
</template>
<script>
export default {
    name: "notFound",
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
.page {
    height: 100vh;
    width: 100%;
    background-color: #f2f2f2;
    position: relative;
    p {
        color: #999;
        padding: 10px 50px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translate(-50%, 50%);
    }
}
</style>