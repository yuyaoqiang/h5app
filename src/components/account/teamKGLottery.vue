
<template>
    <div>
        <header class="report-header-main">
            <div class="report-select">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>团队KG</h1>
            </div>
            <ul class="display-flex tdcp-serctitle">
                <li style="width: 0.5rem" @click="showSearchCard('user')"><span>{{usernameQueryType}}</span></li>
                <li class="flex-box ggsmd" @click="showSearchCard('game') "><span>{{gameTypeName}}</span></li>
                <li class="flex-box" @click="showSearchCard('win')"><span>{{winType}}</span></li>
                <li class="flex-box" @click="showSearchCard('date')">
                    <span>{{quickDate== '-1'?'当天':quickDate=='-7'?'一周内':quickDate=='-15'?'半个月':quickDate=='-30'?'一个月':'时间选择'}}</span>
                </li>
            </ul>
        </header>
        
        <!--用户选择-->
        <div v-if="showCard=='user' " class="tdcp-serach-card" >
            <div class="lottery-play-bg"></div>
            <div class="userquery-select">
                <div class="search-user">
                    <div><img src="../../assets/images/icon37_b.png" alt="search"><input type="text" placeholder="请输入用户名" v-model="setting.username"></div>
                    <div @click.stop="switchUserQuery(item)" :class="setting.usernameQuery == item.value?'active':''" v-for="item in usernameQuery">{{item.label}}</div>
                </div>
                <ul class="display-box trend-set-btn" @click="showCard = false">
                    <li class="trend-set-cancel" @click="showCard = false">取 消</li>
                    <li @click="loadMore(true)">确 定</li>
                </ul>
            </div>
        </div>
        <!--玩法选择-->
        <div v-if="showCard=='game' " class="tdcp-serach-card" @click="showCard = false">
            <div class="lottery-play-bg"></div>
            <div class="lottery-play-select">
                <ul class="lottery-play-left">
                    <li v-for="(item,index) in types" v-if="item.isKg == true && item.show==true"
                        :class="{'active':item.name==selectType}" :data-id="item.dataId" @click.stop="switchGameType(item)"
                    >
                        {{item.desc}}
                    </li>
                </ul>
                <div class="lottery-play-right">
                    <ul>
                        <li v-if="item.isKg == true && item.openKg == true" v-for="item in lotteryList" @click.stop="selectLottery(false,item)" :class="item.name == gameTypeName?'active':''">
                            {{item.name}}
                        </li>
                        <li v-if="selectType =='all'" style="padding: 0 0.2rem" @click.stop="selectLottery(true,'all')" :class="gameTypeName=='全部'?'active':''">
                            全部
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--开奖状态选择-->
        <div v-if="showCard=='win' " class="tdcp-serach-card" >
            <div class="lottery-play-bg"></div>
            <ul class="userquery-select iswin-select">
                <li v-for="item in iswin" @click="switchIswin(item)" :class="item.value == setting.iswin?'active':''">{{item.label}}</li>
            </ul>
        </div>
        <!--时间选择-->
        <div v-if="showCard=='date' " class="tdcp-serach-card" >
            <div class="lottery-play-bg"></div>
            <ul class="userquery-select time-select">
                <div class="display-flex">
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
                        <div class="date-box" @click="openPicker('betTime_begin')">
                            {{setting.betTime_begin}}
                        </div>
                    </div>
                </div>
                <div class="pt5 display-flex">
                    <div class="report-set-title">结束日期 :</div>
                    <div class="flex-box data-set-periods">
                        <div class="date-box" @click="openPicker('betTime_end')">
                            {{setting.betTime_end}}
                        </div>
                    </div>
                </div>
                <ul class="display-box trend-set-btn" @click="showCard = false">
                    <li class="trend-set-cancel" @click="showCard = false">取 消</li>
                    <li @click="loadMore(true)">确 定</li>
                </ul>
            </ul>
        </div>
        <section class="tdcp-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
            <ul class="tdcp-wrap">
                <li v-for="item in data.MIR" >
                    <div class="tdcp-title">
                        <span v-if="item.state == 4" :class="item.winmoney >0?'color-red':'color-green'" >{{item.winmoney>0?'中奖':'未中奖'}}</span>
                        <span v-if="item.state != 4" :class="item.state <=5 ?'':'tips-color'" >{{data.STATE[item.state]}}</span>
                        <span>{{item.username}}</span>
                        <span>{{item.betdt | time}}</span>
                    </div>
                    <div class="tdcp-info">
                        <p>
                            {{item.gametypename}} <i> | {{item.bettypename}}</i>
                            <span :class = "(item.state == 4 ? (item.winmoney - item.betmoneytotal):'0.00' ) <= 0 ? 'color-green':'color-red'" v-if="item.state == 4">
                               {{(item.state == 4 ? (item.winmoney - item.betmoneytotal):'0.00' ) <= 0 ? '':'+'}}{{item.state == 4 ? (item.winmoney - item.betmoneytotal):'0.00' | fixedMoney}}
                            </span>
                            <span v-else="">
                                --
                            </span>
                        </p>
                        <span>{{item.issueno}}期</span>
                    </div>
                </li>
            </ul>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
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
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import numberUtil from "../../assets/js/util/numberUtil"
    import dateUtil from "../../assets/js/util/dateUtil";
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import recordSearchApi from '../../assets/js/api/recordSearchApi';
    import lotteryBusiness  from '../../assets/js/business/lottery/lotteryBusiness';
    export default {
        data () {
            return {
                showCard:'',
                usernameQuery:[{
                    value:'1',
                    label:'个人'
                },{
                    value:'2',
                    label:'团队'
                }],
                usernameQueryType:'团队',
                iswin:[
                    {value: '-1',label: '全部'},
                    {value: '1',label: '中奖'},
                    {value: '0',label: '未中奖'}
                ],
                winType:'是否中奖',
                pickerValue: '',
                datePropName: null,
                quickDate:-1,
                types:[],
                lotteryList:[],
                selectType: "",
                gameTypeName:'选择彩种',
                data: {
                    MIR:[]
                },
                loading:false,
                loadicon:false,
                loadingDesc:"",
                setting: {
                    betTime_begin: null,
                    betTime_end: null,
                    ccPage: 0,
                    ordernumber: null,
                    gametype: -1,
                    playtype: -1,
                    bettype: -1,
                    iszhuihao: -1,
                    state: -1,
                    iswin: -1,
                    username: null,
                    usernameQuery: 2,
                },
            }
        },
        created(){
            this.setting.betTime_begin = dateUtil.getBeforeDayDate(-1);
            this.setting.betTime_end = dateUtil.getBeforeDayDate(1);
            this.lotteryInit();
        },
        methods: {
            lotteryInit(){
                userBusiness.initLotteryList();
                var lotteryList=userBusiness.getLotteryList();
                this.types=arrayUtil.deepCopy(lotteryBusiness.getDisplayTypeList());
                var allType = {
                    desc:'全部',
                    isKg:true,
                    isTradition:true,
                    name:'all',
                    lotteryList:[]
                }
                this.types.unshift(allType);
                for (let i =0;i<this.types.length;i++){
                    this.types[i].lotteryList=[]
                }
                //console.log(lotteryList);
                for (let i=0;i<lotteryList.length;i++){
                    var item = lotteryList[i];
                    for(let j=0;j<this.types.length;j++){
                        var typeItem = this.types[j];
                        if(typeItem.name == item.displayType ){
                            typeItem.lotteryList.push(item);
                        }
                    }
                }

            },
            showSearchCard(type){
               this.showCard = type;
                if(type == 'game'){
                    for(let i =0;i<this.types.length;i++){
                        var item = this.types[i].lotteryList;
                        var flag = false;
                        if(this.types[i].name != 'all'){
                            for(let j =0;j<item.length;j++){
                                if(item[j].isKg && item[j].openKg ){
                                    flag = true;
                                    break;
                                }
                            }
                            this.types[i].show = flag;
                        }else {
                            this.types[i].show = true
                        }

                    }
                }
            },
            switchUserQuery(item){
                this.setting.usernameQuery = item.value;
                this.usernameQueryType = item.label;
            },
            switchIswin(item){
              this.setting.iswin = item.value;
              this.winType = item.label;
              this.showCard = false;
              this.loadMore(true);
            },
            openPicker(propName) {
                this.datePropName = propName;
                this.pickerValue = new Date(this.setting[propName]);
                this.$refs.picker.open();
            },
            setDate(d){
                this.quickDate = d;
                this.setting.betTime_begin = dateUtil.getBeforeDayDate(d);
                this.setting.betTime_end = dateUtil.getBeforeDayDate(1);
            },
            switchGameType(type){

                var _this = this;
                if(type.name == null){
                    type.name=this.types[0].name;
                }
                if(_this.selectType == type.name){
                    return;
                }
                _this.selectType = type.name;
                /*userBusiness.initLotteryList();
                var lotteryList=userBusiness.getLotteryList();
                var list=new Array();
                for (var  i=0;i<lotteryList.length;i++){
                    var item=lotteryList[i];

                    if(item.displayType == type){
                        list.push(item);
                    }
                }*/
                this.lotteryList = type.lotteryList;
            },
            selectLottery(type,item){
                if(type){
                    this.setting.gametype = -1;
                    this.gameTypeName ='全部';
                }else {
                    this.setting.gametype = item.id;
                    this.gameTypeName = item.name;
                }
                this.showCard = false;
                this.loadMore(true);
            },
            loadMore(search){
                let _this = this;
               // var searchTime=dateUtil.getSearchDateLimit(500);
                this.loading = true;
                this.loadicon = true;
                if(search){
                    this.setting.ccPage = 1;
                }else {
                    this.setting.ccPage++;
                }

                let params = {
                    betdt_begin:  this.setting.betTime_begin,
                    betdt_end: this.setting.betTime_end,
                    ccPage:this.setting.ccPage,
                    ordernumber:this.setting.ordernumber,
                    gametype:this.setting.gametype||-1,
                    playtype:this.setting.playtype,
                    bettype:this.setting.bettype||-1,
                    iszhuihao:this.setting.iszhuihao||-1,
                    state:this.setting.state||-1,
                    iswin:numberUtil.toNumber(this.setting.iswin,-1),
                    username:this.setting.username,
                    usernameQuery:this.setting.usernameQuery
                }

                recordSearchApi.getKgTeamLotteryRecord(params,  (res) =>{
                    if(res.code==200){
                         var data=res.data;
                        _this.data.STATE = data.STATE;
                        _this.data.STATE = data.STATE;
                        _this.loading = data.PAGE.count<10;
                        if(search){
                            _this.data = data;
                        }else {
                            arrayUtil.pushAll(_this.data.MIR,data.MIR);
                        }
                        if(_this.data.MIR.length == 0){
                            _this.loadingDesc="暂无数据";
                            _this.loadicon = false;
                            return;
                        }else{
                            _this.loadingDesc="";
                        }
                    }else{
                        _this.lalterWarning(res.msg);
                    }
                    _this.loadicon = false;
                });
            },
            goback: function () {
                this.$router.push('/agentCenter');
            },
        },
        watch: {
            "pickerValue": function () {
                this.quickDate = '';
                this.setting[this.datePropName] =dateUtil.toYYYY_MM_DD(new Date( this.pickerValue));
            },
            "showCard":function(a,b){
                //console.log(a)
                if(a){
                    methodsScroll.forbidScroll();  
                   
                }else{
                    methodsScroll.enabledScroll();  
                   
                }
            }
        },
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .tdcp-serctitle {
         background-color: #f4f4f4;
        li {
            line-height: 0.4rem;
            text-align: center;
            span{
                position: relative;
                color: #666666;
                &:after{
                     width: 0;
                     height: 0;
                     content: "";
                     position: absolute;
                     right: -0.12rem;
                     top: 50%;
                     border: solid 4px transparent;
                     border-top-color: #666;
                 }
            }
        }
        .ggsmd span:after{
            right: -0.32rem;
        }
    }
    .tdcp-serach-card {
        .lottery-play-select{
            top: 0.8rem;
        }
        .lottery-play-right ul{
            width: 100%;
        }
        .lottery-play-right ul li{
            float: left;
            margin: 0.04rem;
            padding: 0 0.05rem;
            &.active{
                background: @main-color;
                color: #fff;
             }
        }
        .lottery-play-bg{
            top:0.8rem;
        }
        .userquery-select {
            position: fixed;
            left: 0;
            top: 0.8rem;
            right: 0;
            z-index: 999;
            background: #ffffff;
        }
        .search-user{
            text-align: center;
            line-height: 0.3rem;
            div{
                border-bottom: 1px solid #efefef;
            }
        }
        .search-user img{
            width: 0.16rem;
            vertical-align: middle;
        }
        .search-user input{
            height: 0.25rem;
            border: none;
            font-size: 0.12rem;
            text-align: center;
        }
        .search-user div.active{
            color: @main-color;
        }
        .iswin-select li{
            line-height: 0.4rem;
            text-align: center;
            border-bottom: 1px solid #efefef;
            &.active{
                color: @main-color;
             }
        }
    }
    .tdcp-height {
        // position: absolute;
        // left: 0;
        // top: 0.8rem;
        // bottom: 0;
        // right: 0;
        // overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
        padding-top: 0.88rem;
    }
    .tdcp-wrap li {
        background: #fff;
        margin: 0.05rem 0.1rem;
        border: 1px solid #e6e6e6;
        border-radius: 0.05rem;
        overflow: hidden;
    }
    .tdcp-title {
        padding:0.12rem;
        border-bottom: 1px solid #e6e6e6;
        span:first-of-type{
            padding:0.02rem 0.05rem;
            background: @main-color;
            color: #fff;
            border-radius: 0.02rem;
            &.tips-color{
                background: @tips01-color;
             }
            &.color-green{
                 background:#4fa623 ;
             }
            &.color-red{
                 background: #ff443a;
             }
        }
        span:nth-of-type(2){
            color: #000;
        }
        span:last-of-type{
            float: right;
            color: #999;
        }
    }
    .tdcp-info{
        padding:0.12rem;
        background: #fafafa;
        p{
            margin-bottom: 0.05rem;
            font-size: 0.14rem;
            color: #000;
            i{font-size: 0.12rem;font-style: normal;}
            span{
                float: right;
                color: #000;
                font-weight: bold;
                &.color-green{
                    color:#4fa623 ;
                 }
                 &.color-red{
                    color: #ff443a;
                  }
            }

        }
        span{
            color: #999;
        }
    }
</style>
