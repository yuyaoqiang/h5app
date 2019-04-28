<template>
    <div>
        <section class="team-tab">
            <ul class="display-box">
                <li>
                    <p :class="{'current':selected=='0'}" @click="search(1,0)">今天</p>
                </li>
                <li>
                    <p :class="{'current':selected=='1'}" @click="search(3,1)">近3天</p>
                </li>
                <li>
                    <p :class="{'current':selected=='2'}" @click="search(7,2)">近7天</p>
                </li>
                <li>
                    <p :class="{'current':selected=='3'}" @click="search(30,3)">近30天</p>
                </li>
            </ul>
        </section>
        <section class="recording-height">
            <ul class="display-box team-list">
                <li>充值金额</li>
                <li class="text-right"><span class="orange">¥</span> {{records.ALLSSUM.inmoneytotal | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>提现金额</li>
                <li class="text-right"><span class="red">¥</span> {{records.ALLSSUM.outmoneytotal | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>彩票投注</li>
                <li class="text-right"><span class="red">¥</span> {{records.ALLSSUM.lotteryordermoneytotal | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>彩票中奖</li>
                <li class="text-right"><span class="red">¥</span> {{records.ALLSSUM.lotterywinmoneytotal | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>彩票盈亏</li>
                <li class="text-right"><span class="red">¥</span> {{lotteryLoss | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>返点金额</li>
                <li class="text-right"><span class="red">¥</span> {{records.ALLSSUM.agentbonusmoneytotal | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>活动优惠</li>
                <li class="text-right"><span class="red">¥</span> {{records.ALLSSUM.hdzs | fixedMoney}}</li>
            </ul>
            <ul class="display-box team-list">
                <li>盈亏汇总</li>
                <li class="text-right"><span class="red">¥</span> {{records.ALLSSUM.allprofitloss | fixedMoney}}</li>
            </ul>
        </section>
    </div>
</template>

<script>
    import RecordList from '../../assets/js/api/recordSearchApi'
    import dateUtil from '../../assets/js/util/dateUtil'
    export default {
        data () {
            return {
                selected: '2',
                records: {
                    ALLSSUM:{},
                    MIR:[]
                },
                lotteryLoss:null,
                username:''
            }
        },
        created(){
            this.search(1,0);
        },
        methods: {
            search: function(days,type){
                let times = dateUtil.getSearchDateLimit(days);
                let beginTime = times.beginTime;
                let endTime = times.endTime;
                let _this = this;
                _this.selected = type
                let params = {
                    "statisticsTime_begin": beginTime,
                    "statisticsTime_end": endTime,
                    "username": _this.username,
                    "usernameQuery": '2' //2团队 1 个人
                }

                _this.lshowWait()
                RecordList.TeamLoss(params,(res)=>{
                    _this.lcloseWait()
                    _this.records = res.data;
                    _this.lotteryLoss=_this.records.ALLSSUM.lotterywinmoneytotal - _this.records.ALLSSUM.lotteryordermoneytotal;
                })
            }
        },
        components: {

        }
    }
</script>
<style scoped>

</style>
