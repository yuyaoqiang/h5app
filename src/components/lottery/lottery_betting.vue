<template>
    <div class="slide-right">
        <section class="betting-main" :class="{'betting-main-active':areaData.betQty>=1}">
            <ul class="lottery-checkbox display-box" v-if="areaData.customBit">
                <li v-for="c in areaData.customBit">
                    <input :checked="c.checked==true" @click="customCheckChange(c)" type="checkbox" :id="c.id"
                           :label="c.name" :data_id="c.id"/> <label :for="c.id">{{c.name}}</label>
                </li>
            </ul>
            <article class="lottery-textarea-box" v-if="areaData.type=='text'">
                <h3>{{areaData.betDesc}}</h3>
                <section class="lottery-textarea">
                    <textarea placeholder="请输入号码"
                              v-model="areaData.betContent"
                              @keyup="betContentChange()" @blur="caclBetResult">
                    </textarea>
                </section>
                <ul class="pt10 display-box lottery-textarea-btn">
                    <li class="pr5">
                        <button type="button" class="main-bg" @click="deleteRepeat">删除重复号码</button>
                    </li>
                    <li class="pl5">
                        <button type="button" class="btn-bg" @click="clearBetText">清 空</button>
                    </li>
                </ul>
            </article>
            <article v-else class="pt10">
                <div v-for="(item,index) in areaData.bits" class="lottery-select-main">
                    <div class="display-flex pr14">
                        <div class="lottery-select-msg">
                            <p class="lottery-select-title" :class="{'lottery-title-active':item.selectTitleMsg}">{{item.name}}</p>
                            <p class="ball-odds-title"  v-if="areaData.hasSingleOdds == true">
                                奖金
                            </p>
                        </div>
                        <ul v-show="areaData.fastChoose" class="flex-box lottery-fast-select">
                            <li @click="quickSelect(item.name,'All')">全</li>
                            <li @click="quickSelect(item.name,'Big')">大</li>
                            <li @click="quickSelect(item.name,'Small')">小</li>
                            <li @click="quickSelect(item.name,'Odd')">奇</li>
                            <li @click="quickSelect(item.name,'Even')">偶</li>
                            <li @click="quickSelect(item.name,'Clear')">清</li>
                        </ul>
                    </div>
                    <div class="display-flex mt10">
                        <ul :data-po="index" class="flex-box lottery-select-number">
                            <li v-for="(obj,subIndex) in item.bitNumObjs"
                                :class="{'active':obj.selected,'ylactive':setting.showMissing||setting.showColdHot,'odds-margin':(areaData.isOddLH||areaData.isOddKS)?true:false}"
                                @click="compute(item.name,obj.num)" :val="obj.num">
                                {{obj.num}}
                                <p v-if="setting.showMissing&&missingData.length>0">{{missingData[index][subIndex]}}</p>
                                <p v-if="setting.showColdHot&&coldHotData.length>0">{{coldHotData[index][subIndex]}}</p>
                                <p class="ball-odds"
                                   v-if="areaData.hasSingleOdds == true">{{obj.currentOdd}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
        <footer class="lottery-footer">
            <ul class="display-flex lottery-odds-box " v-if="areaData.betQty>=1">
                <li><p>倍数</p></li>
                <li>
                    <div class="lottery-odds-input">
                        <input maxlength="5" type="number" v-model.trim="areaData.multiple" @keyup="multipleChange"
                               @blur="multipleBlur" class="lottery-odds">
                    </div>
                </li>
                <li><p>模式</p></li>
                <li>
                    <div class="lottery-unit-box pr">
                        <template v-if="platformData.setting.code != 'bdb'">
                            <select @change="unitChanged" v-model="areaData.unit" class="lottery-unit">
                                <option v-for="item in moneyModelOptions" :label="item.label" :value="item.value">
                                    {{item.label}}
                                </option>
                            </select>
                        </template>
                        <template v-if="platformData.setting.code == 'bdb'">
                            <select @change="unitChanged" v-model="areaData.unit" class="lottery-unit" v-if="lottery.playType.hasLi==true">
                                <option v-for="item in moneyModelOptions" :label="item.label" :value="item.value">
                                    {{item.label}}
                                </option>
                            </select>
                            <select @change="unitChanged" v-model="areaData.unit" class="lottery-unit" v-if="lottery.playType.hasLi==false">
                                <option v-for="(item,i) in moneyModelOptions" :label="item.label" :value="item.value" v-if="i<3">
                                    {{item.label}}
                                </option>
                            </select>
                        </template>
                    </div>
                </li>
                <li><p>奖金</p></li>
                <li class="flex-box">
                    <div class="lottery-prize-box pr">
                        <select @change="bonus" v-model="areaData.bonusValue" class="lottery-prize">
                            <option :value="item.val" :label="item.begin + '-'+item.end+'%'"
                                    v-for="item in areaData.bonusValues">
                                {{item.begin}}-{{item.end}}%
                            </option>
                        </select>
                    </div>
                </li>
            </ul>
            <ul class="display-flex lottery-betting-nav">
                <li class="lottery-machine" @click="randomChoose(1)">
                    <img src="../../assets/images/jixuan.png">
                </li>
                <li class="flex-box lottery-betting-money">
                    <p v-if="user.init==true">已选: <b class="orange">{{areaData.betQty}}</b> 注 <b class="orange">{{areaData.betAmount | fixedMoney }}</b> 元</p>
                    <p v-if="user.init==true">余额：<b class="orange">{{user.lotteryBal}}</b> </p>
                    <p v-if="user.init==false">已选: <b class="orange">{{areaData.betQty}}</b> 注 </p>
                    <p v-if="user.init==false">总计：<b class="orange">{{areaData.betAmount | fixedMoney }}</b> 元</p>
                </li>
                <li class="pr lottery-shopping" @click="addBetCart">
                    <img src="../../assets/images/shoppingCart.png">
                    <i v-show="lottery.betCartSize && lottery.betCartSize>0">{{lottery.betCartSize}}</i>
                </li>
                <li class="lottery-betting-btn" @click="confirmBet" :class="{'active':areaData.betQty>0}">投 注</li>
            </ul>
        </footer>
        <div v-if="showBox">
            <div class="cover-bg" style="background:none" @click.stop="showBox = false"></div>
            <div class="showBox" >
                <div class="showBox-title">{{lottery.name+"-" +lottery.issue}}期</div>
                <ul class="showBox-main">
                    <li><span>玩法：</span><span>{{betOrders.playTypeName}}<b style="color: red" v-if="betOrders.singleBet&&betOrders.singleBet.isSingleBet">(单挑)</b></span></li>
                    <li><span>号码：</span><span>{{betOrders.simpleBetNum}}</span></li>
                    <!-- <li><span>模式：</span><span>{{betOrders.unit}}</span></li> -->
                    <li><span>金额：</span><span>共<b class="orange">{{betOrders.betQty}}</b>注/共<b class="orange">{{betOrders.betAmount}}</b>元</span></li>
                </ul>
                <div class="showBox-footer" @click="betSure()">确定</div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import areaInit from '../../assets/js/business/lottery/lotteryAreaInit';
    import lotteryBet from '../../assets/js/business/lottery/lotteryBet';//投注区域数据
    import lotteryApi from '../../assets/js/api/lotteryApi';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import arrayUtil from  "../../assets/js/util/arrayUtil";
    import validateUtil from  "../../assets/js/util/validateUtil";
    import fileLoader from  "../../assets/js/util/fileLoader";
    import businessValidateUtil from  "../../assets/js/business/common/businessValidateUtil";
    import appContext from  "../../assets/js/context/appContext";
    import userBusiness from  "../../assets/js/business/user/userBusiness";
    import platformData from '../../assets/platform/main/platformData'
    export default {
        data() {
            return {
                playSelect: false, //玩法面板显示
                isDestory: true,
                moneyModelOptions: [{
                    value: 1,
                    label: '元'
                }, {
                    value: 10,
                    label: '角'
                }, {
                    value: 100,
                    label: '分'
                }, {
                    value: 1000,
                    label: '厘'

                }],
                lotteryPlayExample: null,
                ylActive: true,
                missingData: [],
                coldHotData: [],
                areaData: {
                    bonusValues: [],
                    betCartSize: 0,
                    betDesc: "",
                },//生成投注区数据
                lottery: {
                    gameMenu: [],
                    gameSubMenu: [],
                    playType: {},
                    type: {},
                    status: lotteryBusiness.STATUS_LIST.init,
                    countdownContext: {
                        days: "00",
                        hours: "00",
                        munites: "00",
                        secondes: "00",
                    },
                    issue: "0000-00-00",
                    delay: true,
                    init: false,
                    data: {}
                },
                setting: {
                    showColdHot: false,
                    showMissing: false,
                    showMissingAndColdHot: false,
                },
                user:{
                    lotteryBal:0
                },
                platformData:null,
                showBox:false,
                betOrders:null,
            }
        },
        created() {
            this.initLottery(); //彩种id
            this.playExplanation();
            this.loadUser();
            this.platformData = platformData;
            
        },
        methods: {
            initLottery(){
                let _this = this;
                let id = _this.$route.query.gameId;
                _this.lshowWait();

                if(id != lotteryBusiness.getCurrentLotteryId()){
                    lotteryBusiness.clearBetCart();
                }

                lotteryBusiness.lottery=null;
                lotteryBusiness.init(id, function (lottery, isLocalData) {
                    setTimeout(function () {
                        _this.lcloseWait();
                    }, 100)
                    if (lottery == null) {
                        _this.goback();
                        return;
                    }

                    _this.lottery = lottery;
                    _this.$parent.lottery = lottery;
                    if (lottery.data.history != null) {
                        _this.$parent.lotteryHistoryList = lottery.data.history.reverse();
                    }
                    var betCart = lotteryBusiness.getBetCart();
                    if (betCart != null) {
                        _this.lottery.betCartSize = betCart.betOrders.length;
                    }
                    
                    _this.initAreaData();
                });
                
            },
            goback: function () {
                this.$router.go(-1);
            },
            playExplanation(){
                let _this = this;
                fileLoader.loadScript("/h5app/static/js/lottery-example.js", ()=> {
                    _this.lotteryPlayExample = lottery_play_example;
                    _this.initBetDesc();
                });
            },
            initBetDesc() {
                try {
                    var playTypeId = this.lottery.playType.betlossId + "";
                    var desc = this.lotteryPlayExample == null ? "" : this.lotteryPlayExample[playTypeId][0];
                    this.areaData.betDesc = desc.trim();
                } catch (ex) {
                }
            },
            nextIssueEvent() {
                lotteryBusiness.clearBetCart();//清除投注车
            },
            //全大小奇偶清快速选择
            quickSelect(bitName, type) {

                var bit = arrayUtil.findFirst(this.areaData.bits, item => {
                    return item.name == bitName
                });
                var bitNumObjs = bit.bitNumObjs;
                var maxLen = bitNumObjs.length;
                var expression = function (item) {
                    return false;
                }
                if (type == "All") {
                    expression = function (item) {
                        return true;
                    }
                } else if (type == "Big") {

                    expression = function (item, i) {

                        return i > (maxLen / 2 - 1);
                    }
                } else if (type == "Small") {
                    expression = function (item, i) {
                        return i <= ((maxLen / 2 - 1));
                    }
                } else if (type == "Odd") {

                    expression = function (item) {
                        return item.num % 2 != 0;
                    }

                } else if (type == "Even") {
                    expression = function (item) {
                        return item.num % 2 == 0;
                    }
                }

                for (var i = 0; i < bitNumObjs.length; i++) {
                    var item = bitNumObjs[i];
                    item.selected = expression(item, i);
                    if (item.selected == true) {
                        this.removeRepeatBetTypeBall(bit.name, item.num);
                    }
                }
                this.selectTitleActive(bit)
                this.caclBetResult();
            },
            //号码选择事件
            compute(bitName, num) {
                var bit = arrayUtil.findFirst(this.areaData.bits, item => {
                    return item.name == bitName
                });

                var bitNumObjs = bit.bitNumObjs;
                var bitNumObj = arrayUtil.findFirst(bitNumObjs, item => {
                    return item.num == num;
                });

                bitNumObj.selected = !bitNumObj.selected;
                if (bitNumObj.selected == true) {
                    this.removeRepeatBetTypeBall(bitName, num);
                }

                this.areaData.currentBetVal = num;
                this.caclBetResult();

                this.selectTitleActive(bit)
            },
            selectTitleActive(data){
                for (let i in data.bitNumObjs){
                    if (data.bitNumObjs[i].selected){
                        data.selectTitleMsg=true;
                        break;
                    }
                    data.selectTitleMsg=false;
                }
            },
            //移除二重号选择的相同号码
            removeRepeatBetTypeBall(bitName, selectNum) {
                /* if (this.lottery.playType.isRepeat == true) {
                 arrayUtil.forEach(this.areaData.bits, item => {
                 if (item.name == bitName) {
                 return;
                 }
                 arrayUtil.forEach(item.bitNumObjs, bn => {
                 if (bn.num == selectNum) {
                 bn.selected = false;
                 }
                 });

                 })
                 }*/
            },
            //倍数加
            multipleChange() {
                
                var _this = this;
                var result = businessValidateUtil.multipleChangeCheck(_this.areaData.multiple, m => {
                    _this.areaData.multiple = m;
                });
                if (result == false) {
                    return;
                }
                _this.caclBetResult();
            },
            multipleBlur() {
                var _this = this;
                var multiple = Number(_this.areaData.multiple);
                if (isNaN(multiple) || multiple < 1) {
                    _this.areaData.multiple = 1;
                    _this.caclBetResult();
                } else {
                    _this.areaData.multiple = multiple;
                }
            },
            //模式选择
            unitChanged() {
                this.caclBetResult();
                
                lotteryBusiness.setAreaSetting(this.areaData);
            },
            customCheckChange(cb) {

                cb.checked = !cb.checked;

                var checkedQty = arrayUtil.count(this.areaData.customBit, item => {
                    return item.checked;
                });


                var maxCustomChoice = this.areaData.customChioceData.maxCustomChoice;
                var minCustomChoice = this.areaData.customChioceData.minCustomChoice;
                var customBit = this.areaData.customBit;
                var removed = false;


                if (checkedQty > maxCustomChoice) {

                }

                if (checkedQty < minCustomChoice) {
                    cb.checked = !cb.checked;
                    this.lalterWarning("所选位数不能少于 " + minCustomChoice + " 位");
                }

                this.caclBetResult();
            },
            betContentChange() {
                this.caclBetResult();
            },
            //奖金切换
            bonus() {
                this.caclBetResult();
            },
            randomChoose(num) {
                
                this.clearBetBall();

                if (this.areaData.type == "text") {
                    while (true) {
                        if (this.areaData.betQty > 0) {
                            this.areaData.betContent = '';
                            this.areaData.betContent = this.areaData.selectNums[0]+',' || this.areaData.selectNums[0].join(",")+','
                            break;
                        }
                        var random = parseInt(9 * Math.random());
                        this.areaData.betContent = this.areaData.betContent + random;
                        this.caclBetResult(num);

                    }

                } else {
                    while (true) {
                        this.doRandomChoose();
                        if (this.areaData.betQty > 0) {
                            break;
                        }
                    }
                }
            },
            doRandomChoose() {
                var _this = this;

                var bits = this.areaData.bits;
 
                var array = arrayUtil.randomArray(bits.length);

                var hasBigPostion = false;
                var chooseLen = 0;

                for (var i = 0; i < array.length; i++) {
                    var pos = array[i];

                    if (_this.areaData.betQty > 0) {
                        break;
                    }

                    if (pos > 2) {
                        hasBigPostion = true;
                    }

                    var bitNumObjs = bits[pos].bitNumObjs;
       
                    var random = parseInt((bitNumObjs.length) * Math.random());
                    var numObj = bitNumObjs[random];


                    if (numObj.selected == false) {
                        numObj.selected = true;
                    }

                    if (numObj.selected == true) {
                        this.removeRepeatBetTypeBall(bits[pos].name, numObj.num)
                    }

                    chooseLen++;
                    _this.caclBetResult();
                }

                for (let b=0;b<bits.length;b++){
                    this.selectTitleActive(bits[b])
                }

                if (hasBigPostion && chooseLen < 2) {
                    _this.setBetMainScrollTop(2000);
                } else {
                    _this.setBetMainScrollTop(0);
                }
            },
            setBetMainScrollTop(val) {
                $(".bet-main").scrollTop(val);
                //document.documentElement.scrollTop=val+"Px";
            },
            showPlayDesc() {
                if (this.lotteryPlayExample != null) {
                    var playTypeId = this.lottery.playType.betlossId + "";
                    
                    var desc = this.lotteryPlayExample[playTypeId][1];
                    this.lconfirm(desc, {title: "玩法说明", showCancelButton: false});
                } else {
                    this.lconfirm("加载玩法说明失败", {title: "玩法说明", showCancelButton: false});
                }

            },
            confirmBet() {
                
                var _this = this;

                if (this.areaData.betQty < 1) {
                    //this.lalterError("请按照规则进行投注!")
                    return;
                }
                if (this.areaData.multiple == "" || (this.areaData.multiple / 1) < 0) {
                    this.lalterError("请输入有效的倍数")
                    return false;
                }

                this.areaData.multiple = this.areaData.multiple / 1;
                if (validateUtil.isDecimal(this.areaData.multiple) == false) {
                    this.lalterError("倍数不能输入小数")
                    return false;
                }

                if ((this.areaData.multiple / 1) > 99999) {
                    this.lalterError("倍数不能大于99999倍")
                    return false;
                }
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if (_this.lottery.status != lotteryBusiness.STATUS_LIST.betting) {
                    this.lalterError("当期已封盘,禁止投注");
                    return;
                }
                this.areaData.hasLi = this.lottery.playType.hasLi;
                var betOrder = lotteryBet.generateBetOrder(_this.lottery, _this.areaData);
                this.betOrders = betOrder;

                this.areaData.betContent = betOrder.betNum;
                this.showBox = true;
                
            },
            betSure(){
                let _this = this;
                var doConfirm = function () {
                    _this.lshowWait();
                    lotteryBusiness.confirmBet(_this.lottery, [_this.betOrders], null, function (result) {
                        
                        _this.lcloseWait();
                        if (result.success) {
                            _this.loadUser();
                            _this.clearBetBall();
                            _this.lalterSuccess("投注成功");
                            _this.showBox = false;
                            return;
                        }
                        if(result.status==1104){
                            _this.lconfirm("余额不足，点击前往充值页面！", {confirmButtonText: '充值'}, () => {
                                userBusiness.toWyczPage({path:'chongzhi'})
                                
                            });
                            return
                        }
                        
                        _this.lalterError(result.msg);
                        
                    })
                }

                if (lotteryBet.errors.length > 0) {
                    //_this.lconfirm('已删除重复投注项与错误投注项:' + lotteryBet.errors, {showCancelButton: false}, function () {
                        lotteryBet.errors = [];
                        //doConfirm();
                    //});

                    //return;
                }

                doConfirm();
            },
            clearBetBall() {
                if (this.areaData.type == "text") {
                    this.areaData.betContent = "";
                } else {

                    var bits = this.areaData.bits;
                    for (var i = 0; i < bits.length; i++) {
                        var bit = bits[i];
                        for (var j = 0; j < bit.bitNumObjs.length; j++) {
                            var numObj = bit.bitNumObjs[j];
                            numObj.selected = false;
                        }
                        if (bit.selectTitleMsg){
                            this.selectTitleActive(bit)
                        }
                    }
                }
                this.caclBetResult();
            },
            addBetCart() {

                var _this = this;

                if (this.areaData.betQty < 1) {
                    
                    if (this.lottery.betCartSize < 1) {
                        this.lalterWarning('请选择有效投注注数')
                        return;
                    }
                    
                    _this.isDestory = false;
                    this.$router.push({path: '/bettingList', query: {gameId: _this.lottery.id}});
                    return;
                }

                if (this.areaData.multiple == "" || (this.areaData.multiple / 1) < 0) {
                    this.lalterError("请输入有效的倍数")
                    return false;
                }

                if (validateUtil.isDecimal(this.areaData.multiple) == false) {
                    this.lalterError("倍数不能输入小数")
                    return false;
                }

                if ((this.areaData.multiple / 1) > 99999) {
                    this.lalterError("倍数不能大于99999倍")
                    return false;
                }

                if (this.lottery.status != lotteryBusiness.STATUS_LIST.betting) {
                    this.lalterError("当期已封盘,禁止投注");
                    return;
                }
                
                this.areaData.hasLi = this.lottery.playType.hasLi;

                var betOrder = lotteryBet.generateBetOrder(_this.lottery, _this.areaData);

                var betCart = lotteryBusiness.getBetCart();
                if (betCart == null) {
                    betCart = {
                        betOrders: [betOrder]
                    }
                } else {
                    betCart.betOrders.push(betOrder);
                }

                lotteryBusiness.setBetCart(betCart);

                _this.initAreaData();

            },
            initAreaData() {
                var _this = this;
                
                this.areaData = areaInit.getInitData(this.lottery);
                
                this.initBetDesc();
                
                // var title = this.lottery.name + '-' + this.lottery.playType.parentName + this.lottery.playType.name;
                var title = this.lottery.playType.parentName + this.lottery.playType.name;
                if (title.length > 8) {
                    title = title.substring(0, 8) + '...';
                }
                this.$parent.lotteryTitle = title;
                var areaSetting = lotteryBusiness.getAreaSetting();

                var check = this.lottery.playType.hasLi;
                if(areaSetting != null&&areaSetting.unit){
                    if(this.platformData.setting.code=='bdb'){
                        if(check){

                            this.areaData.unit = areaSetting.unit;
                            
                        }else{
                        
                            if (areaSetting.unit!=1000) {
                                this.areaData.unit = areaSetting.unit;
                            }else{
                                this.areaData.unit = 100;
                                lotteryBusiness.setAreaSetting({unit:100})
                            }
                        }
                        
                        
                    }else{
                        
                        this.areaData.unit = areaSetting.unit;
                    }
                }
                

                
                if (arrayUtil.isEmpty(_this.areaData.bits) == false) {

                    try {
                        var firstBit = _this.areaData.bits[0];

                        var hasTwoChineseNum = false;
                        arrayUtil.forEach(firstBit.bitNumObjs, obj => {
                            if (hasTwoChineseNum == false) {
                                var val = obj.num;
                                var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                                if (reg.test(val) && val.length > 1) {
                                    hasTwoChineseNum = true;
                                }
                            }
                        });
                        _this.areaData.ballSmallFont = hasTwoChineseNum;

                        var b = arrayUtil.findFirst(_this.lottery.type.bits, item => {
                            return firstBit.name == item
                        });
                        var n = firstBit.bitNumObjs[0].num;
                        var num = arrayUtil.findFirst(_this.lottery.type.fullNums, item => {
                            return n == item
                        });
                        _this.setting.showMissingAndColdHot = b != null && num != null;
                    } catch (ex) {
                    }
                }
                if (_this.areaData.type == 'text') {
                    _this.setting.showMissingAndColdHot = false;
                }
            },
            deleteRepeat() {
                this.caclBetResult(true);
            },
            clearBetText() {
                this.areaData.betContent = "";
                this.caclBetResult();
            },
            caclBetResult(isRemoveRepeat) {
                var _this = this;
                var addPosition = true;
                var bitPositions = new Array();

                if (this.areaData.customBit) {
                    addPosition = false;
                    arrayUtil.forEach(areaInit.betBit, item => {
                        var ckItem = arrayUtil.findFirst(this.areaData.customBit, c => {
                            if (c.checked == true && c.name == item) {
                                return true;
                            }
                            return false;
                        });
                        if (ckItem != null) {
                            bitPositions.push(areaInit.realBit[ckItem.name])
                        }
                    });
                }

                _this.lottery.bitPositions = bitPositions;
             
                if (this.areaData.type == "text") {

                    if(this.lottery.id == 73){
                        this.areaData.betContent = this.areaData.betContent.replace(/9/g,"");
                    }
                    lotteryBet.caclSingleBetResult(this.lottery, this.areaData, isRemoveRepeat);
                } else {

                    var bits = this.areaData.bits;

                    var selectNums = lotteryBet.getDefaultSelectNums();

                    for (var i = 0; i < bits.length; i++) {
                        var bit = bits[i];

                        var nums = new Array();
                        for (var j = 0; j < bit.bitNumObjs.length; j++) {
                            var numObj = bit.bitNumObjs[j];
                            if (numObj.selected) {
                                nums.push(numObj.num);
                            }
                        }

                        if (addPosition && nums.length > 0 && bit.bit != undefined) {
                            _this.lottery.bitPositions.push(bit.bit);
                        }
                        selectNums[i] = nums;
                    }
                    this.areaData.selectNums = selectNums;

                    lotteryBet.calcBetResult(this.lottery, this.areaData);
                }
            },
            loadUser(cache) {
                var _this=this;
                // _this.user = {};
                // _this.user.lotteryBal = '--';
                if(cache != undefined){
                    userBusiness.enableCache=cache;
                }
                userBusiness.getUser(_this,function (user) {
                    _this.user=user;
                    //_this.$emit('loadUser',user);
                })
            },
            switchMissing() {
                var _this = this;
                _this.setting.showMissing = !_this.setting.showMissing;
                _this.setting.showColdHot = false;
                if(this.areaData.type=='text'){
                    this.lalterSuccess('单式投注不支持此功能');
                    return;
                } 
                if (_this.setting.showMissing) {
                    lotteryApi.getLeaveOut(_this.lottery.id, function (resp) {
                        var firstBitName = _this.areaData.bits[0].name;
                        var firstBit = _this.areaData.bits[0].bit;
                        var betBit = arrayUtil.findFirst(areaInit.betBit, item => {
                            return item == firstBitName
                        });

                        _this.missingData = resp.data.leaveOut;
                    })
                }
            },
            switchColdHot() {
                var _this = this;
                _this.setting.showColdHot = !_this.setting.showColdHot;
                _this.setting.showMissing = false;
                if(this.areaData.type=='text'){
                    this.lalterSuccess('单式投注不支持此功能');
                    return;
                } 
                if (_this.setting.showColdHot) {
                    lotteryApi.getColdHot(_this.lottery.id, function (resp) {

                        var firstBitName = _this.areaData.bits[0].name;
                        var firstBit = _this.areaData.bits[0].bit;
                        var betBit = arrayUtil.findFirst(areaInit.betBit, item => {
                            return item == firstBitName
                        });

                        _this.coldHotData = resp.data.coldHot;
                    })
                }
            },
        },
        mounted() {
            //var mixins = window.outerHeight;
            //document.querySelector(".slide-right").style.minHeight = mixins + "px"
        },
        beforeDestroy() {
            if (this.$parent.isDestory && this.isDestory) {
                console.log("lottery destroy...")
                lotteryBusiness.destroy();
            }
        },
        watch: {
            "$route": function (to, from) {
                if (to.fullPath != from.fullPath) {

                }
            }
        }
    }
</script>
<style>
.showBox{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    /* height: 2rem; */
    padding-bottom: 0.2rem;
    z-index: 1000;
    /* opacity: 0.9; */
    background: rgba(0, 0, 0, .9);
}
.showBox-title{
    text-align: center;
    padding-top: 0.1rem;
    font-size: 0.14rem;
    color: aliceblue
}
.showBox-main{
    padding: 0.1rem 0.2rem;
}
.showBox-main li{
    color: antiquewhite;
    overflow: hidden;
    line-height: 0.24rem;
}
.showBox-main li span:first-child{
    float: left;
}
.showBox-main li span:last-child{
    float: right;
}
.showBox-footer{
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    /* border: 1px solid #00ff00; */
    border-radius: 0.2rem;
    width: 60%;
    margin:0 auto;
    font-size: 0.18rem;
    color: antiquewhite;
}
</style>
