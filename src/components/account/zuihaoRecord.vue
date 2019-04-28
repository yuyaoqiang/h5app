<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>追号记录</h1>
                <div class="member-icon" @click="dialogDate=true">
                    <i class="iconfont icon-tou_riqixuanze"></i>
                </div>
            </header>
            <section class="tab-nav-box">
                <ul class="display-box text-center">
                    <li :class="{'active':item.selected}" @click="search(item.state)" v-for="item in conditions">
                        {{item.desc}}
                    </li>
                </ul>
            </section>
        </div>
        
        <section  class="recording-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
            <ul  class="display-box recording-list" v-for="item in zhRecord.MIR" @click="zhDetail(item)">
                <li>
                    <p>游戏彩种：<span class="red">{{item.gametypename}}</span></p>
                    <p>剩余/总期数：<span class="red">{{item.issuelave}}/{{item.issuecount}}</span></p>
                    <p class="recording-single">单号：{{item.ordernumber}}</p>
                </li>
                <li class="text-right">
                    <p>{{item.stopped==1?"追号中":"已停止"}}</p>
                    <p v-show="item.stopped==1">
                        <span class="chase-stop" @click="stopZhuihao(item.uniqueness,$event)">停止</span>
                    </p>
                </li>
            </ul>
            <div class="recording-no">
                <i class="el-icon-loading" v-if="loadicon"></i>
                <span>{{loadingDesc}}</span>
            </div>
        </section>
        <div v-if="zhDetails != null && dialogVisible">
            <div class="cover-bg"></div>
            <div class="recording-alert-main">
                <h1 class="recording-alert-title">追号详情</h1>
                <div class="chase-alert-tab">
                    <ul v-cloak>
                        <li v-for="(item,index) in zhDetails.zhuiHaoInfoList" :class="{'active':selected==index}" @click="tabItem(index)">
                            <h5>{{zhDetails.STATE[item.status]}}</h5>
                            <p><span>第{{index+1}}期</span></p>
                        </li>
                    </ul>
                </div>
                <div class="chase-alert-content">
                    <div class="chase-alert-header" :class="[selectDetails.status==1?'chase-header-bg':''] " data-cord="已中奖">
                        <h2>{{zhDetails.zhuiHaoRecordList[0].gametypename}}&nbsp;{{selectDetails.issueno}}期</h2>
                        <ul v-if="selectDetailsInfo!=null">
                            <li v-for='item in (selectDetailsInfo.lotteryNums.nums||"").split(" ")'>{{item}}</li>
                        </ul>
                    </div>
                    <div class="chase-alert-list">
                        <dl class="display-flex">
                            <dt class="flex-box">{{zhDetails.zhuiHaoRecordList[0].gametypename}}_{{zhDetails.zhuiHaoRecordList[0].playtypename}}_{{zhDetails.zhuiHaoRecordList[0].bettypename}}</dt>
                            <dd>玩法</dd>
                        </dl>
                        <dl class="display-flex">
                            <dt class="flex-box">{{zhDetails.zhuiHaoRecordList[0].nums}}</dt>
                            <dd>购买号码</dd>
                        </dl>
                        <dl class="display-flex">
                            <dt class="flex-box">{{zhDetails.zhuiHao.optdt | time}}</dt>
                            <dd>购买时间</dd>
                        </dl>
                        <dl class="display-flex">
                            <dt class="flex-box">
                                <span class="green">{{selectDetailsInfo.betRecord.betmoneytotal}}</span> 元
                                <span class="green">{{selectDetailsInfo.betRecord.betcount}}</span> 注
                                <span class="green">{{selectDetailsInfo.betRecord.multiple}}</span> 倍
                            </dt>
                            <dd>投注总额</dd>
                        </dl>
                    </div>
                </div>
                <ul class="display-flex chase-alert-footer">
                    <li class="flex-box">
                        共 <span class="red">{{zhDetails.zhuiHao.issuecount}}</span> 期,
                        剩余 <span class="red">{{zhDetails.zhuiHao.issuelave}}</span> 期
                    </li>
                    <li>
                        <button type="button" class="chase-btn" v-if="zhDetails.zhuiHao.stopped == 1 && selectDetails.status == 0" @click="cancelZhuihao()">停止追号</button>
                        <!--<button type="button" class="chase-alert-btn" v-else>zhDetails.STATE[]</button>-->
                    </li>
                </ul>
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
    import betRecordApi  from '../../assets/js/api/betRecordApi.js';
    import dateUtil  from '../../assets/js/util/dateUtil.js';
    import arrayUtil from '../../assets/js/util/arrayUtil.js';

    export default {
        data () {
            return {
                zhRecord: {
                    MIR:[]
                },
                selected:0,
                zhDetails:null,
                selectDetails:{},
                currentZhuihao:null,
                selectDetailsInfo:{
                    betRecord:{},
                    lotteryNums:{
                        nums:'- - -'
                    }
                },
                dialogVisible: false,
                page:0,
                loading: false,
                conditions:[
                    {"desc":"全部",state:"-1",selected:true},
                    {"desc":"追号中",state:"1",selected:false},
                    {"desc":"已停止",state:"2",selected:false}
                ],
                loadicon:false,
                loadingDesc:"",
                token_zh:null,

                selectedType:'-1',
                dialogDate: false,
                quickDate:-1,
                pickerValue: '',
                setting: {
                    beginTime: null,
                    endTime: null
                },
            }
        },
        created() {
            this.setting.beginTime = dateUtil.getBeforeDayDate(-1);
            this.setting.endTime = dateUtil.getBeforeDayDate(1);
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
            goback: function(){
                this.$router.go(-1);
            },
            search(state){

                var _this = this;
                this.selectedType = state
                for(var i in this.conditions){
                    var condition = this.conditions[i];
                    if(condition.state ==state){
                        if(condition.selected){
                            break;
                        }
                        condition.selected=true;
                        this.zhRecord.MIR=[];
                        this.page=0;
                    }else{
                        condition.selected=false;
                    }
               }
               this.loadMore();
            },
            loadMore(){
                let _this = this;
                var condition =arrayUtil.findFirst(this.conditions,item=>{return item.selected});
                this.loading = true;
                this.loadicon = true;
                this.page++
                this.loadingDesc="";

                var searchTime=this.setting;
                let params={
                    "optdt_begin":searchTime.beginTime,
                    "optdt_end":searchTime.endTime,
                    "gametype":-1,
                    "ordernumber":'',
                    "stopped": condition.state,
                    "ccPage":_this.page
                }
                betRecordApi.zhRecord(params,function(res){
                    _this.loadicon = false;
                    if(res.code==200){
                        var data=res.data;
                        _this.loading = data.PAGE.count<10;
                        _this.token_zh=data.token_zh;
                        _this.zhRecord.STATE=data.STATE;
                        arrayUtil.pushAll(_this.zhRecord.MIR,data.MIR);
                        if(_this.zhRecord.MIR.length == 0){
                            _this.loadingDesc="暂无数据";
                        }else{
                            _this.loadingDesc="";
                        } 
                    }else{
                        _this.lalterWarning(res.msg);
                    }
                    
                })
            },
            stopZhuihao(uniqueness,event){
                let _this = this;
                this.lconfirm('您确定停止追号吗？',null,() => {
                    let params={
                    'unique':uniqueness,
                    'token_zh':_this.token_zh
                    }
                    betRecordApi.stopZhuihao(params,(res)=>{
                        if(res.data){
                            _this.token_zh=res.data;
                        }
                        if(res.code == 200){    
                            _this.lalterSuccess(res.msg);
                            $(event.target).prev('p').html("已停止");
                            $(event.target).hide();
                        }else{
                            _this.lalterWarning(res.msg);
                        }
                    })
                });

                window.event ? window.event.cancelBubble = true : event.stopPropagation();
                _this.loadicon = false;
            },
            //取消当前追号
            cancelZhuihao(){
                let _this = this;
                if(_this.selectDetails.status != 0){
                    return;
                }
                this.lconfirm('您确定取消当前追号吗？',null,() => {
                    let params={
                    'objctId':_this.selectDetails.id,
                    'token_zh':_this.token_zh
                    }
                    betRecordApi.zhuihaoCancel(params,(res)=>{
                        if(res.data){
                            _this.token_zh=res.data;
                        }
                        if(res.code == 200){    
                            _this.lalterSuccess(res.msg);
                            _this.selectDetails.status = 4;


                            _this.currentZhuihao.issuelave--;
                            if( _this.currentZhuihao.issuelave == 0){
                                _this.currentZhuihao.stopped = 2 ;
                            }
                        }else{
                            _this.lalterWarning(res.msg);
                        }
                    })
                });
            },
            //追号详情
            zhDetail(item){
                var ID=item.id;
                let _this = this;
                _this.currentZhuihao=item;
                this.dialogVisible = true;
                let params = {
                    id:ID
                }
                betRecordApi.zhuihaoView(params,(res)=>{
                    _this.token_zh=res.data.token_zh;
                    if(res.code==200){
                        _this.zhDetails = res.data;
                        _this.selectDetails = _this.zhDetails.zhuiHaoInfoList[0];
                        this.tabItem(0);
                    }
                });

            },
            tabItem(index){
                let _this = this;
                this.selected = index;
                this.selectDetails = this.zhDetails.zhuiHaoInfoList[index];
                this.selectDetailsInfo.lotteryNums.nums = "- - -"
                if(this.selectDetails.status == 1){
                    let params = {
                        zhuihaoId:this.selectDetails.zhid,
                        zhuihaoInfoId:this.selectDetails.id
                    }
                    betRecordApi.zhuiBetRecord(params,(res)=>{
                        _this.selectDetailsInfo = res.data;
                    });
                }
            }
        },
        watch:{
            "dialogVisible":function(a,b){
                if(a==true){
                    methodsScroll.forbidScroll();  
                   
                }else{
                    methodsScroll.enabledScroll();  
                   
                }
            }
        }
    }
</script>

<style>

</style>
