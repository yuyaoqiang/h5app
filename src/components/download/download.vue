
<template>


    <div class="download-bg">
        <div :class="device!='android'?'down-bg-apple':'down-bg-apple'" v-if="isWX==false" >
            <section class="download-main">
                <article class="download-btn" v-if="!device"> 
                    <a :href="item.url[0]" v-for="item in apps" v-if="item.url[0] != null && item.url[0].trim()!=''" >
                        <img :src="require(`../../assets/images/${item.img[0]}`)" @click.self.prevent="downLoad(device)" alt="">
                    </a>
                </article>
                <article class="download-btn" v-if="device">
                    <a :href="item.url[0]" v-for="item in apps" v-if="item.device.indexOf(device)!=-1&&item.url[0] != null && item.url[0].trim()!=''">
                        <img :src="require(`../../assets/images/${item.img[0]}`)" @click.self.prevent="downLoad(device)"  alt="">
                    </a>
                </article>
            </section>
               <p class="goback-home">
                   <span @click="goback">返回首页</span>
               </p>
        </div>
        <div class="down-wx" v-if="isWX==true"></div>
    </div>
</template>

<script>
    import platformData from '../../assets/platform/main/platformData';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import systemConfigApi from '../../assets/js/api/systemConfigApi';

    export default {
        data(){
            return {
                apps: [
                    {device: "android", desc: "Android下载", url: [],img:['android1.png','android2.jpg']},
                    
                    {device: "ios", desc: "iPhone下载", url: [],img:['ios_1.png','ios_2.jpg']},
                    
                ],
                init: false,
                platformSetting: {},
                device: null,
                deviceName: null,
                isWX:false
            }
        },
        created(){
            this.isWeiXin();
            var _this = this;
            var device = this.$route.query.device;
            var name = null;
            if (device != null) {
                device = device.toLowerCase();
                if (device == "ios") {
                    name = "苹果"
                }

                if (device == "android") {
                    name = "安卓"
                }
            }

            // if (name == null) {
            //     this.$router.push("login")
            //     return;
            // }

            _this.deviceName = name;
            _this.device = device;

            this.platformSetting = platformData.setting;
            var appDownloads = this.platformSetting.appDownloads;
            if (arrayUtil.isNotEmpty(appDownloads)) {
                this.apps = appDownloads;
            } else {
                _this.lshowWait()
                systemConfigApi.getConfig(function (resp) {
                    _this.lcloseWait()

                    if (resp.code == 200) {
                        arrayUtil.forEach(_this.apps, item => {
                            item.url = resp.data[item.device + "AppDownloadUrl"].split('@');
                            //item.url = resp.data[item.device + "AppDownloadUrl"]
                        });
                    } else {
                        console.error("getConfig is error," + JSON.stringify(resp));
                    }
                });
            }
        },
        methods: {
            //判断是否是微信浏览器的函数
            isWeiXin(){
                //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
                var ua = window.navigator.userAgent.toLowerCase();
                //通过正则表达式匹配ua中是否含有MicroMessenger字符串
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    this.isWX = true;
                }else{
                    this.isWX = false;
                }
            },
            goback(){

                this.$router.push('/index');
            },
            downLoad(isIOS){
                if(isIOS=='ios'){
                  window.open(this.apps[1].url[0]);
                }else{
                    window.open(this.apps[0].url[0]);
                }
            }
        }
    }
</script>

<style>
.down-bg-apple{
    width: 100%;
    height: 100%;
    position: relative;
    background:url("../../assets/platform/main/images/down-bg-apple.png") no-repeat center;
    background-size: cover;
}
.down-bg-android{
    width: 100%;
    height: 100%;
    position: relative;
    background:url("../../assets/platform/main/images/down-bg-android.png") no-repeat center;
    background-size: cover;
}
.down-wx{
    width: 90%;
    height: 60%;
    position: relative;
    background:url("../../assets/images/wx_download.jpg") no-repeat center;
    background-size: contain;
}
.goback-home{
    color: #fff;
    padding: 0.05rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0.4rem;
    left: 0;
    right: 0;
    text-align: center;
}
.goback-home span{
    border: 1px solid #fff;
    display: inline-block;
    padding: 0.05rem 0.1rem;
    border-radius: 01rem;
}
</style>