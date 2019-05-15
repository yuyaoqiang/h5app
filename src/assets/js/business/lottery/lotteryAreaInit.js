import arrayUtil from "../../util/arrayUtil"
export default {


    betBit: ["万位", "千位", "百位", "十位", "个位"],
    realBit: {
        '万位': '0',
        '千位': '1',
        '百位': '2',
        '十位': '3',
        '个位': '4',
        '第一名': '0',
        '第二名': '1',
        '第三名': '2',
        '第四名': '3',
        '第五名': '4',
        '第六名': '5',
        '第七名': '6',
        '第八名': '7',
        '第九名': '8',
        '第十名': '9'
    },
    getInitData(lottery) {

        var playType = lottery.playType;
        var dataArray = playType.data.split("_");

        var params = new Object();

        params.type = dataArray[0];

        params.startbit = dataArray[1];
        params.bitcount = dataArray[2];
        params.select = playType.data2;


        params.bitname = dataArray.length >= 4 ? dataArray[3].split("|") : null;

        params.playname = dataArray.length >= 5 ? dataArray[4] : null;

        var showIndex = $.inArray("showbit", dataArray);

        params.showbit = showIndex === -1 ? "" : dataArray[showIndex];

        var type = lottery.type.name;
        var areaData = null;

        if (type == "sscrules" || type == "3rules") {
            areaData = this.getSsrulesInitData(params, lottery.oddinfoLH);
        }
        if (type == "k3rules") {
            areaData = this.getK3AreaData(params, lottery.oddinfoK3HZ);
        }
        if (type == "11c5rules") {
            areaData = this.getElevenFiveArea(params);
        }
        if (type == 'pk8rules') {
            areaData = this.getPk8Area(params);
        }
        if (type == "pk10rules") {
            areaData = this.getPk10Area(params);
        }
        if (type == "kl10rules") {
            areaData = this.getKl10Area(params);
        }

        if (areaData != null) {
            areaData.id = playType.betlossId;
            var lotteryData = lottery.data;

            var betTypeData = lotteryData.bettype[playType.betlossId];
            areaData.singleMaxBetCount = betTypeData.singleMaxBetCount == undefined ? 0 : betTypeData.singleMaxBetCount;

            var userPoint = lotteryData.user;
            var award = 0;
            var lines = 0;

            var bonusValues = new Array();
            if (lotteryData.userBonus != 0) {

                award = ((betTypeData.baseScale / 1) + (betTypeData.multiple / 1) * (userPoint / 1)).toFixed(2);
                lines = (((betTypeData.baseScale / 1) + (betTypeData.multiple / 1) * (userPoint / 1)) / 2).toFixed(2);

                bonusValues.push({ begin: award, end: 0, val: 0 });

                var begin = betTypeData.baseScale / 1;
                bonusValues.push({ begin: begin, end: userPoint, val: userPoint });


            } else {


                var begin = betTypeData.baseScale / 1;
                bonusValues.push({ begin: begin, end: 0, val: 0 });

                award = (betTypeData.baseScale / 1).toFixed(2);
                lines = (betTypeData.baseScale / 2).toFixed(2);
            }

            areaData.award = award;
            areaData.lines = lines;
            areaData.bonusValues = bonusValues;
            areaData.bonusValue = bonusValues[0].val;
            if (areaData.isOddLH == true || areaData.isOddKS == true) {
                arrayUtil.forEach(bonusValues, item => {
                    item.begin = 0;
                })
                areaData.bonusValue = bonusValues[0].val;
            }


            var customeChioceData = this.getCustomChioceData(playType.betlossId);
            //  areaData.customBitChecks=[];
            if (areaData.customBit) {
                for (var i = 0; i < areaData.customBit.length; i++) {
                    areaData.customBit[i].checked = false;
                }

                if (customeChioceData.maxCustomChoice != 0) {

                    var min = customeChioceData.minCustomChoice;
                    var len = areaData.customBit.length;
                    for (var i = 0; i < min; i++) {
                        areaData.customBit[len - i - 1].checked = true;
                        /* var currentBitName=areaData.customBit[len-i-1].name;
                         areaData.customBitChecks.push(currentBitName);*/
                    }
                }

            }

            if (areaData.bits != undefined && areaData.bitNums != undefined) {

                for (var b in areaData.bits) {
                    var bitNumObjs = new Array();
                    for (var i in areaData.bitNums) {
                        var bitNum = areaData.bitNums[i];
                        var bitNumObj = { num: bitNum, selected: false };
                        bitNumObjs.push(bitNumObj);
                    }
                    areaData.bits[b].bitNumObjs = bitNumObjs;
                }

            }

            if (areaData.isOddLH == true || areaData.isOddKS == true) {
                var oddinfoLH = lotteryData.oddinfoLH || lotteryData.oddinfoK3HZ;

                if (oddinfoLH) {
                    arrayUtil.forEach(oddinfoLH, odd => {
                        var sn = odd.special_number;
                        var bj = arrayUtil.findFirst(areaData.bits[0].bitNumObjs, b => {
                            return b.num == sn
                        });
                        if (bj == null) {
                            return;
                        }
                        areaData.hasSingleOdds = true;

                        bj.oddObj = { havePoint: odd.odds };
                        if (lotteryData.userBonus != 0) {
                            bj.oddObj.award = ((odd.odds / 1) + (odd.limit_money / 1) * (userPoint / 1)).toFixed(2);
                            bj.oddObj.lines = (((odd.odds / 1) + (odd.limit_money / 1) * (userPoint / 1)) / 2).toFixed(2);
                            bj.oddObj.notPoint = bj.oddObj.award;
                        } else {
                            bj.oddObj.award = (odd.odds / 1).toFixed(2);
                            bj.oddObj.lines = (odd.odds / 2).toFixed(2);
                            bj.oddObj.notPoint = odd.odds;
                        }
                        bj.currentOdd = bj.oddObj.notPoint / 1;
                    });
                }
            }

            areaData.customChioceData = customeChioceData;
            areaData.betQty = 0;
            areaData.betAmount = 0;
            areaData.multiple = 1;
            areaData.unit = 1;
            areaData.betContent = "";
        }

        return areaData;

    },

    //时时彩投注区数据
    getSsrulesInitData(param, odd) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;

        if (param.showbit == "showbit") {
            var customBitData = new Array();
            customBitData.push({ id: 0, name: "万位" });
            customBitData.push({ id: 1, name: "千位" });
            customBitData.push({ id: 2, name: "百位" });
            customBitData.push({ id: 3, name: "十位" });
            customBitData.push({ id: 4, name: "个位" });
            areaData.customBit = customBitData;
        }
        if (areaData.type == "stand") {
            if (param.bitname == null) {
                param.bitname = this.betBit.slice((parseInt(param.startbit) - 1), ((parseInt(param.startbit) - 1) + parseInt(param.bitcount)));
            }


            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }

            areaData.bits = bits;
            areaData.bitNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            areaData.fastChoose = true;
            return areaData;
        }


        if (areaData.type == "text") {
            return areaData;
        }

        if (outPutType == "numbers") {
            if (param.showbit == "showbit") {
                var customBitData = new Array();
                customBitData.push({ id: 0, name: "万位" });
                customBitData.push({ id: 1, name: "千位" });
                customBitData.push({ id: 2, name: "百位" });
                customBitData.push({ id: 3, name: "十位" });
                customBitData.push({ id: 4, name: "个位" });
                areaData.customBit = customBitData;
            }
            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }
            areaData.bits = bits;
            var begin = parseInt(param.startbit);
            var end = (parseInt(param.startbit) - 1) + parseInt(param.bitcount);
            areaData.bitNums = new Array();
            for (var i = begin; i <= end; i++) {
                areaData.bitNums.push(i + "");
            }
            areaData.fastChoose = true;
            return areaData;
        }

        if (outPutType == "DT") {
            /* var bits = new Array();
             bits.push({name: param.bitname[0]});
             areaData.bitNums = ["龙", "虎", "和"];
             areaData.bits = bits;
             return areaData;*/
            areaData.isOddLH = true;
            var bits = new Array();
            var odds = new Array();
            var bitNums = ["龙", "虎", "和"];
            bits.push({ name: param.bitname[0] });
            areaData.bitNums = bitNums;

            arrayUtil.forEach(bitNums, bit => {
                arrayUtil.forEach(odd, item => {
                    if (item.special_number == bit) {
                        odds.push(item.odds)
                    }
                })
            })
            areaData.bits = bits;
            areaData.odds = odds;
            return areaData;
        }

        if (outPutType == "ZH") {
            var bits = new Array();
            bits.push({ name: param.bitname[0] });
            areaData.bits = bits;
            areaData.bitNums = ["大", "小", "单", "双"];
            return areaData;
        }


        if (outPutType == "DXDS") {
            if (param.bitname == null) {
                param.bitname = this.betBit.slice((parseInt(param.startbit) - 1), ((parseInt(param.startbit) - 1) + parseInt(param.bitcount)));
            }


            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }
            areaData.bits = bits;
            areaData.bitNums = ['大', '小', '单', '双'];
            return areaData;
        }
        return null;
    },
    //快三投注区数据
    getK3AreaData(param, odd) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;
        if (areaData.type == "stand") {
            var bitName = param.bitname[0];
            areaData.bits = [{ name: bitName }];
            if (param.playname == '二同号') {
                if (bitName == '复式') {
                    areaData.bitNums = ['11', '22', '33', '44', '55', '66'];
                }
            } else if (param.playname == '二不同号') {
                if (bitName == '标准') {
                    areaData.bitNums = ['1', '2', '3', '4', '5', '6'];
                }
            } else if (param.playname == '三同号') {
                if (bitName == '单选') {
                    areaData.bitNums = ['111', '222', '333', '444', '555', '666'];
                } else {
                    areaData.bitNums = ['全'];
                }
            } else if (param.playname == '三不同号') {
                if (bitName == '标准') {
                    areaData.bitNums = ['1', '2', '3', '4', '5', '6'];
                }
            } else if (param.playname == '三连号') {
                if (bitName == '单选') {
                    areaData.bitNums = ['123', '234', '345', '456'];
                } else {
                    areaData.bitNums = ['全'];
                }
            }
            return areaData;
        }
        if (outPutType == "numbers") {
            var bitName = param.bitname[0];
            areaData.bits = [{ name: bitName }];
            var begin = parseInt(param.startbit);
            /*var end = (parseInt(param.startbit) - 1) + parseInt(param.bitcount);*/
            var end = parseInt(param.bitcount);
            areaData.bitNums = new Array();
            var odds = new Array();
            areaData.isOddKS = true;
            for (var i = begin; i <= end; i++) {
                areaData.bitNums.push(i + "");
            }
            arrayUtil.forEach(areaData.bitNums, bit => {
                arrayUtil.forEach(odd, item => {
                    if (item.special_number == bit) {
                        odds.push(item.odds)
                    }
                })
            })
            areaData.odds = odds;
            return areaData;
        }

    },
    //11选5投注区数据
    getElevenFiveArea(param) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;

        if (param.showbit == "showbit") {
            var customBitData = new Array();
            customBitData.push({ id: 0, name: "万位" });
            customBitData.push({ id: 1, name: "千位" });
            customBitData.push({ id: 2, name: "百位" });
            customBitData.push({ id: 3, name: "十位" });
            customBitData.push({ id: 4, name: "个位" });
            areaData.customBit = customBitData;
        }
        if (areaData.type == "stand") {
            if (param.showbit == "showbit") {
                var customBitData = new Array();
                customBitData.push({ id: 0, name: "万位" });
                customBitData.push({ id: 1, name: "千位" });
                customBitData.push({ id: 2, name: "百位" });
                customBitData.push({ id: 3, name: "十位" });
                customBitData.push({ id: 4, name: "个位" });
                areaData.customBit = customBitData;
            }
            if (param.bitname == null) {
                param.bitname = this.betBit.slice((parseInt(param.startbit) - 1), ((parseInt(param.startbit) - 1) + parseInt(param.bitcount)));
            }

            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }

            areaData.bits = bits;
            areaData.bitNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
            areaData.fastChoose = true;
            return areaData;
        }
        if (areaData.type == "text") {
            return areaData;
        }
        if (areaData.type == "numbers") {
            var bitName = param.bitname[0];
            areaData.bits = [{ name: bitName }];

            var begin = parseInt(param.startbit);
            var end = (parseInt(param.startbit) - 1) + parseInt(param.bitcount);
            areaData.bitNums = new Array();
            for (var i = begin; i <= end; i++) {
                areaData.bitNums.push(i + "");
            }
            areaData.fastChoose = true;
            return areaData;
        }

    },
    //PK10 投注区数据
    getPk10Area(param) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;
        if (param.showbit == "showbit") {
            var customBitData = new Array();
            customBitData.push({ id: 0, name: "万位" });
            customBitData.push({ id: 1, name: "千位" });
            customBitData.push({ id: 2, name: "百位" });
            customBitData.push({ id: 3, name: "十位" });
            customBitData.push({ id: 4, name: "个位" });
            areaData.customBit = customBitData;
        }
        if (areaData.type == "stand") {
            if (param.showbit == "showbit") {
                var customBitData = new Array();
                customBitData.push({ id: 0, name: "万位" });
                customBitData.push({ id: 1, name: "千位" });
                customBitData.push({ id: 2, name: "百位" });
                customBitData.push({ id: 3, name: "十位" });
                customBitData.push({ id: 4, name: "个位" });
                areaData.customBit = customBitData;
            }
            if (param.bitname == null) {
                param.bitname = this.betBit.slice((parseInt(param.startbit) - 1), ((parseInt(param.startbit) - 1) + parseInt(param.bitcount)));
            }

            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }

            areaData.bits = bits;
            areaData.bitNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
            areaData.fastChoose = true;
            return areaData;
        }
        if (areaData.type == "text") {
            return areaData;
        }

        if (outPutType == "numbers") {

            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }
            areaData.bits = bits;
            var begin = parseInt(param.startbit);
            var end = (parseInt(param.startbit) - 1) + parseInt(param.bitcount);
            areaData.bitNums = new Array();
            for (var i = begin; i <= end; i++) {
                areaData.bitNums.push(i + "");
            }
            areaData.fastChoose = true;
            return areaData;
        }

        if (outPutType == "DT") {
            var bits = new Array();
            bits.push({ name: param.bitname[0] });
            areaData.bitNums = ["龙", "虎"];
            areaData.bits = bits;
            return areaData;
        }
        if (outPutType == "GYCH") {
            var bits = new Array();
            bits.push({ name: '和值' });
            areaData.bits = bits;
            var datas = param.bitname[0].split(",");
            areaData.bitNums = new Array();
            for (var i = 0; i < datas.length; i++) {
                areaData.bitNums.push(datas[i]);
            }
            return areaData;
        }
    },
    getPk8Area (param) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;
        if (param.showbit == "showbit") {
            var customBitData = new Array();
            customBitData.push({id: 0, name: "万位"});
            customBitData.push({id: 1, name: "千位"});
            customBitData.push({id: 2, name: "百位"});
            customBitData.push({id: 3, name: "十位"});
            customBitData.push({id: 4, name: "个位"});
            areaData.customBit = customBitData;
        }
        if (areaData.type == "stand") {
            if (param.showbit == "showbit") {
                var customBitData = new Array();
                customBitData.push({id: 0, name: "万位"});
                customBitData.push({id: 1, name: "千位"});
                customBitData.push({id: 2, name: "百位"});
                customBitData.push({id: 3, name: "十位"});
                customBitData.push({id: 4, name: "个位"});
                areaData.customBit = customBitData;
            }
            if (param.bitname == null) {
                param.bitname = this.betBit.slice((parseInt(param.startbit) - 1), ((parseInt(param.startbit) - 1) + parseInt(param.bitcount)));
            }

            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({name: name, bit: this.realBit[name]});
            }

            areaData.bits = bits;
            areaData.bitNums = ['01', '02', '03', '04', '05', '06', '07', '08', ];
            areaData.fastChoose = true;
            return areaData;
        }
        if (areaData.type == "text") {
            return areaData;
        }

        if (outPutType == "numbers") {

            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({name: name, bit: this.realBit[name]});
            }
            areaData.bits = bits;
            var begin = parseInt(param.startbit);
            var end = (parseInt(param.startbit) - 1) + parseInt(param.bitcount);
            areaData.bitNums = new Array();
            for (var i = begin; i <= end; i++) {
                areaData.bitNums.push(i + "");
            }
            areaData.fastChoose = true;
            return areaData;
        }

        if (outPutType == "DT") {
            var bits = new Array();
            bits.push({name: param.bitname[0]});
            areaData.bitNums = ["龙", "虎"];
            areaData.bits = bits;
            return areaData;
        }
        if (outPutType == "GYCH") {
            var bits = new Array();
            bits.push({name: '和值'});
            areaData.bits = bits;
            var datas = param.bitname[0].split(",");
            areaData.bitNums = new Array();
            for (var i = 0; i < datas.length; i++) {
                areaData.bitNums.push(datas[i]);
            }
            return areaData;
        }
    },
    //KL10 生成投注区
    getKl10Area(param) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;
        if (areaData.type == "stand") {

            if (param.bitname == null) {
                param.bitname = this.betBit.slice((parseInt(param.startbit) - 1), ((parseInt(param.startbit) - 1) + parseInt(param.bitcount)));
            }
            var bits = new Array();
            for (var i = 0; i < param.bitname.length; i++) {
                var name = param.bitname[i];
                bits.push({ name: name, bit: this.realBit[name] });
            }
            areaData.bits = bits;

            if (param.playname == '1') {
                areaData.bitNums = ['大', '小', '单', '双', '尾大', '尾小', '合单', '合双'];
            } else if (param.playname == '2') {
                areaData.bitNums = ['金', '木', '水', '火', '土'];
            } else if (param.playname == '3') {
                areaData.bitNums = ['春', '夏', '秋', '冬', '东', '南', '西', '北'];
            } else if (param.playname == '4') {
                areaData.bitNums = ['1V2', '1V3', '1V4', '1V5', '1V6', '1V7', '1V8', '2V3', '2V4', '2V5', '2V6', '2V7',
                    '2V8', '3V4', '3V5', '3V6', '3V7', '3V8', '4V5', '4V6', '4V7', '4V8', '5V6', '5V7', '5V8', '6V7', '6V8', '7V8'
                ];
            } else {
                areaData.bitNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
                ];
                areaData.fastChoose = true;
            }
            return areaData;
        }
        if (areaData.type == "text") {
            return areaData;
        }
    },
    /*getBjkl8Area (param) {
        var outPutType = param.type;
        var areaData = new Object();
        areaData.select = param.select;
        areaData.type = outPutType;
        if (areaData.type == "stand") {

        }
    },*/
    getCustomChioceData(id) {
        var maxCustomChoice = 0;
        var customChoice = 0;
        var minCustomChoice = 0;
        var isAlterNum = true;


        switch (id) {
            case 31: //时时彩—(任选直选单式)
            case 72:
            case 257:
            case 311:
            case 1790: //分分彩
            case 1700:
            case 2161:
                maxCustomChoice = 5;
                customChoice = 1;
                minCustomChoice = 1;
                isAlterNum = true;
                break;
            case 32: //时时彩—(任三组选组六)
            case 312:
            case 73:
            case 258:
            case 1640: //分分彩
            case 1747:
            case 2158:
            case 33: //时时彩—(任三组选组三)
            case 259:
            case 313:
            case 74:
            case 1827: //分分彩
            case 1711:
            case 2173:
            case 34: //时时彩—(任三组选混合)
            case 314:
            case 75:
            case 260:
            case 1716: //分分彩—(任三组选混合)
            case 1792:
            case 2164:
            case 288: //时时彩—(三星直选单式)
            case 290:
            case 292:
            case 234:
            case 236:
            case 238:
            case 49:
            case 51:
            case 53:
            case 8:
            case 10:
            case 12:
            case 1831: //分分彩-(三星直选单式)
            case 1707:
            case 1704:
            case 1764:
            case 1734:
            case 1643:
            case 1978:
            case 1960:
            case 1945:
            case 465: //时时彩—(三星组六单式)
            case 467:
            case 469:
            case 449:
            case 451:
            case 453:
            case 433:
            case 435:
            case 437:
            case 417:
            case 419:
            case 421:
            case 1701: //分分彩—(三星组六单式)
            case 1800:
            case 1623:
            case 1733:
            case 1787:
            case 1658:
            case 2083:
            case 2074:
            case 2053:

            case 466: //时时彩—(三星组三单式)
            case 468:
            case 470:
            case 450:
            case 452:
            case 454:
            case 434:
            case 436:
            case 438:
            case 418:
            case 420:
            case 422:
            case 1763: //分分彩—(三星组三单式)
            case 1692:
            case 1644:
            case 1796:
            case 1688:
            case 1731:
            case 2080:
            case 2050:
            case 2059:

            case 295: //时时彩—(三星组选混合)
            case 298:
            case 301:
            case 241:
            case 244:
            case 247:
            case 56:
            case 59:
            case 62:
            case 15:
            case 18:
            case 21:
            case 1788: //分分彩—(三星组选混合)
            case 1698:
            case 1774:
            case 1634:
            case 1705:
            case 1748:
            case 2056:
            case 2065:
            case 2077:

                //秒秒彩
            case 2401: //(三星直选单式)
            case 2407:
            case 2413:
            case 2461: //(三星组六单式)
            case 2467:
            case 2473:
            case 2464: //(三星组三单式)
            case 2470:
            case 2476:
            case 2449: //时时彩—(三星组选混合)
            case 2440:
            case 2458:
                //北京5分彩   台湾5分彩
            case 2790: //(三星直选单式)
            case 2794:
            case 2792:
            case 2810: //(三星组六单式)
            case 2814:
            case 2812:
            case 2811: //(三星组三单式)
            case 2815:
            case 2813:
            case 2803: //时时彩—(三星组选混合)
            case 2809:
            case 2806:
                // 韩国1.5分彩
            case 2890: //(三星直选单式)
            case 2894:
            case 2892:
            case 2910: //(三星组六单式)
            case 2914:
            case 2912:
            case 2911: //(三星组三单式)
            case 2915:
            case 2913:
            case 2903: //时时彩—(三星组选混合)
            case 2909:
            case 2906:
                //新加坡3.5分彩
            case 2990: //(三星直选单式)
            case 2994:
            case 2992:
            case 3010: //(三星组六单式)
            case 3014:
            case 3012:
            case 3011: //(三星组三单式)
            case 3015:
            case 3013:
            case 3003: //时时彩—(三星组选混合)
            case 3009:
            case 3006:
                //台湾5分彩
            case 3090: //(三星直选单式)
            case 3094:
            case 3092:
            case 3110: //(三星组六单式)
            case 3114:
            case 3112:
            case 3111: //(三星组三单式)
            case 3115:
            case 3113:
            case 3103: //时时彩—(三星组选混合)
            case 3109:
            case 3106:
                maxCustomChoice = 3;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = true;
                break;
            case 35: //时时彩—(任二组选组二)
            case 261:
            case 76:
            case 315:
            case 1729: //分分彩—(任二组选组二)
            case 1684:
            case 2155:
            case 36: //时时彩—(任二组选混合)
            case 77:
            case 262:
            case 316:
            case 1727: //分分彩—(任二组选混合)
            case 1793:
            case 2167:
            case 303: //时时彩—(二星直选单式)
            case 305:
            case 249:
            case 251:
            case 64:
            case 66:
            case 23:
            case 25:
            case 1678: //分分彩—(二星直选单式)
            case 1809:
            case 1783:
            case 1646:
            case 1999:
            case 2005:

            case 307: //时时彩—(二星组选混合)
            case 309:
            case 253:
            case 255:
            case 68:
            case 70:
            case 27:
            case 29:
            case 1685: //分分彩—(二星组选混合)
            case 1746:
            case 1822:
            case 1714:
            case 1888:
            case 1873:
                //秒秒彩
            case 2482: //(二星直选单式)
            case 2488:
            case 2506: //(二星组选混合)
            case 2512:
                //北京5分彩  韩国1.5分彩  新加坡3.5分彩  台湾5分彩
            case 2817:
            case 2819:
            case 2827:
            case 2829:
                //韩国1.5分彩
            case 2917:
            case 2919:
            case 2927:
            case 2929:
                //新加坡3.5分彩
            case 3017:
            case 3019:
            case 3027:
            case 3029:
                //台湾5分彩
            case 3117:
            case 3119:
            case 3127:
            case 3129:
                maxCustomChoice = 2;
                customChoice = 2;
                minCustomChoice = 2;
                isAlterNum = true;
                break;
            case 698:
            case 714:
            case 730: //五星直选 直选单式
            case 746:
            case 1690: //分分彩 五星直选 直选单式
            case 1784:
            case 1903:
                //秒秒彩
            case 2653: //五星直选 直选单式
                //北京5分彩
            case 2874:
                //韩国1.5分彩
            case 2974:
                //新加坡3.5分彩
            case 3074:
                //台湾5分彩
            case 3174:
                maxCustomChoice = 5;
                customChoice = 5;
                minCustomChoice = 5;
                isAlterNum = true;
                break;

            case 707:
            case 723:
            case 739: //四星直选 直选单式
            case 755:
            case 1687: //分分彩 四星直选 直选单式
            case 1812:
            case 2038:
                //秒秒彩
            case 2680: //四星直选 直选单式
                //北京5分彩
            case 2883:
                //韩国1.5分彩
            case 2983:
                //新加坡3.5分彩
            case 3083:
                //台湾5分彩
            case 3183:
                maxCustomChoice = 4;
                customChoice = 4;
                minCustomChoice = 4;
                isAlterNum = true;
                break;
            case 614:
            case 635: //任选二 直选单式
            case 656:
            case 677:
            case 1667: //分分彩 任选二 直选单式
            case 1786:
            case 1939:
            case 2590:
            case 2853:
            case 2953:
            case 3053:
            case 3153:
                maxCustomChoice = 5;
                customChoice = 2;
                minCustomChoice = 2;
                isAlterNum = false;
                break;
            case 615:
            case 636: //任选二 直选和值
            case 657:
            case 678:
            case 1654: //分分彩 任选二 直选和值
            case 1770:
            case 1933:
            case 2593:
            case 2854:
            case 2954:
            case 3054:
            case 3154:
                maxCustomChoice = 5;
                customChoice = 2;
                minCustomChoice = 2;
                isAlterNum = false;
                break;
            case 616:
            case 637: //任选二 组选复式
            case 658:
            case 679:
            case 1781: //分分彩 任选二 组选复式
            case 1709:
            case 1936:
            case 2596:
            case 2855:
            case 2955:
            case 3055:
            case 3155:
                maxCustomChoice = 5;
                customChoice = 2;
                minCustomChoice = 2;
                isAlterNum = false;
                break;
            case 617:
            case 638: //任选二 组选单式
            case 659:
            case 680:
            case 1676: //分分彩 任选二 组选单式
            case 1767:
            case 1930:
            case 2599:
            case 2856:
            case 2956:
            case 3056:
            case 3156:
                maxCustomChoice = 5;
                customChoice = 2;
                minCustomChoice = 2;
                isAlterNum = false;
                break;
            case 618:
            case 639: //任选二 组选和值
            case 660:
            case 681:
            case 1821: //分分彩 任选二 组选和值
            case 1708:
            case 1942:
            case 2602:
            case 2857:
            case 2957:
            case 3057:
            case 3157:
                maxCustomChoice = 5;
                customChoice = 2;
                minCustomChoice = 2;
                isAlterNum = false;
                break;
            case 620:
            case 641: //任选三 直选单式
            case 662:
            case 683:
            case 1755: //分分彩 任选三 直选单式
            case 1671:
            case 2191:
            case 2608:
            case 2859:
            case 2959:
            case 3059:
            case 3159:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 621:
            case 642: //任选三 直选和值
            case 663:
            case 684:
            case 1653: //分分彩 任选三 直选和值
            case 1785:
            case 2200:
            case 2611:
            case 2860:
            case 2960:
            case 3060:
            case 3160:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 622:
            case 643: //任选三 组三复式
            case 664:
            case 685:
            case 1647: //分分彩 任选三 组三复式
            case 1732:
            case 2176:
            case 2614:
            case 2861:
            case 2961:
            case 3061:
            case 3161:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 623:
            case 644: //任选三 组三单式
            case 665:
            case 686:
            case 1756: //分分彩 任选三 组三单式
            case 1627:
            case 2194:
            case 2617:
            case 2862:
            case 2962:
            case 3062:
            case 3162:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 624:
            case 645: //任选三 组六复式
            case 666:
            case 687:
            case 1703: //分分彩 任选三 组六复式
            case 1741:
            case 2182:
            case 2620:
            case 2863:
            case 2963:
            case 3063:
            case 3163:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 625:
            case 646: //任选三 组六单式
            case 667:
            case 688:
            case 1699: //分分彩 任选三 组六单式
            case 1743:
            case 2188:
            case 2623:
            case 2864:
            case 2964:
            case 3064:
            case 3164:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 626:
            case 647: //任选三 混合组选
            case 668:
            case 689:
            case 1639: //分分彩 任选三 混合组选
            case 1736:
            case 2179:
            case 2626:
            case 2865:
            case 2965:
            case 3065:
            case 3165:
                maxCustomChoice = 5;
                customChoice = 3;
                minCustomChoice = 3;
                isAlterNum = false;
                break;
            case 629:
            case 650: //任选四 直选单式
            case 671:
            case 692:
            case 1659: //分分彩 任选四 直选单式
            case 1757:
            case 2095:
            case 2635:
            case 2868:
            case 2968:
            case 3068:
            case 3168:
                maxCustomChoice = 5;
                customChoice = 4;
                minCustomChoice = 4;
                isAlterNum = false;
                break;
            case 630:
            case 651: //任选四 组选24
            case 672:
            case 693:
            case 1624: //分分彩 任选四 组选24
            case 1740:
            case 2092:
            case 2638:
            case 2869:
            case 2969:
            case 3069:
            case 3169:
                maxCustomChoice = 5;
                customChoice = 4;
                minCustomChoice = 4;
                isAlterNum = false;
                break;
            case 631:
            case 652: //任选四 组选12
            case 673:
            case 694:
            case 1694: //分分彩 任选四 组选12
            case 1833:
            case 2107:
            case 2641:
            case 2870:
            case 2970:
            case 3070:
            case 3170:
                maxCustomChoice = 5;
                customChoice = 4;
                minCustomChoice = 4;
                isAlterNum = false;
                break;
            case 632:
            case 653: //任选四 组选6
            case 674:
            case 695:
            case 1629: //分分彩 任选四 组选6
            case 1815:
            case 2101:
            case 2644:
            case 2871:
            case 2971:
            case 3071:
            case 3171:
                maxCustomChoice = 5;
                customChoice = 4;
                minCustomChoice = 4;
                isAlterNum = false;
                break;
            case 633:
            case 654: //任选四 组选4
            case 675:
            case 696:
            case 1642: //分分彩 任选四 组选4
            case 1771:
            case 2098:
            case 2647:
            case 2872:
            case 2972:
            case 3072:
            case 3172:
                maxCustomChoice = 5;
                customChoice = 4;
                minCustomChoice = 4;
                isAlterNum = false;
                break;
                // ---------------   十一选五      -------------------//
            case 535: //三星直选单式
            case 345:
            case 537:
            case 486:
            case 488:
            case 484:
            case 343:
            case 539:
            case 341:
            case 169:
            case 173:
            case 171:
            case 2233:
            case 2239:
            case 2227:
            case 181: //三星组选单式
            case 350:
            case 541:
            case 547:
            case 493:
            case 347:
            case 544:
            case 175:
            case 353:
            case 178:
            case 490:
            case 496:
            case 2254:
            case 2263:
            case 2245:
                customChoice = 6;
                break;
            case 501: //二星直(组)选单式
            case 186:
            case 499:
            case 358:
            case 356:
            case 550:
            case 184:
            case 552:
            case 362:
            case 188:
            case 556:
            case 503:
            case 554:
            case 505:
            case 360:
            case 190:
            case 2278:
            case 2272:
            case 2290:
            case 2284:
                customChoice = 4;
                break;
            case 569: //任选一中一
            case 526:
            case 409:
            case 393:
            case 2329:
                customChoice = 2;
                break;
            case 394: //任选二中二
            case 527:
            case 570:
            case 410:
            case 2332:
                customChoice = 4;
                break;
            case 571: //任选三中三
            case 411:
            case 528:
            case 395:
            case 2335:
                customChoice = 6;
                break;
            case 529: //任选四中四
            case 396:
            case 572:
            case 412:
            case 2338:
                customChoice = 8;
                break;
            case 573: //任选五中五
            case 530:
            case 413:
            case 397:
            case 2341:
                customChoice = 10;
                break;
            case 414: //任选六中五
            case 531:
            case 398:
            case 574:
            case 2344:
                customChoice = 12;
                break;
            case 415: //任选七中五
            case 399:
            case 532:
            case 575:
            case 2347:
                customChoice = 14;
                break;
            case 576: //任选八中五
            case 400:
            case 533:
            case 416:
            case 2350:
                customChoice = 16;
                break;
                // ----------------------  PK10   || pk8    ---------------------//
            case 3309:
            case 1837: //前二直选单式
                customChoice = 4;
                break;
            case 3311:
            case 1839:
                customChoice = 6;
                break;
            case 3314:
            case 3203:
                customChoice = 8;
                break;
            case 3316:
            case 3205:
                customChoice = 10;
                break;
                // ----------------------  福彩3D   ---------------------//
            case 107:
            case 110:
                customChoice = 3;
                break;
            case 114:
            case 112:
            case 118:
            case 116:
                customChoice = 2;
                break;
                // ----------------------  排列3   ---------------------//
            case 126:
            case 129:
                customChoice = 3;
                break;
            case 133:
            case 131:
            case 137:
            case 135:
                customChoice = 2;
                break;

            default:
                maxCustomChoice = 0;
                customChoice = 0;
                minCustomChoice = 0;
                isAlterNum = true;
        }


        var result = new Object();
        result.maxCustomChoice = maxCustomChoice;
        result.customChoice = customChoice;
        result.minCustomChoice = minCustomChoice;
        result.isAlterNum = isAlterNum;

        return result;

        /*  if (maxCustomChoice != 0) {
         customBit[0] = $("input[id='bit_g']");
         customBit[1] = $("input[id='bit_s']");
         customBit[2] = $("input[id='bit_b']");
         customBit[3] = $("input[id='bit_q']");
         customBit[4] = $("input[id='bit_w']");
         $.each(customBit, function(i) {
         if (i < minCustomChoice) {
         customBit[i].attr("checked", "checked");
         }
         });
         }*/

    }
}