import userApi from "../../../js/api/userInfo"
import securityApi from "../../../js/api/securityApi"
import messageBox from "../../../../controls/messageBox"
import numberUtil from "../../../js/util/numberUtil"
import lotteryTypeData from "../../data/lotteryTypeData"
import platformData from "../../../platform/main/platformData"
import arrayUtil from "../../../js/util/arrayUtil"
import objectUtil from "../../../js/util/objectUtil"
import stringUtil from "../../../js/util/stringUtil"
import lotteryBusiness from "../../../js/business/lottery/lotteryBusiness"
import appContext from "../../../js/context/appContext"
import userInfoApi from "../../../js/api/userInfo"
import kgApi from "../../../js/api/kgApi"
import systemConfigApi from "../../../js/api/systemConfigApi"
import viewUtil from "../../../js/business/common/viewUtil"
import msgPushController from "../../business/msgPush/msgPushController"

export default {
    prevInitDate: null,
    user: {
        apiReqFinish: false,
        init: false,
        isOpenKg: false,
        lotteryInitFinish: false,
        kgInitFinish: false,
        traditionInitFinsh: false,
        configInitFinish: false,
        allInitFinish: false,
        platformCode: null,
        lotteryBal: 0,
        kgBal: 0,
        kjlotteryBal: 0,
        platformThird: null,
        gameType: []
    },
    initMenu: true,
    enableCache: false,
    showSettingWalletPwd: true,
    userIniting: false,

    refreshBal(view, compelete, quickCallback) {
        this.enableCache = false;
        this.userIniting = false;
        this.lotteryList = [];
        this.initMenu = true;
        this.user.lotteryInitFinish = false;
        this.user.kgInitFinish = false;
        this.user.traditionInitFinsh = false;

        this.user.allInitFinish = false;
        this.getUser(view, compelete, quickCallback);
    },
    getUser(view, compelete, quickCallback) {

        var callBack = function (user) {
            if (compelete) {
                compelete(user);
            }
        }

        var _this = this;
        if (_this.enableCache && _this.user.init == true && _this.prevInitDate != null) {
            var diffSeconds = (new Date().getTime() - _this.prevInitDate.getTime()) / 1000;
            if (diffSeconds <= 2) {
                callBack(_this.user);
                return;
            }
        }


        if (_this.userIniting == true) {
            callBack(_this.user);
            return;
        }

        if (quickCallback == true && _this.user.init == true) {
            callBack(_this.user);
        }

        _this.userIniting = true;


        userApi.getUserSimpleInfo(null, function (resp) {
            _this.userIniting = false;
            _this.user.apiReqFinish = true;
            if (resp.code == 200) {

                objectUtil.fillProperties(_this.user, resp.data);

                _this.prevInitDate = new Date();
                _this.enableCache = true;
                if (view != null) {
                    if (!_this.user.isShiWan) {
                        if (_this.showSettingWalletPwd && view && _this.user.hasWallerPwd == false) {
                            _this.showSettingWalletPwd = false;
                            messageBox.confirm('为了您资金安全,请设置资金密码', null, () => {
                                view.$router.push({
                                    path: '/modifyPassword',
                                    query: {setType: _this.user.hasWallerPwd ? '1' : '0'}
                                });
                            });
                        }
                    }
                }


                _this.user.lotteryBal = numberUtil.toMoneyFixed(_this.user.lotteryBal);
                _this.user.walletBal = numberUtil.toMoneyFixed(_this.user.walletBal);
                _this.user.kgBal = numberUtil.toMoneyFixed(_this.user.kjlotteryBal || 0);

                _this.user.lotteryFavorites = _this.user.lotteryFavorites === null ? "" : _this.user.lotteryFavorites;

                _this.user.isOpenKg = _this.user.isOpenKg || false;

                //分红钱包账号
                _this.user.isOpenDividends = _this.user.isOpenDividends || false
                _this.user.dividendsBal = numberUtil.toMoneyFixed(_this.user.dividendsBal || 0);

                //初始化收藏采种
                var lotteryFavorites = _this.user.lotteryFavorites;
                if (lotteryFavorites != null) {
                    var lotteryList = _this.getLotteryList();
                    var lotteryIds = lotteryFavorites.split(",");

                    for (var i in lotteryList) {
                        var lottery = lotteryList[i];
                        if (arrayUtil.indexOf(lotteryIds, lottery.id + "") > -1) {
                            lottery.favorited = true;
                        } else {
                            lottery.favorited = false;
                        }
                    }
                }
                msgPushController.connect(_this.user);
                appContext.init();
                _this.user.init = true;
            }

            if (_this.initMenu) {

                _this.initMenu = false;
                userApi.getUserMenu({"menuName": "个人中心"}, function (resp) {

                    if (resp.code == 200) {

                        var menuData = resp.data || {};

                        var accountMenuPermissions = _this.getAccountMenuPermissions();

                        //初始化充值提现的权限

                        var cztx = menuData["cztxRole"] || {};

                        if (objectUtil.hasProperty(cztx)) {
                            accountMenuPermissions.cztx.sub = cztx;
                        }


                        //初始化个人中心的限权
                        var menuRoleChils = _this.getMenuRoleChils();
                        var grzx = menuData["menuRoleChils"] || {};
                        if (objectUtil.hasProperty(grzx)) {
                            accountMenuPermissions.grzx.sub = grzx;
                        }

                        //初始化第三方游戏权限
                        var trdPlatforms = _this.getTrdPlatforms();
                        var trdGames = _this.getTrdGames();
                        arrayUtil.forEach(trdGames, g => {
                            var m = menuData[g.name] || {};
                            if (m.all == true) {
                                g.permission = false;
                                arrayUtil.forEach(g.list, sub => {
                                    sub.permission = false
                                })
                                return;
                            }
                            g.permission = true;
                            arrayUtil.forEach(g.list, sub => {
                                var platform = arrayUtil.findFirst(trdPlatforms, item => {
                                    return item.code == sub.platform
                                });
                                if (platform == null) {
                                    sub.permission == false;
                                } else {
                                    // sub.permission = !(menuData[sub.permissionKey] || false);
                                    var parentPermission = menuData[g.name] || {};
                                    sub.permission = !(parentPermission[sub.permissionKey] || false);
                                }
                            });

                        });


                        //初始化彩票菜单权限
                        var lotteryMenu = menuData["彩票游戏"];
                        if (lotteryMenu == null) {
                            lotteryMenu = menuData["彩票大厅"];
                        }
                        lotteryMenu = lotteryMenu || {};
                        //lotteryMenu={all:false,"韩国1.5分彩":true,"福彩3D":true,"波兰11选5":null};
                        var lotteryList = _this.getLotteryList();

                        arrayUtil.forEach(lotteryList, item => {
                            if (lotteryMenu.all == true) {
                                item.permission = false;
                                return;
                            }

                            item.permission = !(lotteryMenu[item.name] || false);

                            var openTradition = false;
                            if (item.permission == true && item.isTradition == true) {
                                openTradition = true;
                            }

                            item.openTradition = openTradition;

                        });

                        var lotterTyps = _this.getLotteryTypesWithList();


                        arrayUtil.forEach(lotterTyps, (item, idx) => {
                            var permission = false;
                            arrayUtil.forEach(item.list, l => {
                                item.type.permission = true;

                                if (l.openTradition == true || l.openKg == true) {
                                    permission = true;
                                }
                            })
                            item.type.permission = permission;
                        })
                        _this.user.gameType = lotterTyps;
                        _this.user.traditionInitFinsh = true;

                        _this.setAllLotteryInitFinish();


                        if (platformData.setting.enableChatRoom == true) {
                            //聊天室权限1
                            if (menuData["聊天室"]) {
                                _this.user.isChatroom = menuData["聊天室"].all;
                            } else {
                                _this.user.isChatroom = true;
                            }
                        }else {
                            _this.user.isChatroom = false;
                        }

                    } else {
                        _this.user.isChatroom = false;
                    }


                    _this.user.allInitFinish = true;
                    callBack(_this.user);
                })
            } else {
                callBack(_this.user);
            }
        });

        this.initLotteryList();
        this.initSysConfig();

    },

    openCustomerService() {
        securityApi.getOnlineServiceUrl(function (resp) {
            if (resp.code == 200 && resp.data) {
                var kfx = resp.data.kefuxian;
                if (stringUtil.isBlank(kfx)) {
                    messageBox.alterWarning("暂无客服线");
                    return;
                }
                window.location = resp.data.kefuxian;
            } else {
                messageBox.alterError("获取客服线失败");
            }
        })
    },
    getAccountMenuPermissions() {
        var permissions = this.accountMenuPermissions;
        if (permissions == null) {
            permissions = {
                "cztx": {
                    persmission: true,
                    sub: {}
                },
                "grzx": {
                    permission: true,
                    sub: {}
                }


            }

            this.accountMenuPermissions = permissions;
        }
        return permissions;
    },
    getLotteryList() {
        return this.lotteryList;
    },

    lotteryList: [],
    initLotteryList() {

        var _this = this;
        if (this.lotteryList.length > 0) {
            return;
        }

        var types = lotteryTypeData.types;

        var list = platformData.lotteryGames;

        var displayTypes = platformData.lotteryDisplayTypes;

        for (var i in list) {
            var item = list[i];
            item.permission = false;

            if (!item.types) {
                item.types = item.type;
            }

            if (item.displayType == undefined) {
                item.displayType = item.type;
            }
            var displayType = arrayUtil.findFirst(displayTypes, dts => {
                return dts.name == item.displayType
            });
            if (displayType != null) {
                item.isTradition = displayType.isTradition;
                item.isKg = displayType.isKg;
            } else {
                item.isTradition = false;
                item.isKg = false;
            }
            item.openTradition = false;
            item.openKg = false;

            item.indexCountdown = {
                countdown: {
                    days: "00",
                    hours: "00",
                    munites: "00",
                    secondes: "00"
                },
                content: "惊喜不断",
                init: false,
                status: null
            }

            item.type = arrayUtil.findFirst(types, i => {
                return i.name == item.types
            })
            item.favorited = false;
        }

        kgApi.getLotteryList(function (resp) {

            if (resp.code == 200) {
                var data = resp.data || [];
                arrayUtil.forEach(list, lottery => {
                    var item = arrayUtil.findFirst(data, d => {
                        return lottery.id == d.id
                    });
                    if (item == null) {
                        return;
                    }
                    lottery.openKg = true;
                });
                _this.user.kgInitFinish = true;
                _this.setAllLotteryInitFinish();

            } else {
                console.error("获取KG采种API失败," + JSON.stringify(resp))
            }
        });

        lotteryBusiness.initLotteryInfos(list);

        arrayUtil.cover(this.lotteryList, list);

    },
    lotteryTypesWithList: null,
    getLotteryTypesWithList() {

        var displayTypes = lotteryBusiness.getDisplayTypeList();

        var list = this.getLotteryList();

        var lotteries = [];

        arrayUtil.forEach(displayTypes, type => {

            var currentList = arrayUtil.filter(list, item => {
                return item.displayType == type.name
            });

            lotteries.push({type: type, list: currentList});

        });

        return lotteries;
    },

    sysConfig: {},
    getSysConfig: function () {
        return this.sysConfig;
    },
    initSysConfig: function () {
        var _this = this;
        if (_this.user.configInitFinish == true) {
            return;
        }

        systemConfigApi.getConfig(function (resp) {

            if (resp.code == 200) {
                objectUtil.fillProperties(_this.sysConfig, resp.data);
                _this.user.configInitFinish = true;
            } else {
                console.error("获取系统配置失败," + JSON.stringify(resp));
            }
        })


    },
    ownPlatformObject: {
        wallet: {code: "wallet", desc: "钱包中心", val: "0", enable: true},
        lottery: {code: "lottery", desc: "彩票平台", val: "1", enable: true},
        // kg: { code: "kg", desc: "KG彩票", val: "8", enable: false },
        // dividends: { code: "dividends", desc: "分红", val: "7", enable: false },
    },

    getOwnPlatforms() {
        var platforms = [];
        for (var key in this.ownPlatformObject) {
            var p = this.ownPlatformObject[key];
            platforms.push(p)
        }
        return platforms;
    },
    trdGames: null,
    getTrdGames() {
        if (this.trdGames == null) {
            this.trdGames = platformData.trdGames;
            arrayUtil.forEach(this.trdGames, item => {
                arrayUtil.forEach(item.list, l => {
                    var platform = arrayUtil.findFirst(platformData.trdPlatforms, p => {
                        return p.code == l.platform
                    });
                    l.enabled = platform.enabled || false;
                    l.permission = true
                });
            })
        }
        return this.trdGames;
    },

    trdPlatforms: null,
    getTrdPlatforms() {
        if (this.trdPlatforms == null) {
            this.trdPlatforms = [];
            for (var i = 0; i < platformData.trdPlatforms.length; i++) {
                var item = platformData.trdPlatforms[i];
                if (item.enabled != false) {
                    item.bal = 0;
                    item.opened = false;
                    this.trdPlatforms.push(item);
                }
            }
        }
        return this.trdPlatforms;
    },

    menuRoleChils: null,
    getMenuRoleChils() {

        if (this.menuRoleChils == null) {
            this.menuRoleChils = platformData.trdPlatforms;
        }

        return this.menuRoleChils;
    },
    accountMenus: null,
    getAccountMenus() {
        if (this.accountMenus == null) {
            this.accountMenus = platformData.accountMenus;
        }
        return this.accountMenus;
    },

    checkIsNotLoginPlayer() {
        if (this.user.init == false) {
            appContext.current.lconfirm("您还没登录,马上登录赢钱吧!", {confirmButtonText: '登录'}, () => {
                viewUtil.toLoginView();
            });
            return true;
        }
        return false;
    },


    checkIsTryPlayer() {

        if (this.user.isShiWan) {
            appContext.current.lalterWarning("试玩账号不允许此操作")
            return true;
        }
        return false;
    },


    toWyczPage(path) {
        if (this.checkIsNotLoginPlayer()) {
            return;
        }
        if (this.checkIsTryPlayer()) {
            return;
        }
        var amps = this.getAccountMenuPermissions();
        var cztx = amps.cztx;
        if (cztx.persmission == true) {
            var wycz = cztx.sub["我要充值"] || {};
            if (wycz["all"] != true) {
                appContext.current.$router.push(path);
                return;
            }
        }
        appContext.current.lalterWarning("充值功能暂时关闭,若有疑问请联系客服!");
    },

    toMyReport() {
        if (this.checkIsTryPlayer()) {
            return;
        }
        appContext.current.$router.push("myReport");
    },
    toStatis() {
        appContext.current.$router.push({path: 'statis'});
    },
    toActivity() {
        appContext.current.$router.push({
            path: 'activity',
            query: {userName: this.user.userName, isShiWan: this.user.isShiWan}
        });
    },
    toBonusDetails() {
        if (this.checkIsTryPlayer()) {
            return;
        }
        appContext.current.$router.push({path: 'bonusDetails'});
    },
    toLotteryLimited() {
        if (this.checkIsTryPlayer()) {
            return;
        }
        appContext.current.$router.push({path: 'lotteryLimited'});
    },
    toFklb() {
        if (this.checkIsTryPlayer()) {
            return;
        }
        appContext.current.$router.push({path: 'fklb'});
    },
    toEmail() {
        if (this.checkIsTryPlayer()) {
            return;
        }
        appContext.current.$router.push({path: 'email'});
    },
    toFkyj() {
        if (this.checkIsTryPlayer()) {
            return;
        }
        appContext.current.$router.push({path: 'fkyj'});
    },
    toWytxPage(path) {

        if (this.checkIsNotLoginPlayer()) {
            return;
        }

        if (this.checkIsTryPlayer()) {
            return;
        }
        var amps = this.getAccountMenuPermissions();
        var cztx = amps.cztx;
        if (cztx.persmission == true) {
            var wytx = cztx.sub["我要提现"] || {};
            if (wytx["all"] != true) {
                appContext.current.$router.push(path);
                return;
            }
        }
        appContext.current.lalterWarning("提现功能暂时关闭,若有疑问请联系客服!");
    },
    toGame(view, id, name) {

        view.$router.push({path: "lotteryBet", query: {gameId: id, name: name}});

        /*   var list = this.getLotteryList();
         var lottery = arrayUtil.findFirst(list, l => {
         return l.id == id
         });


         var typeList = lotteryBusiness.getDisplayTypeList();
         var lotteryDisplayType = arrayUtil.findFirst(typeList, item => {
         return item.name == lottery.displayType
         });

         if(lotteryDisplayType.isTradition){
         view.$router.push({path:"lotteryBet",query:{gameId:id}});
         return;
         }

         if(lotteryDisplayType.isKg){
         view.$router.push({path:"kgGameBet",query:{gameId:id}});
         return;
         }*/
    },
    getBannerList(callback) {
        var _this = this;
        var doCallback = function (resp) {
            if (callback) {
                callback(resp);
            }
        }
        if (_this.bannerList != null) {
            doCallback(_this.bannerList);
            return;
        }

        userInfoApi.getUrlAddrs({type: "4"}, (resp) => {
            if (resp.code == 200) {
                _this.bannerList = resp;
                doCallback(_this.bannerList);
            }
        });
    },
    setAllLotteryInitFinish() {
        var user = this.user;
        if (user.traditionInitFinsh == true && user.kgInitFinish == true) {
            user.lotteryInitFinish = true;
        }
    }
}