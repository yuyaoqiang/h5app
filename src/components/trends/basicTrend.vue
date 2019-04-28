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
                        <div :style="{width:[lottery.type.fullNums.length>11? 0.23*(lottery.type.fullNums.length)+'rem':'']}">
                            <div class="trend-number-bits">
                                <ul class="display-box">
                                    <li v-for="item in lottery.type.fullNums">{{item}}</li>
                                </ul>
                            </div>
                            <div class="pr" id="subNums">
                                <canvas id="canvas" style="z-index:8;position:absolute;"></canvas>
                                <div class="trend-number-box">
                                    <ul class="display-box" v-for="(subNums,mi) in missingNumList" v-show="mi<removeOffsetHistoryEnd">
                                        <li v-for="(item,index) in subNums"  :index="index" >
                                            <span :class="{'active':item.active==true,'hide':setting.displayMissing==false && item.active!=true}">{{item.num}}</span>
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
    import lotteryCountdown from '../../assets/js/business/lottery/lotteryCountdown';
    import lotteryApi from '../../assets/js/api/lotteryApi';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import userBusiness from '../../assets/js/business/user/userBusiness';
    export default {
        props: ['lottery','issueList','setting','removeOffsetHistoryEnd','selectType','tableList'],
        data () {
            return {
                missingNumList:[],
                dialogTrend: false,
                drawInterval:null,
            }
        },
        methods: {
            loadNumView(index){
                if(index <0)return;
                var _this = this;

                $(".wrap-content").scrollTop(0);

                //清除画布
                _this.clearCanvas();

                var list = [];
                var missingList=new Array();
                for(var i in _this.issueList) {
                    var el = _this.issueList[i];
                    var nums = el.nums.split(" ")
                    list.push(el);
                    var missingNum = this.buildMissing(index, nums, list)
                    missingList.unshift(missingNum);
                }
                _this.missingNumList=missingList;

                if(_this.setting.displayPolyline){
                    setTimeout(function () {
                        _this.drawBallLine(index);
                    },20)
                }

            },

            clearDrawInterval() {
                if (this.drawInterval != null) {
                    clearInterval(this.drawInterval);
                }
            },
            createDrawInterval(action) {
                this.clearDrawInterval();
                this.drawInterval = setInterval(function () {
                    action();
                }, 100)
            },
            clearCanvas(){
                this.clearDrawInterval();
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0,0,canvas.width,canvas.height);
            },
            drawBallLine (index) {
                //index :-1-4
                var _this=this;
                var canvas = document.getElementById('canvas');
                var subNums = document.getElementById('subNums');

                canvas.width = $("#subNums").width();
                canvas.height = $("#subNums").height();
                var ctx = canvas.getContext('2d');
                ctx.strokeStyle="#e3363a";
                ctx.lineWidth=2;


                var points=new Array();

                for(var i =0;i<this.missingNumList.length-1;i++){

                    if(i>=_this.removeOffsetHistoryEnd){
                        continue;
                    }
                    var beginPoint=this.getBallPosition(true,i);
                    var endPoint=this.getBallPosition(false,i+1);
                    points.push({begin:beginPoint,end:endPoint});
                }

                var a=0;
                this.createDrawInterval(function () {
                    var p = points[a];
                    _this.drawOneLine(ctx,p.begin,p.end)
                    if(a==(points.length-2)){
                        _this.clearDrawInterval();
                    }
                    a++;
                },10)
            },

            drawOneLine(canvasContext,beginPoint,endPoint){
                canvasContext.beginPath();
                canvasContext.moveTo(beginPoint.x,beginPoint.y);
                canvasContext.lineTo(endPoint.x,endPoint.y);
                canvasContext.stroke();
            },
            getBallPosition:function (isBegin,trIndex) {

                var ball= $("#subNums  .active").eq(trIndex).parent();

                var p=$("#subNums").width()/100;

                var x=null;
                var y=null;
                
                if(this.lottery.type.name == 'kl10rules'){
                     x=ball.position().left-$("#isuueList").width()+p*26.2;
                     y=ball.position().top-$("#bits").height()+p*9;
                    if(isBegin){
                        y=y+ball.height()/2+p*0.3;
                    }else {
                        y=y-ball.height()/2+p*3;
                    }
                }else {
                    x = ball.position().left - $("#isuueList").width() + p * 58;
                    y = ball.position().top - $("#bits").height() + p * 25;


                    if (isBegin) {
                        y = y + ball.height() / 2 - p * 4.5;
                    } else {
                        y = y - ball.height() / 2 + p * 1.3;
                    }
                }

                var p= {x:x,y:y};
                return p;
            },
            getMissing: function (nums, bit) {
                var countMap = {};
                var fullNums=this.lottery.type.fullNums;
                try {
                    for (var i in nums) {
                        var el = nums[i];

                        var elNums = el.nums.split(" ");

                        for (var i = 0; i <= fullNums.length; i++) {
                            if (this.lottery.type.fullNums[i] == elNums[bit]) {
                                countMap[i] = -1;
                            } else {
                                if (countMap[i] == null) {
                                    countMap[i] = 0;
                                } else {
                                    countMap[i] = countMap[i] + 1;
                                }
                            }
                        }
                    }
                } catch (e) {
                    //console.log(e);
                    this.lalterError("获取走势图遗漏异常")
                }
                return countMap;
            },
            buildMissing:function (index,nums,list) {
                var _this = this;
                var countMap = _this.getMissing(list, index);

                var missingList = new Array();
                var fullNums = _this.lottery.type.fullNums;

                for (var i = 0; i < fullNums.length; i++) {
                    if (nums[index] == fullNums[i]) {
                        missingList.push({num: nums[index], active: true});
                    } else {
                        var count = 0;
                        countMap[i] = countMap[i] + 1;
                        count = countMap[i];
                        missingList.push({num: count, active: false});
                    }
                }
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