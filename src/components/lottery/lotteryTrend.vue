<template>
    <div class="wrap-content">
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1><span @click="lotteryTrendSelect">{{lottery.name}}-{{lottery.trendData.currentName}} ▼</span></h1>
                <div class="member-icon" @click="dialogBtn()">
                    <i class="iconfont icon-dibu_shezhi"></i>
                </div>
            </header>
            <section class="trend-tab">
                <ul id="bits">
                    <li class="trend-tab-title" :class="{'active':selectType===-1}" @click="switchTab(-1)">号码</li>
                    <li class="trend-tab-bits">
                        <dl>
                            <dd v-for="item in issuePositionNameList" :class="{'active':selectType===item.index}"
                                @click="switchTab(item.index)">{{item.name}}</dd>
                        </dl>
                    </li>
                </ul>
            </section>
        </div>
        
        <router-view ref="subView" :substr = "substr" :lottery="lottery" :setting="setting" :removeOffsetHistoryEnd="removeOffsetHistoryEnd" :issueList ="issueList" :selectType="selectType" :tableList="tableList"></router-view>


        <div v-if="lotteryTrendFlag" @click="lotteryTrendFlag=false">
            <div class="lottery-play-bg"></div>
            <div class="lottery-play-select">
                <div class="lottery-play-all">
                    <dl v-for="item in lottery.trendData.trendType">
                        <dt>{{item.name}}</dt>
                        <dd>
                            <ul v-for="playType in item.typeList" @click.stop="switchBet(playType)"
                                :class="{'active':playType.id == lottery.trendData.currentPlay}"
                                :betlossId="playType.id" :name="playType.name">
                                <li>{{playType.name}}</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div v-show="dialogTrend">
            <div class="trend-cover-bg"></div>
            <div class="trend-alert-main">
                <h1 class="alert-title">走势图设置</h1>
                <div class="trend-set-main">
                    <div class="display-flex">
                        <div class="trend-set-title">期数 :</div>
                        <div class="flex-box trend-set-periods">
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="period_30" v-model="period" name="period" value="30" class="user-radio"/>
                                    <label for="period_30">近30期</label>
                                </li>
                                <li>
                                    <input type="radio" id="period_50" v-model="period" name="period" value="50"  class="user-radio"/>
                                    <label for="period_50">近50期</label>
                                </li>
                            </ul>
                            <ul class="display-box">
                                <li>
                                    <input type="radio"  id="period_100" v-model="period" name="period" value="100" class="user-radio"/>
                                    <label for="period_100">近100期</label>
                                </li>
                                <li>
                                    <input type="radio"  id="period_200" v-model="period" name="period" value="200"  class="user-radio"/>
                                    <label for="period_200">近200期</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="display-flex">
                        <div class="trend-set-title">折线 :</div>
                        <div class="flex-box trend-set-periods">
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="polyline_true" v-model="polyline" name="polyline" value="true" class="user-radio"/>
                                    <label for="polyline_true">显示折线</label>
                                </li>
                                <li>
                                    <input type="radio" id="polyline_false" v-model="polyline" name="polyline" value="false" class="user-radio"/>
                                    <label for="polyline_false">隐藏折线</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="display-flex">
                        <div class="trend-set-title">遗漏 :</div>
                        <div class="flex-box trend-set-periods">
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="missing_true" v-model="missing" name="missing" value="true" class="user-radio"/>
                                    <label for="missing_true">显示遗漏</label>
                                </li>
                                <li>
                                    <input type="radio" id="missing_false" v-model="missing" name="missing" value="false" class="user-radio"/>
                                    <label for="missing_false">隐藏遗漏</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="display-box trend-set-btn">
                   <li @click="dialogTrend = false" class="trend-set-cancel">取 消</li>
                   <li @click="confirmSetting">确 定</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import lotteryCountdown from '../../assets/js/business/lottery/lotteryCountdown';
    import lotteryApi from '../../assets/js/api/lotteryApi';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import trendData from '../../assets/js/business/lottery/trendData';
    import appContext from '../../assets/js/context/appContext';
    import appController from '../../assets/js/business/app/appController';

    import areaInit from '../../assets/js/business/lottery/lotteryAreaInit';
    export default {
        data () {
            return {
                period: "30",
                polyline: "true",
                missing: "true",
                selectType: -1,
                substr:[],
                lotteryTrendFlag:false,
                lottery: {
                    status: lotteryBusiness.STATUS_LIST.init,
                    countdownContext: "00:00",
                    issue: "0000-00-00",
                    type:{},
                    trendData:{
                    },

                },
                areaData:{},
                issueList: [],
                missingNumList:[],
                issuePositionNameList: [],
                dialogTrend: false,
                drawInterval:null,
                setting:{
                    issueQty:30,
                    displayPolyline:true,
                    displayMissing:true
                },
                fullNums:[],
                offsetHistoryNumQty:30,
                removeOffsetHistoryEnd:50,
                currentPlay:'',
                tableList:[]
            }
        },
        methods: {
            loadTrend(lottery){
                var _this = this;
                _this.initTrend(lottery.id);
                _this.switchBet();

            },
            switchTab: function (index) {
                var _this = this;
                if (index == _this.selectType){
                    return;
                }
                _this.selectType = index;
            },
            switchBet(playType) {
                if(!playType){
                     playType = this.lottery.trendData.trendType[0].typeList[0];
                }
                var id = playType.id;
                this.setting.showMissing = false;
                this.setting.showColdHot = false;
                this.lotteryTrendFlag = false; //隐藏面板
                this.lottery.trendData.currentPlay = id / 1;
                this.lottery.trendData.currentName = playType.name;
                if(playType.detailedList == null){
                    this.issuePositionNameList = new Array();
                    var bits=this.lottery.type.bits;
                    for (var i = 0; i < bits.length; i++) {
                        this.issuePositionNameList.push({name: bits[i], index: i});
                    }
                }else{
                    this.substr = playType.substr;
                    this.issuePositionNameList = new Array();
                    for (var i = 0; i < playType.detailedList.length; i++) {
                        this.issuePositionNameList.push({name:  playType.detailedList[i], index: i});
                    }
                }
                this.selectType=-1;
                this.$router.push({path:playType.routerName,query:{id:this.lottery.id,goback: this.$route.query.goback}});

            },
            lotteryTrendSelect(){
                this.lotteryTrendFlag = !this.lotteryTrendFlag;
            },
            goback(){
                var appCtr = appController.getController();
                if(appCtr != null){
                    appCtr.goback();
                }else {
                    var gobackVal = this.$route.query.goback;
                    if(gobackVal){
                        this.$router.push({path:gobackVal,query:{gameId:this.$route.query.id}});
                        return;
                    }
                    this.$router.go(-1);
                }
            },
            dialogBtn(){
                var _this =this;
                _this.dialogTrend = true
                _this.lotteryTrendFlag =false;
            },
            confirmSetting(){
                var _this=this;
                _this.dialogTrend=false;
                var qtyChanged=false;
                var issueQty = parseInt(_this.period);
                if(_this.offsetHistoryNumQty !=issueQty){
                    _this.offsetHistoryNumQty=issueQty;
                    qtyChanged=true;
                }
                
                _this.setting.displayMissing=_this.missing=="true";
                _this.setting.displayPolyline=_this.polyline=="true";

                if(qtyChanged){

                    _this.initTrend(_this.lottery.id,function () {
                        _this.$refs.subView.loadNumView(_this.selectType);
                    })
                }else {
                    _this.$refs.subView.loadNumView(_this.selectType);
                }
            },
            initTrendData(){
                var lotteryType = this.lottery.type.name;
                trendData.init();

                var trend =   arrayUtil.findFirst(trendData.lotteryTrendData,item=>{
                  return item.name == lotteryType;
                })
                if(trend == null){
                     trend =   arrayUtil.findFirst(trendData.lotteryTrendData,item=>{
                        return item.name == 'other';
                    })
                }
                this.lottery.trendData = trend;

            },
            initTrend:function(lotteryID){
                var _this=this;
                    _this.initTrendData();
                var params = {
                    type: lotteryID,
                    nums: _this.setting.issueQty+_this.offsetHistoryNumQty,
                    gametype: _this.lottery.id
                };

                lotteryApi.getTrend(params, function (resp) {
                    var numList = resp.data.numsList;
                    //_this.issueList = [];
                    _this.tableList = [];
                    
                    if (arrayUtil.isEmpty(numList) == false) {
                        if(lotteryID === 66){
                            _this.setting.issueQty = 0;
                        }
                        _this.removeOffsetHistoryEnd = numList.length - _this.setting.issueQty;
                        numList.forEach(item =>{
                            //_this.issueList.unshift(item)
                            _this.tableList.push(item)
                        });
                        _this.issueList = numList.reverse();
                    } else {
                        _this.issueList = [];
                        _this.lalterWarning("获取数据失败");
                    }
                })
            }
        },
        created() {
            var _this = this;
            var id = this.$route.query.id;
            userBusiness.initLotteryList();
            var lotteryList = userBusiness.getLotteryList();
            var tmpLottery = arrayUtil.findFirst(lotteryList, function (item) {
                return item.id == id;
            })
            if (tmpLottery == null) {
                return;
            }
            if(id == 66 || id == 27 ||id==203||id==74){
                _this.lottery = tmpLottery;
                _this.loadTrend(tmpLottery);
                return
            }

            _this.lottery = tmpLottery;
            _this.issuePositionNameList = new Array();
            var bits=_this.lottery.type.bits;
            for (var i = 0; i < bits.length; i++) {
                _this.issuePositionNameList.push({name: bits[i], index: i});
            }
            _this.loadTrend(_this.lottery);

        },

        components: {},
        watch:{
            "lotteryTrendFlag":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
            },
            "dialogTrend":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
            }
        }
    }
</script>