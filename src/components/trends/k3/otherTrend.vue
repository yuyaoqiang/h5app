<template>
    <div>
        <section class="trend-main">
            <div v-if="issueList.length>0">

                <div id="isuueList" class="trend-issue">
                    <div class="trend-header">期号</div>
                    <div class="trend-issue-table trend-border-left">
                        <ul>
                            <li v-for="(item,index) in tableList" v-show="index<removeOffsetHistoryEnd">{{item.issueno}}</li>
                        </ul>
                    </div>
                </div>

                <div class="trend-issue-number" v-show="selectType===-1">
                    <div class="trend-header">开奖号码</div>
                    <div class="trend-issue-table">
                        <ul>
                            <li  v-for="(item,index) in tableList" v-show="index<removeOffsetHistoryEnd">{{item.nums}}</li>
                        </ul>
                    </div>
                </div>
                <div class="trend-issue-number" v-show="selectType!=-1">
                    <div class="trend-content">
                        <div :style="{width:[lottery.trendData.fullNums.length>11? 0.23*(lottery.trendData.fullNums.length)+'rem':'']}">
                            <div class="trend-number-bits">
                                <ul class="display-box">
                                    <li v-for="item in lottery.trendData.fullNums">{{item}}</li>
                                </ul>
                            </div>
                            <div class="pr" id="subNums">
                                <canvas id="canvas" style="z-index:8;position:absolute;"></canvas>
                                <div class="trend-number-box">
                                    <ul class="display-box" v-for="(subNums,mi) in missingNumList" v-show="mi<removeOffsetHistoryEnd">
                                        <li v-for="(item,index) in subNums"  :index="index" >
                                            <span :class="[{'active':item.active==true},{'hide':setting.displayMissing==false && item.active!=true},item.attr]">{{item.num}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import lotteryCountdown from '../../../assets/js/business/lottery/lotteryCountdown';
    import lotteryApi from '../../../assets/js/api/lotteryApi';
    import arrayUtil from '../../../assets/js/util/arrayUtil';
    import lotteryBusiness from '../../../assets/js/business/lottery/lotteryBusiness';
    import userBusiness from '../../../assets/js/business/user/userBusiness';
    import trendUtil from '../../../assets/js/util/trendUtil';
    export default {
        props: ['lottery','issueList','setting','removeOffsetHistoryEnd','selectType','tableList'],
        data () {
            return {
                missingNumList:[],
                columnNames:[
                    ['大小形态','单双形态','豹子','组三','组六','直选和值'],
                ]
            }
        },
        methods: {
            fillHead(){
                this.lottery.trendData.fullNums = this.columnNames[0];
            },
            loadNumView(index){

                if(index <0)return;
                var _this = this;
                this.fillHead();
                $(".wrap-content").scrollTop(0);
                var missingList = [];
                var list = _this.getBitMissingNums();
                if (missingList.length == 0) {
                    arrayUtil.pushAll(missingList, list)
                } else {
                    arrayUtil.forEach(missingList, (m, i) => {
                        arrayUtil.pushAll(m, list[i]);
                    })
                }
                this.missingNumList = missingList;

            },
            createdOtherColud(tepm,item){
                trendUtil.bigAndSmall(tepm,item);
                trendUtil.doubleAndSingle(tepm,item);
                var repAfterNum  = trendUtil.repeatArr(tepm);
                trendUtil.haoleixin(repAfterNum,item);
                trendUtil.zonghe3(tepm,item);
            },
            getBitMissingNums(){
                var _this = this;
                var list = [];
                var missingList=new Array();
                for(var i in _this.issueList) {
                    var el = _this.issueList[i];
                    var nums = el.nums.split(" ")
                    var missingNum = this.buildMissing(nums, el)
                    missingList.unshift(missingNum);
                }
                return missingList;
            },

            getMissing: function (nums) {
                var fullNums=this.lottery.type.fullNums;
                try {
                    for (var i = 0; i < fullNums.length; i++) {
                        var cnt = true;
                        for(var j=0; j < nums.length; j++){
                            if(nums[j] == i){
                                this.cacheMap[i] = 0;
                                cnt = false;
                            }
                        }
                        if(cnt){
                            if(this.cacheMap[i] != null){
                                this.cacheMap[i] = this.cacheMap[i]+1;
                            }else{
                                this.cacheMap[i] = 1;
                            }
                        }
                    }
                } catch (e) {
                    this.lalterError("获取走势图遗漏异常");
                }
            },
            buildMissing:function (nums) {
                var _this = this;
                var arr = [];
                var missingList = new Array();
                _this.createdOtherColud(nums,missingList);
                return missingList;

            },
        },
        watch:{
            'selectType':function () {
                var _this =this;
                _this.loadNumView(_this.selectType)
            },
            'issueList.length':function () {
                var _this =this;
                _this.loadNumView(_this.selectType)
            }
        }
    }
</script>
<style scoped>
    .trend-number-box .leixin{
        width: 0.36rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        display: block;
        margin: 0.05rem auto 0;
        background: #fff;
        color: #ffffff;
        border-radius: 0;
    }
    .blue-block{
        width: 0.6rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        display: block;
        margin: 0.05rem auto 0;
        background: #45a0e2;
        color: #ffffff;
        border-radius: 0;
    }
    .greet-block{
        width: 0.6rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        display: block;
        margin: 0.05rem auto 0;
        background: #4ee25d;
        color: #ffffff;
        border-radius: 0;
    }
    .yellow-block{
        width: 0.36rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        display: block;
        margin: 0.05rem auto 0;
        background: #628b95;
        color: #ffffff;
        border-radius: 0;
    }
    .red-ball{
        width: 0.6rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        display: block;
        margin: 0.05rem auto 0;
        background: #f15343;
        color: #ffffff;
        border-radius: 0;
    }

    .trend-number-bits li{
        white-space: nowrap;
        padding: 0.02rem 0.06rem;
    }
</style>