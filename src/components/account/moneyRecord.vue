<template>
        <div>
            <div class="box-header">
                <header class="header-box">
                    <div class="header-arrow-box" @click="goback">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <h1>帐变记录</h1>
                    <div class="member-icon" @click="dialogDate=true">
                        <i class="iconfont icon-tou_riqixuanze"></i>
                    </div>
                </header>
                <section class="tab-nav-box">
                    <ul class="display-box text-center">
                        <li :class="{'active':item.selected}" @click="search(item.state)" v-for="item in conditions">{{item.desc}}</li>
                        <li class="pr" @click="selectDown" :class="{'active':selecteDown.active}">
                            <span>{{selecteDown.selected=='SB'?'沙巴':selecteDown.selected}}</span>
                            <i class="el-icon-arrow-down"></i>
                            <dl v-if="selecteDown.menuShow" class="translate-tab">
                                <dd  v-for="item in selecteDown.option" @click.stop="selectItem(item)">
                                    {{item=='SB'?'沙巴':item=='KY'?'棋牌':item}}
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </section>
            </div>
           
            <section class="recording-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
                <ul class="display-box recording-list" v-if="conditions[0].selected" v-for="item in records.MIR">
                    <li>
                        <p>充值<span>{{records.TYPE[item.way]}}</span></p>
                        <p>{{item.remark}}</p>
                        <p>{{item.rechargedt | time}}</p>
                    </li>
                    <li class="text-right">
                        <p class="red">+ {{item.amount}}</p>
                        <p>手续费：{{item.fee}}</p>
                    </li>
                </ul>
                <ul  class="display-box recording-list" v-if="conditions[1].selected" v-for="item in records.MIR">
                    <li>
                        <p>{{item.bankname}}</p>
                        <p>{{item.accountno}}</p>
                        <p>{{item.applydt | time}}</p>
                    </li>
                    <li class="text-right">
                        <p :class="item.amount>0?'red':'green'">-{{item.amount}}</p>
                        <p>状态：{{records.STATUS[item.status]}}</p>
                    </li>
                </ul>
                <ul  class="display-box recording-list"  v-if="conditions[2].selected" v-for="item in records.MIR">
                    <li>
                        <p>{{records.PLAT[item.transferout]}} <i class="red"> -转入- </i> {{records.PLAT[item.transferin]}}</p>
                        <p>{{item.ordernumber}}</p>
                        <p>{{item.datetime | time}}</p>
                    </li>
                    <li class="text-right">
                        <p :class="item.money>0?'red':'green'">-{{item.money}}</p>
                        <p>状态：{{records.STATUS[item.status]}}</p>
                    </li>
                </ul>
                <ul  class="display-box recording-list" v-if="selecteDown.active&&selecteDown.selected!='SB' &&selecteDown.selected!='KY'" v-for="item in records.MIR">
                    <li>
                        <p v-if="selecteDown.selected">
                            {{records.GTYPE[item.gameType]?records.GTYPE[item.gameType].name:""}}
                            <i class="red">--</i>
                            {{records.PTYPE[item.playType]?records.PTYPE[item.playType].name:""}}
                        </p>
                        <p v-else>
                            {{records.GTYPE[item.gameType]?records.GTYPE[item.gameType].name:""}}
                            <i class="red">--</i>
                            {{records.PTYPE[item.playType]?records.PTYPE[item.playType].name:""}}
                        </p>
                        <p>{{item.billNo}}</p>
                        <p>{{item.betTime | time}}</p>
                    </li>
                    <li class="text-right">
                        <p :class="item.netAmount>0?'red':'green'">{{item.netAmount}}</p>
                        <p>状态：{{records.TYPE[item.flag]}}</p>
                    </li>
                </ul>

                <ul  class="display-box recording-list" v-if="selecteDown.active&&selecteDown.selected=='SB'" v-for="item in records.MIR">
                    <li>
                        <p>
                            {{records.GTYPE[item.sport_type]?records.GTYPE[item.sport_type]:'其它'}}
                        </p>

                        <p>{{item.billNo}}</p>
                        <p>{{item.transaction_time | time}}</p>
                    </li>
                    <li class="text-right">
                        <p :class="item.winlost_amount>0?'red':'green'">{{item.winlost_amount}}</p>
                        <p>状态：{{records.GSTATE[item.ticket_status]}}</p>
                    </li>
                </ul>
                <ul  class="display-box recording-list"
                     v-if="selecteDown.active&& selecteDown.selected!='SB' &&selecteDown.selected=='KY'"
                     v-for="item in records.MIR">
                    <li>
                        <p>
                            {{records.GTYPE[item.kindId]}}
                        </p>
                        <p style="font-size: 0.1rem;">{{item.billNo}}</p>
                        <p>{{item.endTime | time}}</p>
                    </li>
                    <li class="text-right">
                        <p :class="item.profit>0?'red':'green'">{{item.profit}}</p>
                        <p>状态：{{item.result==2?'已结算':'未结算'}}</p>
                    </li>
                </ul>
                <div class="recording-no" ><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
            </section>
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
    import dateUtil from '../../assets/js/util/dateUtil';
    import RecordList from '../../assets/js/api/recordSearchApi';
    import arrayUtil from '../../assets/js/util/arrayUtil.js';

    export default {
        data () {
            return {
                selecteDown:{
                    active:false,
                    selected:'AG',
                    menuShow:false,
                    option:["AG","BBIN","PT","MG","SB","KY"]
                },
                selectType: '0',
                records: {
                    MIR:[],
                    TYPE:[],
                    GSTATE:{},
                    GTYPE:{}

                },
                ccPage: '1',
                state:'-1',   //状态  -1全部
                page:0,
                loading: false,
                conditions:[
                    {"desc":"充值记录",state:"0",selected:false},
                    {"desc":"提现记录",state:"1",selected:false},
                    {"desc":"转账记录",state:"2",selected:false},
                  /*  {"desc":"视讯记录",state:"3",selected:false}*/
                ],
                loadicon:false,
                loadingDesc:"",

                dialogDate: false,
                quickDate:-1,
                pickerValue: '',
                thirdPlatform:false,
                setting: {
                    beginTime: null,
                    endTime: null
                },
            }
        },
        created(){
            this.setting.beginTime = dateUtil.getBeforeDayDate(-1);
            this.setting.endTime = dateUtil.getBeforeDayDate(1);
            this.search("0");
        },
        methods: {
            confirm(){
                this.dialogDate = false;
                if(this.thirdPlatform){
                    this.selectItem(this.selecteDown.selected)
                }else{
                    this.search(this.selectType);
                }
            },
            setDate(d){
                this.quickDate = d;
                this.setting.beginTime = dateUtil.getBeforeDayDate(d);
                this.setting.endTime = dateUtil.getBeforeDayDate(1);
            },
            goback: function(){
                this.$router.go(-1);
            },
            selectDown(){
                this.selecteDown.menuShow = !(this.selecteDown.menuShow);
            },
            selectItem(item){
                
                this.selecteDown.selected = item;
                this.selecteDown.menuShow = false;
                this.thirdPlatform = true;
                /*let params = {
                    betTime_begin:beginTime,
                    betTime_end:endTime,
                    ccPage:this.page
                }
                RecordList['get'+item+'BetRecords'](params,(res)=>{

                });*/
                this.selecteDown.active = true;
                for(let i =0;i<this.conditions.length;i++){
                    this.conditions[i].selected = false;
                }
                this.records.MIR=[];
                this.page=0;
                this.loadMore();
            },
            search(state){
                var _this = this;
                this.thirdPlatform = false;
                this.selectType = state;
                this.selecteDown.active = false;
                this.selecteDown.menuShow = false;
                
                for(var i in this.conditions){
                    var condition = this.conditions[i];
                    if(condition.state ==state){
                        if(condition.selected){
                            break;
                        }
                        condition.selected=true;
                        this.records.MIR=[];
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

                var searchTime={}
                searchTime.beginTime =  this.setting.beginTime;
                
                searchTime.endTime = this.setting.endTime;

                if(this.selecteDown.active){ //视讯记录
                    let params = {
                    betTime_begin:searchTime.beginTime,
                    betTime_end: searchTime.endTime,
                    ccPage:this.page
                    }
                    RecordList['get'+this.selecteDown.selected+'BetRecords'](params,(res)=>{
                        
                        _this.loadicon = false;
                        if(res.code == 200){
                            var data=res.data;
                            _this.loading = data.PAGE.count<10;
                            
                            if(_this.selecteDown.selected == "AG"){
                                _this.records.TYPE = data.TYPE;
                                _this.records.GSTATE = data.GSTATE;
                                _this.records.GTYPE = data.GTYPE;
                                _this.records.PTYPE = data.PTYPE;
                            }else{
                                _this.records.GSTATE = data.GSTATE;
                                _this.records.GTYPE = data.GTYPE;
                                _this.records.PTYPE = data.PTYPE;
                            }
                            arrayUtil.pushAll(_this.records.MIR,data.MIR);
                            if(_this.records.MIR.length == 0){
                                _this.loadingDesc="暂无数据";
                            }else{
                                _this.loadingDesc="";
                            }
                        }else{
                            _this.loading = true;
                            _this.loadingDesc="暂无数据";
                           _this.lalterWarning(res.msg);

                        }
                       
                    });
                }else{
                    if(condition.state=="0"){
                        let params = {
                            "rechargedt_begin":searchTime.beginTime,
                            "rechargedt_end":searchTime.endTime,
                            "ccPage":_this.page,
                            "ordernumber":''
                        }
                        RecordList.moneyinRecord(params,  (res) =>{
                            _this.loadicon = false;
                            
                            if(res.code == 200){
                                var data=res.data;
                                _this.loading = data.PAGE.count<10;
                                _this.records.PLAT=data.PLAT;
                                _this.records.STATUS=data.STATUS;
                                arrayUtil.pushAll(_this.records.MIR,data.MIR);
                                if(_this.records.MIR.length == 0){
                                _this.loadingDesc="暂无数据";
                                }else{
                                    _this.loadingDesc="";
                                }
                            }else{
                                _this.loading = true;
                                _this.loadingDesc="暂无数据";
                                _this.lalterWarning(res.msg);
                            }
                            
                        });
                    }
                    if(condition.state=="1"){
                        let params = {
                            "startTime":searchTime.beginTime,
                            "endTime":searchTime.endTime,
                            "ccPage":_this.page,
                            "state":-1
                        }
                        RecordList.moneyoutRecord(params, (res) =>{
                            _this.loadicon = false;
                            
                            if(res.code == 200){
                                var data=res.data;
                                _this.loading = data.PAGE.count<10;
                                 _this.records.PLAT=data.PLAT;
                                 _this.records.STATUS=data.STATUS;
                                arrayUtil.pushAll(_this.records.MIR,data.MIR);
                                if(_this.records.MIR.length == 0){
                                _this.loadingDesc="暂无数据";
                                }else{
                                    _this.loadingDesc="";
                                }
                            }else{
                                _this.loading = true;
                                _this.loadingDesc="暂无数据";
                                _this.lalterWarning(res.msg);
                            }
                            
                        });
                    }
                    if(condition.state=="2"){
                        let params = {
                            "startTime":searchTime.beginTime,
                            "endTime":searchTime.endTime,
                            "ccPage":_this.page,
                        }
                        RecordList.getTransferRecords(params, (res) =>{ 
                            _this.loadicon = false;
                            
                            if(res.code == 200){
                                var data=res.data;
                                _this.loading = data.PAGE.count<10;
                                 _this.records.PLAT=data.PLAT;
                                 _this.records.STATUS=data.STATUS;
                                arrayUtil.pushAll(_this.records.MIR,data.MIR);
                                if(_this.records.MIR.length == 0){
                                _this.loadingDesc="暂无数据";
                                }else{
                                    _this.loadingDesc="";
                                }
                            }else{
                                _this.loading = true;
                                _this.loadingDesc="暂无数据";
                                _this.lalterWarning(res.msg);
                            }
                           
                        });
                    }
                }
                
            }
        }
    }
</script>

<style>

</style>