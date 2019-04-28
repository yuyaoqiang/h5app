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
                                            <span :class="[{'active':item.active==true},{'hide':setting.displayMissing==false && item.active!=true},item.color]">{{item.num}}</span>
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
    import lhcUtil from  "../../../assets/js/util/lhcUtil"
    export default {
        props: ['lottery','issueList','setting','removeOffsetHistoryEnd','selectType','tableList'],
        data () {
            return {
                missingNumList:[],
                dialogTrend: false,
                drawInterval:null,
                cacheMap:{},
                columnNums:[['- 鼠 - 虎 － 兔 － 龙 － 蛇 － 猴 -'],
                            ['- 牛 － 马 － 羊 － 鸡 － 狗 － 猪 -']
                            ],
                dataArray:[]
            }
        },
        methods: {
            fillHead(){
                var index= this.selectType;
                this.dataArray =[0,1];
                this.lottery.trendData.fullNums = this.columnNums[index];
            },
            getColumn(array){
                var list = [];
                var copy = [].concat(array)
                arrayUtil.forEach(copy,item=>{
                    var arr = item.split("-");
                    list.push(arr);
                })
                return list;
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
            getBitMissingNums(){
                var _this = this;
                var missingList=new Array();
                for(var i in _this.issueList) {
                    var el = _this.issueList[i];
                    var nums = el.nums.split(" ");
                    var yearTime = new  Date(el.closetime).getFullYear();
                    var num  = lhcUtil.getListLastNumber(nums);
                    var missingNum = this.buildMissing(yearTime,[num])
                    missingList.unshift(missingNum);
                }
                return missingList;
            },
            getMissing: function (yearTime,nums) {
                var index = this.selectType;
                        if(index!=0){
                            this.doubleNumber(yearTime,nums);
                        }else{
                            this.singleNumber(yearTime,nums);
                        }
                },
            singleNumber(yearTime,nums){
                if(lhcUtil.getAnimalStyle(yearTime,nums[0],1)){
                    this.cacheMap[0] = 0;
                }else{
                    if(this.cacheMap[0] != null){
                        this.cacheMap[0] = this.cacheMap[0]+1;
                    }else{
                        this.cacheMap[0] = 1;
                    }
                }
            },
            doubleNumber(yearTime,nums){
                if(lhcUtil.getAnimalStyle(yearTime,nums[0],0)){
                    this.cacheMap[1] = 0;
                }else{
                    if(this.cacheMap[1] != null){
                        this.cacheMap[1] = this.cacheMap[1]+1;
                    }else{
                        this.cacheMap[1] = 1;
                    }
                }
            },
            createdNums(year,nums){
                var _this =this;
                var missingList = new Array();
                var index = _this.selectType;
                if(index==0){
                    if(lhcUtil.getAnimalStyle(year,nums[0],1)){
                        lhcUtil.everyNumSetColor(nums[0],missingList);
                    }else{
                        missingList.push({num:this.cacheMap[0],border:'trend-number'});
                    }
                }else{
                    if(lhcUtil.getAnimalStyle(year,nums[0],0)){
                        lhcUtil.everyNumSetColor(nums[0],missingList);
                    }else{
                        missingList.push({num:this.cacheMap[1],border:'trend-number'});
                    }
                }
                return missingList;
            },
            buildMissing:function (yearTime,nums) {
                var _this = this;
                _this.getMissing(yearTime,nums);
                var missingList = this.createdNums(yearTime,nums);
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

</style>