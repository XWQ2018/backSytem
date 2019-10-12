<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
//注册全局的自定义focus指令
// import Vue from 'vue';
/* Vue.directive("focus", {
    //   //每当指令绑定到元素上时，会立即执行这个bind函数，只执行一次
    bind: function() {},
    //inserted表示元素插入到DOM中时，会执行inserted函数，只触发一次，el表示被绑定的那个原生js对象
    inserted: function(el) {
        el.focus();
    },
    //当VNode更新时会执行updated，可触发多次
    update(el, { value }) {
        if (value) {
            el.focus();
        } else {
            el.blur();
        }
    }
}); */
export default {
    name: "App"
};
</script>

<style >
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
