import cacheUtil from "../../../js/util/cacheUtil"
import arrayUtil from "../../../js/util/arrayUtil"
import lotteryApi from "../../../js/api/lotteryApi"
import lotteryCountdown from "./lotteryCountdown"
import userBussiness from '../user/userBusiness';
import platformData from "../../../platform/main/platformData"

import messageBox from '../../../../controls/messageBox';
import lotteryPlayTypeData from '../../data/lotteryPlayTypeData';
import lotteryTypeData from '../../data/lotteryTypeData';
import objectUtil from './../../util/objectUtil';
import appContext from './../../context/appContext';
import fileLoader from './../../util/fileLoader';
import sortBy from 'lodash/sortBy'

export default {
    STATUS_LIST: {
        init: { code: "init", desc: "投注" },
        betting: { code: "betting", desc: "投注" },
        closed: { code: "closed", desc: "封盘" }
    },
    lottery: null,
    betCart: null,
    gameMneu: null,


    getCurrentLotteryId() {
        if (this.lottery && this.lottery.init) {
            return this.lottery.id;
        }
        return null;
    },
    clear() {
        if (this.lottery && this.lottery.init) {
            this.clearBetCart();
        }
        this.lottery = null;
    },

    init(id, action) {

        var _this = this;
        if (this.lottery != null) {
            action(this.lottery, true);
            return;
        }
        lotteryApi.getInitData({ "gameID": id }, function(resp) {


            if (resp.code != 200) {
                messageBox.confirm(resp.msg, {
                    showCancelButton: false,
                    closeOnClickModal: false
                }, function() {
                    action(null);
                })
                return;
            }

            _this.destroy();

            var lotteryList = userBussiness.getLotteryList();
            var tmpLottery = arrayUtil.findFirst(lotteryList, function(item) {
                return item.id == id;
            })

            if (tmpLottery == null) {
                messageBox.confirm("找不到该采种", {
                    showCancelButton: false,
                    closeOnClickModal: false
                }, function() {
                    action(null);
                })
                return;
            }
            var lottery = _this.getEmptyLottery();
            lottery.id = tmpLottery.id;
            lottery.type = tmpLottery.type;
            lottery.name = tmpLottery.name;
            _this.initZeroNumber(lottery);
            lottery.localDate = new Date();

            lottery.data = resp.data;

            if (lottery.data && lottery.data.history) {
                lottery.oddinfoLH = lottery.data.oddinfoLH || [];
                lottery.oddinfoK3HZ = lottery.data.oddinfoK3HZ || [];
                arrayUtil.forEach(lottery.data.history, (item, i) => {
                    item.nums = item.nums == null ? "- - - - -" : item.nums;
                });
            }
            let later = lottery.data.history.pop();
            lottery.currentLottery = later;
            lottery.token = lottery.data.token_tz;
            lottery.token = lottery.data.token_tz;
            appContext.tokens.lottery_token = lottery.data.token_tz;
            lottery.closeTimes = new Date(lottery.data.current.closeTime).getTime();
            lottery.serverTimes = new Date(lottery.data.current.now).getTime();

            lottery.countdownSeconds = (lottery.closeTimes - lottery.serverTimes) / 1000;
            lottery.isClosed = lottery.data.current.isclose;


            lottery.issue = lottery.data.current.lotteryNums.issueno;
            lottery.name = lottery.data.game.name;
            //倒计时开始
            lotteryCountdown.start(lottery);

            lottery.init = true;
            _this.lottery = lottery;

            _this.initGameMenu();

            _this.initPlayType();
            action(lottery);
            appContext.current.startLotteryNumAnim();
        });

    },
    initZeroNumber(lottery){
        var zeroNums = "";
        var emptyNums = "";
        var eNumLen = lottery.type.fullNums[0].length;
        for (var i = 0; i < lottery.type.numLen; i++) {
            emptyNums += "- ";
            for (var j = 0; j < eNumLen; j++) {
                zeroNums += "0"
            }
            zeroNums += " ";
        }
        zeroNums = zeroNums.substr(0, zeroNums.length - 1);
        lottery.ballClass = "bigNum";
        lottery.ballWidth = 0.25;
        if (lottery.type.numLen > 5 && lottery.type.numLen <= 8) {
            lottery.ballClass = "middleNum";
            lottery.ballWidth = 0.15;
        }
        if (lottery.type.numLen > 8) {
            lottery.ballClass = "smallNum";
            lottery.ballWidth = 0.15;
        }
        lottery.zeroNums = zeroNums;
    },
    initGameMenu() {

        var localGameMenu = lotteryPlayTypeData[this.lottery.type.name];

        if (localGameMenu == null || localGameMenu.length == 0) {
            messageBox.alterWarning("该彩种所有彩票玩法暂时已经关闭");
            return;
        }
        var gameMenu = new Array();
        var playTypePermission = this.lottery.data.menuRoleChils || {};


        arrayUtil.forEach(localGameMenu, item => {

            var p = playTypePermission[item.name];
            if (p == null) {
                gameMenu.push(item);
                return;
            };

            var lastItem2List = new Array();
            arrayUtil.forEach(item.list, item2 => {

                var lastItem3List = new Array();
                arrayUtil.forEach(item2.list, item3 => {
                    var notPermission = p[item3.betlossId];
                    if (notPermission != null && notPermission) {
                        // console.log(item.name+":"+item2.title+":"+item3.name+":"+item3.betlossId)
                        return;
                    }
                    var lastItem3 = objectUtil.deepCopy(item3);
                    lastItem3List.push(lastItem3);
                });

                if (lastItem3List.length > 0) {
                    var lastItem2 = { title: item2.title, list: lastItem3List }
                    lastItem2List.push(lastItem2)
                }


            });

            if (lastItem2List.length > 0) {
                var lastItem = { dataId: item.dataId, name: item.name, list: lastItem2List };
                gameMenu.push(lastItem)
            }

        });
        if (gameMenu.length == 0) {
            messageBox.alterWarning("该彩种所有彩票玩法暂时已经关闭");
        }
        this.gameMneu = gameMenu;
    },
    clearBetCart() {
        if (this.lottery == null) {
            return;
        }
        this.betCart = null;
        var key = this.buildBetCartCacheKey();
        cacheUtil.setSessionStorage(key, null);
        this.lottery.betCartSize = 0;
        if (this.clearBetCartAfterAction != null) {
            this.clearBetCartAfterAction();
        }
    },
    clearBetCartAfterAction: null,
    setBetCart(betCart) {
        this.betCart = betCart;
        var key = this.buildBetCartCacheKey();
        cacheUtil.setSessionStorage(key, JSON.stringify(betCart));
        this.lottery.betCartSize = betCart.betOrders.length;
    },
    getBetCart() {
        if (this.betCart == null) {
            var key = this.buildBetCartCacheKey();
            var val = cacheUtil.getSessionStorage(key);
            if (val != null) {
                this.betCart = JSON.parse(val);
            }
        }
        return this.betCart;
    },

    initPlayType(id) {

        if (id != undefined) {
            this.setPlayTypeId(id);
        }

        try {
            var gameMenu = this.gameMneu;

            var playTypeIndex = this.getPlayTypeIndex();


            arrayUtil.forEach(gameMenu, item => item.selected = false);

            var parent1 = gameMenu[playTypeIndex.parent1Index];
            parent1.selected = true;
            var parent2List = parent1.list;

            var parent3 = parent2List[playTypeIndex.parent2Index];
            var playType = parent3.list[playTypeIndex.index];

            var curPlayType = new Object();
            curPlayType.data = playType.data;
            curPlayType.betlossId = playType.betlossId;
            curPlayType.name = playType.name;
            curPlayType.isRepeat = playType.isRepeat;
            curPlayType.parentName = parent1.name;

            if (parent1.hasLi) {
                curPlayType.hasLi = true
            } else {
                curPlayType.hasLi = false
            }
            this.lottery.gameMenu = gameMenu;
            this.lottery.gameSubMenu = parent2List;
            this.lottery.playType = curPlayType;
            this.lottery.init = true;

            return this.lottery.playType;
        } catch (ex) {
            if (id != undefined) {
                return this.initPlayType();
            }
        }

    },

    setPlayTypeId(playTypeId) {
        cacheUtil.setLocalStorage(this.buildPlayTypeCacheKey(), playTypeId);
    },

    getPlayTypeId() {
        var playTypeId = cacheUtil.getLocalStorage(this.buildPlayTypeCacheKey()) / 1;
        return playTypeId;
    },
    getPlayTypeIndex() {
        var result = {
            parent1Index: 0,
            parent2Index: 0,
            index: 0
        }

        var playTypeId = this.getPlayTypeId();

        if (playTypeId > 0) {

            var gameMenu = this.gameMneu;

            for (var i = 0; i < gameMenu.length; i++) {

                var gm = gameMenu[i];

                var gameSubMenu = gm.list;

                for (var j = 0; j < gameSubMenu.length; j++) {
                    var gsm = gameSubMenu[j];
                    var playTypes = gsm.list;
                    for (var k = 0; k < playTypes.length; k++) {
                        var pt = playTypes[k];
                        if (pt.betlossId == playTypeId) {
                            result.parent1Index = i;
                            result.parent2Index = j;
                            result.index = k;

                            return result;
                        }
                    }
                }
            }
        }

        return result;

    },

    setAreaSetting(areaData) {
        var areaSetting = { unit: areaData.unit }
        var key = this.buildAreaSettingKey();
        cacheUtil.setLocalStorage(key, JSON.stringify(areaSetting));
    },

    getAreaSetting() {
        var key = this.buildAreaSettingKey();
        var val = cacheUtil.getLocalStorage(key);
        if (val != null) {
            return JSON.parse(val);
        }
        return null;
    },

    buildBetCartCacheKey() {
        return cacheUtil.KEY_PREFIX + ":" + this.lottery.id + ":" + this.lottery.issue + ":BET_CART2";
    },

    buildPlayTypeCacheKey() {
        return cacheUtil.KEY_PREFIX + ":" + this.lottery.id + ":PLATY_TYPE_ID";
    },

    buildAreaSettingKey() {
        return cacheUtil.KEY_PREFIX + ":AREA_SETTING";
    },


    getEmptyLottery() {
        var lottery = {
            init: false,
            gameMenu: [], // 玩法大类列表
            gameSubMenu: [], //对应玩法小类列表
            playType: {},
            issue: "000000-00",
            status: this.STATUS_LIST.init,
            countdownContext: {
                days: "00",
                hours: "00",
                munites: "00",
                secondes: "00",
            },
            delay: true,
            betCartSize: 0,
            currentLottery:{
                issueno:"0000-00-00",
                nums: "- - - - -"
            }
        }
        return lottery;
    },
    destroy() {
        this.clear();
        lotteryCountdown.destroy();
    },
    lotteryTypeList: null,
    lotteryDisplayTypeList: null,
    getDisplayTypeList() {
        if (this.lotteryDisplayTypeList == null) {
            this.lotteryDisplayTypeList = platformData.lotteryDisplayTypes;
            arrayUtil.forEach(this.lotteryDisplayTypeList, item => {
                if (item.isTradition == null) {
                    item.isTradition = false;
                }

                if (item.isKg == null) {
                    item.isKg = false;
                }
            });
        }

        return this.lotteryDisplayTypeList;
    },

    indexLotteryList: null,
    async  getIndexLotteryList(callback) {
        var _this = this;
        if (this.indexLotteryList == null) {
         await   userBussiness.initLotteryList();
         await   lotteryApi.getIndexLotteryList(function(resp) {
                if (resp.code == 200) {
                    var indexLotteryList = [];
                    var data = (resp.data || []).reverse();
                    var lotteryList = userBussiness.getLotteryList();
                    for (var i = 0; i < lotteryList.length; i++) {
                        var lottery = arrayUtil.findFirst(data, item => {
                            return item.id == lotteryList[i].id
                        });
                        if (lottery == null) {
                            let lot = Object.assign({},lotteryList[i]);
                            lot['openTradition']=false
                            indexLotteryList.push(lot);
                        }else{
                            let lot = Object.assign({},lotteryList[i]);
                            lot.deep = lottery.deep;
                            lot['openTradition']=true
                            indexLotteryList.push(lot);
                        }
                    }
                     _this.indexLotteryList = sortBy(indexLotteryList,item=>-item.deep)
                    callback(_this.indexLotteryList);
                } else {
                    console.error("获取首页推荐采种失败:" + resp.msg);
                }
            })
        }
        callback(_this.indexLotteryList||[]);
    },
    getHistoryNums(params, callback) {
        var lotteryList = userBussiness.getLotteryList();
        
        lotteryApi.getHistoryNums(params, function(resp) {
            if (resp.code == 200) {
                var data = resp.data;
                for (var key in data) {
                    var list = data[key];
                    if (arrayUtil.isEmpty(list) == false) {
                        var emptyNum = "";
                        var lottery = arrayUtil.findFirst(lotteryList, l => {
                            return l.id == key
                        });
                       
                        if (lottery != null) {
                            for (var i = 0; i < lottery.type.numLen; i++) {
                                emptyNum += "- ";
                            }
                            if (emptyNum != "") {
                                emptyNum = emptyNum.substr(0, emptyNum.length - 1);
                            }
                        }

                        arrayUtil.forEach(list, (item) => {
                            item.nums = item.nums == null ? emptyNum : item.nums;
                        });
                    }

                }
                callback(data);
            } else {
                console.error("获取彩票历史失败:" + resp.msg);
            }
        });

    },
    confirmBet(lottery, betOrders, followBet, callback) {
        var postObj = {};
        postObj.gameId = lottery.id;
        postObj.mobileBet = appContext.getDevice().betVal;

        // postObj.token = lottery.token;

        postObj.token = appContext.tokens.lottery_token;

        postObj.issueNo = lottery.issue;
        postObj.zhuiHaoQiHao = [];


        postObj.tingZhiZhuiHao = "false";

        var bets = new Array();
        arrayUtil.forEach(betOrders, item => {

            var bet = {};
            bet.wanFaID = item.playTypeId;

            var betNum = item.betNum;
            if (item.isTextBet) {
                //若是文本投注方式 则对投注内容进行排序
                try {
                    var betNums = betNum.split(",");
                    betNums.sort(function(a, b) {
                        return a / 1 - b / 1
                    })

                    betNum = arrayUtil.join(betNums, n => { return n }, ",");

                } catch (err) {
                    console.log("投注内容排序出现异常" + err);
                }
            }

            bet.touZhuHaoMa = betNum;

            bet.touZhuBeiShu = item.multiple;
            bet.danZhuJinEDanWei = item.unit;
            bet.yongHuSuoTiaoFanDian = item.bonusValue;
            bet.digit = item.digit;
            bet.bouse = item.bouse;
            bet.zhuShu = item.betQty;

            bets.push(bet)
        });

        postObj.touZhuHaoMa = bets;

        var followBets = new Array();
        if (followBet != null) {
            arrayUtil.forEach(followBet.list, item => {

                var followBet = new Object();
                followBet.qiHao = item.issue;
                followBet.beiShu = item.multiple;
                followBets.push(followBet);

            });
            postObj.tingZhiZhuiHao = followBet.winStopFollow ? "true" : "false";

        }

        postObj.zhuiHaoQiHao = followBets;
        var postJson = JSON.stringify(postObj);
        lotteryApi.confirmBet({ json: postJson }, function(resp) {

            if (resp.data && resp.data.token_tz) {
                lottery.token = resp.data.token_tz;
                appContext.tokens.lottery_token = resp.data.token_tz;
            }

            var result = { success: true }
            if (resp.code != 200) {

                var msg = null;
                if (resp.data) {
                    msg = resp.data.MESSAGE;
                } else {
                    msg = resp.msg;
                }
                result.status = resp.data.STATUS;
                result.success = false;
                result.msg = msg;
            }
            callback(result);
        })
    },


    initLotteryInfos(list) {
        var fillInfo = function() {
            if ("undefined" != typeof $L_lotteryInfos) {

                arrayUtil.forEach($L_lotteryInfos, item => {
                    var lottery = arrayUtil.findFirst(list, l => { return l.id == item.id });

                    if (lottery != null) {
                        if (lottery.refUrl == null) {
                            lottery.refUrl = item.refUrl;
                        }
                        if (lottery.filterUrl == null) {
                            lottery.filterUrl = item.filterUrl;
                        }
                        if (lottery.info == null) {
                            lottery.info = item.info;
                        }
                    }
                });

            }
        }
        if ("undefined" != typeof $L_lotteryInfos) {
            fillInfo();
        } else {
            this.loadLotteryInfoScript(function() {
                fillInfo();
            })
        }
    },
    loadLotteryInfoScript(callback) {
        var infoJsUrl = $L_appSetting.staticResourceUrl + "/front/js/lotteryInfo.js";

        fileLoader.loadScript(infoJsUrl, function() {
            if (callback) {
                callback();
            }
        })
    },




}