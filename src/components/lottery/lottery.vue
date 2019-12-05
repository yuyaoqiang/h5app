<template>
    <div>
        <div  :class="currentRouter !='/games'?'lottry-mian-wrap backgournd-img-wrap':'lottry-mian-wrap'">
            <div class="box-header">
                <header class="pr header-box">
                    <div class="header-arrow-box" id="back_icon" @click="goback">
                        <i class="el-icon-arrow-left back-icon"></i>
                    </div>
                    <h1 class="header-title">购彩大厅</h1>
                </header>
            </div>
            <!-- <div class="lottrys-buy-wrap" v-if="currentRouter =='/games'">
                <ul  class="fastNav-contaner">
                    <li >
                        <img  src="data:image/png;base64,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" alt="" class="logo">
                        <div  class="cont">
                            <p  class="name">开奖公告</p>
                            <p  class="tip">彩票开奖信息</p>
                            </div>
                    </li>
                    <li >
                        <img  src="data:image/png;base64,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" alt="" class="logo">
                        <div  class="cont">
                            <p  class="name">走势图表</p>
                            <p  class="tip">最专业走势图</p>
                        </div>
                    </li>
                </ul>
                <section  class="room-box">
                    <div>
                        <img  src="../../assets/images/newImg/chatEntry.png" alt="">
                    </div>
                </section>
                <div class="index-box">
                    <div>
                        <img src="../../assets/images/newImg/qzroomRk.png" alt="">
                    </div>
                </div>
            </div> -->
           <div class="thrid-list-wrap" v-if="currentRouter =='/result'">
               <ul  class="typeList">
                   <li :key="item.code" v-for="item in trdPlatforms" @click="changeThridTab(item)">
                        <img v-lazy="require('../../assets/platform/main/images/thrids/'+item.image+'.png')">
                       <div  class="cont">
                           <p  class="name">{{item.desc}}</p>
                           </div>
                    </li>
                </ul>
            </div> 
            <div class="game-list-block">
                <ul class="game-list">
                    <li v-for="item in lottryTypes" :class="item.name == currentLottryType ? 'selected':''" 
                    :key="item.name" 
                    @click="changeLottryType(item)"
                    >{{item.desc?item.desc:item.name}}</li>
                </ul>
            </div>

            <div  class="box-body"  v-if="chooseType !='lottry'">
                <ul  :class="[thridGame.typeVedio == true?'type-games type-games-vedio':'type-games ']">
                    <li v-if="thridGame.type!='elec'" class="item"  :key="platform.name" v-for="platform in thridGame.platforms" @click="playGame(platform)">
                        <div  class="img-wrap">
                            <img  alt="" v-lazy="require('../../assets/platform/main/images/newImgs/'+platform.image)">
                        </div>
                        <p  class="name">{{platform.name}}</p>
                    </li>
                    <li v-if="thridGame.platform=='PT'" class="item"  :key="platform.name" v-for="platform in thridGame.platforms" @click="ptPlayGame(platform)"> 
                        <div  class="img-wrap">
                            <img  alt="" v-lazy="`${ptGameResourceUrl}${platform.code}.jpg`">
                        </div>
                        <p  class="name">{{platform.name}}</p>
                    </li>
                    <li v-if="thridGame.platform=='MG'" class="item"  :key="platform.name" v-for="platform in thridGame.platforms" @click="mgPlayGame(platform.code,false)">
                        <div  class="img-wrap">
                            <img  alt="" v-lazy="`${mgGameResourceUrl}${platform.img}`">
                        </div>
                        <p  class="name">{{platform.name}}</p>
                    </li>
                </ul>
            </div>

            <div class="lottery-height" v-if="chooseType =='lottry'">
                <section class="lottery-list-box">
                    <ul class="hot-lottery clearfix">
                        <li  @click="toLotteryFavorites">
                            <div>
                                <img src="../../assets/images/collection.png">
                            </div>
                            <div class="hot-collect">
                                <h2>我的收藏</h2>
                            </div>
                        </li>
                        <!-- <li v-for="item in lotteryList" v-if="item.openTradition==true || item.openKg==true || item.displayType=='VR'&&item.permission" -->
                        <li v-for="item in lotteryList" :key="item.id" 
                            v-if="(currentLottryType=='lottry'&& (item.openTradition==true || item.openKg==true) )|| (currentLottryType == item.displayType && (item.openTradition==true || item.openKg==true))"
                            @click="toGame(item)">
                            <div>
                                <img v-lazy="require('../../assets/images/lottery/'+item.logo)">
                            </div>
                            <div class="hot-name">
                                <h2>{{item.name}} <i class="hot-icon" v-if="item.hot"></i></h2>
                                <p>
                                    <span v-if="item.indexCountdown.status!=null"
                                        :class="{'red2':item.indexCountdown.status=='BETTING','green':item.indexCountdown.status=='CLOSED'}">
                                    {{item.indexCountdown.status == "BETTING" ? "投注" : "封盘"}}
                                    </span>

                                    <span :class="{'red2':item.indexCountdown.status=='BETTING','green':item.indexCountdown.status=='CLOSED'}">{{item.indexCountdown.content}}</span>

                                </p>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        <form id="game_form" style="display: none">
        </form>
        <div id="bbin_game" style="display: none">
        </div>
        <div class="mask" v-if="tranlateVisibel">
            <div class="warn bounce-enter-modal-lfet">
                <div class="title">转换额度</div>
                <div class="mask-close-wrap" @click="closeModal()">x</div>
                <div class="content">
                  <ul class="display-flex align-items">
                    <li class="inpitem-name">转出</li>
                    <li class="flex-box bank-select">
                        <span class="transfer-icon">
                            <i class="iconfont" :class="iconlist[transferout]"></i>
                        </span>
                        <select  v-model="transferout" @change="transferoutChanged">
                            <option v-if="item.opened&&item.permission"  :label="`${item.desc} (${item.bal}元)`" :value="item.value"
                                    v-for="item in transferPlatformList">
                                </option>
                        </select>
                    </li>
                </ul>
                <ul class="display-flex align-items">
                    <li class="inpitem-name">转入</li>
                    <li class="flex-box bank-select">
                        <span class="transfer-icon" >
                              <i class="iconfont" :class="iconlist[transferin]"></i>
                        </span>
                        <select  v-model="transferin" @change="transferinChanged">
                            <option v-if="item.opened&&item.permission" :label="`${item.desc} (${item.bal}元)`" :value="item.value"
                                    v-for="item in transferPlatformList"></option>
                        </select>
                    </li>
                </ul> 
                <ul class="money-btn">
                    <li  @click="setMoney(100)" :class="money=='100'?'active':''"><i class="iconfont icon-zhuanhuan_ color1"></i>100元</li>
                    <li  @click="setMoney(200)" :class="money=='200'?'active':''"><i class="iconfont icon-zhuanhuan_ color2"></i>200元</li>
                    <li  @click="setMoney(500)" :class="money=='500'?'active':''"><i class="iconfont icon-zhuanhuan_ color3"></i>500元</li>
                    <li  @click="setMoney(1000)" :class="money=='1000'?'active':''"><i class="iconfont icon-zhuanhuan_ color4"></i>1000元</li>
                    <li  @click="setMoney(2000)" :class="money=='2000'?'active':''"><i class="iconfont icon-zhuanhuan_ color5"></i>2000元</li>
                    <li  @click="setMoney('all')" :class="isAllMoney?'active':''"><i class="iconfont icon-zhuanhuan_ color6"></i>全部</li>
                </ul>
                </div> 
                <div class="i_know" @click="submitOut">提交</div>
            </div>
        </div>
        <v-redPack :isShow='true'></v-redPack>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import bankApi from "../../assets/js/api/bankApi.js"
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import viewUtil from '../../assets/js/business/common/viewUtil';
    import clone from 'lodash/clone'
    import objectUtil  from '../../assets/js/util/objectUtil';
    import lotteryApi from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from '../../assets/js/api/userInfo';
    import platformData from '../../assets/platform/main/platformData';
    import kgBusiness from '../../assets/js/business/lottery/kg/kgBusiness'
    import lotteryCountDownCenter from '../../assets/js/business/lottery/lotteryCountDownCenter'
    import downloadBanner from '../download/download_banner.vue'
    import appContext from '../../assets/js/context/appContext.js'
    import messageBox from '../../controls/messageBox'
    import bus from '../eventBus'
    import { Indicator,Toast } from 'mint-ui';
    import footer from '../footer/footer.vue';
    import redPack from '../commots/redPack.vue';
    export default {
        props: {
            showDLBanner: {
                type: Boolean,
            }
        },
        data() {
            return {
                modal:true,
                user: {
                    lotteryBal: 0
                },
                notice: {
                    "roll": []
                },
                rotationUrl: {
                    serverUrl: '',
                    context: ''
                },
                noticeDetails: {
                    title:'',
                    content:''
                },
                images: [],
                dialogVisible: false,
                lotteryList: [],
                lottryTypes:[],
                currentLottryType:'lottry',
                chooseType:'lottry',
                trdGames: [],
                accountMenus: {},
                isAllowRemote: false,
                playNoticInterval: null,
                platformName:'',
                currentRouter:'',
                trdPlatforms:[],
                thridGame:{},
                thrids:[],
                ptGameResourceUrl:"",
                mgGameResourceUrl:"",
                tranlateVisibel:false,
                transferPlatformList:[],
                token:'',
                transferout: 0,
                transferin: 2,
                money: 100,
                isAllMoney:false,
                iconlist:{
                0:'icon-zhuanhuan_qianbao',
                1:'icon-zhuanhuan_',
                2:'icon-zhuanhuan_a',
                3:'icon-zhuanhuan_b',
                4:'icon-zhuanhuan_m',
                5:'icon-zhuanhuan_p',
                6:'icon-zhuanhuan_d',
                7:'icon-zhuanhuan_fenhong',
                8:'icon-zhuanhuan_k',
                9:'icon-zhuanhuan_v',
                10:'icon-zhuanhuan_p',
               },
               thirdsStatus:{}
            }
        },
        created() {
            var _this = this;
            this.getCurrentRouter();
            this.initLottryType();
            this.initThirdType();
            this.getTokent();
            this.getThridMoneys();
            this.findThirdGameStatus();
            this.ptGameResourceUrl = $L_appSetting.staticResourceUrl+"/front/img/trdgame/pt/game/";
            this.mgGameResourceUrl = $L_appSetting.staticResourceUrl+"/front/img/trdgame/mg/game/";
            this.loadUser();
            
            _this.images = platformData.indexBanners;
            _this.isAllowRemote = platformData.setting.allowRemoteUrl;
            _this.platformName = platformData.setting.name;
            
            _this.trdGames = userBusiness.getTrdGames();
            _this.accountMenus = userBusiness.getAccountMenus();
           
            this.getListGame();

            userBusiness.getBannerList((res) => {
                var data = res.data;
                _this.rotationUrl.serverUrl = data.serverUrl;
                _this.rotationUrl.context = data.list;
            });

            userInfoApi.notice((res) => {
                if (res.code == 200) {
                    var data = res.data;
                    _this.notice.roll = data.roll || [];
                    _this.lotteryNote();
                }
            });
        },
        mounted(){
            let _this = this;
            bus.$on('btnBoxMessage',function(val){
                userBusiness.refreshBal(_this,function(user){
                    _this.user = user
                   
                },false)
            })
            bus.$on('getGameList',function(val){
                if(val){
                    _this.getListGame()
                }
            });
            $('.mask').on("touchmove",function(e){
                e.preventDefault();
            });   
        },
        methods: {
            findThirdGameStatus(){
                userInfoApi.findThirdGameStatus(res=>{
                     this.thirdsStatus = res.data;
                })
            },
            loadUser(){
             const _this =this;
             userBusiness.getUser(this, function (user) {
                _this.user = user;
                _this.initThridGamesState();
                // _this.refreshTrdBal();
                bus.$on('btnBoxMessage',function(val){
                    userInfoApi.notice((res) => {
                        
                        if (res.code == 200) {
                            var data = res.data;
                            _this.notice.roll = data.roll || [];
                            
                            if(_this.notice.roll.length&&!_this.user.isShiWan){
                                _this.$parent.noticeDetails = _this.notice.roll[0];
                                _this.dialogVisible = true;
                                _this.$parent.dialogVisible = true;
                            }     
                        }
                    });
                })   
            }, true)
            },
            setMoney(moeny){
                if(moeny=='all'){
                  this.isAllMoney =true; 
                  const  transferout = this.transferPlatformList.find(item=>item.value===this.transferout)
                  this.money = parseInt(transferout.bal);
                  return;
                }
                this.isAllMoney = false;
                this.money = moeny;
            },
            initThridGamesState(){
                let _this = this;
                if (this.user.init == false) {
                    return;
                }
                var platforms = _this.transferPlatformList;
                arrayUtil.forEach(platforms, item => {
                    let key = "isOpen" + item.name;
                    var val = this.user[key];
                    if (val != null) {
                        item.opened = val == "1";
                    }
                });
                const sortAfter=  platforms.sort((a,b)=>{
                    return b.opened/1 - a.opened/1
                })
                _this.transferPlatformList=sortAfter;
                this.grzxPermissions = userBusiness.getAccountMenuPermissions();
                   
                    var grzx = this.grzxPermissions.grzx||{};
                    var sub = objectUtil.safeGet(grzx,"sub");
                    var wdzh = objectUtil.safeGet(sub,"我的账户");
                    var qbzx = objectUtil.safeGet(wdzh,"钱包中心");
                    arrayUtil.forEach(_this.transferPlatformList ,item =>{             
                        var parentPermission = qbzx[item.name+'平台'];
                        if(parentPermission){
                            item.permission = false
                        }else{
                            item.permission = true
                        }
               })
            },
            getTokent(){
            let _this = this;
            bankApi.TransfInit(function (res) {
                _this.token = res.data
            });
            },
            getThridMoneys(){
            var platforms = [
                {name: "wallet", desc: "钱包中心", value: 0, isOwn: true, opened: true,permission:true},
            ];
            this.transferPlatformList = userBusiness.getTrdPlatforms();
                arrayUtil.forEach(platformData.trdPlatforms, item => {
                    if (item.enabled == false) return;
                    var trdPlatform = {
                        name: item.code,
                        desc: item.desc,
                        bal: 0,
                        opened: false,
                        value: item.value,
                        isOwn: false
                    };
                    platforms.push(trdPlatform);
                });
                this.transferPlatformList = platforms;
            },
             transferinChanged(){
                if (this.transferout == this.transferin) {
                    if (this.transferin == 0) {
                        this.transferout = 2;
                    } else {
                        this.transferout = 0;
                    }
                    return;
                }

                if (this.transferout > 0 && this.transferin > 0) {
                    this.transferout = 0;
                }
            },
            submitOut(){
               var _this = this;
               if(this.money == 0 ){
                    _this.lalterWarning('最低转换额度为一元整');
                    return false;
                }
                Indicator.open('加载中...');
                var params = {
                    "money": this.money,
                    "transferout": this.transferout,
                    "transferin": this.transferin,
                    "token": this.token
                };
                    bankApi.capitalTransfer(params, (resp) => {
                        _this.token = resp.data
                        if (resp.code == 200) {
                            _this.closeModal();
                            Indicator.close();
                            Toast({
                                message: '转换成功',
                            });
                            _this.money = 100;
                            _this.loadUser();

                        }else{
                            Indicator.close();
                            Toast( {
                                message: resp.msg,
                                duration: 2000
                                })
                        }
                    });
            },
            closeModal(){
             this.tranlateVisibel = false;
            },
            transferoutChanged(){
                this.isAllMoney =false;
                this.money=100;
                if (this.transferout == this.transferin) {
                    if (this.transferout == 0) {
                        this.transferin = 2;
                    } else {
                        this.transferin = 0;
                    }
                    return;
                }
                if (this.transferout > 0 && this.transferin > 0) {
                    this.transferin = 0;
                }
            },
            refreshTrdBal(){
                let _this = this;
                let user = this.user;
                if(user.init == false){
                    return;
                }
                Indicator.open('加载中...');
                bankApi.thirBalancer((res) => {
                    Indicator.close();
                    if (res.code == 200) {
                        var data = res.data;
                        arrayUtil.forEach(_this.transferPlatformList, item => {
                            let key = "_" + item.name + "Balance";
                            var bal = data[key];
                            if (bal != null) {
                                item.bal = bal.balance;
                            }
                            if(item.name=='wallet'){
                                item.bal = user[item.name + 'Bal']
                            }
                        });
                    } else {
                        _this.lalterError(res.msg);
                    }
                });
            },
             ptJump(code, tryPlay){
                var _this = this;
                var paramStr = "jump=true&t1=" + tryPlay + "&c1=" + code;
                if (tryPlay == false) {
                    var val = "u1=" + _this.ptUser.username + "&u2=" + _this.ptUser.password+"&u3="+new Date().getTime();
                    var encryptStr = this.encrypt(val);
                    paramStr+="&c2="+encryptStr;
                }
                window.open(appContext.buildH5StaticPath("html/PTGame.html?" + paramStr));
            },
            encrypt(source){
                var deStr = new Array();
                var i, s;
                for (i = 0; i < source.length; i++) {
                    deStr += "F" + source.charCodeAt(i).toString(10);
                }
                return deStr;
            },
            mgPlayGame(code, tryPlay){
                var _this = this;
                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }
                if(this.thirdsStatus.MG==1){
                    messageBox.alterWarning('该游戏正在维护中')
                    return;
                }             
                // const thridAccount = this.checkAccount({platform:'PT'});
                // if(thridAccount.bal<1){
                //    this.tranlateVisibel = true; 
                //    return;
                // }   
                var params = "platFormId=4&gameType="+code+"&tryPlay="+tryPlay;
                Indicator.open({text: '加载中...'});
                setTimeout(() => {
                userInfoApi.syncLoginThir(params, function (resp) {
                    Indicator.close();
                    if (resp.code == 200) {
                        window.open(resp.data.url,"_self");
                    } else {
                        _this.lalterWarning(resp.msg);
                    }
                 })  
                }, 500);
            },
            ptPlayGame(item){
                let code = item.code
                var _this = this;
                 if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }  
                if(this.thirdsStatus.PT==1){
                    messageBox.alterWarning('该游戏正在维护中')
                    return;
                }                              
                if (this.ptUser != null) {
                    this.ptJump(code, false);
                    return;
                }
                // const thridAccount = this.checkAccount({platform:'PT'});
                // if(thridAccount.bal<1){
                //    this.tranlateVisibel = true; 
                //    return;
                // }                 
                var params = "platFormId=5&gameType=" + code + "";
                Indicator.open({text: '加载中...'});
                setTimeout(() => {
                    userInfoApi.syncLoginThir(params, function (resp) {
                    Indicator.close();
                    if (resp.code == 200) {
                        _this.ptUser = {}
                        _this.ptUser.username = resp.data.ptUsername;
                        _this.ptUser.password = resp.data.ptPassword;
                        _this.ptJump(code, false);
                    } else {
                        _this.lalterError(resp.msg);
                    }
                })
                }, 500);
            },
            checkAccount(item){
              return this.transferPlatformList.find(at=>{
                    return item.platform === at.name
                })
            },
            playGame(item){
                var _this=this;
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }
                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                if(this.thirdsStatus[item.platform]==1){
                    messageBox.alterWarning('该游戏正在维护中')
                    return;
                } 
                // const thridAccount = this.checkAccount(item);
                // if(thridAccount.bal<1){
                //    this.tranlateVisibel = true; 
                //    return;
                // }
                var platform =item.platform;
                var openedPropName="isOpen"+platform;
                var opened = this.user[openedPropName];
                if(opened == null || opened ==0){
                    this.lconfirm(platform+"平台还未开通,确定开通吗?",null,function () {
                        _this.$router.push({path:"quotaConversion"});
                    })
                    return;
                }
                if(item.permission==false){
                    _this.lalterWarning("该游戏暂时关闭,若有疑问请联系客服!");
                    return false;
                }
                var path = item.path;
                if (path == null || path == 'undefined') {
                    var params={
                        platform:platform,
                        gameType: item.type,
                        tryPlay:false 
                    };

                    Indicator.open({text: '加载中...'});
                    userInfoApi.getTrdGameLoginInfo(params, function (resp) {
                          Indicator.close();
                        if (resp.code == 200) {
                            if(platform=='VR'){
                                var protocol = window.location.protocol;
                                var val = resp.data.url;
                                var arr = val.split('://');
                                var src = protocol+'//'+ arr[1];
                                _this.jump(src,platform);
                            }else{
                            var url =resp.data.url;
                            _this.jump(url,platform);
                            }
                        } else {
                            _this.lalterError(resp.msg);
                        }
                    });

                }else {
                    this.$router.push({path:path}); 
                }
            },
            jump(val,platform){
                var _this=this;

                if (platform == "BBIN") {
                    $("#bbin_game").html(val);
                    $("#bbin_game").find("form").submit();
                }else if (platform == "SB"||platform == "GP") {
                    var obj = JSON.parse(val);
                    var $form = $("#game_form");
                    for (var key in obj) {
                        if(key=="jumpUrl"){
                            continue;
                        }
                        $form.append("<input hidden name='"+key+"' value='"+obj[key]+"' />");
                    }
                    _this.lshowWait()
                    if(platform == "SB"){
                        window.open(obj.phonUrl,'_self')
                        return;
                    }
                    if(platform == "GP"){
                        $form.attr("action", obj.jumpUrl+"/gameplay/login_jump");
                    }
                    $form.submit();
                    }else if(platform == "VR"){
                    window.open(val,'_self');
                    } else {
                    var $form = $("#game_form");
                    if(platform=="AG"){
                        $form.attr("method","post");
                          $form.submit();
                    }
                    if( platform=="KY"){
                         window.open(val,'_self')
                        return;
                    }
                    $form.attr("action", val);
                    $form.submit();
                }
            },
            changeThridTab(item){
                if(item.code=='lottry'){
                    this.currentLottryType='lottry';
                    this.chooseType = 'lottry';
                    this.initLottryType();
                    return;
                }else{
                const lists = [];
                this.chooseType =item.code;
                this.currentLottryType=item.platforms[0].name;
                this.lottryTypes = item.platforms;
                item.platforms.map(palys=>{
                    platformData.trdGames.map(item2=>{
                       item2.list.map(l=>{
                           if(palys.type== l.playType ){
                             lists.push(l)
                           }
                       })
                    })
                })
              this.thridGame = lists[0];
              this.thrids = lists;
              }
            },
            getCurrentRouter(){
                this.currentRouter = this.$route.path;
            },
            goback(){
                this.$router.goBack('/index')
            },
            changeLottryType(item){
                if( this.chooseType == 'lottry'){
                this.initLottryType();
                this.currentLottryType = item.name;
                }else{
                this.currentLottryType = item.name;
                this.thrids.map(thrid=>{
                    if(thrid.playType == item.type){
                        this.thridGame = thrid;
                    }
                })
                }
            },
            toActive(item){
                if(!item.name || item.name.indexOf("@")==-1) return;
                var name = item.name.split('@')[1];
                this.$router.push({path: "activity", query: {name: name}});
            },
            initThirdType(){
                const types = clone(platformData.trdPlatforms);
                this.trdPlatforms = [{ code: "lottry", desc: "购彩大厅", value: 0 ,image:'gcdt',platforms:[]},...types]
            },
            initLottryType(){
                const types = clone(platformData.lotteryDisplayTypes);
                this.lottryTypes = [{ name: "lottry", desc: "全部彩种",  },...types]
            },

            getListGame(){
                let _this = this;
                _this.lotteryList = [];
                lotteryBusiness.getIndexLotteryList(function (indexLotteryList) {
                    if (indexLotteryList && indexLotteryList.length > 0 && indexLotteryList.length <= 200) {

                        var ids = arrayUtil.join(indexLotteryList, item => {
                            return item.id;
                        }, ",");
                        lotteryApi.getBettingTimeList({gameIds: ids}, function (resp) {
                            if (resp.code == 200) {
                                //todo
                                var data = resp.data;
                                arrayUtil.forEach(indexLotteryList, item => {
                                    var countdown = data[item.id];
                                    if (countdown != null) {
                                        lotteryCountDownCenter.add(item, countdown);
                                    }
                                });
                            }
                        });
                        _this.lotteryList = indexLotteryList;
                    }
                });
            },
            toLogin(){
              viewUtil.toLoginView();
            },
            toLotteryFavorites(){
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                this.$router.push({path:"lotteryFavorites"});
            },
            leftSlide() {
                this.$parent.leftSlide();
            },
            toGame(lty) {
                userBusiness.toGame(this, lty.id);
            },
            lotteryNote() {
                var _this = this;
                if (_this.notice.roll.length <= 1) {
                    return;
                }
                this.stopAutoNotic();
                let noteContent = document.querySelector(".lottery-note-box");
                if (noteContent){
                    _this.playNoticInterval = setInterval(function () {
                        let note = document.querySelectorAll(".lottery-note-box p")[0];
                        noteContent.appendChild(note);
                    }, 3 * 1000)
                }
            },

            toWytxPage(path) {
                userBusiness.toWytxPage(path);
            },
            toWyczPage(path) {
                userBusiness.toWyczPage(path);
            },
            toActivity(){
                userBusiness.toActivity();
            },
            toTrdGame(item) {
                var falg = userBusiness.checkIsTryPlayer();
                if (falg) {
                    return;
                }
                if (item.permission != true) {
                    this.lalterWarning(item.name + "游戏暂未开放");
                    return;
                }
                this.$router.push({path: "thirdGame", query: {code: item.code}});
            },
            toLotteryHome(type) {
                this.$router.push({path: 'lotteryHome', query: {lotteryType: type}});
            },
            toThirdGame(){
                this.$router.push({path: 'thirdGame'});
            },
            onlineServer() {
                userBusiness.openCustomerService();
            },
            openDetails(index) {
                
                this.dialogVisible = true;
                this.$parent.dialogVisible = true;
                this.$parent.noticeDetails = this.notice.roll[index];
            },
            stopAutoNotic() {
                if (this.playNoticInterval != null) {
                    clearInterval(this.playNoticInterval);
                    this.playNoticInterval = null;
                }
            },
            loginShiWan(){
                var _this = this;
                var params = {
                    "device" : 0,
                };
                _this.lshowWait();
                userInfoApi.loginShiWan(params,(res)=>{
                    _this.lcloseWait();
                    if(res.code == 200){
                        userBusiness.initMenu=true;
                        userBusiness.getUser(this, function (user) {
                            _this.user = user;
                        }, true)

                    }else {
                        this.lalterError(res.msg);
                    }
                })
            },


        },
        components: {
            'v-downloadBanner': downloadBanner,
            'v-footer': footer,
            'v-redPack': redPack,
        },
        watch:{
             "$parent.dialogVisible":function(a,n){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
                
             }
        },
        beforeDestroy() {
            this.stopAutoNotic();
            lotteryCountDownCenter.clearAll();
        }
    }
</script>
<style lang="less" scoped>
    .game-list-block{
        position: sticky;
        top: 0.44rem;
        z-index: 10;
        width: 100vw;
        background-color: #fff;
        border-bottom: 1px solid #ff464b;
        max-height: 26.66666667vw;
        .game-list{
            padding: 3.2vw 1.6vw;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            padding: 2.66666667vw;
            max-height: 20vw;
            transition: max-height .5s cubic-bezier(0,1,0,1) -.1s;
            overflow: hidden;
            li{
                height: 6.66666667vw;
                line-height: 6.66666667vw;
                margin-top: 1.33333333vw;
                color: #5b6575;
                border-radius: 4vw;
                font-size: 3.73333333vw;
                white-space: nowrap;
                text-align: center;
                width: 24.66666667%;  
                transition: all .5 1s;
            }
            .selected{
                font-size: 4.26666667vw;
                color: #fff;
                background-image: linear-gradient(90deg,#ff464b,#ff464b); 
            }
        }
    }
    .header-box{
        background-image: url('../../assets/images/newImg/lottery-bg2.png');
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    .backgournd-img-wrap{
        background-image: url('../../assets/images/newImg/lottery-bg2.png');
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    .lottry-mian-wrap{
        min-height: calc(100vh - 2.2rem);
        background-color: #fff;
        padding-top: 0.5rem;
        min-height: calc(100vh - 2.2rem - 13.33333vw);
        .room-box{
            margin: 0 4vw 2.66666667vw 4vw;
            img{
                display: block;
                width: 100%;
            }
        }
        .index-box{
            margin: 0 4vw 2.66666667vw 4vw;
            img{
                display: block;
                width: 100%;
            }
        }
        .fastNav-contaner{
            display: flex;
            margin: 0 4vw 2.66666667vw; 
            li{
                background-color: #fff;
                flex: 1;
                display: flex;
                align-items: center;
                padding: 1.86666667vw;
                border-radius: 1.33333333vw;
                margin-right: 2.66666667vw;
                .logo{
                width: 20vw;
                height: 12.26666667vw;  
                }
                .cont{
                    flex: 1;
                    p{
                        color: #3d3d3d;
                    }
                    .name{
                        font-size: 4.8vw;
                    }
                    .tip{
                        font-size: 12px;
                    }
                }
            }           
        }
        .disable-img{
            filter: grayscale(100%)!important;
        }
        .thrid-list-wrap{
            margin: 0 5vw;
        }
        .typeList{
            display: flex;
            flex-wrap: wrap;
            position: relative;
            padding-bottom: 3px;
            background-color: #fff;
            box-shadow: 0.26666667vw 1.6vw 1.6vw 0 rgba(0,0,0,.14);
            border-radius: 5.8vw;
            z-index: 88;
            li{
                width: 25%;
                text-align: center;
                color: #fff;
                padding: 1.6vw 0;
                .name{
                    color: #3d3d3d;
                    margin: .93333333vw 0 0;
                    font-size: 12px;
                }
                img{
                    width: 16.53333333vw;
                    height: 16.53333333vw;
                    display: block;
                    margin: 0 auto;
                    float: none;
                }
            }
        }
        .typeList:before{
            content: "";
            position: absolute;
            left: 0;
            bottom: 3px;
            right: 0;
            height: 1px; 
        }
    }
</style>
<style lang="less" scoped>
    .box-body{
        padding: 2.66666667vw;
        .show{
            height: auto !important;
            overflow: hidden　!important;
        }
        .type-games{
            display: flex;
            align-items: center;
            text-align: center;
            flex-wrap: wrap;
            // height: 26.66666667vw;
            overflow: hidden;
            .item{
            width: 25%;
            padding: 0 1.33333333vw;
            text-align: center;
            margin-bottom: 2.66666667vw;
            .img-wrap{
                width: 20vw;
                height: 20vw;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.33333333vw;
                img{
                    display: inline-block;
                    width: 100%;
                    float: none;
                }
            }
            .name{
                color: #3d3d3d;
                white-space: nowrap;
                height: 4.66666667vw;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        }
        .type-games-vedio{
            height: 33.33333333vw;
            display: flex;
            align-items: center;
            text-align: center;
            flex-wrap: wrap;
            overflow: hidden;
            .item{
                width: 50%;
                padding: 0 1.33333333vw;
                text-align: center;
                margin-bottom: 2.66666667vw;
                .img-wrap{
                    width: 100%;
                    height: 26.66666667vw;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.33333333vw;
                    img{
                        float: none;
                        width: auto;
                        height: 100%;
                        position: absolute;
                        left: 50%;
                        -webkit-transform: translateX(-50%);
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }
    .mint-indicator{
        .mint-indicator-wrapper{
                z-index: 999 !important;
            }
    }
    .bank-select .transfer-icon i.iconfont{
        vertical-align: 0;
    }
    .align-items{
        align-items: center;
    }
    .money-btn{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        i{
            font-size: 0.15rem;
        }
        li{
            width: 30%;
            margin: 0.051rem 0;
            border: 1px solid #fff;
            padding: 0.05rem 0;
        }
        .active{
            border: 1px solid #bbbbbb;
            border-radius: 0.1rem;
            background: none;
            color: #bbbbbb;
        }
        .color1{
            color:rgb(153, 153, 153);
        }
        .color2{
            color: rgb(82, 187, 114);
        }
        .color3{
            color: rgb(92, 188, 243);
        }
        .color4{
            color:  rgb(230, 99, 164);;
        }
        .color5{
            color:  rgb(250, 96, 96);;
        }
        .color6{
            color: rgb(214, 84, 253);
        }
    }
    .is-placebottom{
        z-index: 10000 !important;
    }
    .mask{position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);z-index: 889;}
    .warn{width: 90%;overflow: hidden;position: absolute;top: 25%;left: 0;right: 0;margin:auto;border-radius: 8px;background-color: #fff;transform: translateY(-50%);-webkit-transform: translateY(-50%);  z-index: 888;}
    .warn .title{width: 100%;height: 50px;line-height: 57px;text-align: center;font-size: 18px;}
    .warn .content{margin: 0 auto;font-size: 14px;line-height: 20px;text-align: center;padding-left: 21px;padding-right: 21px;padding-bottom: 24px;}
    .warn .i_know{border-top: 1px solid #eee;width: 100%;height:46px;color: #4691ee;text-align: center;font-size: 16px;line-height: 46px;}
    .mask-close-wrap{
        position: absolute;
        top: 0;
        right: 0;
        height: 0.3rem;
        width: 0.3rem;
        text-align: center;
        font-size: 0.2rem;
    }
.bounce-enter-modal-lfet{
    animation-fill-mode: both;
    animation-duration: 1s;
    animation-name: bounceInUp-modal-lfet; 
 }  
@keyframes bounceInUp-modal-lfet {
	0% {
		transform: translateY(-1000px)
	}

	60% {
		transform: translateY(15px)
	}

	80% {
		transform: translateY(-10px)
	}

	100% {
		transform: translateY(0)
	}
}
</style>