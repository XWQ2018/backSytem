import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Home = () => import('@/components/Home');
const Login = () => import('@/components/Login');
const productList = () => import('@/components/productList');
const goodsList = () => import('@/components/goodsList');
const updateMm = () => import('@/components/updateMm');
const updateZl = () => import('@/components/updateZl');
const toUser = () => import('@/components/toUser');
const addUser = () => import('@/components/addUser');
const editUser = () => import('@/components/editUser');
const addProductList = () => import('@/components/addProductList');
const editProductList = () => import('@/components/editProductList');
const addGoodsList = () => import('@/components/addGoodsList');
const editGoodsList = () => import('@/components/editGoodsList');
const dingdangl = () => import('@/components/dingdangl');
const notFound = () => import('@/components/notFound');

//配置路由
const routes = [
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'productList',
                name: 'productList',
                component: productList,
                meta: { requiresAuth: true },

            },
            {
                path: 'goodsList',
                name: 'goodsList',
                component: goodsList,
                meta: { requiresAuth: true },
            },
            {
                path: 'toUser',
                name: 'toUser',
                component: toUser,
                meta: { requiresAuth: true },
            },
            {
                path: 'addUser',
                name: 'addUser',
                component: addUser,
                meta: { requiresAuth: true },
            },
            {
                path: 'updateMm',
                name: 'updateMm',
                component: updateMm,
                meta: { requiresAuth: true },
            },
            {
                path: 'updateZl',
                name: 'updateZl',
                component: updateZl,
                meta: { requiresAuth: true },
            },
            {
                path: 'editUser',
                name: 'editUser',
                component: editUser,
                meta: { requiresAuth: true },
            },
            {
                path: '/addProductList',
                name: 'addProductList',
                component: addProductList,
                meta: { requiresAuth: true },
            },
            {
                path: '/editProductList',
                name: 'editProductList',
                component: editProductList,
                meta: { requiresAuth: true },
            },
            {
                path: '/addGoodsList',
                name: 'addGoodsList',
                component: addGoodsList,
                meta: { requiresAuth: true },
            },
            {
                path: '/editGoodsList',
                name: 'editGoodsList',
                component: editGoodsList,
                meta: { requiresAuth: true },
            },
            {
                path: '/dingdangl',
                name: 'dingdangl',
                component: dingdangl,
            }
        ]
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: notFound,
    },
    /*  {
         path: '*',
         redirect: { name: 'notFound' }
     } */
]

//实例化路由
const router = new VueRouter({
    routes
})

export default router;