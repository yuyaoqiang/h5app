<template>
    <div>
        <header class="header-box">
            <div class="header-arrow-box" @click="goback">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h1>充值</h1>
            <div><img src="../../assets/images/zjmx.png"></div>
        </header>
        <section class="flex-box recharge-main">
            <div class="pr recharge-list">
                <router-link to="weChatScan">
                    <div class="fl">
                        <div class="recharge-title">选择支付方式</div>
                        <div><img src="../../assets/images/wx_03.png"></div>
                        <div class="wx">
                            <h2>微信扫描</h2>
                            <p>在线微信扫描支付</p>
                        </div>
                    </div>
                    <div class="fr">
                        <i class="right-arrow2"></i>
                    </div>
                </router-link>
            </div>
            <div class="pr recharge-list">
                <router-link to="lineRecharge">
                    <div class="fl">
                        <div><img src="../../assets/images/zfb_07.png"></div>
                        <div class="wx">
                            <h2>支付宝支付</h2>
                            <p>线下支付宝用户使用</p>
                        </div>
                    </div>
                    <div class="fr">
                         <i class="right-arrow2"></i>
                    </div>
                </router-link>
            </div>
            <div class="pr recharge-list">
                <div class="fl">
                    <div><img src="../../assets/images/cft_10.png"></div>
                    <div class="wx">
                        <h2>财付通支付</h2>
                        <p>线下财付通用户支付</p>
                    </div>
                </div>
                <div class="fr">
                    <i class="right-arrow2"></i>
                </div>
            </div>
            <div class="account">
                <!--<mu-text-field hintText="最少充值50元" type="text" style="margin: 0 auto;"/>-->
                <input type="text" placeholder="最少充值50元">
            </div>
            <ul class="display-box text-center account-content">
                <li class="current">100元</li>
                <li>200元</li>
                <li>500元</li>
            </ul>
            <ul class="recharge-box pr">
                <li><a href="#"><p>在线充值<i class="right-arrow3"></i></p></a></li>
                <router-link to="lineRecharge">
                    <li><p>线下充值<i class="right-arrow3"></i></p></li>
                </router-link>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            goback: function(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style>

</style>
