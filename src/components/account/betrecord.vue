<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>投注记录</h1>
                <div class="member-icon" @click="dialogDate=true">
                    <i class="iconfont icon-tou_riqixuanze"></i>
                </div>
            </header>

            <section class="tab-nav-box">
                <ul class="display-box text-center">
                    <li :class="{'active':item.selected}"  @click="search(item.state)" v-for="item in  conditions">{{item.desc}}</li>
                </ul>
            </section>
        </div>
        
        <section class="recording-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="500" nfinite-scroll-immediate-check="false">
            <ul class="display-box recording-list" v-for="item in betRecord.MIR" @click="tzDetail(item.id)" ref="profile">
                <li>
                    <p>游戏彩种: <span class="red">{{item.gametypename}}</span></p>
                    <p>投注金额: <span class="red">¥ {{item.betmoneytotal}}元</span></p>
                    <p class="recording-single">单号: {{item.ordernumber}}</p>
                </li>
                <li class="text-right">
                    <p  v-show="item.state==1" >
                        <button type="button" class="betting-remove"  @click.stop="deleteOrder(item.uniqueness,$event)">撤单</button>
                    </p>
                    <p>{{betRecord.STATE[item.state]}}</p>
                    <p :class="[item.iswin==1?'red':'green']" v-if="item.state!=1 && item.state!=2">盈亏: ¥ {{ item.winmoney - item.betmoneytotal | fixedMoney}}</p>
                    <p class="red recording-icon" v-show="item.iswin==1">
                        <img src="../../assets/images/icom_jiang.png">¥ {{item.winmoney}}</p>
                </li>
            </ul>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <div v-if="tzDetails != null && dialogVisible">
            <div class="cover-bg"></div>
            <div class="recording-alert-main">
                <h4 class="recording-alert-title green rem12">{{tzDetails.betRecord.gametypename}}-{{tzDetails.betRecord.issueno}} 期 开奖号码</h4>
                <div class="recording-ball">
                    <div v-if="tzDetails.lotteryNums.nums==null" class="green">
                        未开奖
                    </div>
                    <dl  v-else class="recording-ball-number">
                            <dd  v-for="item in tzDetails.lotteryNums.nums.split(' ')">{{item}}</dd>
                    </dl>
                
                </div>
                <div class="recording-alert">
                    <dl>
                        <dt>玩法类型:</dt>
                        <dd>{{tzDetails.betRecord.playtypename}}-{{tzDetails.betRecord.bettypename}}</dd>
                    </dl>
                    <dl>
                        <dt>投注号码:</dt>
                        <dd>{{tzDetails.betRecord.nums}}</dd>
                    </dl>
                    <dl>
                        <dt>投注单号:</dt>
                        <dd>{{tzDetails.betRecord.ordernumber}}<span class="red" v-if="tzDetails.betRecord.iszhuihao== '1'">追号</span></dd>
                    </dl>
                    <dl>
                        <dt>投注位</dt>
                        <dd>{{tzDetails.betRecord.digit}}</dd>
                    </dl>
                    <dl>
                        <dt>投注时间:</dt>
                        <dd>{{tzDetails.betRecord.betdt | time}}</dd>
                    </dl>
                    <dl>
                        <dt>投注赔率:</dt>
                        <dd class="green">{{tzDetails.betRecord.betType==2745?"--":tzDetails.betRecord.bonus}}</dd>
                    </dl>
                    <dl>
                        <dt>投注返点:</dt>
                        <dd>{{tzDetails.betRecord.bonuspct}}</dd>
                    </dl>
                    <dl>
                        <dt>投注总额:</dt>
                        <dd class="red"> {{tzDetails.betRecord.betmoneytotal}}元 ({{tzDetails.betRecord.betmoney}}*{{tzDetails.betRecord.multiple}}倍*{{tzDetails.betRecord.betcount}}注)</dd>
                    </dl>
                    <dl>
                        <dt>用户返点:</dt>
                        <dd>{{tzDetails.betRecord.userbonus.substring(tzDetails.betRecord.userbonus.lastIndexOf(":") + 1, tzDetails.betRecord.userbonus.length)}}</dd>
                    </dl>
                    <dl>
                        <dt>所选返点:</dt>
                        <dd>{{tzDetails.betRecord.bonuspct | fixed(3)}}</dd>
                    </dl>
                    <dl>
                        <dt>开奖时间:</dt>
                        <dd>{{tzDetails.lotteryNums.lotterydt | time}}</dd>
                    </dl>
                    <dl>
                        <dt>是否中奖:</dt>
                        <dd class="red">{{tzDetails.betRecord.state == 4?(tzDetails.betRecord.iswin == 0?'未中奖':'中奖'):betRecord.STATE[tzDetails.betRecord.state]}}</dd>
                    </dl>
                    <dl>
                        <dt>中奖注数:</dt>
                        <dd>{{tzDetails.betRecord.wincount}}</dd>
                    </dl>
                    <dl>
                        <dt>中奖金额:</dt>
                        <dd class="red">{{tzDetails.betRecord.winmoney}}</dd>
                    </dl>
                </div>
            </div>
            <div class="alert-close" @click="dialogVisible = false"></div>
        </div>
        <div v-show="dialogDate">
            <div class="trend-cover-bg"></div>
            <div class="data-alert-main">

                <div class="data-set-main">
                    <div class="display-flex pt10">
                        <div class="report-set-title">时间跨度 :</div>
                        <div class="flex-box">
                            <ul class="display-flex data-select">
                                <li class="flex-box" :class="quickDate == '-30'?'active':'' " @click="setDate(-30)">一个月</li>
                                <li class="flex-box" :class="quickDate == '-15'?'active':'' " @click="setDate(-15)">半个月</li>
                                <li class="flex-box" :class="quickDate == '-7'?'active':'' " @click="setDate(-7)">一周内</li>
                                <li class="flex-box" :class="quickDate == '-1'?'active':'' " @click="setDate(-1)">当天</li>
                            </ul>
                        </div>
                    </div>
                    <div class="display-flex">
                        <div class="report-set-title">开始日期 :</div>
                        <div class="flex-box data-set-periods">
                            <div class="date-box" @click="openPicker('beginTime')">
                                {{setting.beginTime}}
                            </div>
                        </div>
                    </div>
                    <div class="pt5 display-flex">
                        <div class="report-set-title">结束日期 :</div>
                        <div class="flex-box data-set-periods">
                            <div class="date-box" @click="openPicker('endTime')">
                                {{setting.endTime}}
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="display-box trend-set-btn">
                    <li class="trend-set-cancel" @click="dialogDate = false">取 消</li>
                    <li @click="confirm">确 定</li>
                </ul>
            </div>
        </div>
        <mt-datetime-picker
                ref="picker" type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="pickerValue">
        </mt-datetime-picker>
    </div>
</template>

<script>
    import dateUtil  from '../../assets/js/util/dateUtil.js';
    import betRecordApi  from '../../assets/js/api/betRecordApi.js';
    import arrayUtil from '../../assets/js/util/arrayUtil.js';

    export default {
        data () {
            return {
                betRecord: {
                   MIR:[]
                },
                tzDetails:null,
                selectType: '0',
                selectState:'',
                page: 0,
                dialogVisible: false,
                loading:false,
                conditions:[
                    {"desc":"全部",state:"",selected:true},
                    {"desc":"已开奖",state:"4",selected:false},
                    {"desc":"未开奖",state:"1",selected:false},
                    {"desc":"已撤单",state:"2",selected:false}
                ],
                loadicon:false,
                loadingDesc:"",

                dialogDate: false,
                selectedType:'',
                quickDate:-1,
                pickerValue: '',
                setting: {
                    beginTime: null,
                    endTime: null
                },
            }
        },
        created(){
            this.setting.beginTime = dateUtil.getBeforeDayDate(-1);
            this.setting.endTime = dateUtil.getBeforeDayDate(1);
            this.page=0;
        },
        methods: {
            confirm(){
                this.dialogDate = false;
                this.search(this.selectedType)
            },
            setDate(d){
                this.quickDate = d;
                this.setting.beginTime = dateUtil.getBeforeDayDate(d);
                this.setting.endTime = dateUtil.getBeforeDayDate(1);
            },
            //投注详情
            tzDetail(ID){
                let _this = this;
                this.dialogVisible = true;
                let params = {
                    id:ID
                }
                betRecordApi.view(params,(res)=>{
                    //console.log(res)
                    _this.tzDetails = res.data;
                })  
            },
            
            goback: function () {
                this.$router.go(-1);
            },
            search(state){
                this.selectedType = state
               for(var i in this.conditions){
                    var condition = this.conditions[i];
                    if(condition.state ==state){
                        if(condition.selected){
                            break;
                        }
                        condition.selected=true;
                        this.betRecord.MIR=[];
                        this.page=0;
                    }else{
                        condition.selected=false;
                    }
               }
                this.loadMore();
            },

            loadMore() {
                var condition =arrayUtil.findFirst(this.conditions,item=>{return item.selected});
                let _this = this;
                this.loading = true;
                this.loadicon = true;
                this.loadingDesc="";
                this.page++
                //$(event.target).html("加载更多...");
                /*if(this.page<=this.betRecord.PAGE.totalPage){

                }*/

                var times = this.setting;
                var beginTime = times.beginTime;
                var endTime = times.endTime;


                let params = {
                    betdt_begin: beginTime,
                    betdt_end: endTime,
                    ccPage: _this.page,
                    issueno: '',
                    ordernumber: '',
                    gametype: -1,
                    bettype: -1,
                    iszhuihao: -1,

                    iswin: -1
                }
                if(condition.state != ""){
                    params.state=condition.state;
                }
                betRecordApi.findBetRecord(params,function(res){
                    _this.loadicon = false;
                    
                    if(res.code==200){
                        var data=res.data;
                        _this.loading = data.PAGE.count<10;
                        _this.betRecord.token_cd=data.token_cd;
                        _this.betRecord.STATE=data.STATE;
                        arrayUtil.pushAll(_this.betRecord.MIR,data.MIR);
                        if(_this.betRecord.MIR.length == 0){
                            _this.loadingDesc="暂无数据";
                        }else{
                            _this.loadingDesc="";
                        }   
                    }else{
                        _this.lalterWarning(res.msg);
                    }                             
                    _
                })
            },
            deleteOrder(unique,event){
                let _this = this;

                _this.lconfirm('您确定撤单吗？',null,() => {

                    let params = {
                    'unique': unique,
                    'token_cd':this.betRecord.token_cd
                    }

                    _this.lshowWait();
                    betRecordApi.cancelBet(params,(res) =>{
                        _this.lcloseWait();

                        if(res.data){
                            _this.betRecord.token_cd=res.data;
                        }
                        _this.lalterSuccess(res.msg);
                        if(res.code == 200){
                            _this.lalterSuccess(res.msg);
                            $(event.target).next('p').html("已撤单");
                            $(event.target).hide();
                        }else{
                            _this.lalterError(res.msg);
                        }
            
                    })
                });
            }
        },
        watch:{
           
        }
    }
</script>
<style scoped>
    .tab-nav-box{
        /* padding-top: 0.44rem; */
    }
</style>
