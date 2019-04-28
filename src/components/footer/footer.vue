<template>
    <footer class="nav-box">
        <ul class="display-box text-center">
            <router-link tag="li" to="index">
                <div class="nav-icon"><i class="icon iconfont icon-dibu_shouye"></i></div>
                <p>首页</p>
            </router-link>
            <router-link tag="li" to="result">
                <div class="nav-icon"><i class="icon iconfont icon-dibu_goucai"></i></div>
                <p>购彩</p>
            </router-link>
            <li  @click="toMyAccount" :class="{active:$route.path=='/account'}">
                <div class="nav-icon"><i class="icon iconfont icon-dibu_zhanghu"></i></div>
                <p>账户</p>
            </li>
            <!--<li>-->
            <!--<router-link tag="div" to="lotteryHome" class="nav-lottery-box">-->
                <!--<p class="nav-lottery"><i class="icon iconfont icon-duobao-tabshangla-wancaijingcai"></i></p>-->
            <!--</router-link>-->
            <!--</li>-->
            <li @click="onlineServer">
                <div class="nav-icon">
                    <i class="service-icon"></i>
                </div>
                <p>客服</p>
            </li>
            <li  @click="toSetting" :class="{active:$route.path=='/setting'}">
                <div class="nav-icon"><i class="icon iconfont icon-dibu_shezhi"></i></div>
                <p>设置</p>
            </li>
        </ul>
    </footer>
</template>
<script>
    import userBusiness from '../../assets/js/business/user/userBusiness';
    export default {
        data () {
            return {

            }
        },
        created(){
        },
        methods: {
            toSetting(){
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                this.$router.push("/setting")
            },
            toMyAccount(){
              if(userBusiness.checkIsNotLoginPlayer()){
                  return;
              }

              this.$router.push("/account")
            },
            onlineServer() {
                userBusiness.openCustomerService();
            },
        }
    }
</script>

<style>
</style>
