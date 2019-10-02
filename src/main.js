/**
 * Created by Owner on 2017/3/21.
 */

Vue.config.debug = true; //开启错误提示


/* 引入vue */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import Vuex from 'vuex'

import messageBox from "./controls/messageBox";
// 使用
Vue.use(messageBox);

import { carousel, carouselItem, } from 'element-ui'
Vue.use(carousel)
Vue.use(carouselItem)



import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


Vue.prototype.scrollTopl = null;
import { InfiniteScroll, DatetimePicker, Swipe, SwipeItem, Checklist,Radio,Cell,Button} from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.component(Checklist.name, Checklist);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Radio.name, Radio);
Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);
import "./assets/css/iconfont/iconfont.css"

import "./assets/css/common.css"; //公共样式
import "./assets/css/style.less"; //全局样式

import routes from "./router.js"


//创建 router 实例，然后传 routes 配置mg_elec
const router = new VueRouter({
    routes,
    linkActiveClass: "active",
    history: true
});
//
// router.beforeEach((to, from, next)=>{
//     let chatroomRoutes = routes.find((item)=>{
//         return item.path ==="/chatroom"
//     });
//
//     if (to.path === "/lotteryBet" || to.path === "/chatroom"){
//         chatroomRoutes.meta.keepAlive = true;
//     }else {
//         chatroomRoutes.meta.keepAlive = false;
//     }
//     next();
// });

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
// Vue.use(MuseUI)

Vue.use(Vuex)

//数据中心
import store from './store/storeData';
import numberUtil from './assets/js/util/numberUtil'
import dateUtil from './assets/js/util/dateUtil'
Vue.use(Vuex);


//自定义过滤器
Vue.filter('time', function(value) {
    return dateUtil.toYYYY_MM_DDHHmmss(new Date(parseInt(value)));
})

//小数点  | fixed(number)
Vue.filter('fixed', function(value, len, defaultVal) {
    return numberUtil.toFixed(value, len ? len : 3, defaultVal);
})
//小数点  | fixed(number)
Vue.filter('fixedTo2', function(value, len, defaultVal) {
    return numberUtil.toFixed(value, len ? len : 2, defaultVal);
})
Vue.filter('toInteger', function(value, len, defaultVal) {
        return numberUtil.toIntger(value);
    })
    //金额保留三位小数 fixedMoney
Vue.filter('fixedMoney', function(value, defaultVal) {
    return numberUtil.toMoneyFixed(value, defaultVal);
})
Vue.filter('toBoolean', function(value) {
    if (value === undefined) return false;
    return value;
})


/* 实例化一个vue */
const app = new Vue({
    router,
    el: '#app',
    store,
    render: h => h(App)
})