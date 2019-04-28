<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>更多信息</h1>
            </header>
        </div>
        
        <section class="report-height">
            <div class="placard-main">
                <router-link tag="ul" to="notice" class="display-flex">
                    <li class="placard-icon"><img src="../../assets/images/gonggao.png"></li>
                    <li class="flex-box placard-msg">
                        <h2>平台公告</h2>
                        <p>随时随地让您收到最新公告</p>
                    </li>
                    <li class="placard-arrow"><i class="el-icon-arrow-right"></i></li>
                </router-link>

                <router-link tag="ul" to="method" class="display-flex">
                    <li class="placard-icon"><img src="../../assets/images/shuoming.png"></li>
                    <li class="flex-box placard-msg">
                        <h2>玩法说明</h2>
                        <p>详细介绍平台的彩种玩法</p>
                    </li>
                    <li class="placard-arrow"><i class="el-icon-arrow-right"></i></li>
                </router-link>

                <router-link tag="ul" to="question" class="display-flex">
                    <li class="placard-icon"><img src="../../assets/images/wenti.png"></li>
                    <li class="flex-box placard-msg">
                        <h2>常见问题</h2>
                        <p>解析您在平台遇到的问题</p>
                    </li>
                    <li class="placard-arrow"><i class="el-icon-arrow-right"></i></li>
                </router-link>
            </div>
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
<style scoped>

</style>
