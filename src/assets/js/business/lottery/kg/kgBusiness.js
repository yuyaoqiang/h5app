import objectUtil from "../../../util/objectUtil"
import lotteryBussiness from "../lotteryBusiness"
import userBusiness from "../../user/userBusiness"

import arrayUtil from "../../../util/arrayUtil"
import baseData from "../../../../js/data/kgPlayTypeData"
import kgApi from "../../../api/kgApi"
import messagebox from "../../../../../controls/messageBox"
import lotteryCountdown from "../lotteryCountdown"
import platformData from "../../../../platform/main/platformData"
import appContext from "../../../context/appContext"
export default {

    kgLottery: null,
    init(kgLottery, compeleted) {
        var _this = this;
        _this.initKgLottery(kgLottery, compeleted);
    },

    initKgLottery(kgLottery, compeleted) {

        var _this = this;
        var lotteryList = userBusiness.getLotteryList();

        var initLottery = arrayUtil.findFirst(lotteryList, function(item) {
            return item.id == kgLottery.id;
        });

        if (initLottery == null) {
            initLottery = arrayUtil.findFirst(lotteryList, function(item) {
                return item.openKg == true;
            });
        }



        if (initLottery == null || initLottery.openKg == false) {
            compeleted(false);
            return;
        }

        initLottery.isKg = true; //标识着是KG彩票
        initLottery.init = false;
        initLottery.issueno = "0000-00-00";
        initLottery.status = lotteryBussiness.STATUS_LIST.init;
        initLottery.firstHistory = { issueno: "0000-00-00" }
        initLottery.history = [];
        initLottery.currentLottery={issueno:"0000-00-00",nums: "- - - - -"}
        var emptyNums = "";
        var zeroNums = "";
        var eNumLen = initLottery.type.fullNums[0].length;
        for (var i = 0; i < initLottery.type.numLen; i++) {
            emptyNums += "- ";
            for (var j = 0; j < eNumLen; j++) {
                zeroNums += "0"
            }
            zeroNums += " ";
        }
        emptyNums = emptyNums.substr(0, emptyNums.length - 1);
        initLottery.emptyNums = emptyNums;

        zeroNums = zeroNums.substr(0, zeroNums.length - 1);
        initLottery.zeroNums = zeroNums;

        initLottery.firstHistory.nums = emptyNums;

        initLottery.ballClass = "bigNum";
        initLottery.ballWidth = 52;
        if (initLottery.type.numLen > 5 && initLottery.type.numLen <= 8) {
            initLottery.ballClass = "middleNum";
            initLottery.ballWidth = 30;
        }
        if (initLottery.type.numLen > 8) {
            initLottery.ballClass = "smallNum";
            initLottery.ballWidth = 30;
        }


        if (kgLottery.init == false) {
            objectUtil.fillProperties(kgLottery, initLottery);
        }

        kgApi.init({ gameID: initLottery.id }, (resp) => {
            if (resp.code != 200) {
                messagebox.alterError(resp.msg)
                compeleted(false);
                return;
            }


            _this.destroy();



            var data = resp.data;
            var lotteryId = initLottery.id;
            //console.log(initLottery,333);

            //非六合彩(id:66)的彩种封装玩法数据源
            if (lotteryId != 66 && lotteryId != 74&&lotteryId!=203) {
                var kgType = arrayUtil.findFirst(_this.getKgTypes(), item => {
                    return item.name == initLottery.type.name
                });

                var playTypes = [];
                arrayUtil.forEach(kgType.bits, bit => {

                    var betType = data.bettype;

                    for (var key in betType) {
                        if (bit.id == (key + "")) {
                            var betTypes = betType[key];
                            if (arrayUtil.isNotEmpty(betTypes)) {
                                arrayUtil.forEach(betTypes, bt => {
                                    bt.val = null;
                                    bt.active = false;
                                })
                                var playType = { desc: bit.desc, betTypes: betTypes };
                                objectUtil.fillProperties(playType, bit);
                                playType.id = key;
                                playTypes.push(playType);
                            }
                            // betTypes.reverse()
                            break;
                        }
                    }
                });
                initLottery.kgType = kgType;
                initLottery.playTypes = playTypes;
            } else {
                //遍历接口返回的playType 根据gametypoe==1 找到一级玩法菜单
          
                var playType = data.playType;
                //一级菜单数组
                var playTypes = [];
                //baseData 定义一级菜单对应的组件名称
                var kgLhcPlayTypes;

                if(lotteryId==66||lotteryId==203){
                    kgLhcPlayTypes = baseData.kgLhcPlayTypes;
                }
                if(lotteryId==74){
                    kgLhcPlayTypes = baseData.kgXyxzPlayTypes;
                }
                for (var key in playType) {
                    //遍历对象如果gametype==1 则为一级菜单
                    if (playType[key].gametype == 1) {
                        //遍历kgLhcPlayTypes 通过id 给对应的一级菜单添加一个组件名称标识
                        arrayUtil.forEach(kgLhcPlayTypes, item => {
                                if (item.id == playType[key].id) {
                                    playType[key].viewType = item.viewType;
                                    //将满足条件的对象保存到playTypes 中
                                    var currentPlayType = playType[key];
                                    currentPlayType.betTypes = [];
                                    playTypes.push(currentPlayType);
                                }
                            })
                            

                    }
                }



                // 遍历所有投注类型 对象
                var betType = data.bettype;

                for (var key in betType) {
                    var subBetTypes = betType[key];
                    if (subBetTypes == null) {
                        continue;
                    }

                    //遍历对象下的数组
                    arrayUtil.forEach(subBetTypes, bt => {
                        //如果是普通彩种则跳过操作
                        if (bt.sixplaytype == null) {
                            return;
                        }
                        //遍历一级菜单 判断符合sixplaytype 所对应的一级菜单id
                        var type = arrayUtil.findFirst(playTypes, lpt => { return lpt.id == bt.sixplaytype });

                        //防止后台数据出错 阻塞
                        if (type == null) {
                            return;
                        }


                        //通过name值找到共有二级菜单 并保存二级菜单的字段
                        var secondBetType = arrayUtil.findFirst(type.betTypes, sbt => { return sbt.name == bt.playTypeObj.name })

                        if (secondBetType == null) {
                            secondBetType = bt.playTypeObj;
                            secondBetType.beteTypes = [];

                            type.betTypes.push(secondBetType);
                        }
                        //将投注类型push到二级菜单
                        bt.active = false;
                        bt.val = "";
                        secondBetType.beteTypes.push(bt);
                    })
                };
                /*arrayUtil.forEach(playTypes,lpt=>{
                     arrayUtil.forEach(lpt.betTypes,bt=>{
                         bt.beteTypes.reverse();
                     });
                });*/
                initLottery.playTypes = playTypes;
            }





            initLottery.data = data;

            if (initLottery.data && initLottery.data.history) {
                initLottery.data.history = initLottery.data.history || [];
                arrayUtil.forEach(initLottery.data.history, (item, i) => {
                    item.nums = item.nums || initLottery.emptyNums;
                });

                var lastHistory = initLottery.data.history[initLottery.data.history.length - 1];
                initLottery.currentLottery=lastHistory;
                for (var key in lastHistory) {
                    initLottery.firstHistory[key] = lastHistory[key];
                }
                arrayUtil.clear(initLottery.history);
                for (var i = (initLottery.data.history.length - 1); i >= 0; i--) {
                    initLottery.history.push(initLottery.data.history[i]);
                }

            }



            initLottery.token = initLottery.data.token_tz;
            appContext.tokens.lottery_token = initLottery.data.token_tz;
            initLottery.closeTimes = new Date(initLottery.data.current.closeTime).getTime();
            initLottery.serverTimes = new Date(initLottery.data.current.now).getTime();

            initLottery.countdownSeconds = (initLottery.closeTimes - initLottery.serverTimes) / 1000;
            initLottery.isClosed = initLottery.data.current.isclose;

            initLottery.issue = initLottery.data.current.lotteryNums.issueno;

            objectUtil.fillProperties(kgLottery, initLottery);
            kgLottery.refUrl = initLottery.refUrl;

            //倒计时开始1
            lotteryCountdown.start(kgLottery);

            _this.kgLottery = kgLottery;


            _this.kgLottery.init = true;
            compeleted(true);

        })
    },


    getKgTypes() {
        var types = this.kgPlayTypes;
        if (types == null) {
            types = baseData.kgPlayTypes;
            this.kgPlayTypes = types;
        }
        return types;
    },


    hideOdds(id) {
        var hideFlag = "--";
        let playTypes = this.kgLottery.playTypes;
        if (id != 66&&id!=203&&id!=74) {
            arrayUtil.forEach(playTypes, pt => {
                arrayUtil.forEach(pt.betTypes, bt => {
                    if (bt.odds != hideFlag) {
                        bt.realOdds = bt.odds;
                        bt.odds = hideFlag;
                    }
                });
            });
        } else {
            arrayUtil.forEach(playTypes, pt => {
                arrayUtil.forEach(pt.betTypes, bt => {
                    arrayUtil.forEach(bt.beteTypes, bet => {
                        if (bet.odds != hideFlag) {
                            bet.realOdds = bet.odds;
                            bet.odds = hideFlag;
                        }
                    })
                })
            });
        }
    },

    initCountdown() {
        lotteryCountdown.clear()
    },
    destroy() {
        if (this.kgLottery && this.kgLottery.init) {
            lotteryCountdown.destroy();
        }
        this.kgLottery = null;
    },


    //封盘状态
    isClose(isAlertError) {
        isAlertError = isAlertError == null ? true : isAlertError;
        if (this.kgLottery.status != lotteryBussiness.STATUS_LIST.betting) {
            if (isAlertError == true) {
                messagebox.alterError("当期已封盘,禁止该操作");
            }
            return true;
        }
        return false;
    }
}