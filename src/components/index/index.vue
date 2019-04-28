<template>
    <div>

        
        <v-header :titleName="titleName" v-show="showTitle"></v-header>
        
        <div class="lottery-slide-left">
            <v-slippery :user="user" ref="tagIndex"></v-slippery>
        </div>
        <div class="lottery-slide-right" id="wathScrol" ref="wathScrol" >
            <router-view :user="user" :showDLBanner="showDLBanner"></router-view>
        </div>
        <v-footer></v-footer>
        <div v-if="dialogVisible&&user.init" ref="coverBg">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">{{noticeDetails.title}}</h1>
                <div class="notice-alert-content">
                    <div>
                        {{noticeDetails.content}}
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li @click="dialogVisible = false">确 定</li>
                </ul>
            </div>
            
        </div>
       <!--  <div class="hongbao" @click="showHb(true)" v-if="$route.path=='/index'&&redEnvelope.show==true">
            <img src="../../assets/images/hongbao/btn_lq1.png" alt="">
        </div> -->

        <div class="cover-bg" v-if="redEnvelope.open==true">

            <div class="cover-lghb">

                <div class="lqhb" v-if="redEnvelope.isStepOne==true">
                    <p class="title">您有一个新年红包未领取!</p>
                    <p class="title title-3" v-if="redEnvelope.limit==false"></p>
                    <p class="title title-4" v-if="redEnvelope.limit==false">领取中...</p>
                    <div class="btn_hb" @click="receiveRewards"></div>
                </div>

                <div class="hbzj" v-if="redEnvelope.isStepTwo==true">
                    <p class="zje">
                        <span>￥</span>{{redEnvelope.money}}
                    </p>
                    <p class="title-1">恭喜您</p>
                    <p class="title title-2">获得2019第一波福利</p>
                    <div class="btn_hb active" @click="closeHb"></div>
                </div>

                <div class="lqhb" v-if="redEnvelope.isStepThree==true">
                    <p :class="[redEnvelope.showMoney==false?'title':'title-5']" >{{redEnvelope.text}}</p>
                    <p v-if="redEnvelope.showMoney" class="title-6">￥{{redEnvelope.money}}</p>
                    <p class="title title-3">距离下个红包倒计时：</p>
                    <p class="title title-4">
                        <span class="betting-day" v-if="redEnvelope.countdownContext.days>0">{{redEnvelope.countdownContext.days}}</span>
                        <span v-if="redEnvelope.countdownContext.days>0">:</span>
                        <span class="betting-hours" v-if="redEnvelope.countdownContext.hours>0">{{redEnvelope.countdownContext.hours}}</span>
                        <span v-if="redEnvelope.countdownContext.hours>0">:</span>
                        <span class="betting-munites">{{redEnvelope.countdownContext.munites}}</span>
                        <span>:</span>
                        <span class="betting-secondes">{{redEnvelope.countdownContext.secondes}}</span>
                    </p>
                    <div class="btn_hb active" @click="closeHb"></div>
                </div>
                <div class="close" @click="closeHb"></div>

            </div>
        </div>
    </div>
</template>
<script>
    import footer from '../footer/footer.vue';
    import header from '../header/header.vue';
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import kgBusiness  from '../../assets/js/business/lottery/kg/kgBusiness';
    import slippery from '../slippery/slippery.vue'
    import arrayUtil  from '../../assets/js/util/arrayUtil';
    import platformData from '../../assets/platform/main/platformData.js';
    import userInfo from  "../../assets/js/api/userInfo";
    export default {
        data () {
            return {
                user:{
                    lotteryBal:0
                },
                tagIndex:0,
                showDLBanner:true,
                titleName:'',
                showTitle:true,
                dialogVisible:false,
                noticeDetails: {
                    title:'',
                    content:''
                },
                redEnvelope:{
                    show:false,
                    open:false,
                    limit:true,
                    isStepOne:true,
                    isStepTwo:false,
                    isStepThree:false,
                    countdownSeconds:0,
                    interval:null,
                    countdownContext:{
                        days: "00",
                        hours: "00",
                        munites: "00",
                        secondes: "00",
                    },
                    money:0,
                    delay:true,
                    text:'当前红包已领完',
                    showMoney:false,
                }

            }
        },
        beforeCreate(){
           // userBusiness.initLotteryList();
        },

        methods:{
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
                    $(".lottery-slide-right").css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 

                    });
                    $('.index-header-box').css({
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
                    $(".lottery-slide-right").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $('.index-header-box').css({
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
            scrollWatch() {
                var scroll =  document.querySelector('#wathScrol').scrollTop;
                if( scroll <10){
                    this.showDLBanner =true;
                }else {
                    this.showDLBanner = false
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
                        userBusiness.getUser(this, function (user) {
                            _this.user = user;
                        }, true)

                    }else {
                        this.lalterError(res.msg);
                    }
                })
            },

            showHb(val){
                if(this.user.init == false){
                    this.lalterError('您还没有登录，不能领取红包，请先登录谢谢！');
                    return
                }
                if(this.user.isShiWan == true){
                    this.lalterError('试玩用户不允许此操作，请转为正式会员，再来领取红包！');
                    return
                }
                this.redEnvelope.open = true;
                this.getDividendAvailable(val);
            },
            startTime(closeTimes,serverTimes){
                
                
                this.redEnvelope.countdownSeconds = (closeTimes - serverTimes) / 1000;

                var remainSeconds = this.redEnvelope.countdownSeconds;
                this.redEnvelope.delay=false;

                var _this=this;
                this.createInterval(remainSeconds,function (countdown) {
                    _this.redEnvelope.countdownContext= _this.buildCountdown(countdown);
                    _this.redEnvelope.countdownSeconds=countdown;

                    if(countdown <= 0){
                        _this.redEnvelope.countdownContext.munites = '00';
                        _this.redEnvelope.countdownContext.secondes = '00';
                        _this.getDividendAvailable(true);
                    }
                });
            },
            createInterval(seconds,action){
                var _this=this;
                _this.stopInterval();
                var countdown=seconds;
                _this.redEnvelope.interval = setInterval(function () {
                    countdown--;
                    if(countdown == 0){
                        _this.stopInterval();
                    }
                    action(countdown);

                }, 1000);
            },
            stopInterval(){
                if(this.redEnvelope.interval != null){
                    clearInterval(this.redEnvelope.interval);
                    this.redEnvelope.interval=null;
                }
            },
            buildCountdown(seconds) {
                var d = Math.floor(seconds/ 86400) ;
                var h = Math.floor((seconds % 86400) / 3600);
                var m = Math.floor(((seconds % 86400) % 3600) / 60);
                var s = Math.floor(((seconds % 86400) % 3600) % 60);
                return {
                    days: this.toFriendStr(d),
                    hours: this.toFriendStr(h, false),
                    munites: this.toFriendStr(m, true),
                    secondes: this.toFriendStr(s),
                }
            },
            toFriendStr(val,defaultDisplay,splitFlag) {
                if(defaultDisplay==false && val<1){
                    return "";
                }
                return (val<10?("0"+val):val)+(splitFlag?":":"");
            },
            receiveRewards(){
                if(!this.redEnvelope.limit) return;
                this.redEnvelope.limit = false;
                
                userInfo.receiveDividend(res =>{
                    this.redEnvelope.limit = true;
                    if(res.code!=200){
                        this.closeHb();
                        this.lalterError(res.msg);
                        return
                    }
                    var data = res.data;
                    if(data==null){
                        this.closeHb();
                        this.lalterError(res.msg);
                        return
                    }
                    this.startTime(data.nexTime,data.curTime);
                    if(data.dividendStatus==1){
                        this.redEnvelope.isStepOne = false;
                        this.redEnvelope.isStepTwo = false;
                        this.redEnvelope.isStepThree = true;
                        this.redEnvelope.text = '当前红包已领完';
                        return;
                    }
                    this.redEnvelope.isStepOne = false;
                    this.redEnvelope.isStepTwo = true;
                    this.redEnvelope.isStepThree = false;
                    this.redEnvelope.money = data.self;
                    userBusiness.getUser( (user) =>{
                        this.user = user;
                    })
                    
                })
            },
            getDividendAvailable(val){
                userInfo.getDividendAvailable(res =>{
                    if(res.code==203){
                        this.redEnvelope.show = false;
                        return;
                    }
                    this.redEnvelope.show = true;
                    if(res.code!=200){
                        this.lalterError(res.msg)
                        return;
                    }
                    var data = res.data;
                    var closeTimes = data.nexTime;
                    var serverTimes = data.curTime;
                    if(closeTimes==null&&val){
                        //this.redEnvelope.show = false;
                        this.lalterError(res.msg)
                        this.closeHb();
                        return;
                    }
                    if(val==true){
                        this.startTime(closeTimes,serverTimes);
                    }
                    this.redEnvelope.showMoney = false;
                    if(data.dividendStatus==0&&data.receiveStatus==0){
                        this.redEnvelope.isStepOne = true;
                        this.redEnvelope.isStepTwo = false;
                        this.redEnvelope.isStepThree = false;
                        this.stopInterval();
                        return;
                    }
                    if(data.receiveStatus==1&&data.dividendStatus==0){
                        this.redEnvelope.isStepOne = false;
                        this.redEnvelope.isStepTwo = false;
                        this.redEnvelope.isStepThree = true;
                        this.redEnvelope.money = data.self;
                        this.redEnvelope.showMoney = true;
                        this.redEnvelope.text = '您已领取过该红包';
                        return;
                    }
                    
                    if(data.receiveStatus==0&&data.dividendStatus==1){
                        this.redEnvelope.isStepOne = false;
                        this.redEnvelope.isStepTwo = false;
                        this.redEnvelope.isStepThree = true;
                        this.redEnvelope.text = '当前红包已领完';
                        return;
                    }
                })
            },
            
            closeHb(){
                this.redEnvelope.open = false;
                this.redEnvelope.isStepOne = false;
                this.redEnvelope.isStepTwo = false;
                this.redEnvelope.isStepThree = false;
                this.stopInterval();
            }
        },
        created() {
            var _this = this;
            
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            });
            this.getDividendAvailable()
            _this.titleName = platformData.setting.name;
            let route = this.$route;
            let meta = route.meta || {};
            if(meta.show){
                this.showTitle = true;
                if(meta.index!=1){
                    this.titleName = meta.title;
                }
            }else{
                this.showTitle = false;
            }
            
        },
        watch:{
            "$route":function(to,from){
                let _this = this;
                if(to.path!=from.path){
                    if(to.meta.show){
                        this.showTitle = true;
                        if(to.meta.index==1){
                            this.titleName = platformData.setting.name;
                        }else{
                            this.titleName = to.meta.title;
                        }
                        
                    }else{
                        this.showTitle = false;
                    }
                    
                }
            },
            "dialogVisible":function(a,b){
                if(a==true){
                   //methodsScroll.forbidScroll();  
                }else{
                   //methodsScroll.enabledScroll();  
                }
            }
        },
        components: {
            'v-footer': footer,
            'v-slippery': slippery,
            'v-header':header,
        }
    }
</script>


<style>
.hongbao{
    position: fixed;
    right: 0;
    bottom: 1.0rem;
}
.hongbao img{
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
}
.cover-lghb{
    position: absolute;
    width: 2rem;
    height: 3rem;
    left: 50%;
    top: 50%;
    z-index: 999;
    border-radius: 5px;
    overflow: hidden;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
}
.cover-lghb .lqhb{
    background: url('../../assets/images/hongbao/lqhb.png') 0 0 no-repeat;
    height: 2.6rem;
    background-size: contain;
}
.cover-lghb .hbzj{
    background: url('../../assets/images/hongbao/wlqhb.png') 0 0 no-repeat;
    height: 2.6rem;
    background-size: contain;
}
.cover-lghb .title{
    color: #ffffff;
    text-align: center;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.14rem;
}
.cover-lghb .btn_hb{
    position: absolute;
    left: 0.25rem; 
    bottom: 0.5rem;
    width: 1.5rem;
    height: 0.4rem;
    background: url('../../assets/images/hongbao/btn_lq2.png')  0 0 no-repeat;
    background-size: contain;
}
.cover-lghb .btn_hb.active{
    background: url('../../assets/images/hongbao/btn_sure.png')  0 0 no-repeat;
    background-size: contain;
}
.cover-lghb .close{
    position: absolute;
    left: 0.85rem; 
    bottom: 0;
    width: 0.3rem;
    height: 0.3rem;
    background: url('../../assets/images/hongbao/close_hb.png')  0 0 no-repeat;
    background-size: contain;
}
.cover-lghb .zje{
    height: 0.9rem;
    line-height: 0.9rem;
    color: #733C15;
    text-align: center;
    font-size: 0.24rem;
}
.cover-lghb .zje span{
    font-size: 0.18rem;
}
.cover-lghb .title-1{
    font-size: 0.26rem;
    padding-top: 0.2rem;
    text-align: center;
    color: #ffffff;
}
.cover-lghb .title-2{
    height: 0.4rem;
    line-height: 0.4rem;
}
.cover-lghb .title-3{
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.4rem;
    color: #FFF2CB;
}
.cover-lghb .title-4{
    height: 0.3rem;
    line-height: 0.3rem;
}
.cover-lghb .title-4 span{
    font-size: 0.2rem;
    color: #F8FCFD;
}
.cover-lghb .title-5{
    color: #ffffff;
    text-align: center;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
}
.cover-lghb .title-6{
    color: #FFF2CB;
    text-align: center;
    font-size: 0.16rem;
}
</style>
