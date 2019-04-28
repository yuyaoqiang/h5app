<template>
    <header>
        <section class="index-header-box">
            <div class="column-icon-box" @click="leftSlide" v-if="user.init==true">
                <i class="column-icon"></i>
            </div>
            <h1>{{titleName}}</h1>
            <div class="index-login-to" v-if="user.apiReqFinish==true&&user.init==false"><a @click="toLogin">登录</a></div>
            <div class="index-login-try" v-if="user.apiReqFinish==true&&user.init==false"><a href="javascript:void(0);" @click="loginShiWan">试玩</a></div>
        </section>
    </header>
</template>
<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import arrayUtil  from '../../assets/js/util/arrayUtil';
    import viewUtil from '../../assets/js/business/common/viewUtil';
    import userInfoApi from '../../assets/js/api/userInfo';
    import bus from '../eventBus'
    export default {
        props:['titleName'],
        data () {
            return {
                user:{
                    lotteryBal:0,
                    init:false,
                },
            }
        },
        created(){
            let _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            });
        },
        beforeCreate(){
           // userBusiness.initLotteryList(); 
        },

        methods:{
            leftSlide(){
                this.$parent.$parent.slideFlag=!this.$parent.$parent.slideFlag
                if(this.$parent.$parent.slideFlag){
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
                    $('.index-header-box').css({
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
                    $('.index-header-box').css({
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
           
            toLogin(){
              viewUtil.toLoginView();
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
                        userBusiness.refreshBal(_this,function(user){
                            _this.user = user
                        },false)
                        bus.$emit('getGameList',true);
                    }else {
                        this.lalterError(res.msg);
                    }
                })
            },
        },
        watch:{
            
        }
        
    }
</script>
<style lang="scss" scoped>

</style>

