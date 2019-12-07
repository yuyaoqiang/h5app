<template>
    <div>
       <div v-if="isJump==false">
            <div class="box-header">
                <header class="header-box">
                    <div class=" login-left column-icon-box" @click='leftSlide'>
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <h1>{{current.name}}</h1>
                </header>
            </div>
            <div class="lottry-types-wrap" >
                <div  class="type-box" :key="item.name" v-for="item in current.list">
                        <div  id="gameSearch-AG_FISH" class="box-lottry-header">
                            <!-- <i  class="iconfont icon-img">
                                <img  v-lazy="require('../../assets/platform/main/images/newImgs/'+item.image)">
                            </i> -->
                        <span  class="name">{{item.name}}</span>
                        <span  class="showMore" v-if="item.more" @click="changeStae(item)">
                            <i  :class="item.close?'iconfont icon-tou_fanhui':'show iconfont icon-tou_fanhui rotate'"></i><span>{{item.close?'展开':'收起'}}</span>
                        </span>
                        </div>
                        <div  class="box-body">
                            <ul  :class="[current.typeVedio ==true?'type-games type-games-vedio':'type-games ',item.close?'':'show']">
                                <li v-if="item.platform!='PT' && item.platform!='MG'" class="item"  :key="platform.name" v-for="platform in item.platforms" @click="playGame(platform)">
                                    <div  class="img-wrap">
                                        <img  alt="" v-lazy="require('../../assets/platform/main/images/newImgs/'+platform.image)">
                                    </div>
                                    <p  class="name">{{platform.name}}</p>
                                </li>
                                <li v-if="item.platform=='PT'" class="item"  :key="platform.name" v-for="platform in item.platforms" @click="ptPlayGame(platform.code)"> 
                                    <div  class="img-wrap">
                                        <img  alt="" v-lazy="`${ptGameResourceUrl}${platform.code}.jpg`">
                                    </div>
                                    <p  class="name">{{platform.name}}</p>
                                </li>
                                <li v-if="item.platform=='MG'" class="item"  :key="platform.name" v-for="platform in item.platforms" @click="mgPlayGame(platform.code,false)">
                                    <div  class="img-wrap">
                                        <img  alt="" v-lazy="`${mgGameResourceUrl}${platform.img}`">
                                    </div>
                                    <p  class="name">{{platform.name}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
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
        <!-- <v-footer></v-footer> -->
    </div>
</template>

<script>

    import stringUtil from "../../assets/js/util/stringUtil"
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import userBusiness from "../../assets/js/business/user/userBusiness"
    import apiUtil from "../../assets/js/api/common/apiUtil"
    import userInfoApi from "../../assets/js/api/userInfo"
    import slippery from "../slippery/slippery.vue"
    import { Indicator,Toast } from 'mint-ui';
    import bankApi from "../../assets/js/api/bankApi.js"    
    import appContext from '../../assets/js/context/appContext.js'
    import objectUtil  from '../../assets/js/util/objectUtil';
    import platformData from '../../assets/platform/main/platformData';    
    import footer from '../footer/footer.vue';
    import messageBox from '../../controls/messageBox'
    export default {
        data () {
            return {
                user:null,
                current:{name:''},
                games:null,
                title:null,
                isJump:true,
                ptGameResourceUrl:"",
                mgGameResourceUrl:"",
                ptUser:null,
                tranlateVisibel:false,
                transferPlatformList:[],
                thirdsStatus:{
                },
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
            }
        },
        created(){
            var _this = this;
            _this.isJump=false;
            this.initUser();
            this.getTokent();
            this.getThridMoneys();
            this.findThirdGameStatus();
            this.ptGameResourceUrl = $L_appSetting.staticResourceUrl+"/front/img/trdgame/pt/game/";
            this.mgGameResourceUrl = $L_appSetting.staticResourceUrl+"/front/img/trdgame/mg/game/";
        },
        components: {
            'v-footer': footer,
        },
        methods: {
            findThirdGameStatus(){
                userInfoApi.findThirdGameStatus(res=>{
                     this.thirdsStatus = res.data;
                })
            },
            initUser(){
                const _this =this;
                var type=_this.$route.query.type;
                userBusiness.getUser(this, user => {
                    _this.user = user;
                    _this.initGames(type);
                    // _this.refreshTrdBal();
                    _this.initThridGamesState();              
                })
            },
            initGames(type){
                var _this=this;
                _this.games = userBusiness.getTrdGames();
                var current = arrayUtil.findFirst(_this.games, item => {
                    return item.code == type
                });
                _this.current = current;
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
            changeStae(item){
                item.close = !item.close;
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
            leftSlide(){
                this.$router.goBack('/index')
            },
            closeModal(){
             this.tranlateVisibel = false;
            },
            checkAccount(item){
              return this.transferPlatformList.find(at=>{
                    return item.platform === at.name
                })
            },
            getTokent(){
            let _this = this;
            bankApi.TransfInit(function (res) {
                _this.token = res.data
            });
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
                            _this.initUser();

                        }else{
                            Indicator.close();
                            Toast( {
                                message: resp.msg,
                                duration: 2000
                                })
                        }
                    });
            },                      
            goback() {
                this.$router.go(-1);
            },
            change(item){
                if (this.current != null) {
                    this.current.selected = false;
                }
                item.selected = true;
                this.current = item;
            },
            ptJump(code, tryPlay){
                var _this = this;
                var paramStr = "jump=true&t1=" + tryPlay + "&c1=" + code;
                if (tryPlay == false) {
                    var val = "u1=" + _this.ptUser.username + "&u2=" + _this.ptUser.password+"&u3="+new Date().getTime();
                    var encryptStr = this.encrypt(val);
                    paramStr+="&c2="+encryptStr;
                }
                Indicator.close();
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
                // const thridAccount = this.checkAccount({platform:'MG'});
                // if(thridAccount.bal<1){
                //    this.tranlateVisibel = true; 
                //    return;
                // }   
                Indicator.open({text: '加载中...'});              
                var params = "platFormId=4&gameType="+code+"&tryPlay="+tryPlay;
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
            ptPlayGame(code){
                var _this = this;
                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }
                if(this.thirdsStatus.PG==1){
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
                Indicator.open('加载中...');
                var params = "platFormId=5&gameType=" + code + "";
                setTimeout(() => {
                userInfoApi.syncLoginThir(params, function (resp) {
                    Indicator.close();
                    if (resp.code == 200) {
                        _this.ptUser = {}
                        _this.ptUser.username = resp.data.ptUsername;
                        _this.ptUser.password = resp.data.ptPassword;
                        _this.ptJump(code, false);
                    } else {
                        Toast(resp.msg);
                    }
                })
                }, 500);
            },
            playGame(item){
                var _this=this;
                
                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }
                debugger
                if(this.thirdsStatus[item.platform]==1){
                    messageBox.alterWarning('该游戏正在维护中')
                    return;
                }
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
                // const thridAccount = this.checkAccount(item);
                // if(thridAccount.bal<1){
                //    this.tranlateVisibel = true; 
                //    return;
                // }                
                var path = item.path;
                if (path == null || path == 'undefined') {
                    var params={
                        platform:platform,
                        gameType: item.type,
                        tryPlay:false 
                    };

                    Indicator.open('加载中...');
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
            }
        },
    }
</script>
<style lang="less" scoped>
.header-box .login-left{
    position: absolute;
    width: 0.5rem;
    top: 0;
    left: 0;
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem; 
    i{
        font-size: 0.2rem;
        color: #ffffff;
    }
}

.lottry-types-wrap{
    padding-top: 0.4rem;
}
.showMore{
    .iconfont{
        color: #ff464b;
        font-family: iconfont!important;
        font-size: 16px;
        font-style: normal; 
        display: inline-block;
         transform: rotate(-90deg);  
        transition:transform 0.3s linear;
    }
    span{
        color: #ff464b;
        font-size: 3.2vw;
        margin-left: .66666667vw;
    }
    .rotate{
            transform: rotate(90deg);  
    }
}
.type-box{
    background: #fff;
    color: #3d3d3d;
    margin-bottom: 2.66666667vw;
    .box-lottry-header{
        border-bottom-color: #fff;
        border-bottom-color: #fff;
        padding: 2.66666667vw 1.33333333vw 2.66666667vw;
        margin: 0 2.66666667vw;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        .name{
            flex: 1;
        }
        .icon-img{
            width: 5.33333333vw;
            height: 5.33333333vw;
            border-radius: 100%;
            margin-right: 1.6vw;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .iconfont{
            font-family: iconfont!important;
            font-size: 16px;
            font-style: normal;
        }
    }
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
            height: 26.66666667vw;
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
                    border-radius: 0.1rem;
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
                        border-radius: 0.1rem;
                    }
                }
            }
        }
    }
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
    animation-duration: 1s;
    animation-fill-mode: both;
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
