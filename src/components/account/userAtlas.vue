<template>
    <div>
        <section class="display-vertical pl-height">
            <header class="pr header-box">
                <div class="header-arrow-box" id="back_icon" @click="goback">
                    <i class="el-icon-arrow-left back-icon"></i>
                </div>
                <ul class="team-header">
                    <router-link to="memberManagement"><li>用户列表</li></router-link>
                    <router-link to="userAtlas"><li class="current">用户图集</li></router-link>

                </ul>
                <div class="calendar"><img src="../../assets/images/calendar.png"></div>
            </header>
            <section class="team-nav"><p>统计时间：
                <mu-date-picker  hintText="2017-4-01" labelClass="start"/><mu-date-picker  hintText="2017-4-03" labelClass="end"   style="position: absolute;left: 55%;"/>
            </p></section>
            <section class="clearfix date-main">
                <ul class="display-box pr date-content text-center">
                    <li>今天</li>
                    <li>近3天</li>
                    <li class="current">近7天</li>
                    <li>近30天</li>
                </ul>
            </section>
            <div class="wrap-content">
                <section class="flex-box  money-main">
                    <ul class="money-content clearfix">
                        <li>
                            <div class="fl">总用户数</div>
                            <div class="fr">144人<span class="percentage">(32.73%)</span> </div>
                        </li>
                        <li>
                            <div class="fl">活跃用户</div>
                            <div class="fr">1000人<span class="percentage">(32.73%)</span> </div>
                        </li>
                        <li>
                            <div class="fl">新增用户</div>
                            <div class="fr">30人<span class="percentage">(32.73%)</span> </div>
                        </li>
                        <li>
                            <div class="fl">首冲用户</div>
                            <div class="fr">8人<sapn class="percentage">(32.73%)</sapn> </div>
                        </li>
                    </ul>
                </section>
            </div>

        </section>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                selectDate: ''
            }
        },
        methods: {
            goback: function(){
                this.$router.push('/agentCenter');
            }
        },
        components: {}
    }
</script>
<style scoped>

</style>
