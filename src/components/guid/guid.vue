<template>
    <div class="guid-bg display-vertical">
        <div class="guid-icon">
            <section>
                <img src="../../assets/platform/main/images/logo.png">
            </section>
        </div>
        <div class="flex-box">
            <ul class="guid-main">
                <li @click="toPcApp">
                    <i class="iconfont icon-diannao"></i>电脑网页版
                </li>
                <li @click="toH5App">
                    <i class="iconfont icon-cebianfudongtiaoshoujifuzhi" style="font-size: 0.4rem"></i>手机网页版
                </li>
                <li  class="down_app">
                    <a href="javascript:;" id="btnOpenApp" @click="toDownloadBanner">
                        <i class="iconfont icon-cebianfudongtiaoshoujifuzhi" style="font-size: 0.4rem"></i>手机客户端
                        <div class="login-dloadbanner" style="display:none">
                            <v-downloadBanner ref="downloadBanner"></v-downloadBanner>
                        </div>
                    </a>
                    
                </li>
            </ul>
        </div>
        <div class="guid-msg">
            <p>Copyright © 2018 {{platformSetting.name}} 版权所有 All Right Reserved</p>
        </div>
    </div>
</template>

<script>
    import platformData from '../../assets/platform/main/platformData'
    import downloadBanner from '../download/download_banner.vue'
    export default {
        data () {
            return {
                platformSetting:{}
            }
        },
        created(){
            this.platformSetting=platformData.setting;
        },
        methods:{
            toDownloadBanner(){ 
                 this.$refs.downloadBanner.openApp()
                var os = this.getOS();
                 this.$router.push({path:'download',query:{device:os}});
            },
            toPcApp:function () {
                window.location="/Login";
            },
            toH5App:function () {
                this.$router.push({path:"login"})
            },
              getOS(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                    return 'android';
                }else if(isiOS){
                    return 'ios';
                }else {
                    return false;
                }
            }
        },
        components:{
            'v-downloadBanner':downloadBanner,
        },

    }
</script>

<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    @import "../../assets/css/guid.css";

    .guid-main,.guid-msg{
        color: @reg-input-title;
    }
    .guid-main li i.iconfont {
        margin-right: 0.1rem;
        vertical-align: middle;
        font-size: 0.3rem;
    }
    .down_app a{
        color: @reg-input-title;
    }
</style>