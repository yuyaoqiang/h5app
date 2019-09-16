<template>
    <div class="slippery">
        <section>
            <div class="slippery-header">
                <ul v-if="user.init==true" class="display-flex slippery-account">
                    <li class="slippery-top-img"><img src="../../assets/images/icon29.png"></li>
                    <li class="flex-box slippery-top-mid">
                        <p>{{user.isShiWan?'试玩用户':user.userName}}</p>
                        彩票余额: ¥ {{user.lotteryBal}} 元
                    </li>
                </ul>
                <ul v-if="user.init==false"  class="slippery-account">
                    <li class="login-font" @click="toLogin">
                        <i class="icon iconfont icon-dibu_zhanghu"></i>
                        登陆
                    </li>
                </ul>

                <ul class="display-box slippery-header-bto">
                    <li @click="goHome">
                        <div><img src="../../assets/images/slippery/slippery-home.png"></div>
                        <p>首页</p>
                    </li>
                    <li @click="toWyczPage({path:'chongzhi'})">
                        <div><img src="../../assets/images/slippery/slippery-cz.png"></div>
                        <p>充值</p>
                    </li>
                    <li @click="toWytxPage({path:'withdraw'})">
                        <div><img src="../../assets/images/slippery/slippery-tx.png"></div>
                        <p>提现</p>
                    </li>
                    <router-link tag="li" to="quotaConversion" @click="goHome">
                        <div><img src="../../assets/images/slippery/slippery-zh.png"></div>
                        <p>额度转换</p>
                    </router-link>
                </ul>
            </div>
            <div class="slippery-lottery-box">
                <h3 @click="showLottery(0)" :class="tagIndex==0?'active':''">彩票</h3>
                <h3 @click="showLottery(1)" :class="tagIndex==1?'active':''">收藏</h3>
            </div>
            <div class="slippery-game-box">
                <ul v-show="tagIndex==0">
                    <li v-for="item in lotteryList" v-if="item.permission==true || item.openKg==true" @click="toLotteryBet(item)">
                        <p>{{item.name}} <i class="hot-icon" v-if="item.hot"></i></p>
                    </li>
                </ul>
                <ul v-show="tagIndex==1">
                    <div v-if="collectionLotter.length<1" class="nullLottery">
                        <img src="" alt="">
                        <p>亲，您还没有收藏采种哦，赶紧行动起来吧！</p>
                    </div>
                    
                    <li v-for="item in collectionLotter" @click="toLotteryBet(item)" v-else>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </section>
        <div class="slippery-footer">
            <p @click="onlineServer">
                <img src="../../assets/images/slippery/kf.png"> 客服
            </p>
        </div>
        <div class="slippery-right" @click="slideHide"></div>
    </div>
</template>
<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import viewUtil  from '../../assets/js/business/common/viewUtil';
    import lotteryBusiness  from '../../assets/js/business/lottery/lotteryBusiness';
    import kgBusiness from  "../../assets/js/business/lottery/kg/kgBusiness"
    import arrayUtil  from '../../assets/js/util/arrayUtil';
    import lotteryApi  from '../../assets/js/api/lotteryApi.js';
    import lotteryCountDownCenter from '../../assets/js/business/lottery/lotteryCountDownCenter'
    export default {
        data(){
            return {
                lotteryList: [],
                lotteryListNumb: 0,
                kgList: [],
                boxFlag: true,
                kgFlag: false,
                types: [],
                user: {},
                tagIndex:0,
                collectionLotter:[],

            }
        },
        methods: {
            toLogin(){
                viewUtil.toLoginView();
            },
            toMyReport(){
                userBusiness.toMyReport()
            },
            toWyczPage(path){
                userBusiness.toWyczPage(path);
            },
            toWytxPage(path){
                userBusiness.toWytxPage(path);
            },
            showLottery(val){
                let _this = this;
                this.boxFlag = !this.boxFlag
                if(val==1){
                    if(userBusiness.checkIsNotLoginPlayer()){
                        return;
                    }

                    if(userBusiness.checkIsTryPlayer()){
                        return;
                    }

                    
                    _this.collectionLotter = [];
                    this.lotteryList.forEach((item) =>{
                        if(item.favorited){
                            _this.collectionLotter.push(item)
                        }
                    })
                }
                
                this.tagIndex = val;
                
            },
            // showKg(){
            //     this.kgFlag = !this.kgFlag
            // },
            
            slideHide(){
                this.$parent.leftSlide();
            },
            goHome(){
                this.slideHide();
                this.$router.push({path: 'index'});
            },
            // toKgLotteryBet(lottery){
            //     this.$router.push({path: 'kgGameBet', query: {gameId: lottery.id}});
            //     if (this.$parent.initGame) {
            //         this.$parent.initGame();
            //         setTimeout(() => {
            //             this.$parent.leftSlide();
            //         }, 300)
            //     }
            // },

            toLotteryBet(lottery){
                let _this = this;
                this.slideHide();
               
                if (this.$parent.isLotteryBetPage==true){
   
                 /*   if( this.$parent.lottery.id == lottery.id){
                        return;
                    }*/
                    _this.$parent.initLottery(lottery.id);
                    
                    if(_this.$parent.$refs.bettingContainer.kgLottery){
                        _this.$parent.$refs.bettingContainer.kgLottery.init = false;
                        _this.$emit('showHistory',false)
                    }

                    setTimeout(()=>{
                        if (_this.$parent.$refs.bettingContainer.initLottery) {
                            
                            _this.$parent.$refs.bettingContainer.initLottery();
                            _this.$emit('showHistory',false)
                        }
                    },100)
                }
                _this.$router.push({path:"lotteryBet",query:{gameId:lottery.id}});
            },
            onlineServer(){
                userBusiness.openCustomerService();
            },
            initUser(){
                let _this = this;
                userBusiness.getUser(this,function (user) {
                    _this.user=user;
                });
            }         
        },
        created(){
            let _this=this;
            this.initUser();
            lotteryBusiness.getIndexLotteryList(function (indexLotteryList) {
                   if (indexLotteryList.length > 0 && indexLotteryList.length <= 200) {
                    _this.lotteryList  =indexLotteryList
                   }
            })
        },
        watch:{
            "user.isShiWan":function(){
                this.initUser();
            },
        }
       
    }
</script>
<style>
    .slippery-header {
        width: 100%;
        overflow: hidden;
    }
    .slippery-account{
        padding: 0.1rem 0 0.1rem 0.15rem;
        box-shadow: 0 -1px 0 #403d5c inset;
        -webkit-box-shadow: 0 -1px 0 #403d5c inset;
    }

    .slippery-top-img img {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
    }

    .slippery-top-mid {
        padding-left: 0.1rem;
        color: #8e93a9;
        font-size: 14px;
    }

    .slippery-top-mid p {
        font-size: 16px;
        color: #d2d2d4;
    }

    .slippery-header-bto{
        padding:0.1rem 0.1rem 0.05rem;;
        box-shadow: 0 -1px 0 #403d5c inset;
        -webkit-box-shadow: 0 -1px 0 #403d5c inset;
    }
    .slippery-header-bto li {
        text-align: center;
        color: #9998a8;
        font-size: 14px;
    }
    .slippery-header-bto li div{
        width: 0.3rem;
        height: 0.3rem;
        margin: 0 auto;
    }
    .slippery-header-bto img {
        display: block;
        width:auto;
        height: 100%;
    }
    .slippery-header-bto p{
        line-height: 0.24rem;
        height: 0.24rem;
    }
    .slippery-lottery-box{
        overflow: hidden;
    }
    .slippery-lottery-box h3 {
        color: #b5b6ca;
        line-height: 0.4rem;
        height: 0.4rem;
        padding-left: 0.15rem;
        box-sizing: border-box;
        font-weight: normal;
        float: left;
        width: 0.6rem;
    }
    .slippery-lottery-box h3.active{
        color: aqua
    }
    .slippery-game-box{
        position: absolute;
        left: 0;
        right: 20%;
        bottom: 0.35rem;
        top: 1.7rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .slippery-game-box ul{
        padding: 0 0.1rem;
        text-align: center;
        overflow: hidden;
    }
    .slippery-game-box li {
        float: left;
        width: 50%;
        padding: 0 0.05rem 0.05rem;
        box-sizing: border-box;
        -webkit-user-select: none;
        user-select: none;
    }
    .slippery-game-box li p{
        height: 0.35rem;
        line-height: 0.35rem;
        background-color: #383854;
        color: #8f94a8;
        font-size: 14px;
    }

    .slippery-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 20%;
        padding-left: 0.2rem;
        box-sizing: border-box;
        background-color: #1f1e3d;
        box-shadow: 0 1px 0 #403d5c inset;
        -webkit-box-shadow: 0 1px 0 #403d5c inset;
        color: #8f94a8;
    }
    .slippery-footer p img {
        vertical-align: middle;
        transform: scale(0.7);
        -webkit-transform: scale(0.7);
    }
    .slippery-right {
        float: right;
        width: 20%;
        height: 100%;
        background: none;
    }
    .login-font{
        
        width: 0.6rem;
        font-size: 0.16rem;
        color:#b5b6ca;
    }
    .login-font i{
        font-size: 0.2rem;
    }
    .nullLottery{
        margin-top: 0.85rem;
    }
</style>