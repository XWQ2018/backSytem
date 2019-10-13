import $service from "@/untils/request";

export default {
    /* //获取商品列表信息 */
    getGoodsList() {
        return $service.get('/admin/product/getGoodsList');
    },
    /* //通过关键字获取列表数据 */

    byNameGetGoodsList(name) {
        return $service.get(`/admin/product/byNameGetGoodsList?name=${name}`);
    },

    /* //根据商品分类搜索 */

    byList(listName) {
        return $service.get(`/admin/product/byList?list=${listName}`);
    },
    /* //删除单个商品信息 */

    delGoodsListById(id) {
        return $service.get(`/admin/product/delGoodsList?ID=${id}`);
    },
    /* //删除多个商品列表信息 */
    removeProductList(data) {
        return $service.post(`/admin/product/removeProductList`, data);
    },

    /* 列表数据编辑 */
    editGoodsList(data) {
        return $service.post(`/admin/product/editGoodsList`, data);
    },
    /* 添加商品信息 */
    addGoodsList(data) {
        return $service.post(`/admin/product/addGoodsList`, data);
    },
}