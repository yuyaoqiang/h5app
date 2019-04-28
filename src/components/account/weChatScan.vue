<template>
    <div>
        <section class="display-vertical bg">
            <header class="pr">
                <div class="header-arrow-box" id="back_icon" @click="goback">
                    <i class="el-icon-arrow-left back-icon"></i>
                </div>
                <h1 class="header-title">微信扫描</h1>
            </header>
            <div class="wrap-content">
                <section class="text-center wechat-box">
                    <p class="red">¥ 850.00</p>
                    <img src="../../assets/images/qrcode_03.png">
                    <div class="scan">请扫描上面的二维码</div>
                </section>
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
