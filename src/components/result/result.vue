<template>
    <div>
        <div class="box-header">
            <section class="header-box">
                <div class="column-icon-box" @click="leftSlide" v-if="user.init==true">
                    <i class="column-icon"></i>
                </div>
                <h1>购彩大厅</h1>
                <div class="index-login-to" v-if="user.apiReqFinish==true&&user.init==false"><a @click="toLogin">登录</a></div>
                <div class="index-login-try" v-if="user.apiReqFinish==true&&user.init==false"><a href="javascript:void(0);" @click="loginShiWan">试玩</a></div>
            </section>
            <section class="tab-nav-box">
                <ul class="display-box text-center">
                    <li v-for="(item,index) in types" :class="{'active':selectType===item.type.name}" @click="search(item.type.name,index)" v-if="item.type.permission">{{item.type.desc}}</li>
                </ul>
            </section>
        </div>
        <div class="lottery-slide-left">
            <v-slippery :user="user" ref="tagIndex"></v-slippery>
        </div>
        <section class="result-height" v-if="list.length>0">
            <article class="result-list" v-for="item in list"  v-if="item.openTradition||item.openKg">
                <ul class="display-flex">
                    <li class="lottery-logo">
                        <img :src="require('../../assets/images/lottery/'+item.logo)">
                    </li>
                    <li class="flex-box result-right">
                        <ul @click="toGame(item)">
                            <li class="result-title">{{item.name}}</li>
                            <li class="flex-box clearfix">
                                <p class="result-num" v-if="item.historyNums != null" v-for="n in item.historyNums">
                                    {{n}}
                                </p>
                                
                            </li>
                            <li v-if="item.info != null" class="result-trade">
                                售: <span class="red">{{item.info.beginTime}}~{{item.info.endTime}}</span>
                                频率: <span class="red">{{item.info.interval}}</span> {{item.info.intervalUnit}}
                                每天: <span class="red">{{item.info.issueQty}}</span> 期</li>
                        </ul>
                    </li>
                </ul>
                <ul class="display-box result-select">
                    <li class="result-trend" @click="toTrend(item)"><i></i> 走势</li>
                    <router-link tag="li" :to="{path:'lotteryInformationTrend',query:{gameId:item.id,gameName:item.name}}"
                                 class="result-play"><i></i> 开奖</router-link>
                    <li class="result-collect" @click="favorites(item)"><i :class="{'active':item.favorited}"></i> <span>{{item.favorited?"已收藏":"收藏"}}</span></li>
                </ul>
            </article>
        </section>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import arrayUtil  from '../../assets/js/util/arrayUtil.js';
    import lotteryApi  from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from "../../assets/js/api/userInfo";
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import lotteryBusiness  from '../../assets/js/business/lottery/lotteryBusiness';
    import footer from '../footer/footer.vue';
    import slippery from '../slippery/slippery.vue'
    import viewUtil from '../../assets/js/business/common/viewUtil';

    export default {
        
        data () {
            return {
                selectType: " ",
                list:[],
                types:[],
                lotteryList:[],
                idsx:[],
                user:{
                    lotteryBal:0,
                    gameType:[]
                },
            }
        },
        created(){
            let _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            },true);
            lotteryBusiness.getIndexLotteryList(function (indexLotteryList) {
                   if (indexLotteryList && indexLotteryList.length > 0 && indexLotteryList.length <= 200) {
                    _this.lotteryList  =indexLotteryList
                      _this.types=userBusiness.getLotteryTypesWithList();
                      _this.search('sscrules',0);
                   }
            })
          
        },
        mounted(){
            //window.scroll()
        },
        methods: {
            toGame(item){
                this.$router.push({path:"/lotteryBet",query:{gameId: item.id}})
            },
            favorites(item){
                let _this = this;
                
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                let id = item.id;

                let lottery = null;

                for (var i in _this.lotteryList) {
                    lottery = _this.lotteryList[i];
                    if (lottery.id == id / 1) {
                        _this.lotteryList.splice(i, 1);
                        break;
                    }
                }
                lottery.favorited = !item.favorited;

                _this.lotteryList.splice(0, 0, lottery);

                var ids = arrayUtil.join(_this.lotteryList, item => {
                    if(item.favorited == false) return null;
                    return item.id;
                });
                userInfoApi.saveFavorites({lotteryIds: ids}, function (resp) {
                    if (resp.code == 200) {
                        _this.lalterSuccess("设置成功");
                    } else {
                        _this.lalterSuccess(resp.msg);
                    }
                })
            },
            toTrend(item) {
                //  this.lalterWarning("暂未开放");
                this.$router.push({path: '/lotteryTrend', query: {id: item.id,goback:"result"}});
            },

            search: function(type,index) {
                var _this = this;
                this.tagIndex = index;
                if(_this.selectType == type){
                    return;
                }
                _this.selectType = type;

                var list = this.types[index].list || []
                
                var gameIds=arrayUtil.join(list,function (item) {
                    return item.id;
                })
                
                var params={"gameIds":gameIds};
                lotteryBusiness.getHistoryNums(params,function(data) {

                    for (var i = 0; i < list.length; i++) {

                        var lottery = list[i];
                        var historyies = data[lottery.id];
                        if(arrayUtil.isEmpty(historyies)==false){
                            var endHistory = historyies[historyies.length - 1];
                            lottery.historyIssueno = endHistory.issueno;
                            lottery.historyNums = endHistory.nums.split(' ');
                        }else{
                            lottery.historyIssueno="0000-00-00";
                            var arr = "- - - - -";
                            lottery.historyNums = arr.split(' ');
                        }

                    }
                    _this.list = list;
                });
                
            },
            leftSlide(){
                
                this.$parent.slideFlag=!this.$parent.slideFlag;
                this.$refs.tagIndex.tagIndex = 0;
                if(this.$parent.slideFlag){
                    $(".lottery-slide-left").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    
                    $('.box-header').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                    $('.result-height').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                    $(".nav-box").css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                }else{
                    $(".lottery-slide-left").css({
                        "transform":"translateX(-100%)",
                        "-ms-transform":"translateX(-100%)", 	
                        "-moz-transform":"translateX(-100%)", 	
                        "-webkit-transform":"translateX(-100%)", 
                        "-o-transform":"translateX(-100%)" 
                    });
                   
                    $('.box-header').css({
                         "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $('.result-height').css({
                         "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $(".nav-box").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                }
            },
           
            toLogin(){
              viewUtil.toLoginView();
            },
            loginShiWan(){
                var _this = this;
                var params = {
                    "device" : 0,
                };
                _this.lshowWait();
                userInfoApi.loginShiWan(params,(res)=>{
                    _this.lcloseWait();
                    if(res.code == 200){
                        userBusiness.initMenu=true;
                        userBusiness.refreshBal(_this,function(user){
                            _this.user = user
                        
                        },false)

                    }else {
                        this.lalterError(res.msg);
                    }
                })
            },
        },
        components:{
            'v-footer':footer,
            'v-slippery': slippery,
        }
    }
</script>