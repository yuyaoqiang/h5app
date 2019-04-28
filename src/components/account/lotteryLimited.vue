<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1 class="text-center">彩票限红</h1>
            </header>
            <section class="limit-title">
                <ul class="text-center display-flex">
                <li class="flex-box">游戏</li>
                <li class="flex-box">彩票限红</li>
                <li class="flex-box" v-if="user.isOpenKg==true">KG限红</li>
                </ul>
            </section>
        </div>
        
        <ul class="limit-con">
            <li v-for="item in gameInfo" class="display-flex">
                <p class="flex-box">{{item.name}}</p>
                <p class="flex-box">{{item.maxwinmoney}}</p>
                <p class="flex-box" v-if="user.isOpenKg==true">{{item.kjmaxwinmoney}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import arrayUtil  from '../../assets/js/util/arrayUtil.js';
    import lotteryApi  from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from "../../assets/js/api/userInfo";
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import lotteryBusiness  from '../../assets/js/business/lottery/lotteryBusiness';
    export default {
        data () {
            return {
                user:{},
                gameInfo:{}
            }
        },
        created(){
            var _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            })
            userInfoApi.getGameInfo(function (res) {
                _this.gameInfo= res.data;
            })
        },
        methods: {
            goback: function () {
                this.$router.push('/account');
            },
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";

    .limit-con{
        // position: absolute;
        // top:0.75rem;
        // bottom: 0;
        // left: 0;
        // right: 0;
        padding-top:0.76rem;
        // overflow: auto;
        li{
            line-height: 0.3rem;
            border-bottom: 1px solid #cecece;
        }
        p{text-align: center}
    }
    .limit-title{

        background: #fde7db;
    }
    .limit-title ul li{
        padding: 0 0.12rem;
        line-height: 0.3rem;
        padding: 0 0.12rem;
        border-bottom: 1px solid #c1c1c1;
        &.title{
            line-height: 0.35rem;
            background: #ececec;
            color: @main-color;
         }

    }
</style>