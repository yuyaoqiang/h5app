<template>
    <div>
        <section class="display-vertical pl-height">
            <header class="pr header-box">
                <div class="header-arrow-box" id="back_icon" @click="goback">
                    <i class="el-icon-arrow-left back-icon"></i>
                </div>
                <h1 class="header-title">投注详情</h1>
            </header>
            <div class="wrap-content">
                <section class="betting-detail">
                    <ul class="detail-content">
                        <li>开奖号码 : <span class="red winning">恭喜您中奖!</span></li>
                        <li>投注期号 : <span>20161130-058   15:30</span></li>
                        <li>游戏彩种 : <span class="red">重庆时时彩/后三直选</span></li>
                        <li>开奖号码 : <span class="red">01.03.08.06.02</span></li>
                        <li>位置&nbsp;: <span>百位. 十位. 个位</span></li>
                        <li>中奖金额 : <span class="red">¥ 800.00</span></li>
                        <li>投注总额 : <span class="red">¥ 100.00</span></li>
                        <li>中奖注数 : <span>10</span></li>
                        <li>所选返点 : <span>0.00</span></li>
                        <li>赔率&nbsp;:<span>0.00</span></li>
                        <div class="victory-icon orange"><img src="../../assets/images/victory-icon.png"></div>
                    </ul>
                </section>
            </div>
            <footer class="foot-main  clearfix">
                <div class="fl countdown">
                    <p>第2016/10/30期   投注截止：&nbsp;<img src="../../assets/images/countdown-icon.png"style="width: 0.3rem;height: 0.3rem;line-height: 0.8rem; text-align: center;vertical-align: middle;">&nbsp;&nbsp;<span class="orange">03:29</span></p>
                </div>
                <div class="fr tz">投注</div>
            </footer>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            goback: function(){
                this.$router.go(-1);
            }
        },
        components: {}
    }
</script>
<style>

</style>
