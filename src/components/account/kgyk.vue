<template>
    <div>
        <div v-if="data.init==true" class="pr">
            <ul class="display-box report-total">
                <li>
                    <div>{{(data.ALLSSUM.kjlotteryordermoneytotal) | fixedMoney}}</div>
                    <p>投注</p>
                </li>
                <li>
                    <div>{{(data.ALLSSUM.kjlotterywinmoneytotal) | fixedMoney}}</div>
                    <p>中奖</p>
                </li>
                <li>
                    <div>
                        {{(data.ALLSSUM.kjlotterywinmoneytotal-data.ALLSSUM.kjlotteryordermoneytotal+
                    data.ALLSSUM.kjlotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal)  | fixedMoney}}
                    </div>
                    <p>盈亏</p>
                </li>
                <li>
                    <div>{{(data.ALLSSUM.kjlotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal) | fixedMoney}}</div>
                    <p>返点</p>
                </li>
            </ul>
        </div>
        <div class="report-win">
            <div class="report-loss" v-for="item in data.MIR">
                <ul class="display-box">
                    <li>总赢亏: <span class="red">{{(item.kjlotterywinmoneytotal - item.kjlotteryordermoneytotal) | fixedMoney}}</span></li>
                    <li class="text-right">{{item.reportdate | time}}</li>
                </ul>
                <ul class="display-box">
                    <li>注单: <span>{{item.kjlotteryordernumber}}注/{{(item.kjlotteryordermoneytotal) | fixedMoney}}元</span></li>
                    <li class="text-right">
                        返点:<span>{{(item.agselfbonusmoney+item.bbselfbonusmoney+item.agentbonusmoneytotal+item.kjlotteryselfbonusmoney+item.mgselfbonusmoney)}}</span>
                    </li>
                </ul>
                <ul class="display-box">
                    <li>
                        中奖: <span class="red">{{(item.kjlotterywinmoneytotal) | fixedMoney}}</span>
                    </li>
                    <li class="text-right">
                        优惠: <span>{{(item.hdzs)| fixedMoney}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import dateUtil  from '../../assets/js/util/dateUtil.js';
    import dataList from '../../assets/js/api/recordSearchApi';


    export default {
        props:{
            data:{
                type: Object
            }
        },
    }
</script>
<style>
</style>
