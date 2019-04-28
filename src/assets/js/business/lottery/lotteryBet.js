import arrayUtil from '../../../js/util/arrayUtil';
import numberUtil from '../../../js/util/numberUtil';

export default {

    errors: [],
    sn: null,
    getDefaultSelectNums() {
        return new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
    },


    /*    /!**
     *
     *!/
     getBetContent(areaData){

     this.calcBetResult(areaData);
     if(areaData.betQty==0){
     //throw "请按照规则进行投注";
     }


     if(this.errors.length>0){
     //已删除重复投注项与错误投注项:'+this.errors
     }

     var betNum = this.takeBetNum(areaData.id);
     if( areaData.id == 2751 || areaData.id == 2748 ){
     betNum = '全'
     }


     var realRebate=0;
     if( areaData.rebate/1 != 0 ) {
     realRebate = areaData.userRebate;
     }

     var content=new Object();
     content.realRebate=realRebate;
     content.betNum=betNum;
     content.displayBetNum=betNum.length>25?(betNum.substring(0,54)+"..."):betNum;
     content.betQty=areaData.betQty;
     content.betAmount=areaData.betAmount;

     return content;


     },*/


    /*    private int gameId;

     private String issueNo;

     private List<WebZhuiHao> zhuiHaoQiHao;

     private List<TouZhu> touZhuHaoMa;

     private boolean tingZhiZhuiHao;

     private String mobileBet = "0";

     private String token;*/

    generateBetOrder(lottery, areaData) {

        var betOrder = new Object();

        betOrder.playTypeName = lottery.playType.parentName + "-" + lottery.playType.name;
        betOrder.playTypeId = lottery.playType.betlossId;

        var betNum;
        if (areaData.type == "text") {
            betOrder.isTextBet = true;
            betNum = areaData.selectNums[0].join(",");
        } else {
            betNum = this.takeBetNum(areaData);
        }

        betOrder.betNum = betNum;
        betOrder.simpleBetNum = betNum.length > 11 ? (betNum.substring(0, 10) + "...") : betNum;

        var digit = "无";
        if (lottery.bitPositions) {
            digit = lottery.bitPositions.join(",");
        }

        betOrder.digit = digit;

        betOrder.multiple = areaData.multiple;
        betOrder.unit = areaData.unit;
        betOrder.betQty = areaData.betQty;
        betOrder.betAmount = areaData.betAmount;
        areaData.hasLi ? betOrder.hasLi = true : betOrder.hasLi = false;
        betOrder.bouse = lottery.data.user;

        // betOrder.yongHuSuoTiaoFanDian = areaData.bonusValue;
        betOrder.bonusValue = areaData.bonusValue;

        var bonus = arrayUtil.findFirst(areaData.bonusValues, function (item) {
            return item.val == areaData.bonusValue;
        });
        betOrder.chooseBonus = bonus;


        betOrder.singleBet = this.getSingleBetInfo(lottery, betOrder.betQty);

        return betOrder;
    },

    getSingleBetInfo(lottery, betQty) {
        try {
            var data = lottery.data;

            var bettype = data.bettype[lottery.playType.betlossId];

            var singleMaxBetCount = bettype.singleMaxBetCount;

            var maxBetCount = bettype.maxBetCount;

            if (singleMaxBetCount >= betQty) {
                var scale = 0;
                var maxMoney = 0;
                if (maxBetCount >= 10000) {
                    scale = data.singledInfo.scales;
                    maxMoney = data.singledInfo.maxmoney
                } else if (maxBetCount >= 1000 && maxBetCount < 10000) {
                    scale = data.singledInfo.scales2;
                    maxMoney = data.singledInfo.maxmoney2;
                } else if (maxBetCount >= 100 && maxBetCount < 1000) {
                    scale = data.singledInfo.scales3;
                    maxMoney = data.singledInfo.maxmoney3;
                } else if (maxBetCount >= 10 && maxBetCount < 100) {
                    scale = data.singledInfo.scales4;
                    maxMoney = data.singledInfo.maxmoney4;
                }

                /*  var desc="<span color='red'>单挑</span>";
                 desc+="<br/>该玩法下注注数小于最高注数的"+scale+"%即为单挑,最高中奖额为"+maxMoney+"元";
                 */

                return {isSingleBet: true, scale: scale, maxMoney: maxMoney};
            }
        } catch (ex) {
            console.error(ex);
        }
        return {isSingleBet: false};
    },

    /**
     * 计算投注结果
     * @param playTypeId
     * @param areaData
     * @returns {{qty: *, amount: number, bonus: number}}
     */
    calcBetResult(lottery, areaData, num) {
        var betQty = this.calcBetQty(areaData, num);
        var betAmount = 0;
        if (betQty > 0) {

            var multiple = areaData.multiple / 1;
            var unit = areaData.unit / 1;
            var lines = areaData.lines;

            betAmount = betQty * 2 * multiple / unit;

            var bouns = multiple * lines * 2 / unit;

            var maxWinMoney = lottery.data.game.maxwinmoney;

            if (bouns > maxWinMoney) {
                bouns = maxWinMoney;
            }
            areaData.bonus = numberUtil.toFixed(bouns);

        } else {
            betQty = 0;
        }
        areaData.betQty = betQty;
        areaData.betAmount = betAmount;

        if (areaData.id == 2745) {
            this.calc2745BetResult(lottery, areaData);
        }

    },


    /**
     * 计算ID为2745玩法的投注情况
     */
    calc2745BetResult(lottery, areaData) {
        if (lottery.data.oddsInfos === undefined) return;

        var oddsInfosArray = lottery.data.oddsInfos;
        for (var i = 0; i < oddsInfosArray.length; i++) {
            var number = oddsInfosArray[i].specialNumber;
            if (number == areaData.currentBetVal) {
                areaData.award = (oddsInfosArray[i].odds / 1).toFixed(2);
                areaData.lines = (oddsInfosArray[i].odds / 2).toFixed(2);
                areaData.bonus = oddsInfosArray[i].odds;
                break;
            }
        }
    },


    /**
     * 计算单式投注结果
     * @param obj
     */
    caclSingleBetResult(lottery, areaData, isRemoveRepeat) {
        var value = areaData.betContent.replace(/\D+/g, "");

        var customChioceData = areaData.customChioceData;
        var isAlterNum = customChioceData.isAlterNum;

        var numLen = isAlterNum ? customChioceData.customChoice : customChioceData.minCustomChoice;
        var numArray = this.StringToArray(value, numLen);
        if (numArray.length == 0) {
            areaData.betQty = 0;
            areaData.betAmount = 0;
            return;
        }


        var isContinue = false;
        if (isRemoveRepeat) {
            numArray = arrayUtil.removeRepeat(numArray);
            isContinue = numArray.length > 0;
        } else {
            isContinue = value.length % numLen == 0;
        }


        if (isContinue) {

            areaData.selectNums = new Array();
            areaData.selectNums.push(numArray);

            if (numArray.length > 0) {
                areaData.betContent = numArray.join(",") //+ ",";
            }

            this.calcBetResult(lottery, areaData, isRemoveRepeat);

            /* if (isAlterNum) {

             var multiple = areaData.multiple / 1;
             var unit = areaData.unit / 1;
             var lines = areaData.lines;

             areaData.betQty = numArray.length;
             areaData.betAmount = areaData.betQty * 2 * Number(multiple) / Number(unit);


             var bonus = multiple * lines * 2 / unit;

             var maxWinMoney = lottery.data.game.maxwinmoney;

             if (bonus > maxWinMoney) {
             bonus = maxWinMoney;
             }

             areaData.bonus = bonus;

             } else {
             this.calcBetResult(lottery, areaData);
             }*/
        }
    },


    /**
     * 计算注数
     */
    calcBetQty(areaData, num) {
        this.errors = [];
        var selectNums = areaData.selectNums;

        var customChoice = 0;
        if (areaData.customBit) {
            customChoice = arrayUtil.count(areaData.customBit, item => {
                return item.checked == true
            });
        }

        var betCount = 0;

        switch (areaData.id) {
            // ------------------时时彩  -----------------//
            case 7: // 三星  后三直选
            case 9: //三星  前三直选
            case 11: //三星  中三直选
                betCount = selectNums[0].length * selectNums[1].length * selectNums[2].length;
                break;
            case 203: //三星 直选跨度
            case 204:
            case 205:
                var cc = {
                    0: 10,
                    1: 54,
                    2: 96,
                    3: 126,
                    4: 144,
                    5: 150,
                    6: 144,
                    7: 126,
                    8: 96,
                    9: 54
                };
                for (var i = 0; i < selectNums[0].length; i++) {
                    betCount += cc[parseInt(selectNums[0][i])];
                }
                break;
            case 423: //三星 直选和值
            case 424:
            case 425:
                var allBetNumCount = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1];

                var selectNums = selectNums[0];
                var betQty = 0;
                for (var i = 0; i < selectNums.length; i += 1) {
                    betQty += allBetNumCount[selectNums[i]];
                }

                betCount = betQty;
                /*for (var i = 0; i < selectNums[0].length; i += 1) {
                 var numzhu = false;
                 for (var j = 0; j < 10; j += 1) {
                 for (var k = 0; k < 10; k += 1) {
                 for (var x = 0; x < 10; x += 1) {
                 if (j + k + x == selectNums[0][i]) {
                 numzhu = true;
                 break;
                 }
                 }
                 if(numzhu) break;
                 }
                 if(numzhu) break;
                 }
                 if(numzhu)
                 betCount = 1;
                 break;
                 }*/
                break;
            case 8: //三星 直选单式
            case 10:
            case 12:
                var arr = this.unique(selectNums[0], 3);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 14: // 三星 组三复式
            case 17:
            case 20:
                betCount = this.Cnm(selectNums[0].length, 2) * 2;
                break;
            case 418: //三星 组三单式
            case 420:
            case 422:
                if (typeof num == 'number') {
                    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    selectNums[0] = this.getRandom(arr, 2)
                    selectNums[0] = [selectNums[0][0] + '' + selectNums[0][0].split('')[1]]
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.uniqueCnm3(selectNums[0], 3);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 19: //三星 组六复式
            case 16:
            case 13:
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 417: //三星 组六单式
            case 419:
            case 421:
                if (typeof num == 'number') {
                    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    selectNums[0] = this.getRandom(arr, 3)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.uniqueCnm6(selectNums[0], 3);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 15:
            case 18:
            case 21:
            case 34: //任选 任三组选混合
                var arr = this.uniqueCnm(selectNums[0], 3);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 22: // 二星 前二直选复式
            case 24:
            case 3201: //大小单双
            case 3200:
                betCount = selectNums[0].length * selectNums[1].length;
                break;
            case 26: // 二星 组选组二
            case 28:
            case 35: // 任选 任二组选组二
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 23: //二星 直选单式
            case 25:
                var arr = this.unique(selectNums[0], 2);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 431: //二星 直选和值
            case 432:
                for (var i = 0; i < selectNums[0].length; i += 1) {
                    var numzhu = 0;
                    for (var j = 0; j < 10; j += 1) {
                        for (var k = 0; k < 10; k += 1) {
                            if (j + k == selectNums[0][i]) {
                                numzhu = numzhu + 1;
                            }
                        }
                    }
                    betCount += numzhu;
                }
                break;
            case 206: //二星 直选跨度
            case 207:
                var cc = {
                    0: 10,
                    1: 18,
                    2: 16,
                    3: 14,
                    4: 12,
                    5: 10,
                    6: 8,
                    7: 6,
                    8: 4,
                    9: 2
                };
                for (var i = 0; i < selectNums[0].length; i++) {
                    betCount += cc[parseInt(selectNums[0][i])];
                }
                break;
            case 29: //二星 组选混合
            case 27: //二星 组选单式
            case 36: //任选 任二组选混合
                if (typeof num == 'number') {
                    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    selectNums[0] = this.getRandom(arr, 2)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.uniqueCnm(selectNums[0], 2);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 208: //二星 组选包胆
            case 209:
                betCount = selectNums[0].length * 9;
                break;
            case 30: //任选 任选直选复式
                var flag = false;
                betCount = 1;
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (var s in nums) {
                    if (nums[s].length > 0) { //某位上的号码不为空时才乘以所选号码的个数
                        betCount = betCount * nums[s].length;
                        flag = true;
                    }
                }
                if (!flag) betCount = 0; //如果每位上都没有选择号码则注数为0
                break;
            case 31: //任选直选单式
                var arr = this.unique(selectNums[0], customChoice);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 37: //不定位胆 三星，四星 一码
            case 38:
            case 39:
            case 210:
                betCount = selectNums[0].length;
                break;
            case 426: //不定位胆 三星 四星 五星 二码
            case 428:
            case 427:
            case 429:
            case 40:
                betCount = selectNums[0].length * (selectNums[0].length - 1) / 2;
                break;
            case 430: //不定位胆 五星三码
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 41: //五星定位胆
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (var s in nums) {
                    betCount += selectNums[s].length;
                }
                break;
            case 211: //趣味
            case 212:
            case 213:
            case 214:
            case 3189: //龙虎
            case 3190:
            case 3191:
            case 3192:
            case 3193:
            case 3194:
            case 3195:
            case 3196:
            case 3197:
            case 3198:
            case 3199: //总和
                betCount = selectNums[0].length;
                break;
            case 697: //五星直选 直选复式
                betCount = selectNums[0].length * selectNums[1].length * selectNums[2].length * selectNums[3].length * selectNums[4].length;
                break;
            case 698: //五星直选 直选单式
                var arr = this.unique(selectNums[0], 5);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 699: //五星直选 五星组合
                var count = 1;
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (var s in nums) {
                    count *= selectNums[s].length;
                }
                betCount = count * 5;
                break;
            case 700: //五星组选 组选120
                if (selectNums[0].length > 4) {
                    betCount = this.Cnm(selectNums[0].length, 5);
                }
                break;
            case 701: //五星组选 组选60
                var m1 = 1,
                    m2 = 3,
                    count = 0;
                if (selectNums[0].length >= m1 && selectNums[1].length >= m2) {
                    var c = 0; //交集个数
                    for (var s in selectNums[0]) {
                        var value = selectNums[0][s];
                        if ($.inArray(value, selectNums[1]) != -1) c++;
                    }
                    count = this.Cnm(selectNums[0].length, m1) * this.Cnm(selectNums[1].length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 1) * this.Cnm(selectNums[1].length - 1, 2);
                    }
                }
                betCount = count;
                break;
            case 702: //五星组选 组选30

                var a = selectNums[0],
                    b = selectNums[1],
                    m1 = 2,
                    m2 = 1,
                    count = 0;
                if (a.length >= m1 && b.length >= m2) {
                    var c = 0; //交集个数
                    for (var s in a) {
                        var value = a[s];
                        if ($.inArray(value, b) != -1) c++;
                    }
                    count = this.Cnm(a.length, m1) * this.Cnm(b.length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 2) * this.Cnm(2, 1);
                        if (a.length - c > 0) {
                            count -= this.Cnm(c, 1) * this.Cnm(a.length - c, 1);
                        }
                    }
                }
                betCount = count;
                break;
            case 703: //五星组选 组选20
                var a = selectNums[0],
                    b = selectNums[1],
                    m1 = 1,
                    m2 = 2,
                    count = 0;
                if (a.length >= m1 && b.length >= m2) {
                    var c = 0; //交集个数
                    for (var s in a) {
                        var value = a[s];
                        if ($.inArray(value, b) != -1) c++;
                    }
                    count = this.Cnm(a.length, m1) * this.Cnm(b.length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 1) * this.Cnm(b.length - 1, 1);
                    }
                }
                betCount = count;
                break;
            case 704: //五星组选 组选10
                var a = selectNums[0],
                    b = selectNums[1],
                    m1 = 1,
                    m2 = 1;
                var count = 0;
                if (a.length >= m1 && b.length >= m2) {
                    var c = 0; //交集个数
                    for (var s in a) {
                        var value = a[s];
                        if ($.inArray(value, b) != -1) c++;
                    }
                    count = this.Cnm(a.length, m1) * this.Cnm(b.length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 1);
                    }
                }
                betCount = count;
                break;
            case 705: //五星组选 组选5
                var a = selectNums[0],
                    b = selectNums[1],
                    m1 = 1,
                    m2 = 1;
                var count = 0;
                if (a.length >= m1 && b.length >= m2) {
                    var c = 0; //交集个数
                    for (var s in a) {
                        var value = a[s];
                        if ($.inArray(value, b) != -1) c++;
                    }
                    count = this.Cnm(a.length, m1) * this.Cnm(b.length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 1);
                    }
                }
                betCount = count;
                break;
            case 706: //四星直选 直选复式
                betCount = selectNums[0].length * selectNums[1].length * selectNums[2].length * selectNums[3].length;
                break;
            case 707: //四星直选 直选单式
                var arr = this.unique(selectNums[0], 4);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 708: //四星直选 四星组合
                betCount = selectNums[0].length * selectNums[1].length * selectNums[2].length * selectNums[3].length * 4;
                break;
            case 709: //四星组选 组选24
                if (selectNums[0].length > 3) {
                    betCount += this.Cnm(selectNums[0].length, 4);
                }
                break;
            case 710: //四星组选 组选12
                var a = selectNums[0],
                    b = selectNums[1],
                    m1 = 1,
                    m2 = 2,
                    count = 0;
                if (a.length >= m1 && b.length >= m2) {
                    var c = 0; //交集个数
                    for (var s in a) {
                        var value = a[s];
                        if ($.inArray(value, b) != -1) c++;
                    }
                    count = this.Cnm(a.length, m1) * this.Cnm(b.length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 1) * this.Cnm(b.length - 1, 1);
                    }
                }
                betCount = count;
                break;
            case 711: //四星组选 组选6
                if (selectNums[0].length >= 2) {
                    betCount += this.Cnm(selectNums[0].length, 2);
                }
                break;
            case 712: //四星组选 组选4
                var a = selectNums[0],
                    b = selectNums[1],
                    m1 = 1,
                    m2 = 1,
                    count = 0;
                if (a.length >= m1 && b.length >= m2) {
                    var c = 0; //交集个数
                    for (var s in a) {
                        var value = a[s];
                        if ($.inArray(value, b) != -1) c++;
                    }
                    count = this.Cnm(a.length, m1) * this.Cnm(b.length, m2);
                    if (c > 0) {
                        count -= this.Cnm(c, 1);
                    }
                }
                betCount = count;
                break;
            case 613: //任选二 直选复式
                var s = [];
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (var index in nums) {
                    var ns = nums[index];
                    if (ns.length > 0)
                        s.push(ns);
                }
                var tmpNums = 1;
                var CmnArray = this.Combination(s, 2);
                for (var index in CmnArray) {
                    var cs = CmnArray[index];
                    tmpNums = 1;
                    var arr = cs.split("|", -1);
                    for (var index in arr) {
                        var n = arr[index];
                        tmpNums *= n.split(",", -1).length;
                    }
                    betCount += tmpNums;
                }
                break;
            case 614: //任选二 直选单式
                var arr = this.unique(selectNums[0], 2);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length * this.Cnm(customChoice, 2);
                break;
            case 615: //任选二 直选和值
                var count = 0;
                var datas = {
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    5: 6,
                    6: 7,
                    7: 8,
                    8: 9,
                    9: 10,
                    10: 9,
                    11: 8,
                    12: 7,
                    13: 6,
                    14: 5,
                    15: 4,
                    16: 3,
                    17: 2,
                    18: 1
                };
                for (var index in selectNums[0]) {
                    var s = selectNums[0][index] / 1;
                    count += datas[s];
                }
                betCount = count * this.Cnm(customChoice, 2);
                break;
            case 616: //任选二 组选复式
                var count = selectNums[0].length * (selectNums[0].length - 1) / 2;
                betCount = count * this.Cnm(customChoice, 2);
                break;
            case 617: //任选二 组选单式
                if (typeof num == 'number') {
                    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    selectNums[0] = this.getRandom(arr, 2)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.uniqueCnm(selectNums[0], 2);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length * this.Cnm(customChoice, 2);
                }
                break;
            case 618: //任选二 组选和值
                var count = 0;
                var datas = {
                    0: 0,
                    1: 1,
                    2: 1,
                    3: 2,
                    4: 2,
                    5: 3,
                    6: 3,
                    7: 4,
                    8: 4,
                    9: 5,
                    10: 4,
                    11: 4,
                    12: 3,
                    13: 3,
                    14: 2,
                    15: 2,
                    16: 1,
                    17: 1,
                    18: 0
                };
                for (var index in selectNums[0]) {
                    var s = selectNums[0][index] / 1;
                    count += datas[s];
                }
                betCount = count * this.Cnm(customChoice, 2);
                break;
            case 619: //任选三 直选复式
                var s = [];
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (var index in nums) {
                    var ns = nums[index];
                    if (ns.length > 0)
                        s.push(ns);
                }
                var tmpNums = 1;
                var CmnArray = this.Combination(s, 3);
                for (var index in CmnArray) {
                    tmpNums = 1;
                    var cs = CmnArray[index];
                    var arr = cs.split("|", -1);
                    for (var index in arr) {
                        var n = arr[index];
                        tmpNums *= n.split(",", -1).length;
                    }
                    betCount += tmpNums;
                }
                break;
            case 620: //任选三 直选单式
                var arr = this.unique(selectNums[0], 3);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length * this.Cnm(customChoice, 3);
                break;
            case 621: //任选三 直选和值
                var datas = {
                    0: 1,
                    1: 3,
                    2: 6,
                    3: 10,
                    4: 15,
                    5: 21,
                    6: 28,
                    7: 36,
                    8: 45,
                    9: 55,
                    10: 63,
                    11: 69,
                    12: 73,
                    13: 75,
                    14: 75,
                    15: 73,
                    16: 69,
                    17: 63,
                    18: 55,
                    19: 45,
                    20: 36,
                    21: 28,
                    22: 21,
                    23: 15,
                    24: 10,
                    25: 6,
                    26: 3,
                    27: 1
                };
                var count = 0;
                for (var index in selectNums[0]) {
                    var s = selectNums[0][index] / 1;
                    count += datas[s];
                }
                betCount = count * this.Cnm(customChoice, 3);
                break;
            case 622: //任选三 组三复式
                var n = selectNums[0].length;
                var count = n * (n - 1);
                betCount = count * this.Cnm(customChoice, 3);
                break;
            case 623: //任选三 组三单式
                if (typeof num == 'number') {
                    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    selectNums[0] = this.getRandom(arr, 2)
                    selectNums[0] = [selectNums[0][0] + '' + selectNums[0][0].split('')[1]]
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.uniqueCnm3(selectNums[0], 3);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length * this.Cnm(customChoice, 3);
                }

                break;
            case 624: //任选三 组六复式
                betCount = this.Cnm(selectNums[0].length, 3) * this.Cnm(customChoice, 3);
                break;
            case 625: //任选三 组六单式
                if (typeof num == 'number') {
                    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    selectNums[0] = this.getRandom(arr, 3)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.uniqueCnm6(selectNums[0], 3);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length * this.Cnm(customChoice, 3);
                }
                break;
            case 626: //任选三 混合组选
                var arr = this.uniqueCnm(selectNums[0], 3);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length * this.Cnm(customChoice, 3);
                break;
            case 628: //任选四 直选复式
                var s = [];
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (var index in nums) {
                    var ns = nums[index];
                    if (ns.length > 0)
                        s.push(ns);
                }
                var tmpNums = 1;
                var CmnArray = this.Combination(s, 4);
                for (var index in CmnArray) {
                    tmpNums = 1;
                    var cs = CmnArray[index];
                    var arr = cs.split("|", -1);
                    for (var index in arr) {
                        var n = arr[index];
                        tmpNums *= n.split(",", -1).length;
                    }
                    betCount += tmpNums;
                }
                break;
            case 629: //任选四 直选单式
                var arr = this.unique(selectNums[0], 4);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length * this.Cnm(customChoice, 4);
                break;
            case 630: //任选四 组选24
                var count = selectNums[0].length < 4 ? 0 : this.Cnm(selectNums[0].length, 4);
                betCount = count * this.Cnm(customChoice, 4);
                break;
            case 631: //任选四 组选12
                if (selectNums[0].length < 1 || selectNums[1].length < 2) return 0;
                var c = 0; //交集个数
                for (var s in selectNums[0]) {
                    var value = selectNums[0][s];
                    if ($.inArray(value, selectNums[1]) != -1) c++;
                }
                var count = this.Cnm(selectNums[0].length, 1) * this.Cnm(selectNums[1].length, 2);
                if (c > 0) {
                    count -= this.Cnm(c, 1) * this.Cnm(selectNums[1].length - 1, 1);
                }
                betCount = count * this.Cnm(customChoice, 4);
                break;
            case 632: //任选四 组选6
                var count = selectNums[0].length < 2 ? 0 : this.Cnm(selectNums[0].length, 2);
                betCount = count * this.Cnm(customChoice, 4);
                break;
            case 633: //任选四 组选4
                if (selectNums[0].length < 1 || selectNums[1].length < 1) return 0;
                var c = 0; //交集个数
                for (var s in selectNums[0]) {
                    var value = selectNums[0][s];
                    if ($.inArray(value, selectNums[1]) != -1) c++;
                }
                var d = this.Cnm(selectNums[0].length, 1) * this.Cnm(selectNums[1].length, 1);
                if (c > 0) {
                    d -= this.Cnm(c, 1);
                }
                betCount = d * this.Cnm(customChoice, 4);
                break;
            //------------------11选5 -----------------//
            case 168: //11选五-(三星直选 直选复式	前、中、后)
            case 170:
            case 172:
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        for (var k = 0; k < selectNums[2].length; k++) {
                            if (selectNums[0][i] != selectNums[1][j] && selectNums[0][i] != selectNums[2][k] && selectNums[1][j] != selectNums[2][k]) {
                                betCount++;
                            }
                        }
                    }
                }
                break;
            case 169: //11选五-(三星直选 直选单式	前、中、后)
            case 171:
            case 173:
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 3)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZhiXuan(selectNums[0], 6);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 174: //11选五-(三星组选 组选复式	前、中、后)
            case 177:
            case 180:
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 175: //11选五-(三星组选 组选单式	前、中、后)
            case 178:
            case 181:
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 3)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 6);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 176: //11选五-(三星组选 组选胆拖	前、中、后)
            case 179:
            case 182:
                var dan = new Array();
                var len = selectNums[0].length;
                if (len > 2) {
                    dan[0] = selectNums[0][0];
                    dan[1] = selectNums[0][len - 1];
                    selectNums[0] = dan;
                }

                for (var t in selectNums[0]) {
                    this.save(selectNums[1], selectNums[0][t], "clear");
                }

                var danlen = selectNums[0].length;
                var tuolen = selectNums[1].length;
                if (danlen < 1 || tuolen < 1 || danlen >= 3) {
                    betCount = 0;
                } else {
                    betCount = this.Cnm(tuolen, 3 - danlen);
                }
                break;
            case 183: //11选五-(二星直选 直选复式	前、后)
            case 185:
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        if (selectNums[0][i] != selectNums[1][j]) {
                            betCount++;
                        }
                    }
                }
                break;
            case 184: //11选五-(二星直选 直选单式	前、后)
            case 186:
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 2)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZhiXuan(selectNums[0], 4);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 187:
            case 189:
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 188: //11选五-(二星组选 组选复式	前、后)
            case 190:
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 2)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 4);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 586: //11选五-(二星组选 组选胆拖	前、后)
            case 587:
                var dan = new Array();
                var len = selectNums[0].length;
                if (len > 1) {
                    dan[0] = selectNums[0][len - 1];
                    selectNums[0] = dan;
                }

                for (var t in selectNums[0]) {
                    this.save(selectNums[1], selectNums[0][t], "clear");
                }

                var danlen = selectNums[0].length;
                var tuolen = selectNums[1].length;
                if (danlen < 1 || tuolen < 1 || danlen >= 2) {
                    betCount = 0;
                } else {
                    betCount = this.Cnm(tuolen, 2 - danlen);
                }
                break;
            case 385: //11选五-(任选复式 任选一中一)
                if (selectNums[0].length < 1) return 0;
                betCount = this.Cnm(selectNums[0].length, 1);
                break;
            case 386: //11选五-(任选复式 任选二中二)
                if (selectNums[0].length < 2) return 0;
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 387: //11选五-(任选复式 任选三中三)
                if (selectNums[0].length < 3) return 0;
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 388: //11选五-(任选复式 任选四中四)
                if (selectNums[0].length < 4) return 0;
                betCount = this.Cnm(selectNums[0].length, 4);
                break;
            case 389: //11选五-(任选复式 任选五中五)
                if (selectNums[0].length < 5) return 0;
                betCount = this.Cnm(selectNums[0].length, 5);
                break;
            case 390: //11选五-(任选复式 任选六中五)
                if (selectNums[0].length < 6) return 0;
                betCount = this.Cnm(selectNums[0].length, 6);
                break;
            case 391: //11选五-(任选复式 任选七中五)
                if (selectNums[0].length < 7) return 0;
                betCount = this.Cnm(selectNums[0].length, 7);
                break;
            case 392: //11选五-(任选复式 任选八中五)
                if (selectNums[0].length < 8) return 0;
                betCount = this.Cnm(selectNums[0].length, 8);
                break;
            case 393: //11选五-(任选单式 任选一中一)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 1)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 2);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 394: //11选五-(任选单式 任选二中二)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 2)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 4);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 395: //11选五-(任选单式 任选三中三)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 3)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 6);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 396: //11选五-(任选单式 任选四中四)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 4)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 8);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 397: //11选五-(任选单式 任选五中五)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 5)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 10);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 398: //11选五-(任选单式 任选六中五)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 6)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 12);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 399: //11选五-(任选单式 任选七中五)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 7)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 14);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 400: //11选五-(任选单式 任选八中五)
                if (typeof num == 'number') {
                    var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
                    selectNums[0] = this.getRandom(arr, 8)
                    betCount = selectNums[0].length;
                } else {
                    var arr = this.unique11X5ZuXuan(selectNums[0], 16);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 198: //11选五-(不定位胆 三星不定位胆)
            case 200:
            case 199:
                betCount = selectNums[0].length;
                break;
            case 202: //11选五-(定位胆	五星定位胆)
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2], selectNums[3], selectNums[4]);
                for (s in nums) {
                    betCount = betCount + nums[s].length;
                }
                break;
            // ------------------福彩3D和排列三-----------------//
            case 106: //三星直选复式
                betCount = selectNums[0].length * selectNums[1].length * selectNums[2].length;
                break;
            case 107: //三星 直选单式
                var arr = this.unique(selectNums[0], 3);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 109: //三星组选组三
                betCount = selectNums[0].length * (selectNums[0].length - 1);
                break;
            case 108: //三星组选组六
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 110: //三星组选混合
                var arr = this.uniqueCnm(selectNums[0], 3);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 111: //二星直选复式
            case 113:
                betCount = selectNums[0].length * selectNums[1].length;
                break;
            case 112: //二星直选单式
            case 114:
                var arr = this.unique(selectNums[0], 2);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 115: //二星 组选组二
            case 117:
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 116: //二星 组选混合
            case 118:
                var arr = this.uniqueCnm(selectNums[0], 2);
                selectNums[0] = arr[0];
                this.errors = arr[1];
                betCount = selectNums[0].length;
                break;
            case 119: //一码不定位胆
                betCount = selectNums[0].length;
                break;
            case 481: //二码不定位胆
                if (selectNums[0].length >= 2) {
                    betCount = selectNums[0].length * (selectNums[0].length - 1) / 2;
                }
                break;
            case 120: //三星定位胆
                var nums = new Array(selectNums[0], selectNums[1], selectNums[2]);
                for (s in nums) {
                    betCount += nums[s].length;
                }
                break;
            // ------------------北京快乐8-----------------//
            case 375:
                betCount = this.Cnm(selectNums[0].length, 1);
                break;
            case 376:
                if (selectNums[0].length >= 2) {
                    betCount = this.Cnm(selectNums[0].length, 2);
                }
                break;
            case 377:
                if (selectNums[0].length >= 3) {
                    betCount = this.Cnm(selectNums[0].length, 3);
                }
                break;
            case 378:
                if (selectNums[0].length >= 4) {
                    betCount = this.Cnm(selectNums[0].length, 4);
                }
                break;
            case 379:
                if (selectNums[0].length >= 5) {
                    betCount = this.Cnm(selectNums[0].length, 5);
                }
                break;
            case 380:
                if (selectNums[0].length >= 6) {
                    betCount = this.Cnm(selectNums[0].length, 6);
                }
                break;
            case 381:
                if (selectNums[0].length >= 7) {
                    betCount = this.Cnm(selectNums[0].length, 7);
                }
                break;
            case 382:
            case 383:
            case 384:
                betCount = selectNums[0].length;
                break;
            // --------------- PK10 || pk8 -----------//
            case 1835: //前一 直选复式
            case 3330:
                betCount = selectNums[0].length;
                break;
            case 3308:
            case 1836: //前二 直选复式
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        if (selectNums[0][i] != selectNums[1][j]) {
                            betCount++;
                        }
                    }
                }
                break;
            case 1837: //前二 直选单式
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08','09','10'];
                    selectNums[0] = this.getRandom(arr,2)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 4);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 3309: //前二 直选单式
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08'];
                    selectNums[0] = this.getRandom(arr,2)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 4);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 3310:
            case 1838: //前三 直选复式
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        for (var k = 0; k < selectNums[2].length; k++) {
                            if (selectNums[0][i] != selectNums[1][j] && selectNums[0][i] != selectNums[2][k] && selectNums[1][j] != selectNums[2][k]) {
                                betCount++;
                            }
                        }
                    }
                }
                break;
            case 1839: //前三 直选单式
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08','09','10'];
                    selectNums[0] = this.getRandom(arr,3)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 6);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 3311: //前三 直选单式
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08',];
                    selectNums[0] = this.getRandom(arr,3)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 6);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 3313:
            case 3202: //前四直选复式
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        for (var k = 0; k < selectNums[2].length; k++) {
                            for (var n = 0; n < selectNums[3].length; n++) {
                                if (selectNums[0][i] != selectNums[1][j] && selectNums[0][i] != selectNums[2][k] && selectNums[0][i] != selectNums[3][n] &&
                                    selectNums[1][j] != selectNums[2][k] && selectNums[1][j] != selectNums[3][n] &&
                                    selectNums[2][k] != selectNums[3][n]) {
                                    betCount++;
                                }
                            }

                        }
                    }
                }
                break;
            case 3203:
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08','09','10'];
                    selectNums[0] = this.getRandom(arr,4)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 8);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 3314:
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08'];
                    selectNums[0] = this.getRandom(arr,4)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 8);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }

                break;
            case 3315:
            case 3204: //前五直选复式
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        for (var k = 0; k < selectNums[2].length; k++) {
                            for (var n = 0; n < selectNums[3].length; n++) {
                                for (var m = 0; m < selectNums[4].length; m++) {
                                    if (selectNums[0][i] != selectNums[1][j] && selectNums[0][i] != selectNums[2][k] && selectNums[0][i] != selectNums[3][n] && selectNums[0][i] != selectNums[4][m] &&
                                        selectNums[1][j] != selectNums[2][k] && selectNums[1][j] != selectNums[3][n] && selectNums[1][j] != selectNums[4][m] &&
                                        selectNums[2][k] != selectNums[3][n] && selectNums[2][k] != selectNums[4][m] &&
                                        selectNums[3][n] != selectNums[4][m]
                                    ) {
                                        betCount++;
                                    }
                                }

                            }

                        }
                    }
                }
                break;
            case 3205:
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08','09','10'];
                    selectNums[0] = this.getRandom(arr,5)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 10);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            case 3316:
                if(typeof num == 'number'){
                    var arr = ['01','02','03','04','05','06','07','08'];
                    selectNums[0] = this.getRandom(arr,5)
                    betCount = selectNums[0].length;
                }else{
                    var arr = this.uniquePK10(selectNums[0], 10);
                    selectNums[0] = arr[0];
                    this.errors = arr[1];
                    betCount = selectNums[0].length;
                }
                break;
            //龙虎 冠亚
            case 3206:
            case 3207:
            case 3208:
            case 3209:
            case 3210:
            case 3218:
            case 3219:
            case 3220:
            case 3221:
            case 3222:
            case 3223:
            case 3224:

            case 3317:
            case 3318:
            case 3319:
            case 3320:
            case 3322:
            case 3323:
            case 3324:
            case 3326:
            case 3327:
            case 3328:
                betCount = selectNums[0].length;
                break;
            case 3312:
            case 1840: //定位胆 定位胆
                for (s in selectNums) {
                    betCount += selectNums[s].length;
                }
                break;
            // --------------- 快三  -----------//
            case 2745:
            case 2746:
            case 2749:
            case 2748:
            case 2752:
            case 2751:
                for (s in selectNums) {
                    betCount += selectNums[s].length;
                }
                break;
            case 2747:
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 2750:
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            // --------------- 快乐彩  -----------//
            case 3229:
            case 3226:
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        for (var k = 0; k < selectNums[2].length; k++) {
                            if (selectNums[0][i] != selectNums[1][j] && selectNums[0][i] != selectNums[2][k] && selectNums[1][j] != selectNums[2][k]) {
                                betCount++;
                            }
                        }
                    }
                }
                break;
            case 3235:
            case 3232:
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 3241:
                for (var i = 0; i < selectNums[0].length; i++) {
                    for (var j = 0; j < selectNums[1].length; j++) {
                        if (selectNums[0][i] != selectNums[1][j]) {
                            betCount++;
                        }
                    }
                }
                break;
            case 3238:
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 3244:
                if (selectNums[0].length < 1) return 0;
                betCount = this.Cnm(selectNums[0].length, 1);
                break;
            case 3247:
                if (selectNums[0].length < 2) return 0;
                betCount = this.Cnm(selectNums[0].length, 2);
                break;
            case 3250:
                if (selectNums[0].length < 3) return 0;
                betCount = this.Cnm(selectNums[0].length, 3);
                break;
            case 3253:
                if (selectNums[0].length < 4) return 0;
                betCount = this.Cnm(selectNums[0].length, 4);
                break;
            case 3256:
                if (selectNums[0].length < 5) return 0;
                betCount = this.Cnm(selectNums[0].length, 5);
                break;
            case 3259:
            case 3262:
            case 3265:
                for (s in selectNums) {
                    betCount += selectNums[s].length;
                }
                break;
            case 3292:
            case 3294:
            case 3268:
            case 3271:
            case 3274:
            case 3277:
            case 3280:
            case 3283:
            case 3286:
            case 3289:
                betCount = selectNums[0].length;
                break;
        }
        return betCount;
    },


    //封装投注号码
    takeBetNum(areaData) {

        var betArray = areaData.selectNums;

        var new_array = new Array();

        switch (areaData.id) {
            case 41: //时时彩5星定位胆
            case 82:
            case 267:
            case 321:
            case 374: //十一选五5星定位胆
            case 202:
            case 517:
            case 560:
            case 2302:
            case 1656: //分分彩5星定位胆
            case 1773:
            case 2035:
            case 2572:
            case 2847:
            case 2947:
            case 3047:
            case 3147:
                for (var i = 0; i < 5; i++) {
                    new_array.push(betArray[i].sort(this.asc_sort));
                }
                break;

            case 1840: //PK10定位胆
                for (var i in betArray) {
                    new_array.push(betArray[i].sort(this.asc_sort));
                }
                break;
            case 3312: //PK8定位胆
                for(var i=0;i<8;i++){
                    new_array.push(betArray[i].sort(this.asc_sort));
                }
                break;
            case 3259: //快乐彩定位胆
            case 3262:
            case 3265:
                for (var i = 0; i < 8; i++) {
                    new_array.push(betArray[i].sort(this.asc_sort));
                }
                break;
            case 120: //福彩3D三星定位胆
            case 139: //排列3三星定位胆
                for (var i = 0; i < 3; i++) {
                    new_array.push(betArray[i].sort(this.asc_sort));
                }
                break;
            case 613:
            case 634: //任选二 直选复式
            case 655:
            case 676:
            case 1655:
            case 1754:
            case 619:
            case 1927:
            case 2587:
            case 2852:
            case 2952:
            case 3052:
            case 3152:
            case 640: //任选三 直选复式
            case 661:
            case 682:
            case 1674:
            case 1742:
            case 628:
            case 2185:
            case 2605:
            case 2858:
            case 2958:
            case 3058:
            case 3158:
            case 649: //任选四 直选复式
            case 670:
            case 691:
            case 1669:
            case 1829:
            case 2104:
            case 2632:
            case 2867:
            case 2967:
            case 3067:
            case 3167:
                var betbit = ["万位", "千位", "百位", "十位", "个位"];
                for (var i = 0; i < 5; i++) {
                    if (betArray[i].length > 0) {
                        new_array.push(betArray[i].sort(this.asc_sort));
                        betArray[i][0] = betbit[i] + ":" + betArray[i][0];
                    }
                }
                break;
            default:
                for (var i = 0; i < 5; i++) {
                    if (betArray[i].length > 0) {
                        new_array.push(betArray[i].sort(this.asc_sort));
                    }
                }
                break;
        }
        return new_array.join("|");
    },

    asc_sort(x, y) {
        if (x / 1 > y / 1)
            return 1;
        if (x / 1 < y / 1)
            return -1;
    },


    //利率計算({s:起始倍数,m:最低收益率,b:投注金額,o:投注總額,p:獎金})
    margin(s, m, b, o, p) {
        s = s ? parseInt(s, 10) : 0;
        m = m ? parseInt(m, 10) : 0;
        b = b ? Number(b) : 0;
        o = o ? Number(o) : 0;
        p = p ? Number(p) : 0;
        var t = 0;
        if (b > 0) {
            if (m > 0) {
                t = Math.ceil(((m / 100 + 1) * o) /
                    (p - (b * (m / 100 + 1))))
            } else {
                t = 1
            }
            if (t < s) {
                t = s
            }
        }
        return t
    },

    //判断数组中是否包含该元素
    isNoRepeat(arr, s) {
        if ($.inArray(s, arr) > -1) {
            return false;
        }
        return true;
    },

    //获得一组随机数
    MathArray(length, minNum, maxNum) {
        var shang = new Array();
        while (true) {
            if (shang.length == length) {
                break;
            }
            var x = parseInt(Math.random() * (maxNum)) + 1;
            if (this.isNoRepeat(shang, (x / 1)) && (x / 1) >= (minNum / 1)) {
                shang.push((x / 1));
            }
        }

        return shang.map((v) => v + '');
    },

    //获得单数随机数组
    MathSingleArray(length, minNum, maxNum) {
        var shang = new Array();
        while (true) {
            if (shang.length == length) {
                break;
            }
            var x = parseInt(Math.random() * (maxNum)) + 1;
            if (this.isNoRepeat(shang, (x / 1)) && ((x / 1) % 2 != 0) && (x / 1) >= minNum) {
                shang.push(x / 1);
            }
        }
        return shang;
    },


    //获得双数随机数组
    MathEvenArray(length, minNum, maxNum) {
        var shang = new Array();
        while (true) {
            if (shang.length == length) {
                break;
            }
            var x = parseInt(Math.random() * (maxNum)) + 1;
            if (this.isNoRepeat(shang, (x / 1)) && ((x / 1) % 2 == 0) && (x / 1) >= minNum) {
                shang.push(x / 1);
            }
        }
        return shang;
    },

    //根据传入字符切割长度为NUM指定的数组
    StringToArray(s, num) {
        if (s.length == 0) return [];
        var leng = 0;
        var arr = new Array();
        while (true) {
            if ((leng + num) > s.length) break;
            arr.push(s.substr(leng, num));
            leng += num;
        }
        return arr;
    },

    //从n个不同元素中，任取m(m≤n)个元素并成一组
    Cnm(n, m) {
        var fangzi = 1;
        var fengmu = 1;
        for (var i = 0; i < m; i++) {
            fangzi = fangzi * (n - i);
        }
        for (var i = 0; i < m; i++) {
            fengmu = fengmu * (m - i);
        }
        return fangzi / fengmu;
    },

    /**
     *组选组三(投注框去重,)
     *单注：长度符合,需包含对子号
     *投注框：不能有重复号码
     *注：时时彩组选去重
     */
    uniqueCnm3(arr, count) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i] + "";
            //去除长度不符合的投注号码
            if (item.length != count) {
                error.push(item);
                continue;
            }
            var itemSort = item.split("").sort();
            if (!(itemSort[0] == itemSort[1] ||
                itemSort[1] == itemSort[2] ||
                itemSort[0] == itemSort[2]) ||
                (itemSort[0] == itemSort[1] && itemSort[1] == itemSort[2])) {
                error.push(item);
                continue;
            }
            //数组排序，合并数组
            itemSort = itemSort.join("")
            //去除投注框重复号码
            if (hash[itemSort] !== 1) {
                fit.push(item);
                hash[itemSort] = 1
            } else {
                error.push(item);
            }
        }
        return new Array(fit, error);
    },

    /**
     *组选组六
     *单注：长度符合,不为豹子号,不为对子号
     *投注框：不能有重复号码
     *注：时时彩组选去重
     */
    uniqueCnm6(arr, count) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i] + "";
            //去除长度不符合的投注号码
            if (item.length != count) {
                error.push(item);
                continue;
            }
            var itemSort = item.split("").sort();
            if (itemSort[0] == itemSort[1] || itemSort[1] == itemSort[2] || itemSort[0] == itemSort[2]) {
                error.push(item);
                continue;
            }
            //数组排序，合并数组
            itemSort = itemSort.join("");
            //去除投注框重复号码
            if (hash[itemSort] !== 1) {
                fit.push(item);
                hash[itemSort] = 1
            } else {
                error.push(item);
            }
        }
        return new Array(fit, error);
    },

    /**
     *组选混合
     *单注：长度符合,不为豹子号
     *投注框：不能有重复号码
     *注：时时彩组选去重
     */
    uniqueCnm(arr, count) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i] + "";
            //去除长度不符合的投注号码
            if (item.length != count) {
                error.push(item);
                continue;
            }
            //数组排序，合并数组
            var itemSort = item.split("").sort();
            if (itemSort.length == 2) {
                if (itemSort[0] == itemSort[1]) {
                    error.push(item)
                    continue;
                }
            } else if (itemSort.length == 3) {
                if (itemSort[0] == itemSort[1] && itemSort[1] == itemSort[2]) {
                    error.push(item)
                    continue;
                }
            }

            itemSort = itemSort.join("");
            //去除投注框重复号码
            if (hash[itemSort] !== 1) {
                fit.push(item)
                hash[itemSort] = 1
            } else {
                error.push(item);
            }
        }
        return new Array(fit, error);
    },

    /**
     *去重(Hash,速度快，耗内存)
     *三星 直选单式
     *二星 直选单式
     *任选 直选单式
     *单注：长度符合条件
     *投注框：不能有重复号码
     *注：时时彩直选去重
     */
    unique(arr, count) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
            var item = new String(arr[i]);
            //去除长度不符合的投注号码
            if (item.length != count) {
                error.push(item);
                continue;
            }
            //去除投注框重复号码
            if (hash[item] != 1) {
                fit.push(item);
                hash[item] = 1;
            } else {
                error.push(item);
            }
        }
        return new Array(fit, error);
    },


    /**
     *去重(排序,速度适中)
     *三星 直选单式
     *二星 直选单式
     *任选 直选单式
     *单注：长度符合条件
     *投注框：不能有重复号码
     *注：时时彩直选去重
     */
    sortUnique(arr, count) {
        arr.sort();
        var fit = [arr[0]];
        var error = [];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] !== fit[fit.length - 1]) {
                fit.push(arr[i]);
            } else {
                error.push(arr[i]);
            }
        }
        return new Array(fit, error);
    },


    /**
     *11选5直选去重 (排序,速度适中)
     *单注：长度符合条件 同一注投注不能有相同号码 号码不能小于1,不能大于10
     *投注框：不能有重复号码
     *注：时时彩直选去重
     */
    unique11X5ZhiXuan(nums, numLength) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var s in nums) {
            var n = nums[s];
            if (n.length != numLength) {
                error.push(n);
                continue;
            }
            //同一注投注不能有相同号码,每个号码不能小于1,不能大于11
            var ns = this.StringToArray(n, 2).sort();
            var as = false;
            for (var i in ns) {
                //判断大小
                if ((ns[i] / 1) > 11 || (ns[i] / 1) < 1) {
                    error.push(n);
                    as = true;
                    break;
                }
                //当前号码去重
                var next = (i / 1) + 1;
                if (next < ns.length && ns[i] == ns[next]) {
                    error.push(n);
                    as = true;
                    break;
                }
            }
            if (as) continue;
            if (hash[n] == 1) {
                error.push(n);
                continue;
            }
            hash[n] = 1;
            fit.push(n);
        }
        hash = null;
        return new Array(fit, error);
    },

    /**
     *去重(排序,速度适中)
     *单注：长度符合条件 同一注投注不能有相同号码 号码不能小于1,不能大于11
     *投注框：不能有重复号码
     *注：时时彩直选去重
     */
    unique11X5ZuXuan(nums, numLength) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var s in nums) {
            var n = nums[s];
            if (n.length != numLength) {
                error.push(n);
                continue;
            }
            //同一注投注不能有相同号码,每个号码不能小于1,不能大于11
            var ns = this.StringToArray(n, 2).sort();
            var as = false;
            for (var i in ns) {
                if ((ns[i] / 1) > 11 || (ns[i] / 1) < 1) {
                    error.push(n);
                    as = true;
                    break;
                }
                var next = i / 1 + 1;
                if (next < ns.length && ns[i] == ns[next]) {
                    error.push(n);
                    as = true;
                    break;
                }
            }
            if (as) continue;
            ns = ns.join("");
            if (hash[ns] == 1) {
                error.push(n);
                continue;
            }
            hash[ns] = 1;
            fit.push(n);
        }
        hash = null;
        return new Array(fit, error);
    },

    /**
     *PK10去重 (排序,速度适中)
     *单注：长度符合条件 同一注投注不能有相同号码 号码不能小于1,不能大于10
     *投注框：不能有重复号码
     *注：时时彩直选去重
     */
    uniquePK10(nums, numLength) {
        var fit = [];
        var error = [];
        var hash = {};
        for (var s in nums) {
            var n = nums[s];
            if (n.length != numLength) {
                error.push(n);
                continue;
            }
            //同一注投注不能有相同号码,每个号码不能小于1,不能大于11
            var ns = this.StringToArray(n, 2).sort();
            var as = false;
            for (var i in ns) {
                //判断大小
                if ((ns[i] / 1) > 10 || (ns[i] / 1) < 1) {
                    error.push(n);
                    as = true;
                    break;
                }
                //当前号码去重
                var next = (i / 1) + 1;
                if (next < ns.length && ns[i] == ns[next]) {
                    error.push(n);
                    as = true;
                    break;
                }
            }
            if (as) continue;
            if (hash[n] == 1) {
                error.push(n);
                continue;
            }
            hash[n] = 1;
            fit.push(n);
        }
        hash = null;
        return new Array(fit, error);
    },

    /**
     * o:数组
     * c:数字
     */
    Combination(o, c) {
        var l = o.length;
        var r = new Array();
        var f = new Array();
        if (c > l) return r;
        if (c == 1) return o;
        if (l == c) {
            r[0] = o.join("|");
            return r;
        }
        var a = "";
        var b = "";
        var s = "";
        for (var g = 0; g < c; g++) {
            a += "1";
            b += "1";
        }
        for (var e = 0; e < l - c; e++) {
            a += "0";
        }
        for (var d = 0; d < c; d++) {
            s += o[d] + "|";
        }
        r[0] = s.substr(0, s.length - 1);
        var h = 1;
        s = "";
        while (a.substr(a.length - c, c) != b) {
            a = this.movestring(a);
            for (var d = 0; d < l; d++) {
                if (a.substr(d, 1) == "1") {
                    s += o[d] + "|";
                }
            }
            r[h] = s.substr(0, s.length - 1);
            s = "";
            h++
        }
        return r
    },

    movestring(a) {
        var h = "";
        var k = "01";
        var b = "";
        var f = "";
        var j = "";
        var g = false;
        var c = false;
        for (var e = 0; e < a.length; e++) {
            if (g == false) {
                h += a.substr(e, 1);
            }
            if (g == false && a.substr(e, 1) == "1") {
                c = true;
            } else {
                if (g == false && c == true && a.substr(e, 1) == "0") {
                    g = true;
                } else {
                    if (g == true) {
                        b += a.substr(e, 1);
                    }
                }
            }
        }
        h = h.substr(0, h.length - 2);
        for (var d = 0; d < h.length; d++) {
            if (h.substr(d, 1) == "1") {
                f += h.substr(d, 1)
            } else {
                if (h.substr(d, 1) == "0") {
                    j += h.substr(d, 1)
                }
            }
        }
        h = f + j;
        return h + k + b
    },

    //根据传入类型保存或清除投注号码
    save(array, value, type) {
        if (type == "add") {
            return this.add(array, value);
        } else if (type == "clear") {
            return this.clear(array, value);
        } else if (type == "reverse") {
            return this.reverse(array, value);
        }
    },

    //不存在则添加
    add(array, value) {
        var index = $.inArray(value, array);
        if (index == -1) {
            array.push(value);
        }
        return 1;
    },

    //存在则删除
    clear(array, value) {
        var index = $.inArray(value, array);
        if (index != -1) {
            array.splice(index, 1);
        }
        return -1;
    },

    //存在则清除,不存在则添加
    reverse(array, value) {
        var index = $.inArray(value, array);
        if (index == -1) {
            array.push(value);
            return 1;
        } else {
            array.splice(index, 1);
            return -1;
        }
    },
    getRandom(arr, num) {
        var result = [];
        for (var i = 0; i < num; i++) {
            var ran = Math.floor(Math.random() * arr.length);
            result.push(arr.splice(ran, 1)[0]);
        }
        return [result.join('')];
    }
}