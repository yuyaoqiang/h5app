<template>
    <div class="login-main">
        <div class="login-box">
            <header class="login-logo">
                <section>
                    <img src="../../assets/platform/main/images/logo.png">
                </section>
            </header>
            <div class="login-container pr">
                <div class="download-main">
                    <a v-if="item.url!=null && item.url.trim()!=''" :href="item.url" v-for="item in apps" class="mb15">
                        {{item.desc}}
                    </a>
                </div>
            </div>
            <a id="download" href="http://baidu.com" style="display: none"></a>
            <footer class="login-footer">
                <p>Copyright © 2015 {{platformSetting.name}} 版权所有 All Right Reserved</p>
            </footer>
        </div>
    </div>
</template>

<script>
    import platformData from '../../assets/platform/main/platformData';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import systemConfigApi from '../../assets/js/api/systemConfigApi';

    export default {
        data(){
            return{
                apps:[
                    {device:"android",desc:"安装安卓",url:null},
                    {device:"ios",desc:"安装苹果",url:null},
                    {device:"androidH5",desc:"安装安卓新版",url:null},
                    {device:"iosH5",desc:"安装苹果新版",url:null},
                ],
                init:false,
                platformSetting:{

                }
            }
        },
        created(){
            var _this=this;
            this.platformSetting=platformData.setting;
            var appDownloads=this.platformSetting.appDownloads;
            if(arrayUtil.isNotEmpty(appDownloads)){
                this.apps=appDownloads;
            }else {
                systemConfigApi.getConfig(function (resp) {
                    if(resp.code==200){
                        arrayUtil.forEach(_this.apps,item=>{
                            item.url=resp.data[item.device+"AppDownloadUrl"];
                        });
                    }else {
                        console.error("getConfig is error,"+JSON.stringify(resp));
                    }
                });
            }
        },
        methods:{

        }
    }
</script>

<style>
</style>