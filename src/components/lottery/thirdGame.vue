<template>
    <div>
       <div v-if="isJump==false">
           <div class="lottery-slide-left">
                <v-slippery :user="user" ref="tagIndex"></v-slippery>
            </div>
            <div class="box-header">
                <header class="header-box">
                    <div class="column-icon-box" @click='leftSlide'>
                        <i class="column-icon"></i>
                    </div>
                    <h1>游戏大厅</h1>
                </header>
                <section class="tab-nav-box"  v-if="games != null">
                    <ul class="display-box text-center">
                        <li :class="{'active':item.selected}"  @click="change(item)" v-for="(item,index) in  games">{{item.name}}</li>
                    </ul>
                </section>
            </div>
            <div class="lottery-slide-right">
            
                <section class="recording-height" v-if="current != null" style="padding-top:0.4rem">
                    <ul class="display-flex platform-enter" v-for="item in current.list">
                    <li class="flex-box">
                        <img :src="require('../../assets/platform/main/images/game/'+item.image)">
                    </li>
                    <li class="platform-sidebar">
                        <div>
                            <h2>{{item.name}}</h2>
                            <button type="button"  @click="playGame(item)">立即游戏</button>
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
    </div>
</template>

<script>

    import stringUtil from "../../assets/js/util/stringUtil"
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import userBusiness from "../../assets/js/business/user/userBusiness"
    import apiUtil from "../../assets/js/api/common/apiUtil"
    import userInfoApi from "../../assets/js/api/userInfo"
    import slippery from "../slippery/slippery.vue"

    export default {
        data () {
            return {
                user:null,
                current:null,
                games:null,
                
                isJump:true
            }
        },
        created(){
            var _this = this;
           
            var url=decodeURIComponent(_this.$route.query.url);
            var platform=_this.$route.query.platform;
            if(stringUtil.isNotBlank(url) && stringUtil.isNotBlank(platform)){
                _this.$nextTick(function () {
                    _this.jump(url,platform);
                })
                return;
            }

            _this.isJump=false;
            this.initGames();
            userBusiness.getUser(this, user => {
                _this.user = user;
                this.initGames();
            })

        },
        methods: {

            initGames(){
                var _this=this;
                _this.games = userBusiness.getTrdGames();
                arrayUtil.forEach(_this.games,item=>item.selected=false);

                var code = _this.$route.query.code;
                var current = arrayUtil.findFirst(_this.games, item => {
                    return item.code == code
                });
                if (current == null) {
                    current = this.games[0];
                }
                current.selected = true;
                _this.current = current;
            },

            leftSlide(){

                this.$parent.slideFlag=!this.$parent.slideFlag;
                this.$refs.tagIndex.tagIndex = 0;
                if(this.$parent.slideFlag){
                    $(".lottery-slide-left").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $(".lottery-slide-right").css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 

                    });
                    $('.box-header').css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                    $(".nav-box").css({
                        "transform":"translateX(80%)",
                        "-ms-transform":"translateX(80%)", 	
                        "-moz-transform":"translateX(80%)", 	
                        "-webkit-transform":"translateX(80%)", 
                        "-o-transform":"translateX(80%)" 
                    });
                }else{
                    $(".lottery-slide-left").css({
                        "transform":"translateX(-100%)",
                        "-ms-transform":"translateX(-100%)", 	
                        "-moz-transform":"translateX(-100%)", 	
                        "-webkit-transform":"translateX(-100%)", 
                        "-o-transform":"translateX(-100%)" 
                    });
                    $(".lottery-slide-right").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $('.box-header').css({
                         "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                    $(".nav-box").css({
                        "transform":"translateX(0%)",
                        "-ms-transform":"translateX(0%)", 	
                        "-moz-transform":"translateX(0%)", 	
                        "-webkit-transform":"translateX(0%)", 
                        "-o-transform":"translateX(0%)" 
                    });
                }
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
            playGame(item){
                var _this=this;
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if(userBusiness.checkIsTryPlayer()){
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
                var path = item.path;
                if (path == null) {
                    var params={
                        platform:platform,
                        gameType: item.type,
                        tryPlay:false
                    };

                    _this.lshowWait();
                    userInfoApi.getTrdGameLoginInfo(params, function (resp) {
                        _this.lcloseWait()
                        if (resp.code == 200) {
                            var url =resp.data.url;
                            _this.jump(url,platform);
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
                        $form.attr("action", obj.jumpUrl+"/shaba/login_jump");
                    }
                    if(platform == "GP"){
                        $form.attr("action", obj.jumpUrl+"/gameplay/login_jump");
                    }
                    $form.submit();
                } else {
                    var $form = $("#game_form");

                    if(platform=="AG" || platform=="KY"){
                        $form.attr("method","post")
                    }
                    $form.attr("action", val);
                    $form.submit();
                }
            }
        },
        components: {
            'v-slippery': slippery
        }
    }




</script>


<style  scoped>

</style>
