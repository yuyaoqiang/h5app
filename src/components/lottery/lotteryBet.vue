<template>
    <div>
        <div class="bet-chatroom-icon" @click="toChatroom" v-if="user.isChatroom"></div>

        <!-- <v-suspension></v-suspension> -->
        <div class="index-header-box lottery-box-header">
            <header class=" betting-header">
                <div class="column-icon-home" @click="goBack">
                    <i class="icon iconfont icon-dibu_shouye"></i>
                </div>
                <h2 v-if="betting=='v-lottery-betting'">
                    <i :class="collection?'el-icon-star-on':'el-icon-star-off'" @click="collectionLottery(collection)" class="mr-l1"></i>
                    <span @click="lotterySelect"> {{lottery.name}}-{{lotteryTitle}}</span>
                </h2>
                <h2 v-if="betting=='v-kg-betting'">
                    <i :class="collection?'el-icon-star-on':'el-icon-star-off'" @click="collectionLottery(collection)" class="mr-l1"></i>
                    {{lottery.name}}
                </h2>
                <h2 v-if="betting=='v-chatroom'">
                    {{lottery.name}}
                </h2>
                <div class="betting-point-box" @click="recording=!recording">
                    <i class="betting-point-icon"></i>
                </div>
            </header>
            <header class="lottery-issue-box">
                <ul class="display-box">
                    <li class="lottery-issue">
                        <span @click="showHistory(true,lottery.type.name,lottery)">第{{lottery.issue}}期</span>
                    </li>
                    <li class="lottery-time">
                        <div class="lottery-time-box">
                            <div><img src="../../assets/images/countdown-icon.png"></div>
                            <div>{{lottery.status.desc}}: </div>
                            <dl class="betting-time">
                                <dd class="betting-day" v-show="displayTime.days">00</dd>
                                <dt v-if="displayTime.days">:</dt>
                                <dd class="betting-hours"  v-show="displayTime.hours">00</dd>
                                <dt v-if="displayTime.hours">:</dt>
                                <dd class="betting-munites">00</dd>
                                <dt>:</dt>
                                <dd class="betting-secondes">00</dd>
                            </dl>
                        </div>
                    </li>
                </ul>
                <div class="last-history-issue clearfix" :class="[lottery.currentLottery.nums.split(' ').length > 8?'long':'',lottery.currentLottery.nums.split(' ').length == 8?'min':'']">
                    <div class="last-issue fl">第{{lottery.currentLottery.issueno}}期</div>
                    <div id="prevEmptyHistory" v-show="historyBallAnim==false"
                                     :class="['resultNums',lottery.ballClass]">
                                    <dl v-for="n in lottery.zeroNums.split(' ')">
                                        <dd style="top: 0px">
                                            <div>{{n}}</div>
                                        </dd>
                                    </dl>
                                </div>
                    <div v-show="historyBallAnim==true" id="prevHistory" :class="['resultNums',lottery.ballClass]"></div>
                    </div>
            </header>
            <nav class="lottery-tab-box">
                <ul class="display-box">
                    <!--  -->
                    <li v-for="item in menuList"  @click="lotteryTabSwitch(item)" v-if="item.isOpen==true&&item.code!='Chatroom'" :class="{'active':item.active}">
                        <i :class="item.icon" class="iconfont"></i>{{item.name}}
                    </li>
                </ul>
            </nav>
        </div>

        <div class="lottery-slide-left">
            <v-slippery :user="user" ref="tagIndex" @showHistory = 'showHistory'></v-slippery>
        </div>
        <div>
            <!-- class="lottery-slide-right" -->
            
            <component :is="betting" ref="bettingContainer"></component>
            
            <!--玩法选择-->
            <div v-if="playSelect" @click="playSelect=false">
                <div class="lottery-play-bg"></div>
                <div class="lottery-play-select">
                    <ul class="lottery-play-left">
                        <li v-for="(item,index) in lottery.gameMenu"
                            :class="{'active':item.selected==true}" :data-id="item.dataId"
                            @click.stop="switchPlay(item,item.dataId)">
                            {{item.name}}
                        </li>
                    </ul>
                    <div class="lottery-play-right">
                        <dl v-for="item in lottery.gameSubMenu">
                            <dt>{{item.title}}</dt>
                            <dd>
                                <ul v-for="playType in item.list" @click.stop="switchBet(playType)"
                                    :class="{'active':playType.betlossId == lottery.playType.betlossId }"
                                    :data="playType.data" :betlossId="playType.betlossId" :name="playType.name">
                                    <li>{{playType.name}}</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <!--开奖记录 -->
            <div v-if="dialogLottery">
                <div class="cover-bg"></div>
                <div class="alert-main">
                    <h1 class="alert-title">开奖记录</h1>
                    <div class="history-content" v-if="lottery.type.name != 'pk10rules'">
                        <span class="loaing-text" v-if="lotteryHistoryList===null">正在加载中....</span>
                        <ul class="display-flex align-items" v-for="item in lotteryHistoryList">
                            <li :class="[lottery.type.numLen===10?'history-alert-issue-10':'',
                                         lottery.type.numLen===8?'history-alert-issue-8':'',
                                         lottery.type.numLen===5?'history-alert-issue':'',
                                         lottery.type.numLen===7?'flex-none':'',]">{{item.issueno}}
                            </li>

                            <li class="flex-box-history"  v-if="lottery.type.name != 'pk10rules' && lottery.type.name != 'xglhc'">
                                <b v-for="n in item.nums.split(' ')" :key="n"
                                   :class="[
                                    pcddBallColor.red.indexOf(n)!=-1 && lottery.type.name=='pcdd'?'pcddBall ball-red':
                                    pcddBallColor.green.indexOf(n)!=-1 && lottery.type.name=='pcdd'?'pcddBall ball-green':
                                    pcddBallColor.gray.indexOf(n)!=-1 && lottery.type.name=='pcdd'?'pcddBall ball-gray':
                                    pcddBallColor.blue.indexOf(n)!=-1 && lottery.type.name=='pcdd'?'pcddBall ball-blue':'',
                                ]">{{n}}</b>
                                <b v-if="lottery.type.name == 'k3rules'" :class="item.bs=='大'?'ball-gray':'ball-pink'">{{item.bs}}</b>
                                <b v-if="lottery.type.name == 'k3rules'" :class="item.sd=='单'?'ball-gray':'ball-pink'">{{item.sd}}</b>
                                <b v-if="lottery.type.name == 'k3rules'" class="ball-green">{{item.count}}</b>
                                <span v-if="lottery.type.name == 'pcdd'">= <b>{{item.nums.split(' ')[0]/1 + item.nums.split(' ')[1]/1 + item.nums.split(' ')[2]/1}}</b></span>
                            </li>
                            <li class="flex-box-xglhc-history"  v-if="lottery.type.name == 'xglhc'">
                                <p><b :key="n" :class="colorMap.get(n)"  v-for="n in item.nums.split(' ')">{{n}}</b></p>
                                <p><b :key="n" v-for="n in item.sx">{{n}}</b></p>
                            </li>
                        </ul>
                    </div>
                    <div class="history-content-pk10"  v-if="lottery.type.name == 'pk10rules'">
                        <ul class="align-items" v-for="item in lotteryHistoryList">
                            <li class="history-alert-issue-pk10">{{item.issueno.slice(4)}}
                            </li>
                            <li class="pk10rules-wrap">
                                <span :key="n" :class="'pk10-color-'+n" v-for="n in item.nums.split(' ')">{{n}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="history-alert-btn">
                        <button type="button" @click="dialogLottery=false">确 定</button>
                    </div>
                </div>
            </div>
            <!--冷热遗漏-->
            <div v-if="recording">
                <div class="recording-bg" @click="recording=false"></div>
                <div class="recording-menu">
                    <div class="clearfix">
                        <dl @click="goBettingRecording">
                            <dt class="recording-betting"></dt>
                            <dd>投注记录</dd>
                        </dl>
                        <dl @click="goBettingChase">
                            <dt class="recording-chase"></dt>
                            <dd>追号记录</dd>
                        </dl>
                        <dl @click="toTrend">
                            <dt class="recording-trend"></dt>
                            <dd>走势图</dd>
                        </dl>
                        <dl @click="goLotteryRecording">
                            <dt class="recording-lottery"></dt>
                            <dd>开奖记录</dd>
                        </dl>
                        <dl @click="directions">
                            <dt class="directions-lottery"></dt>
                            <dd>玩法说明</dd>
                        </dl>
                        <dl @click="missingSwitch">
                            <dt class="recording-cold"></dt>
                            <dd>冷热</dd>
                        </dl>
                        <dl @click="coldHotaSwitch">
                            <dt class="recording-missing"></dt>
                            <dd>遗漏</dd>
                        </dl>
                        <dl @click="filled">
                            <dt class="recording-filled"></dt>
                            <dd>盈亏</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
       

    </div>
</template>

<script>
    import slippery from "../slippery/slippery.vue";
    import lotteryBetting from "./lottery_betting.vue";
    import kgBetting from "../kggame/kgGameBet.vue";
    import chatroom from "../chatroom/chatroom.vue";
    import suspension from "../suspension/suspension.vue";

    import userBusiness from  "../../assets/js/business/user/userBusiness";
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import kgBusiness from '../../assets/js/business/lottery/kg/kgBusiness';
    import arrayUtil from  "../../assets/js/util/arrayUtil";
    import {calendar} from  "../../assets/js/util/lunarUtil";
    import areaInit from '../../assets/js/business/lottery/lotteryAreaInit';
    import lotteryApi from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from "../../assets/js/api/userInfo"
    import baseData from '../../assets/js/data/kgPlayTypeData'
    import appContext from "../../assets/js/context/appContext.js"
    import router from "../../router.js"
    export default {

        data() {
            return{
                historyBallAnim:false,
                showNumberHis:{
                    issueno:'',
                    nums:''
                },
                lhcAnimal:{
                map:{},
                colorMap:{},
                year:2019,
                sx:'猪',
                bs:{
                    color:['color-red','color-blue','color-greed'],
                    colorNums:[
                        ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
                        ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'],
                        ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'],
                    ]
                },
                animals:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'],
                    data: [
                        [1, 13, 25, 37, 49],
                        [2, 14, 26, 38],
                        [3, 15, 27, 39],
                        [4, 16, 28, 40],
                        [5, 17, 29, 41],
                        [6, 18, 30, 42],
                        [7, 19, 31, 43],
                        [8, 20, 32, 44],
                        [9, 21, 33, 45],
                        [10, 22, 34, 46],
                        [11, 23, 35, 47],
                        [12, 24, 36, 48],
                    ]
                },
                upDown:false,
                isLotteryBetPage:true,
                dialogLottery:false,
                recording:false,
                playSelect: false, //玩法面板显示
                user:{
                    lotteryInitFinish:false,
                    allInitFinish:false,
                },
                lottery: {
                    gameMenu: [],
                    gameSubMenu: [],
                    playType: {},
                    type: {},
                    status: lotteryBusiness.STATUS_LIST.init,
                    countdownContext:{
                        days: "00",
                        hours: "00",
                        munites: "00",
                        secondes: "00",
                    },
                    issue: "0000-00-00",
                    delay: true,
                    init: false,
                    data: {},
                    currentLottery:{
                    issueno:"0000-00-00",
                    nums: "- - - - -"
                    },
                    zeroNums:""
                },
                lotteryTitle: null,
                lotteryHistoryList: [],
                betting:null,
                menuList:[
                    {code:"Kg",name:"官方玩法",icon:"icon-youxi_K",isOpen:false,type:"v-kg-betting",active:true},
                    {code:"Tradition",name:"传统玩法",icon:"icon-youxi_",isOpen:false,type:"v-lottery-betting",active:false},
                    {code:"Chatroom",name:"聊天室",icon:"icon-youxi_liaotianshi",isOpen:false,type:"v-chatroom",active:false},
                ],
                menuSetting:{
                    haveLottery:false,
                    haveKg:false,
                    haveChatroom:false
                },
                displayTime:{
                    days: false,
                    hours: false,
                    munites: false,
                    secondes: false,
                },
                isDestory:false,
                collection:false,
                lotteryList:[],
                pcddBallColor:{},
                heightHtml:667,
                ownCountdownInterval:null,
                intveral:null
            }
        },
        beforeCreate(){
          //  userBusiness.initLotteryList();
        },
        beforeDestroy(){
            this.intveral = null
        },
        created() {
            appContext.current = this;
            this.computSx();
            this.loadUser();
            this.lotteryCountdown();
            this.pcddBallColor = baseData.pcddBallColor;
            this.heightHtml = document.documentElement.clientHeight;
        },
        mounted(){
              
        },
        methods: {
             //amq推送回调方法
            lotteryPushTrigger(data){
                var lottery=this.lottery;
                if(data.gametype != lottery.id){
                    return;
                }
                if(data.nums) {
                    lottery.currentLottery.issueno = data.issueno;
                    lottery.currentLottery.nums = data.nums;
                    //lottery.history.unshift({issueno: data.issueno, nums: data.nums});
                    this.startLotteryNumAnim();
                    this.showHistory(undefined,lottery.type.name,lottery)
                }
            },
            startLotteryNumAnim() {
                var _this = this;
                var $historyBall = $("#prevHistory");
                var nums = _this.lottery.zeroNums.split(' ');
                var dlsHtml = "";
                arrayUtil.findFirst(nums, n => {
                    var dlHtml = "<dl><dd style='top:0px'><div class='prev-history-num'>" + n + "</div></dd></dl>";
                    dlsHtml += dlHtml;
                });
                $historyBall.html(dlsHtml);
                _this.historyBallAnim = false;
                setTimeout(function () {
                    _this.historyBallAnim = true;
                    _this.lotteryNumAnim();
                }, 200)
            },
            lotteryNumAnim() {
                var _this = this;
                var lotteryNumAnims = _this.lotteryNumAnims;
                if (_this.lotteryNumAnims) {
                    for (var i = 0; i < lotteryNumAnims.length; i++) {
                        var anim = lotteryNumAnims[i];
                        anim.num.stop();
                        clearTimeout(anim.time);
                    }
                }
                _this.lotteryNumAnims = [];
                var nums = _this.lottery.currentLottery.nums.split(' ');
                var fullNums = _this.lottery.type.fullNums;
                var groupQty = 5;
                var numH = _this.lottery.ballWidth;//$("#prevHistory dd").eq(0).find("div").eq(0).height();
                var domArr = $("#prevHistory dd");
                var arr = [].slice.call(domArr).reverse();
                var arrLen = arr.length - 1;
                $.each(arr, function (index) {
                    var $this = $(this);
                    var numQty = 0;
                    $this.empty();
                    var currentNum = nums[arrLen];
                    for (var i = 0; i < groupQty; i++) {
                        for (var j = 0; j < fullNums.length; j++) {
                            var cn = fullNums[j];
                            var isBreak = false;
                            if (i == (groupQty - 1) && cn.trim() == currentNum) {
                                isBreak = true;
                            }
                            $this.prepend("<div>" + cn + "</div>")
                            numQty++;

                            if (isBreak) {
                                break;
                            }
                        }
                    }
                    //  $this.append("<div>"+_this.lottery.zeroNums.split(' ')[0]+"</div>")
                    var top = 0 - (numQty - 1) * numH;
                    $this.css("top", top + "rem");
                    var setTimeOut = setTimeout(function () {
                        $this.stop().css("top", top + "rem").animate({"top": "0rem"}, 3000, "swing", function () {
                            $this.empty();
                            $this.append("<div class='prev-history-num'>" + currentNum + "</div>");
                        })
                    }, index * 300)
                    _this.lotteryNumAnims.push({num: $this, time: setTimeOut})
                    arrLen = arrLen - 1;
                });


            },
            toChatroom(){
                if (this.user.init === false){
                    return this.lalterWarning("请先登录");
                }
                this.$router.push({path: '/chatroom'});
            },
            changUpDown(){
                this.upDown = !this.upDown;
            },
            collectionLottery(val){

                let _this = this;
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                let id = _this.lottery.id;
                let lottery = null;
                for (var i in _this.lotteryList) {
                    lottery = _this.lotteryList[i];
                    if (lottery.id == id / 1) {
                        _this.lotteryList.splice(i, 1);
                        break;
                    }
                }

                lottery.favorited = !val;

                _this.lotteryList.splice(0, 0, lottery);

                var ids = arrayUtil.join(_this.lotteryList, item => {
                    if(item.favorited == false) return null;
                    return item.id;
                });
                userInfoApi.saveFavorites({lotteryIds: ids}, function (resp) {
                    if (resp.code == 200) {
                        if(val){
                            _this.lalterSuccess("收藏中移除该彩种");
                        }else{
                            _this.lalterSuccess("收藏彩种成功");
                        }
                        _this.collection = !_this.collection;
                    } else {
                        _this.lalterSuccess(resp.msg);
                    }
                })
            },
            lotteryCountdown(){
                let doc = document;
                //倒计时 用户jquery赋值方式是为了防止在某些手机vue倒计时 会影响点击单选按钮时会出现一闪一闪的效果
      
                this.ownCountdownInterval = setInterval(()=> {
                    var lty=this.lottery;
                    if( lty && lty.countdownContext){
                        if (lty.countdownContext.days/1 > 0){
                            this.displayTime.days=true;
                            doc.querySelector(".betting-day").innerHTML = lty.countdownContext.days;
                        }else{
                            this.displayTime.days=false;
                        }

                        if (lty.countdownContext.hours/1 > 0 ){
                            this.displayTime.hours = true;
                            doc.querySelector(".betting-hours").innerHTML = lty.countdownContext.hours;

                        }else{
                            this.displayTime.hours=false;
                        }
                        doc.querySelector(".betting-munites").innerHTML = lty.countdownContext.munites;
                        doc.querySelector(".betting-secondes").innerHTML = lty.countdownContext.secondes;
                    }
                }, 100);
            },
            goBettingRecording(){
                 if(userBusiness.checkIsNotLoginPlayer()){
                     return;
                 }
                  
                 if (this.betting == "v-kg-betting"){
                     this.$router.push({path: '/KgBetrecord'});
                 }else {
                     this.$router.push({path: '/betrecord'});
                 }
            },
            goBettingChase(){
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }
                 
                if (this.betting == "v-kg-betting"){
                    this.$router.push({path: '/KgZuihaoRecord'});
                }else {
                    this.$router.push({path: '/zuihaoRecord'});
                }
            },
            toTrend() {
                //this.lalterWarning("暂未开放");
                 
                this.$router.push({path: '/lotteryTrend', query: {id: this.lottery.id,goback:"lotteryBet"}});
            },
            goLotteryRecording(){
                 
                this.$router.push({path: '/lotteryInformationTrend', query: {gameId: this.lottery.id}});
            },
            missingSwitch(){
                if (this.$refs.bettingContainer.switchMissing){
                    this.$refs.bettingContainer.switchMissing();
                }
            },
            coldHotaSwitch(){
                if (this.$refs.bettingContainer.switchColdHot){
                    this.$refs.bettingContainer.switchColdHot();
                }
            },
            directions(){
                if (this.$refs.bettingContainer.showPlayDesc){
                    this.$refs.bettingContainer.showPlayDesc();
                }
                if (this.$refs.bettingContainer.goExplain){
                    this.$refs.bettingContainer.goExplain();
                }
            },
            filled(){
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }
                 
                this.$router.push({path: '/report'});
            },
            lotteryTabSwitch(item){
                
                for (let i=0;i<this.menuList.length;i++){
                    if (this.menuList[i].type == item.type){
                        this.menuList[i].active =true;
                    }else {
                        this.menuList[i].active =false;
                    }
                }
                if(item.code=="Chatroom"){
                    this.isDestory=false;
                }else {
                    this.isDestory=true;
                }
                this.playSelect=false;
                this.dialogLottery = false;
                this.recording = false;
           
                this.betting = item.type;
            },
            loadUser(user) {
                let _this = this;
                if(user){
                    this.user = {};
                    this.user = user; 
                }else{
                    userBusiness.getUser(_this, function (user) {
                        _this.user = user;
                    })
                }    
            },

            lotterySelect() {
                //玩法面板显示与隐藏
                this.playSelect = !this.playSelect;  

            },
            switchPlay(item,dataId) {//选择玩法大类
               
                //对应的玩法小类
                for (let i = 0; i < this.lottery.gameMenu.length; i++) {
                    var parent = this.lottery.gameMenu[i];
                    if (parent.dataId == dataId) {
                        parent.selected = true;
                        this.lottery.gameSubMenu = this.lottery.gameMenu[i].list
                    } else {
                        parent.selected = false;
                    }
                    
                }
            },
            switchBet(playType) {//选择玩法小类
                var id = playType.betlossId;
                this.playSelect = false; //隐藏面板
                
                id = id / 1;
                if (id == this.lottery.playType.betlossId) {
                    return;
                }
                lotteryBusiness.initPlayType(id);
                
                if (this.$refs.bettingContainer.initAreaData){
                    this.$refs.bettingContainer.setting.showMissing = false;
                    this.$refs.bettingContainer.setting.showColdHot = false;
                    this.$refs.bettingContainer.initAreaData();
                }
            },
            goBack(){
                this.$router.push("/result")
            },
            leftSlide() {
                
                this.$parent.slideFlag = !this.$parent.slideFlag;
                this.$refs.tagIndex.slideFlag = 0;
                
                if(this.$parent.slideFlag){
                    $(".lottery-slide-left").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    // $(".betting-main").css({
                    //     "transform":"translateX(80%)",
                    //     "-ms-transform":"translateX(80%)", 	
                    //     "-moz-transform":"translateX(80%)", 	
                    //     "-webkit-transform":"translateX(80%)", 
                    //     "-o-transform":"translateX(80%)" 

                    // });
                    $('.lottery-footer').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 

                    });
                    $('.chatroom-container').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 

                    });
                     $('.chatroom-footer').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 

                    });
                    $('.index-header-box').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                    $(".nav-box").css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                }else{
                    $(".lottery-slide-left").css({
                        "transform":"translateX(-100%)",
                        "-ms-transform":"translateX(-100%)", 	
                        "-moz-transform":"translateX(-100%)", 	
                        "-webkit-transform":"translateX(-100%)", 
                        "-o-transform":"translateX(-100%)" 
                    });
                    // $(".betting-main").css({
                    //     "transform":"translateX(0%)",
                    //     "-ms-transform":"translateX(0%)", 	
                    //     "-moz-transform":"translateX(0%)", 	
                    //     "-webkit-transform":"translateX(0%)", 
                    //     "-o-transform":"translateX(0%)" 
                    // });
                    $('.lottery-footer').css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $('.chatroom-container').css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $('.chatroom-footer').css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 

                    });
                     $('.index-header-box').css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });

                    $(".nav-box").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                }
            },
            showHistory(val,lott) {
                var _this = this;
                _this.lotteryHistoryList = null;
                var id = _this.$route.query.gameId;
                var params = {
                    gameIds: _this.$route.query.gameId
                }
                lotteryBusiness.getHistoryNums(params, function (data) {
                    if(lott === "k3rules"){
                        _this.lotteryHistoryList = _this.computeHistoryTypes(data[params.gameIds].reverse());
                    }else if(lott === "xglhc"){
                        _this.lotteryHistoryList = _this.computeHistorySX(data[params.gameIds].reverse());
                        
                    }else{
                        _this.lotteryHistoryList = data[params.gameIds].reverse();
                    }
                    _this.showNumberHis = _this.lotteryHistoryList[0];
                });
                if(val){
                    this.dialogLottery = true;
                }
               
            },
            computeHistorySX(list){
                list.forEach(item=>{
                    let arr = item.nums.split(" ");
                    let sx  =  arr.map(item=>{
                        return this.lhcAnimal.map.get(item/1);
                    })
                    item.sx = sx;
                }) 
                 return list;                 
            },
            computSx(){
               let year = this.lhcAnimal.year;
               let currentSX = this.lhcAnimal.sx;
               let animals = this.lhcAnimal.animals;
               let data = this.lhcAnimal.data;
               let index= 11;
               let animalsAfter=[];
               let map = new Map();
               const years = calendar.solar2lunar(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()).lYear - this.lhcAnimal.year;
            //  const years = calendar.solar2lunar(2020,1,25).lYear - this.lhcAnimal.year;
               for(let i=0;i<years; i++){
                   if(animals.length-1 <= index){
                       index = 0;
                       continue;
                   }
                   index++;
               }
               
               for(let i = index;i>=0; i--){
                   animalsAfter.push(animals[i])
              }
               for(let i = animals.length-1;i>index;i--){
                   if(index === i ){
                       break;
                   }
                   animalsAfter.push(animals[i])
              }
              data.map((item,index)=>{
                  item.map(i=>map.set(i,animalsAfter[index]))
              })  
              this.lhcAnimal.map = map;
              let color = this.lhcAnimal.bs.color;
              let colorNums = this.lhcAnimal.bs.colorNums;
              let colorMap = new Map();
              color.map((color,index)=>{
                  colorNums[index].map(num=>{
                      colorMap.set(num,color);
                  })
              })
              this.colorMap = colorMap;
            },
            computeHistoryTypes(list){
                list.forEach(item=>{
                    let arr = item.nums.split(" ");
                    let count = this.countNums(arr);
                    let bs = this.bigAndsmall(count);
                    let sd = this.sginlAndDouble(count);
                    item.count = count;
                    item.bs = bs;
                    item.sd = sd;
                })
                return list;
            },
            countNums(list){
                return list.reduce(function(pre,cur){return pre/1 + cur/1})
            },
            bigAndsmall(item){
                return item > 10 ? "大": "小"
            },
            sginlAndDouble(item){
                return item%2 === 1 ?  "单": "双"
            },
            initLottery(id){
                var _this=this;
                var user=this.user;
                var ltyList ;
                if(user.lotteryInitFinish==true){
                lotteryBusiness.getIndexLotteryList(function (indexLotteryList) {
                    if (indexLotteryList && indexLotteryList.length > 0 && indexLotteryList.length <= 200) {
                       _this.lotteryList  = ltyList = indexLotteryList
                                          id =id==null? _this.$route.query.gameId:id;
                    var lty = arrayUtil.findFirst(ltyList,item=>{return item.id==id});
                    _this.collection = lty.favorited;
                    if(_this.menuList[1] && _this.menuList[1].active){
                         _this.menuList[1].isOpen=true;
                         _this.menuList[0].isOpen=true;
                          _this.betting=_this.menuList[1].type;
                        return;
                    }
                    if(lty != null){
                        var betCmp=null;
                        arrayUtil.forEach(_this.menuList,m=>{
                            m.active=false;
                            var val = lty["open"+m.code];
                            if(val ==true){
                                m.isOpen=true;
                                if(betCmp == null){
                                    betCmp=m.type;
                                    m.active=true;
                                }
                            }

                            if(val ==false){
                                m.isOpen=false;
                            }
                        });

                        _this.betting=betCmp;
                    }else {
                        
                        this.lconfirm("找不到该采种", {
                            showCancelButton: false,
                            closeOnClickModal: false
                        });
                    }
                    }
                })
              }
            }
        },
        components: {
            'v-slippery': slippery,
            "v-lottery-betting":lotteryBetting,
            "v-kg-betting":kgBetting,
            "v-chatroom":chatroom,
            "v-suspension":suspension
        },
        computed: {
        },
        beforeDestroy() {
            if (this.ownCountdownInterval != null) {
                clearInterval(this.ownCountdownInterval)
            }
        },
        beforeRouteEnter(to,from,next){
            if (to.path ==="/lotteryBet" && from.path ==="/chatroom"){
                appContext.chatroomKeepAlive = null;
            }
            next()
        },
        beforeRouteLeave(to,from,next){

            if (from.path ==="/lotteryBet" && to.path !=="/chatroom"){
                appContext.chatroomKeepAlive = false;
                if (appContext.chatroom != null && appContext.chatroom.socket != null){
                    appContext.chatroom.socket.disconnect(true);
                }
            }
            next()
        },
        updated(){
            // this.showHistory()
        },
        watch: {
            "user.lotteryInitFinish": function () {
                this.initLottery();
            },
            "user.allInitFinish":function () {
                var _this=this;
                if(_this.user.allInitFinish==true){
                    var chatroomMenu = arrayUtil.findFirst(_this.menuList,item=>{return item.code=="Chatroom"});
                    chatroomMenu.isOpen=_this.user.isChatroom==true;
                }
            },

            "playSelect":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                }else{
                   methodsScroll.enabledScroll();  
                }
            },
            "dialogLottery":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll(); 
                   if(this.betting=='v-chatroom'){
                        var scrollHeight=document.body.scrollHeight;
                        scroll(0,Math.round(scrollHeight));
                   } 
                    
                   
                }
            },
        }
    }
</script>
<style>
.marLeft{
    width:0.22rem;
}
.wh12{
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    line-height: 0.16rem;
    border-radius: 50%;
    border: 1px solid #ccc;
}
.mr-l1{
    display: inline-block;
    width: 0.3rem;
    height: 0.43rem;
    line-height: 0.43rem;
    /* margin-right: 0.1rem; */
}
.last-history-issue{
    height:0.3rem;
    line-height:0.3rem;
    background: #ffeeec;
    border-radius: 0 0 0.05rem 0.05rem;
}
.last-history-issue.long .last-nums span {
    width: 0.15rem;
    height: 0.15rem;
    line-height: 0.15rem;
}
.last-history-issue.long .last-issue {
   margin-left: 0.17rem;
}
.last-history-issue.min .last-nums span {
    width: 0.2rem;
    height: 0.2rem;
    line-height: 0.2rem;
}
.last-history-issue.min .last-issue {
   margin-left: 0.23rem;
}
.last-issue{
    text-align:center;
    margin-left: 0.15rem;
}
.last-nums{
    text-align:center;
    margin-left:0.02rem;
}
.last-nums span{
    display: inline-block;
    width: 0.24rem;
    height: 0.24rem;
    line-height: 0.24rem;
    text-align:center;
    font-size: 0.1rem;
    color: #4e4e4e;
    margin: 1px;
    background: #f8f7f7;
    border-radius: 50%;
    font-weight: bold;
    border: 1px solid #ddd;
}
.resultNums {
    height: 0.3rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.resultNums dl {
    display: inline-block;
    overflow: hidden;
}

.resultNums dd {
    position: relative;
}

.smallNum dl {
    display: inline-block;
    width: .15rem;
    height: .15rem;
    line-height: .15rem;
    text-align: center;
    font-size: .1rem;
    color: #4e4e4e;
    margin: 0.06rem 0.01rem 0 0;
    background: #f8f7f7;
    border-radius: 50%;
    font-weight: 700;
    border: 1px solid #ddd;
}

.middleNum dl:last-child {
    margin-right: 0;
}
.middleNum dl {
    display: inline-block;
    width: .15rem;
    height: .15rem;
    line-height: .15rem;
    text-align: center;
    font-size: .1rem;
    color: #4e4e4e;
    margin: 1px;
    background: #f8f7f7;
    border-radius: 50%;
    font-weight: 700;
    border: 1px solid #ddd;
}

.middleNum dl:last-child {
    margin-right: 0;
}

.bigNum dl {
    display: inline-block;
    width: .24rem;
    height: .24rem;
    line-height: .24rem;
    text-align: center;
    font-size: .1rem;
    color: #4e4e4e;
    margin: 1px;
    background: #f8f7f7;
    border-radius: 50%;
    font-weight: 700;
    border: 1px solid #ddd;
}
.loaing-text{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.13rem;
}
.bigNum dl:last-child {
    margin-right: 0;
}
.history-content .pk10rules-wrap b{
    display: inline-block;
    text-align: center;
    width: 0.15rem;
    height: 0.15rem;
    line-height: 0.9rem;
    margin-left: 0.04rem;
    border-radius:0;
}
.history-content-pk10 .pk10rules-wrap span{
    display: inline-block;
    text-align: center;
    width: 0.18rem;
    height: 0.18rem;
    line-height: 0.18rem;
    margin-left: 0.04rem;
    border-radius:0;
    color: #fff;
}
.align-items{
    align-items: center;
}
.betting-header h2{
    color:#fff;
}
.color-red{
    background: #ff464b !important;
}
.color-greed{
    background: rgb(65, 214, 65) !important;
}
.color-blue{
    background: rgb(49, 49, 255) !important;
}
.pk10-color-01{
    background: #e6de00;
}
.pk10-color-02{
    background: #0092dd;
}
.pk10-color-03{
    background: #4b4b4b;
}
.pk10-color-04{
    background: #ff7600;
}
.pk10-color-05{
    background: #17e2e5;
}
.pk10-color-06{
    background: #5234ff;
}
.pk10-color-07{
    background: #bfbfbf;
}
.pk10-color-08{
    background: #ff2600;
}
.pk10-color-09{
    background: #780b00;
}
.pk10-color-10{
    background: #07bf00;
}

</style>
