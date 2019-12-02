<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1 class="text-center">综合统计</h1>
            </header>
        </div>
        
        <ul class="statis-con">
            <li>
                <p><span>充值人数:</span>{{statisticalData.inMoneyPeopleCount}}</p>
                <p><span>统计人数:</span>{{statisticalData.peopleCount}}</p>
                <p><span>新增人数:</span>{{statisticalData.newRegistCount}}</p>
                <p><span>首冲人数:</span>{{statisticalData.firstInMoneyPeopleCount || 0}}</p>
                <p><span>月首存总数:</span>{{statisticalData.monthFirstInMoneyPeopleCount || ""}}</p>
            </li>
            <li>
                <p><span>投注人数:</span>{{statisticalData.betPeopleCount}}</p>
                <p><span>活动金额:</span>{{statisticalData.hdzsCount}}</p>
                <p><span>充值金额:</span>{{statisticalData.inMoneyCount | fixedMoney}}</p>
            </li>

            <li>
                <!-- <p><span>KG团队余额:</span>{{statisticalData.termKJBalance | fixedMoney}}</p> -->
                <p><span>团队钱包余额:</span>{{statisticalData.termCapitalCenterBalance| fixedMoney}}</p>
                <!-- <p><span>团队彩票余额:</span>{{statisticalData.termLotteryBalance | fixedMoney}}</p> -->
            </li>
            <li>
                <p><span>官方彩票投注金额:</span>{{statisticalData.lotteryBetAmount | fixedMoney}}</p>
                <p><span>官方彩票返点金额:</span>{{statisticalData.lotteryRebateAmount | fixedMoney}}</p>
                <p><span>官方彩票中奖金额:</span>{{statisticalData.lotteryWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>传统彩投注金额:</span>{{statisticalData.kjBetAmount | fixedMoney}}</p>
                <p><span>传统彩返点金额:</span>{{statisticalData.kjRebateAmount | fixedMoney}}</p>
                <p><span>传统彩中奖金额:</span>{{statisticalData.kjWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>VR投注金额:</span>{{statisticalData.vrBetAmount | fixedMoney}}</p>
                <p><span>VR返点金额:</span>{{statisticalData.vrRebateAmount | fixedMoney}}</p>
                <p><span>VR中奖金额:</span>{{statisticalData.vrWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>AG投注金额:</span>{{statisticalData.agBetAmount | fixedMoney}}</p>
                <p><span>AG返点金额:</span>{{statisticalData.agRebateAmount | fixedMoney}}</p>
                <p><span>AG中奖金额:</span>{{statisticalData.agWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>BBIN投注金额:</span>{{statisticalData.bbinBetAmount | fixedMoney}}</p>
                <p><span>BBIN返点金额:</span>{{statisticalData.bbinRebateAmount | fixedMoney}}</p>
                <p><span>BBIN中奖金额:</span>{{statisticalData.bbinWinAmount | fixedMoney}}</p>
            </li>
           
            <li>
                <p><span>PT投注金额:</span>{{statisticalData.ptBetAmount | fixedMoney}}</p>
                <p><span>PT返点金额:</span>{{statisticalData.ptRebateAmount | fixedMoney}}</p>
                <p><span>PT中奖金额:</span>{{statisticalData.ptWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>MG投注金额:</span>{{statisticalData.mgBetAmount | fixedMoney}}</p>
                <p><span>MG返点金额:</span>{{statisticalData.mgRebateAmount | fixedMoney}}</p>
                <p><span>MG中奖金额:</span>{{statisticalData.mgWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>沙巴投注金额:</span>{{statisticalData.sbBetAmount | fixedMoney}}</p>
                <p><span>沙巴返点金额:</span>{{statisticalData.sbRebateAmount | fixedMoney}}</p>
                <p><span>沙巴中奖金额:</span>{{statisticalData.sbWinAmount | fixedMoney}}</p>
            </li>
            
            <li>
                <p><span>棋牌投注金额:</span>{{statisticalData.kyBetAmount | fixedMoney}}</p>
                <p><span>棋牌返点金额:</span>{{statisticalData.kyRebateAmount | fixedMoney}}</p>
                <p><span>棋牌中奖金额:</span>{{statisticalData.kyWinAmount | fixedMoney}}</p>
            </li>
            <li>
                <p><span>提现金额:</span>{{statisticalData.outMoneyCount | fixedMoney | fixedMoney}}</p>
                <p><span>代理返点总金额:</span>{{statisticalData.agentbonusmoneytotal | fixedMoney}}</p>
                <p><span>KG代理返点金额:</span>{{statisticalData.kjagentbonusmoneytotal | fixedMoney}}</p>
            </li>
            
            <li>
                <p><span>团队盈亏:</span>{{statisticalData.termProfitloss | fixedMoney}}</p>
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

    import recordSearchApi from '../../assets/js/api/recordSearchApi';
    export default {
        data () {
            return {
                user:{},
                statisticalData:{}
            }
        },
        created(){
            var _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
                _this.search();
            })

        },
        methods: {
            search(){
                var _this = this;
                recordSearchApi.overAllCount({username:_this.user.userName},function (resp) {
                    if(resp.code==200){

                        _this.tjDialog = true;
                        _this.statisticalData=resp.data;

                    }else {
                        _this.lalterError(resp.msg);
                    }
                })
            },
            goback: function () {
                this.$router.push('/account');
            },
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";

    .statis-con{
        // position: absolute;
        // top:0.5rem;
        // bottom: 0;
        // left: 0;
        // right: 0;
        padding-top: 0.5rem;
        overflow: auto;
        li{
            line-height: 0.25rem;
            margin: 0.08rem 0.12rem;
            background: #fff;
            padding: 0.05rem 0.2rem;
            border-radius: 0.02rem;
            -webkit-box-shadow: 0 0 2px 0 #525252;
            box-shadow: 0 0 2px 0 #a5a5a5;
            p{
                border-bottom: 1px solid #eee;
                &:last-child{
                        border: none;
                }
                 span{
                     display: inline-block;
                     text-align: right;
                     width: 1rem;
                     margin-right: 0.1rem;
                 }
            }
        }
    }

</style>