<template>
    <transition name="move">
        <section class="display-vertical pl-height">
            <header class="header-img">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left back-icon"></i>
                </div>
                <div class="header-right">
                    <p>上次登录：2016-07-08 17:17</p>
                    <p class="fr">IP:192.168.0.39</p>
                </div>
                <div class="header-msg">
                    <ul class="display-box text-center">
                        <li>
                            <img src="../../assets/images/mb.png">
                            <span>密保认证</span>
                            <p>未认证</p>
                        </li>
                        <li style="border-left: 1px solid #dcdcdc;border-right: 1px solid #dcdcdc;">
                            <img src="../../assets/images/yx.png">
                            <span>邮箱认证</span>
                            <p>未认证</p>
                        </li>
                        <li>
                            <img src="../../assets/images/sj.png">
                            <span>手机认证</span>
                            <p>未认证</p>
                        </li>

                    </ul>
                </div>
            </header>
            <section class="flex-box safe-main">
                <div class="pr safe-content clearfix">
                    <div class="fl">
                        <p>锁定银行卡</p>
                    </div>
                    <div class="fr">
                        <span>可保证资金的绝对安全</span>
                        <button type="button">未绑定</button>
                    </div>
                </div>
                <div class="pr safe-content clearfix">
                    <div class="fl">
                        <p>资金密码</p>
                    </div>
                    <div class="fr">
                        <span>以提高您的资金安全性</span>
                        <button type="button">修改</button>
                    </div>
                </div>
                <div class="pr safe-content clearfix">
                    <div class="fl">
                        <p>登录密码</p>
                    </div>
                    <div class="fr">
                        <span></span>
                        <button type="button">设置</button>
                    </div>
                </div>
            </section>
        </section>
    </transition>
</template>

<script>
    export default {
        data () {
            return {}
        },
        created() {

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