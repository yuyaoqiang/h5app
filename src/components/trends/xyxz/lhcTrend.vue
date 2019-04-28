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
                            <div class="trend-number-bits" :class="{'xyxz-width':selectType==1}">
                                <ul class="display-box">
                                    <li v-for="item in lottery.trendData.fullNums" >{{item}}</li>
                                </ul>
                            </div>
                            <div class="pr" id="subNums">
                                <canvas id="canvas" style="z-index:8;position:absolute;"></canvas>
                                <div class="trend-number-box" :class="{'xyxz-width':selectType==1}">
                                    <ul class="display-box" v-for="(subNums,mi) in missingNumList" v-show="mi<removeOffsetHistoryEnd">
                                        <li v-for="(item,index) in subNums"  :index="index" >
                                            <span :class="[{'active':item.active==true,'xyxz':item.width},{'hide':setting.displayMissing==false && item.active!=true},item.color]">{{item.num}}</span>
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
    import pcddUtil from  "../../../assets/js/util/pcddUtil"
    import xyxzUtil from  "../../../assets/js/util/xyxzUtil"
    export default {
        props: ['lottery','issueList','setting','removeOffsetHistoryEnd','selectType','tableList'],
        data () {
            return {
                missingNumList:[],
                dialogTrend: false,
                drawInterval:null,
                cacheMap:{},
                columnNames:[
                    ['平码(六个正选号码)'],
                    ['特码','星座','单双','波路','特头','尾数','单双','合数'],
                ]
            }
        },
        methods: {
            fillHead(){
                var select =  this.selectType;
                this.lottery.trendData.fullNums = this.columnNames[select];
            },
            loadNumView(index){
                if(index <0)return;
                var _this = this;
                this.fillHead();
                $(".wrap-content").scrollTop(0);
                var missingList = [];
                arrayUtil.forEach(_this.issueList, item=>{
                    var numberArray = item.nums.split(" ")
                    var yearTime = new  Date(item.closetime).getFullYear();
                    var list = _this.getListVal(yearTime,numberArray);
                    missingList.unshift(list)
                })
                this.missingNumList = missingList;
            },

            getListVal(yearTime,array){
                var data = [];
                xyxzUtil.zhinengTrend(yearTime,array,data,this.selectType);
                return data;

            }
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
        .red{
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            display: block;
            margin: 0.05rem auto 0;
            background: #bd5151;
            color: #ffffff;
            border-radius: 100%;
        }
        .yellow{
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            display: block;
            margin: 0.05rem auto 0;
            background: #f69300;
            color: #ffffff;
            border-radius: 100%;
        }
        .greed{
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            display: block;
            margin: 0.05rem auto 0;
            background: #009944;
            color: #ffffff;
            border-radius: 100%;
        }
        .blue{
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            display: block;
            margin: 0.05rem auto 0;
            background: #1c74aa;
            color: #ffffff;
            border-radius: 100%;
        }
        .xyxz-width{
           width: 3.2rem;
        }
        .xyxz{
            width:0.4rem;
            border-radius: 0;
        }
</style>