<template>
    <div>
        <header class="history-header">
            <div class="history-arrow" @click="goback">
                <i class="el-icon-arrow-left"></i>
            </div>
            <ul class="display-flex history-header-content">
                <li class="history-header-img" v-if="lottery != null">
                    <img :src="require('../../assets/images/lottery/'+lottery.logo)"/>
                </li>
                <li class="flex-box history-title">
                    <h2 v-if="lottery != null">{{lottery.name}}</h2>
                    <h4>第{{lastHistory}}期</h4>
                </li>
                <li class="history-time-box" v-if="lottery != null">
                  <dl class="history-time">
                        <dt v-if="lottery.indexCountdown.countdown.days>0">{{lottery.indexCountdown.countdown.days}}</dt>
                        <dd v-if="lottery.indexCountdown.countdown.days>0">:</dd>
                        <dt v-if="lottery.indexCountdown.countdown.hours>0">{{lottery.indexCountdown.countdown.hours}}</dt>
                        <dd v-if="lottery.indexCountdown.countdown.hours>0">:</dd>
                        <dt>{{lottery.indexCountdown.countdown.munites}}</dt>
                        <dd>:</dd>
                        <dt>{{lottery.indexCountdown.countdown.secondes}}</dt>
                    </dl>
                    <p  v-if="lottery.indexCountdown.status!=null">
                        {{lottery.indexCountdown.status == "BETTING" ? "投注倒计时" : "封盘倒计时"}}
                    </p>
                </li>
            </ul>
        </header>
        <section class="overflow-history">
            <div class="history-box" v-for="item in history">
                <p class="history-issue">第{{item.issueno}}期</p>
                <div class="display-flex">
                    <div class="clearfix" :class="[gameId==28 || gameId==29 || gameId==31?'history-k3':'']">
                        <p class="history-num" v-for="n in item.nums.split(' ')" :class="['history-dice-'+n]">
                            {{n}}
                        </p>
                    </div>
                    <div class="history-k3-value"  v-if="gameId==28 || gameId==29 || gameId==31">
                        和值：<span>{{historyValue(item.nums.split(' '))}}</span>
                    </div>
                </div>
            </div>
        </section>
        <footer class="history-btn-box">
            <button type="button" class="history-btn" @click="toGame">
                去购彩
            </button>
        </footer>
    </div>
</template>

<script>
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';//投注区域数据
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import dateUtil from '../../assets/js/util/dateUtil';
    import lotteryApi from '../../assets/js/api/lotteryApi.js';
    import lotteryCountDownCenter from '../../assets/js/business/lottery/lotteryCountDownCenter';
    import arrayUtil from '../../assets/js/util/arrayUtil';

    export default {
        data() {
            return {
                history: [],
                lastHistory: "",
                gameId: 0,
                lottery:null
               
            }
        },
        created() {
            this.gameId = this.$route.query.gameId;
            userBusiness.initLotteryList();
            this.initLotteryHistory();
            this.initLotteryTime();
        },
        methods: {
            initLotteryHistory(){
                let id = this.gameId;
                lotteryBusiness.getHistoryNums({gameIds: id}, (data) => {
                    this.history = data[id].reverse();
                });
            },
            initLotteryTime() {
                let id = this.gameId;
                var ltyList = userBusiness.getLotteryList();
                var lty = arrayUtil.findFirst(ltyList,l=>{return l.id==id});
                if(lty == null){
                    return;
                }
                lotteryApi.getBettingTimeList({gameIds: id}, (resp) => {
                    if (resp.code == 200) {
                        var data = resp.data;
                        if (data) {
                            this.lastHistory = data[id].ISSUENO;
                            
                            this.countDown = data[id];
                            this.lottery=lty;
                            lotteryCountDownCenter.add(lty, this.countDown);
                        }
                    }
                });
            },
            historyValue(arr){
                return arr.reduce((prev,next)=>{
                    return parseInt(prev)+parseInt(next)
                })
            },
            toGame() {
                userBusiness.toGame(this, this.gameId);
            },
            goback: function () {
                this.$router.go(-1);
            },
        },
        watch: {
            "lottery.indexCountdown.status":function(a,b){
                if(a=='BETTING'){
                    this.initLotteryTime();
                    this.initLotteryHistory()
                }
            }
        },
        beforeDestroy(){
            lotteryCountDownCenter.clearAll();
        }
    }
</script>

<style>

</style>
