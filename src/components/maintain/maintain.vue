<template>
    <div class="maintain-bg"
         :style="'background: url('+require('../../assets/platform/main/images/maintain-bg1.png')+') no-repeat center;background-size: cover;'">
        <div class="maintain-main">
            <div class="maintain-logo-small"></div>
            <div class="maintain-time">
                距离维护结束:<span>{{countdownDesc}}</span>
            </div>
            <div class="maintain-photo">
                <p>网站系统维护中</p>
                <p>维护只为给您更好的服务</p>
            </div>
            <div class="maintain-service" @click="openOnlineService">
                <img src="../../assets/images/icon13.png">在线客服
            </div>
        </div>
       
        <div class="maintain-footer">Copyright @ 2015{{platformSetting.name}} 版权所有 ALL Right Reserved</div>
    </div>
</template>
<script>

    import platformData from "../../assets/platform/main/platformData";
    import securityApi from "../../assets/js/api/securityApi";
    import userBusiness from '../../assets/js/business/user/userBusiness'
    export default {
        data(){
            return {
                countdownDesc:"00小时00分00秒",
                interval:null,
                platformSetting:{
                    name:""
                }
            }
        },
        created(){
            var _this=this;
            this.platformSetting=platformData.setting;

            _this.lshowWait()
            securityApi.getSafe((res)=>{
                _this.lcloseWait()

                if(res.code==200){

                    var date = 0;
                    if(res.data.state == "1"){
                        date = res.data.date;
                    }
                    var seconds =(date-new Date().getTime())/1000;
                    _this.beginCountdown(seconds);
                }
            })

        },
        methods:{
            beginCountdown(seconds){
                var _this = this;
                if(_this.isFinish(seconds)){
                    return;
                }

                this.interval= setInterval(function () {
                    seconds--;
                    if(_this.isFinish(seconds)){
                        clearInterval(_this.interval);
                        return;
                    }
                    _this.countdownDesc = _this.countdownDDHHMMSS(seconds);

                },1000)

            },
            isFinish(seconds){
                var _this=this;
                if (seconds <=0){
                    _this.lconfirm("维护已经结束",{closeOnClickModal:false,showCancelButton:false,showCloseButton:false},  function () {
                        _this.$router.push("login")
                    });
                    _this.countdownDesc="00小时00分00秒"
                    return true;
                }
                return false;
            },
            countdownDDHHMMSS(seconds){
                var d = Math.floor(seconds/86400);
                var h = Math.floor((seconds%86400)/3600);
                var m = Math.floor(((seconds%86400)%3600)/60);
                var s = Math.floor(((seconds%86400)%3600)%60);
                return this.toFriendStr(d,"天",false)+ this.toFriendStr(h,"小时",true)+ this.toFriendStr(m,"分",true)+ this.toFriendStr(s,"秒");
            },
            toFriendStr(val,desc,defaultDisplay){
                if (defaultDisplay == false && val <1){
                    return "";
                }
                return (val<10?("0"+val):val) + desc;
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            }
        },
    }
</script>
<style lang="less" scoped>
    .maintain-logo-small{
        width: 100%;
        height: 1.5rem;
        margin-top: 1.3rem;
        background-image: url("../../assets/platform/main/images/maintain-icon.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>