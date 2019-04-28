<template>
    <div class="download_banner" v-if="showDLoadBanner == true && device.code=='h5'">
      <div class="delicon" @click="hideDlBanner">
          <div class="banner-delete-icon"></div>
      </div>
      <div class="infowrap">
       <!--   <p class="logo">   <img src="../../assets/platform/main/images/logo.png" style="width: 100%;height: 100%"></p>-->
          <div class="info">
              <p>打开{{platformSetting.name}}App开始游戏</p>
              <span>精彩内容等你来挑战.....</span>
          </div>
      </div>
      <div class="open-btn" >
          <a id="btnOpenApp" @click.prevent="openApp" style="color: #fff">立即打开</a>
         <!-- <a href="bokecai://">立即打开s</a>-->
      </div>
    </div>
</template>

<script>
    import platformData from '../../assets/platform/main/platformData'
    import appContext from '../../assets/js/context/appContext'
    export default {
        /*props:{
            showDLBanner:{
                type:Boolean,
            }
        },*/
        data () {
            return {
                platformSetting:{},
                showDLoadBanner:true,
                device:{
                    code:''
                },
            }
        },
        created(){
            this.platformSetting = platformData.setting;
            var session = sessionStorage.getItem('showDloadBanner');
            if(session != null){
                this.showDLoadBanner= session
            }
            this.device = appContext.getDevice();
        },
        mounted(){
            var _this = this;
            if(this.platformSetting.mlink!=null&&this.platformSetting.mlink.length>0){
                new Mlink({
                    mlink:_this.platformSetting.mlink,//短链地址
                    button:document.querySelector('a#btnOpenApp'),
                    autoRedirectToDownloadUrl:false
                });
            }
        },
        methods:{
            hideDlBanner(){
              this.showDLoadBanner = false;
              sessionStorage.setItem("showDloadBanner", false);
            },
            openApp(){
                debugger
               /*  if(this.platformSetting.mlink==null||this.platformSetting.mlink.length<=0){
                    var os = this.getOS();
                    if(os){
                        this.$router.push({path:'download?device='+os});
                    }
                } */
                //  this.$router.push({path:'download?device='+os});
                  var os = this.getOS();
                 this.$router.push({path:'download',query:{device:os}});
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
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/platform/main/platform.less";
    .download_banner{
        position: relative;
        background: #474747;
    }
    .delicon{
        display: inline-block;
        position: relative;
        width: 0.5rem;
        height: 0.5rem;
    }
    .banner-delete-icon{
        width: 0.2rem;
        height: 0.2rem;
        box-shadow: 0 0 0 1px #dddddd;
        -webkit-box-shadow: 0 0 0 1px #dddddd;
        border-radius: 100%;
        display: block;
        position: absolute;
        left: 0.25rem;
        top: 0.25rem;
        transform: translate(-50%, -50%) rotate(45deg);
        -webkit-transform: translate(-50%, -50%) rotate(45deg);
    }
    .banner-delete-icon:before, .banner-delete-icon:after {
        content: "";
        display: block;
        background: #dddddd;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }
    .banner-delete-icon:before {
        height: 0.01rem;
        width: 0.12rem;
    }
    .banner-delete-icon:after {
        width: 0.01rem;
        height: 0.12rem;
    }
    .infowrap {
        display: inline-block;
        vertical-align: top;
        .logo{
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;

        }
        .info{
            display: inline-block;
            margin-top: 0.1rem;
            color: #999;
            p{font-size:0.12rem;color: #fff;}
        }
    }
    .open-btn{
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        line-height: 0.5rem;
        padding: 0 0.16rem;
        background: @numball-color;
        color: #fff;
    }
    .login-dloadbanner .download_banner{
        background: rgba(71, 71, 71, 0.8);
    }
</style>
