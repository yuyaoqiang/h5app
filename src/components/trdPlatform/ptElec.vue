<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>PT电子游戏</h1>
                <div @click="openOnlineService" class="service">
                    <i class="iconfont icon-zhanghu_kefu"></i>
                </div>
            </header>
        </div>
        
        <section class="mg-game">
            <ul class="clearfix">
                <li v-for="item in gameList"  @click="playGame(item.code)">
                    <img :src="`${trdGameResourceUrl}${item.code}.jpg`" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
    import ptGameData from '../../assets/js/data/ptGameData.js'
    import platformData from '../../assets/platform/main/platformData';
    import userBusiness from '../../assets/js/business/user/userBusiness'
    import userInfoApi from "../../assets/js/api/userInfo"
    import appContext from '../../assets/js/context/appContext.js'
    export default {
        data(){
            return {
                trdGameResourceUrl:"",
                gameList:[],
                ptUser: null,
            }
        },
        created(){
            this.gameList = ptGameData.data;

            this.trdGameResourceUrl = $L_appSetting.staticResourceUrl+"/front/img/trdgame/pt/game/";
          
        },
        methods:{
            goback: function () {
                this.$router.go(-1);  
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },
            jump(code, tryPlay){
                var _this = this;

                var paramStr = "jump=true&t1=" + tryPlay + "&c1=" + code;
                if (tryPlay == false) {
                    var val = "u1=" + _this.ptUser.username + "&u2=" + _this.ptUser.password+"&u3="+new Date().getTime();
                    var encryptStr = this.encrypt(val);
                    paramStr+="&c2="+encryptStr;
                }


                window.open(appContext.buildH5StaticPath("html/PTGame.html?" + paramStr));
            },

            playGame(code){
                var _this = this;

                if (this.ptUser != null) {
                    this.jump(code, false);
                    return;
                }
               
                var params = "platFormId=5&gameType=" + code + "";
                userInfoApi.syncLoginThir(params, function (resp) {
                    if (resp.code == 200) {
                        _this.ptUser = {}
                        _this.ptUser.username = resp.data.ptUsername;
                        _this.ptUser.password = resp.data.ptPassword;
                        //123
                        _this.jump(code, false);
                    } else {
                        _this.lalterError(resp.msg);
                    }
                })

            },
            encrypt(source){
                var deStr = new Array();
                var i, s;
                for (i = 0; i < source.length; i++) {
                    deStr += "F" + source.charCodeAt(i).toString(10);
                }
                return deStr;
            },


            decrypt(encrypt){
                var source = new Array();
                var i;
                var s = encrypt.split("F");
                for (i = 1; i < s.length; i++) {
                    source += String.fromCharCode(parseInt(s[i], 10));
                }
                return source;
            }

        }
    }
</script>
<style scoped>
.mg-game{
    padding-top: 0.3rem;
}
.mg-game ul li{
    float: left;
    width:0.8rem;
    height: 0.6rem;
    margin: 0.2rem 0.1rem;
    text-align: center;
}
.mg-game ul li img{
    display: block;
    width:0.8rem;
    border: 1px solid #cccccc;
    height: 0.6rem;
}
</style>