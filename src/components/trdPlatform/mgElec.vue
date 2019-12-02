<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>MG电子游戏</h1>
                <div @click="openOnlineService" class="service">
                    <i class="iconfont icon-zhanghu_kefu"></i>
                </div>
            </header>
        </div>
        
        <section class="mg-game">
            <ul class="clearfix">
                <li v-for="item in gameList"  @click="playGame(item.code,false)">
                    <img :src="`${trdGameResourceUrl}${item.img}`" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
    import mgGameData from '../../assets/js/data/mgGameData.js'
    import platformData from '../../assets/platform/main/platformData';
    import userBusiness from '../../assets/js/business/user/userBusiness'
    import userInfoApi from "../../assets/js/api/userInfo"
    export default {
        data(){
            return {
                trdGameResourceUrl:"",
                gameList:[]
            }
        },
        created(){
            this.gameList = mgGameData.data;

            this.trdGameResourceUrl = $L_appSetting.staticResourceUrl+"/front/img/trdgame/mg/game/";
          
        },
        methods:{
            goback: function () {
                this.$router.go(-1);  
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },
            playGame(code, tryPlay){
                var _this = this;
                var params = "platFormId=4&gameType="+code+"&tryPlay="+tryPlay;
               
                userInfoApi.syncLoginThir(params, function (resp) {
                   
                    if (resp.code == 200) {
                        window.open(resp.data.url,'_self');
                    } else {
                        _this.lalterWarning(resp.msg);
                    }
                })
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

