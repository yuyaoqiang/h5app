<template>
    <div>
        <div :class="redTimeFinish?' heart hongbao':'hongbao'"  @click="showHb(true)" v-if="redEnvelope.show==true &&redEnvelope.open==false && isShow==true">
            <img src="../../assets/images/hongbao/btn_lq1.png" alt="">
        </div>
        <div class="cover-record-wrap" v-if="redRecordVisible==true">
            <div class="record-list-wrap">
                <section class="record-list-continue">
                    <ul>
                        <li class="list" :key="item.receivetime" v-for="item in redRecords">
                            
                            <span>
                                {{item.receivetime | time}}
                            </span>
                            <span>{{item.dividendmoney}}元</span>
                        </li>
                    </ul>
                </section>
                <p class="close" @click="recordsVisibleFun"></p>
            </div>
        </div>
        <div class="cover-record-roles-wrap" v-if="redRecordRolesVisible==true">
            <div class="record-roles-wrap">
                
                <p class="close" @click="recordsRolesVisibleFun"></p>
            </div>
        </div>
       <div class="cover-bg" v-if="redEnvelope.open==true">
            <div :class="redEnvelope.isStepOne?'cover-lghb bounce-enter-red-pack-lfet heartAnimate':'cover-lghb bounce-enter-red-pack-lfet'">
                <div class="lqhb" v-if="redEnvelope.isStepOne==true">
                    <p class="title">您有一个圣诞红包未领取!</p>
                    <p class="title title-3" v-if="redEnvelope.limit==false"></p>
                    <p class="title title-4" v-if="redEnvelope.limit==false">领取中...</p>
                    <div class="btn_hb" @click="receiveRewards"></div>
                </div>

                <div class="hbzj" v-if="redEnvelope.isStepTwo==true">
                    <p class="zje">
                        <span>￥</span>{{redEnvelope.money}}
                    </p>
                    <p class="title-1">恭喜您</p>
                    <p class="title title-2">获得2019圣诞节第一波福利</p>
                    <div class="btn_hb active" @click="closeHb"></div>
                </div>

                <div class="lqhb2" v-if="redEnvelope.isStepThree==true">
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
                    <p class="get-records">
                        <span  @click="recordsVisibleFun">领取记录</span>
                        <span  @click="recordsRolesVisibleFun">活动规则</span>
                    </p>
                    <div class="btn_hb active" @click="closeHb"></div>
                </div>
                <!-- <div class="close" @click="closeHb"></div> -->
            </div>
        </div>        
    </div>
</template>
<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import userInfo from  "../../assets/js/api/userInfo";
    export default {
        name: "child1",
        props: ['isShow'],
        data () {
            return {
                user:{
                    lotteryBal:0
                },
                redRecordVisible:false,
                redRecordRolesVisible:false,
                redRecords:[],
                redTimeFinish:false,
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
        methods:{
            recordsVisibleFun(){
                this.redRecordVisible =!this.redRecordVisible;
                if(this.redRecordVisible){
                   this.findDividendDetails();
                }
            },
            recordsRolesVisibleFun(){
                this.redRecordRolesVisible =!this.redRecordRolesVisible;
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
                var _this=this;
                this.redEnvelope.countdownSeconds = (closeTimes - serverTimes) / 1000;
                var remainSeconds = this.redEnvelope.countdownSeconds;
                this.redEnvelope.delay=false;
                this.createInterval(remainSeconds,function (countdown) {
                    _this.redEnvelope.countdownContext= _this.buildCountdown(countdown);
                    _this.redEnvelope.countdownSeconds=countdown;
                    if(countdown <= 0 ){
                        _this.redEnvelope.countdownContext.munites = '00';
                        _this.redEnvelope.countdownContext.secondes = '00';
                        _this.redTimeFinish = true;
                        _this.redEnvelope.isStepTwo =false;
                        _this.redEnvelope.isStepThree =false;
                        _this.redEnvelope.isStepOne= true;
                        // _this.getDividendAvailable(true);
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
                var m = Math.floor(((seconds % 86400) % 3600) / 60)<0?m=0:Math.floor(((seconds % 86400) % 3600) / 60);
                var s = Math.floor(((seconds % 86400) % 3600) % 60)<0?s=0:Math.floor(((seconds % 86400) % 3600) % 60);
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
                confetti.maxCount = 60;
                confetti.particleSpeed = 3;
                confetti.frameInterval = 20;
                confetti.alpha = 1.0;
                confetti.gradient = true;
                if(!this.redEnvelope.limit) return;
                this.redEnvelope.limit = false;
                
                userInfo.receiveDividend(res =>{
                    this.redEnvelope.limit = true;
              
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
                    confetti.start();
                    this.redTimeFinish = false,
                    this.redEnvelope.isStepOne = false;
                    this.redEnvelope.isStepTwo = true;
                    this.redEnvelope.isStepThree = false;
                    this.redEnvelope.money = data.self;
                    userBusiness.getUser( (user) =>{
                        this.user = user;
                    })
                    
                })
            },
            findDividendDetails(){
                userInfo.findDividendDetails(res=>{
                    if(res.code==200){
                        this.redRecords = res.data;
                    }else{
                        console.log(res.msg);
                    }
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
                        this.redTimeFinish =true;
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
                confetti.stop();
                // this.stopInterval();
            }
        },
        created() {
            var _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            });
            this.getDividendAvailable(true);
        },
    }
</script>


<style lang="less" scoped>
.cover-record-wrap,.cover-record-roles-wrap{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0,0,0,0.5);
  .record-roles-wrap{
        position: absolute;
        width: 75%;
        height: 60%;
        top: 50%;
        left: 50%;
        border-radius: 0.2rem;
        transform: translate(-50%, -50%);
        background-image: url('../../assets/images/newImg/red-roles.png');
        background-size: 100% auto;
  }
  .record-list-wrap{
        position: absolute;
        width: 75%;
        height: 60%;
        top: 50%;
        left: 50%;
        border-radius: 0.2rem;
        transform: translate(-50%, -50%);
        background-image: url('../../assets/images/newImg/me-bg.png');
        background-size: 100% auto;
       .record-list-continue{
            width: 100%;
            height: 52vw;
            padding: 0 0.2rem;
            overflow: auto;
            margin: 0.7rem 0;
            -webkit-overflow-scrolling: touch; 
            .list{
                display: flex;
                justify-content: space-evenly;
                color: #f12d2e;
                padding: 0.03rem 0;
                img{
                    margin-right: .23vw;
                    width: 3.4375vw;
                    height: 4.0625vw;
                }
            }
       }
  }
         .close{
            position: absolute;
            left: 50%;
            bottom: -0.33rem;
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 0.1rem;
            background: url(/h5app/static/img/close_hb.png) 0 0 no-repeat;
            background-size: contain;
            transform: translate(-50%, 0);
    }
}
.hongbao{
    position: fixed;
    right: 0;
    bottom: 1.0rem;
    width: .5rem;
    line-height: 40px;
    top: 77%;
    color: #fff;
    text-align: center;
    z-index: 20;
}
.hongbao img{
    display: inline-block;
    width: 100%;
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
.cover-lghb .lqhb2{
    background: url('../../assets/images/hongbao/lqhb2.png') 0 0 no-repeat;
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
    font-size: 0.3rem;
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
.get-records{
    display: flex;
    justify-content: space-around;
    margin: 0.08rem 0.1rem;
    text-align: center;
    /* padding: 0.05rem; */
    color: #fff;
    span{
        border-bottom: 1px solid #fff;
    }
}
.bounce-enter-red-pack-lfet{
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: bounceInUp-red-pack-lfet; 
 }  
@keyframes bounceInUp-red-pack-lfet {
	0% {
		transform: translate(-50%,-500%)
	}

	40% {
		transform: translate(-50%,-52%)
	}

	70% {
		transform: translate(-50%,-48%)
	}

	100% {
		transform: translate(-50%,-50%)
	}
}
 .heart {
        animation: heartbeat 0.8s infinite;
        -webkit-animation: heartbeat 0.8s infinite;
        transform-origin: center;
  
}
@keyframes heartbeat {
    0% {
        -webkit-transform:scale(0.9, 0.9);
    }
    25% {
        -webkit-transform:scale(1.1, 1.1);
    }
    100% {
        -webkit-transform:scale(0.9, 0.9);
    }
}
.heartAnimate{
    animation: heartAnimate 0.8s infinite;
  cursor: pointer;
}
@keyframes heartAnimate{ 
    0%,100%{transform:translate(-50%,-50%) scale(1) rotate(0);}                       /*0%,100%时保持图形的原大小且不旋转*/
    10%,30%{transform:translate(-50%,-50%) scale(1.1) rotate(3deg);}                  /*10%,30%时图形缩小成0.9倍，并且顺时针旋转3度*/
    20%,40%,60%,80%{transform:translate(-50%,-50%) scale(1.1) rotate(-3deg);}         /*20%,40%,60%,80%时图形扩大成1.1倍，并且逆时针旋转3度*/
    50%,70%{ transform:translate(-50%,-50%) scale(1.1) rotate(3deg);}                 /*50%,70%时图形扩大成1.1倍，并且顺时针旋转3度*/
}
</style>
