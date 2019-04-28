<template>
    <div>
        <div class="box-header">
            <header class="header-box betting-header">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h2>{{lottery.name}}</h2>
            </header>
            <section  class="lottery-issue-box">
                <ul class="display-box">
                    <li class="lottery-issue">
                        <span>第{{lottery.issue}}期</span>
                    </li>
                    <li class="lottery-time">
                        <div class="lottery-time-box">
                            <div><img src="../../assets/images/countdown-icon.png"></div>
                            <div>{{lottery.status.desc}}: </div>
                            <dl class="betting-time">
                                <dd class="betting-day" v-if="lottery.countdownContext.days>0">{{lottery.countdownContext.days}}</dd>
                                <dt v-if="lottery.countdownContext.days>0">:</dt>
                                <dd class="betting-hours"  v-if="lottery.countdownContext.hours>0">{{lottery.countdownContext.hours}}</dd>
                                <dt v-if="lottery.countdownContext.hours>0">:</dt>
                                <dd class="betting-munites">{{lottery.countdownContext.munites}}</dd>
                                <dt>:</dt>
                                <dd class="betting-secondes">{{lottery.countdownContext.secondes}}</dd>
                            </dl>
                        </div>
                    </li>
                </ul>
            </section>
            <div class="lottery-list-header"></div>
        </div>
        
        <section class="betting-list-main">
            <article v-if="betCart != null && betCart.betOrders != null" class="shopping-list">
                <ul v-for="(bet,index) in betCart.betOrders" class="display-flex">
                    <li  @click="removeBet(index)" class="shopping-delete">
                        <div class="shopping-delete-icon"></div>
                    </li>
                    <li class="flex-box shopping-text">
                        <div>
                            {{bet.simpleBetNum}}
                            <span class="shopping-smg" v-if="bet.singleBet.isSingleBet">单挑</span>
                        </div>
                        <p>{{bet.betQty}} 注 {{bet.betAmount}} 元</p>
                    </li>
                    <li class="shopping-play">
                        <h2>{{bet.playTypeName}}</h2>
                        <p>{{bet.chooseBonus.begin}}-{{bet.chooseBonus.end}}%</p>
                    </li>
                </ul>
            </article>
        </section>
        <footer  class="lottery-footer">
            <ul  class="display-flex lottery-odds-box">
                <li @click="switchFollowBet">
                    <button type="button" :class="['lottery-chase',useFollowBet?'active':'']">{{followBetDesc}}</button>
                </li>
                <li>
                    <div  class="lottery-odds-input">
                        <input type="number" v-model="issueQty" @keyup="issueQtyChange"
                               @blur="issueQtyBlur" :disabled="useFollowBet==false" value="1" class="lottery-odds"/>
                    </div>
                </li>
                <li><p>期</p></li>
                <li>
                    <div class="lottery-odds-input">
                        <input maxlength="5" v-model="multiple" @keyup="multipleChange" @blur="multipleBlur" type="number"
                               :disabled="useFollowBet==false"  value="1" class="lottery-odds">
                    </div>
                </li>
                <li><p>倍</p></li>
                <li class="flex-box text-center">
                    <input type="checkbox" id="lottery_stop" class="lottery-chase-checkbox" v-model="followBet.winStopFollow" :disabled="useFollowBet==false"/>
                    <label for="lottery_stop">中奖停止</label>
                </li>
            </ul>
            <ul class="display-flex lottery-betting-nav">
                <li class="lottery-machine lottery-betting-delete" @click="clear">
                    <i class="el-icon-delete delete"></i>
                </li>
                <li  class="flex-box lottery-betting-money">
                    <p><span>已选</span><b class="orange">{{betQty}}</b> 注</p>
                    <p><span>共投</span><b class="orange">{{betAmount | fixedMoney}}</b> 元</p>
                    <!--<p><span>余额</span><b class="orange">{{user.lotteryBal}}</b> 元</p>-->
                </li>
                <li  class="lottery-betting-btn" :class="{'active':betQty>0}" @click="confirmBet">
                    {{useFollowBet==true?"追 号":"投 注"}}
                </li>
            </ul>
        </footer>
        <div v-if="showBox">
            <div class="cover-bg" style="background:none" @click.stop="showBox = false"></div>
            <div class="showBox" v-if="betCart != null && betCart.betOrders != null">
                <div class="showBox-title">{{lottery.name+"-" +lottery.issue}}期</div>
                <ul class="showBox-main">

                    <li v-for="item in betCart.betOrders">
                        <p><span>{{item.simpleBetNum}}</span><span><b class="orange">{{item.betAmount}}</b>元</span></p>
                        <p>{{item.playTypeName}} — {{item.multiple}}倍— {{item.betQty}}注</p>
                    </li>
                </ul>
                
                <p class="center">
                    <span>余额</span><b class="orange">{{user.lotteryBal}}</b> 元
                    <span>已选</span><b class="orange">{{betQty}}</b> 注
                    <span>共投</span><b class="orange">{{betAmount | fixedMoney}}</b> 元
                    <span v-if="useFollowBet==true">{{followBet.winStopFollow?'中奖停止':'中奖继续'}}</span>
                </p>
                    
                <div class="showBox-footer" @click="betSure()">{{useFollowBet==true?"追 号":"投 注"}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    import lotteryCountdown from '../../assets/js/business/lottery/lotteryCountdown';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import lotteryApi from '../../assets/js/api/lotteryApi';
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import numberUtil from '../../assets/js/util/numberUtil';
    import validateUtil from '../../assets/js/util/validateUtil';
    import businessValidateUtil from '../../assets/js/business/common/businessValidateUtil';


    export default {
        data () {
            return {
                lottery: {
                    gameMenu: [],
                    gameSubMenu: [],
                    playType: {},
                    status: lotteryBusiness.STATUS_LIST.init,
                    countdownContext:"00:00"
                },
                multiple:1,
                issueQty:2,
                betQty:0,
                betAmount:0,
                betCart: {
                },
                followBet:{
                    winStopFollow:true
                },
                user:{
                    lotteryBal:0
                },
                useFollowBet:false,
                followBetDesc:"",
                showBox:false
            }
        },
        methods: {
            goback: function(){
                this.$router.go(-1);
            },
            toTrend() {
                //  this.lalterWarning("暂未开放");
                this.isDestory = false;
                this.$router.push({path: '/lotteryTrend', query: {id: this.lottery.id}});
            },
            switchFollowBet:function () {
                this.useFollowBet=!this.useFollowBet;
                this.initFollowBet();
                this.caclBetResult();
            },
            initFollowBet(){
                this.followBetDesc=this.useFollowBet?"取消追号":"我要追号";
                if(this.useFollowBet==false){
                    this.issueQty=2;
                    this.multiple=1;
                }
            },
            issueLess:function () {
                if(this.issueQty>1){
                    this.issueQty --;
                }else{
                    this.issueQty = 1;
                }
                this.caclBetResult();
            },
            issueAdd:function () {
                this.issueQty += 1;
                this.caclBetResult();

            },
            multipleLess:function () {
                if(this.multiple>1){
                    this.multiple --;
                }else{
                    this.multiple = 1;
                }
                this.caclBetResult();

            },
            multipleAdd:function () {
                this.multiple += 1;
                this.caclBetResult();

            },
            issueQtyChange:function () {
                var _this = this;
                var result= businessValidateUtil.multipleChangeCheck(_this.issueQty,m=>{
                    _this.issueQty =m;
                });
                if(result==false){
                    return;
                }
                this.caclBetResult();
            },
            issueQtyBlur:function () {
                var _this = this;
                var multiple = Number(_this.issueQty);
                if (isNaN(multiple) || multiple < 1) {
                    _this.issueQty = 1;
                    _this.caclBetResult();
                }else {
                    _this.issueQty=multiple;
                }
            },

            multipleChange:function () {
                var _this = this;
                var result= businessValidateUtil.multipleChangeCheck(_this.multiple,m=>{
                    _this.multiple =m;
                });
                if(result==false){
                    return;
                }
                this.caclBetResult();
            },
            multipleBlur:function () {
                var _this = this;
                var multiple = Number(_this.multiple);
                if (isNaN(multiple) || multiple < 1) {
                    _this.multiple = 1;
                    _this.caclBetResult();
                }else {
                    _this.multiple=multiple;
                }
            },
            removeBet(index){

                var _this=this;

                /*    _this.lconfirm("确定删除该注单",null,function () {

                 })*/

                _this.betCart.betOrders.splice(index,1);
                lotteryBusiness.setBetCart(_this.betCart);
                _this.caclBetResult();

                if(_this.betCart.betOrders.length==0){
                    var id = this.$route.query.gameId;
                    this.$router.push({path: '/lotteryBet', query: {gameId: id}});
                }
            },
            confirmBet:function () {

                if(this.betQty<1){
                    return;
                }

                if(this.useFollowBet){

                    var issueQty=this.issueQty;
                    if(issueQty=="" || issueQty<2){
                        this.lalterError("追号期数不能小于两期");
                        return;
                    }

                    if (validateUtil.isDecimal(issueQty) == false) {
                        this.lalterError("期数不能输入小数")
                        return ;
                    }


                    var bettings = this.lottery.data.betting;
                    if(issueQty>bettings.length){
                        this.lalterError("当前期最高只能追"+bettings.length+"期");
                        return;
                    }


                    if (this.multiple==""||(this.multiple / 1) < 0) {
                        this.lalterError("请输入有效的倍数")
                        return ;
                    }

                    if (validateUtil.isDecimal(this.multiple) == false) {
                        this.lalterError("倍数不能输入小数")
                        return ;
                    }

                    if ((this.multiple / 1) > 99999) {
                        this.lalterError("倍数不能大于99999倍")
                        return ;
                    }
                }

                var _this=this;

                if (_this.lottery.status != lotteryBusiness.STATUS_LIST.betting) {

                    _this.lalterError("当期已封盘,禁止投注");

                    return;
                }

                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                var confirmMsg=null;
                var followBets=null;
                var successMsg=null;
                if(this.useFollowBet==false){
                    confirmMsg='您确定投注'+_this.lottery.issue+'期吗?';
                    successMsg="投注成功";
                }else {
                    confirmMsg='追号期数：'+_this.issueQty+'期<br/>总金额：¥ '+numberUtil.toMoneyFixed(this.betAmount)+'<br/>您是否确定追号?';
                    followBets=_this.followBet;
                    successMsg="追号成功";
                }

                //console.log(_this.betCart.betOrders)
                this.showBox = true;
                return
                this.lconfirm(confirmMsg,null,() => {

                    _this.lshowWait();
                    lotteryBusiness.confirmBet(_this.lottery,_this.betCart.betOrders,followBets,function (result) {

                        _this.lcloseWait();
                        if (result.success) {
                            _this.clearBet();
                            userBusiness.enableCache = false;
                            _this.lalterSuccess(successMsg);
                            _this.goback();
                            return
                        }
                        if(result.status==1104){
                            _this.lconfirm("余额不足，点击前往充值页面！", {confirmButtonText: '充值'}, () => {
                                userBusiness.toWyczPage({path:'chongzhi'})
                                
                            });
                            return
                        }
                        
                        _this.lalterError(result.msg);
                        
                    })

                });

            },
            betSure(){
                let _this = this;

                var followBets=null;
                var successMsg=null;
                if(this.useFollowBet==false){
                  
                    successMsg="投注成功";
                }else {
                    followBets=_this.followBet;
                    successMsg="追号成功";
                }

                _this.lshowWait();
                lotteryBusiness.confirmBet(_this.lottery,_this.betCart.betOrders,followBets,function (result) {
                    
                    _this.lcloseWait();
                    if (result.success) {
                        _this.clearBet();
                        userBusiness.enableCache = false;
                        _this.lalterSuccess(successMsg);
                        _this.goback();
                    }
                    if(result.status==1104){
                        _this.lconfirm("余额不足，点击前往充值页面！", {confirmButtonText: '充值'}, () => {
                            userBusiness.toWyczPage({path:'chongzhi'})
                            
                        });
                        return
                    }
                    
                    _this.lalterError(result.msg);
                })
            },
            caclBetResult(){
                var betCart=lotteryBusiness.getBetCart();
                if(betCart == null){
                    this.betQty=0;
                    this.betAmount=0;
                    return;
                }

                var bets = betCart.betOrders;

                if(bets.length<1){
                    return
                }
                var bettings = this.lottery.data.betting;
                if(this.issueQty>1 && this.issueQty>bettings.length){

                    this.lalterError("当前期最高只能追"+bettings.length+"期");
                    return;
                }


                var followBets=new Array();
                var totalBetQty=0;
                var totalBetAmount=0;
                var beginMultiple = 1;
                if(this.useFollowBet==false){
                    for (var i = 0; i < bets.length; i++) {
                        var b = bets[i];
                        totalBetQty += b.betQty;
                        totalBetAmount += b.betAmount;
                    }
                }else {
                    for (var i = 0; i < bets.length; i++) {
                        var b = bets[i];

                        for (var j = 0; j < this.issueQty; j++) {
                            totalBetQty += (b.betQty * this.multiple);

                        }
                    }

                    for (var j = 0; j < this.issueQty; j++) {
                        var issueno = bettings[j].issueno;
                        var followBet = new Object();
                        followBet.issue = issueno;
                        if(j==0){
                            followBet.multiple = beginMultiple;
                        }else{
                            followBet.multiple = this.multiple*beginMultiple;
                        }
                        beginMultiple = followBet.multiple;
                        totalBetAmount +=(b.betAmount * beginMultiple);
                        followBets.push(followBet);
                    }
                    totalBetAmount = totalBetAmount* bets.length;
                }

                this.followBet.list=followBets;

                this.betQty=bets.length;
                this.betAmount=totalBetAmount;

            },
            clear(){
                var _this=this;
                if(_this.betQty<1){
                    return;
                }
                this.lconfirm('是否确定要清除所有投注信息?', null,()=>{
                    _this.clearBet();
                });


            },
            clearBet(){
                lotteryBusiness.clearBetCart();
                this.caclBetResult();

            },
            loadUser(cache){
                var _this=this;
                if(cache != undefined){
                    userBusiness.enableCache=cache;
                }
                userBusiness.getUser(_this,function (user) {
                    _this.user=user;
                })
            },

        },
        created(){
            var _this=this;
            var id = this.$route.query.gameId;
            this.loadUser();
            lotteryBusiness.init(id,function (lottery) {

                _this.lottery=lottery;

                _this.betCart=lotteryBusiness.getBetCart();
                lotteryBusiness.clearBetCartAfterAction=function () {
                    _this.betCart=null;
                }

                _this.caclBetResult();


            });

            this.initFollowBet();

        },

        beforeDestroy () {
            lotteryBusiness.clearBetCartAfterAction=null;
        },
        components: {}
    }
</script>
<style>
.showBox{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding-bottom: 0.2rem;
    z-index: 1000;
    /* opacity: 0.9; */
    background: rgba(0, 0, 0, .9);
}
.showBox-title{
    text-align: center;
    padding-top: 0.1rem;
    font-size: 0.14rem;
    color: aliceblue
}
.showBox-main{
    padding: 0.1rem 0.2rem;
    max-height: 2rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.showBox-main li{
    color: antiquewhite;
    overflow: hidden;
    /* line-height: 0.24rem; */
}
.showBox-main li p{
    overflow: hidden;
}
.showBox-main li p span:first-child{
    float: left;
    /* line-height: 0.24rem; */
}
.showBox-main li p span:last-child{
    float: right;
    /* line-height: 0.24rem; */
}
.showBox-footer{
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    /* border: 1px solid #00ff00; */
    border-radius: 0.2rem;
    width: 60%;
    margin:0 auto;
    font-size: 0.18rem;
    color: antiquewhite;
}
.center{
    color: aliceblue;
    text-align: center;
    padding: 0.1rem;
}
</style>
