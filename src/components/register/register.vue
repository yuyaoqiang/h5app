<template>
    <div class="login-main">
        <div class="login-box">
            <header class="login-logo" :class="platformSetting.code">
                <div class="login-left" @click="goback">
                    <i class="el-icon-arrow-left"></i> 
                </div>
                <h1>注册</h1>
            </header>
        <div class="login-container">
            <div class="login-container-top">
                 <section class="container_img">
                    <img src="../../assets/platform/main/images/logo.png" :class="platformSetting.code+'_img'">
                    <img src="https://cdn.haobinfen.com/3f3ce093-f7e0-49a3-9d15-c7fc89c94740.png" :class="platformSetting.code+'_img'">
                </section>
            </div>
             <div class="login-shape"></div>
            <section class="register-container" :style="platformSetting.userTelephone && platformSetting.useEmail?'height: 4.1rem':''">
                <dl class="display-flex register-box reg-account-wrap">
                    <dd class="flex-box">
                        <input v-model.trim="data.username"  placeholder="请输入账号" type="text"/>
                    </dd>
                </dl>
                <dl class="display-flex pt10 register-box">
                    <dd class="flex-box">
                        <input v-model.trim="data.password"  placeholder="请输入密码" type="password"/>
                    </dd>
                </dl>
                <dl class="display-flex pt10 register-box">
                    <dd class="flex-box">
                        <input v-model.trim="data.repassword"  placeholder="请输入确认密码" type="password">
                    </dd>
                </dl>
                <dl class="display-flex pt10 register-box">
                    <dd class="flex-box">
                        <input v-model.trim="data.nickname"  placeholder="请输入昵称" type="text"/>
                    </dd>
                </dl>
                <!-- <dl  class="display-flex pt10 register-box"  v-if="regRestrict.regEmailConfig != -1">
                    <dt><span class="red"  v-show="regRestrict.regEmailConfig ==1">*</span> 邮箱:</dt>
                    <dd class="flex-box">
                        <input v-model.trim="data.email"  placeholder="请输入有效邮箱" type="text"/>
                    </dd>
                </dl> -->
                <!-- <dl  class="display-flex pt10 register-box"  v-if="regRestrict.regQQConfig != -1">
                    <dt><span class="red"  v-show="regRestrict.regQQConfig ==1">*</span> QQ:</dt>
                    <dd class="flex-box">
                        <input v-model.trim="data.qq"  placeholder="请输入有效qq号码" type="text"/>
                    </dd>
                </dl> -->
                <!-- <dl  class="display-flex pt10 register-box"  v-if="regRestrict.regMobileConfig != -1">
                    <dt><span class="red"  v-show="regRestrict.regMobileConfig ==1">*</span> 手机号:</dt>
                    <dd class="flex-box">
                        <input v-model.trim="data.telephone"  placeholder="请输入有效手机号" type="text"/>
                    </dd>
                </dl> -->
                <dl class="display-flex pt10 register-box">
                    <dd class="flex-box">
                        <input v-model.trim="data.regCode"  placeholder="请输入有效的推荐码" type="text"/>
                    </dd>
                </dl>
                <dl class="display-flex pt10 register-box">
                    <dd class="flex-box">
                        <input v-model.trim="data.verifyCode" placeholder="请输入验证码" type="text">
                    </dd>
                    <dd class="register-code-img"  @click="refreshCode">
                        <img title="点击刷新" :src="validateUrl">
                    </dd>
                </dl>
                <div class="register-msg">
                    <input type="checkbox" id="register_checkbox" class="register-checkbox" @change="applyChange" v-model="apply">
                    <label for="register_checkbox">我已届满合法博彩年龄，且同意各项开户条约</label>
                </div>
                <div class="register-service">
                    <span  @click="openOnlineService">
                        <img src="../../assets/images/kf.png">在线客服
                    </span>
                </div>
                <div>
                    <button type="button" class="login-btn radius" :disabled="submitBtnDisabled" @click="reg" :class="{'noSelect':!apply}">注 册</button>
                </div>
                <div class="m20">
                    <a href="" id="btnOpenApp" @click="toDownloadBanner"><button type="button" class="login-btn radius">下载客户端</button></a>
                    
                    <div class="login-dloadbanner" style="display:none">
                        <v-downloadBanner ref="downloadBanner"></v-downloadBanner>
                    </div>
                    
                </div>
            </section>
        </div>
            <!-- <footer class="login-footer">
                <p>Copyright © 2018 {{platformSetting.name}} 版权所有 All Right Reserved</p>
            </footer> -->
        </div>
    </div>
</template>

<script>

    import securityApi from '../../assets/js/api/securityApi'
    import userInfo from '../../assets/js/api/userInfo'
    import userBusiness from '../../assets/js/business/user/userBusiness'
    import stringUtil from '../../assets/js/util/stringUtil'
    import appSettingData from "../../assets/js/data/appSettingData"
    import platformData from '../../assets/platform/main/platformData'
    import deviceUtil from '../../assets/js/util/deviceUtil'
    import viewUtil from '../../assets/js/business/common/viewUtil';
    import userInfoApi from '../../assets/js/api/userInfo'
    import appController from  "../../assets/js/business/app/appController"
    import downloadBanner from '../download/download_banner.vue'
    export default {
        data () {
            return {
                apply:true,
                validateUrl:'',
                data:{
                    regCode:"",
                    username:"",
                    nickname:"",
                    password:"",
                    repassword:"",
                    verifyCode:"",
                    email:"",
                    code:'',
                    telephone:"",
                    qq:""
                },
                platformSetting:{
                    allowTryPlay:false,
                    useEmail:false,
                    userTelephone:false,
                    userQq:false,
                },
                regRestrict:{
                    regMobileConfig:0,
                    regEmailConfig:0,
                    regQQConfig:0,
                },
                submitBtnDisabled:false,
                isAgentReg:{}
            }
        },
        created(){
            var _this = this;
            this.getUrlParam();
            var regCode = this.isAgentReg.code
            this.data.regCode = regCode;
            userInfo.regCode((res)=>{
                let data = res.data;
                this.regRestrict = {
                    regMobileConfig:data.regMobileConfig || 0,
                    regEmailConfig:data.regEmailConfig || 0,
                    regQQConfig:data.regQQConfig || 0,
                };
            });

            this.platformSetting = platformData.setting;
            this.platformSetting.useEmail=this.platformSetting.useEmail==null?true:this.platformSetting.useEmail;
            this.platformSetting.userTelephone=this.platformSetting.userTelephone==null?false:this.platformSetting.userTelephone;
            this.platformSetting.userQq=this.platformSetting.userQq==null?false:this.platformSetting.userQq;
            
            this.refreshCode();
        },

        methods: {
            toDownloadBanner(){
                
                this.$refs.downloadBanner.openApp()
            },
            goback(){
                var appCtr = appController.getController();
                if(appCtr == null){
                    this.$router.go(-1);
                }else {
                    appCtr.goback();
                }
            },
            toLogin(){
              this.$router.push({path: "newLogin"})
            },
            applyChange(){
                this.submitBtnDisabled=!this.apply;
            },
            reg(){
                if(this.apply){
                    var _this=this;
                    if(stringUtil.isBlank(this.data.username)){
                        this.lalterError("账号不能为空");
                        return;
                    }

                    if(this.data.username.length<5 || this.data.username.length>12){
                        this.lalterError("账号必须在5-12位字符之间");
                        return;
                    }

                    if(stringUtil.isBlank(this.data.nickname)){
                        this.lalterError("昵称不能为空");
                        return;
                    }

                    if(this.data.nickname.length > 16){
                        this.lalterError("昵称不能超过16位字符");
                        return;
                    }
                    if(stringUtil.isBlank(this.data.regCode)){
                        this.lalterError("推荐码不能为空");
                        return;
                    }
                    // if(this.regRestrict.regEmailConfig == 1 || this.data.email != ""){
                    //     let emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                    //     if(!emailReg.test(this.data.email)){
                    //         this.lalterError("邮箱格式不正确");
                    //         return;
                    //     }
                    // }

                    // if(this.regRestrict.regMobileConfig == 1  || this.data.telephone != ""){
                    //     if(stringUtil.isBlank(this.data.telephone)){
                    //         this.lalterError("手机号不能为空");
                    //         return;
                    //     }
                    //     let telReg =  /^[1][3,4,5,7,8][0-9]{9}$/;
                    //     if(!telReg.test(this.data.telephone)){
                    //         this.lalterError("手机号格式不正确");
                    //         return;
                    //     }
                    // }

                    // if(this.regRestrict.regQQConfig == 1  || this.data.qq != ""){
                    //     if(stringUtil.isBlank(this.data.qq)){
                    //         this.lalterError("qq号不能为空");
                    //         return;
                    //     }
                    //     let qqReg =  /^\d{5,12}$/;
                    //     if(!qqReg.test(this.data.qq)){
                    //         this.lalterError("qq号格式不正确");
                    //         return;
                    //     }
                    // }

                    if(stringUtil.isBlank(this.data.password)){
                        this.lalterError("密码不能为空");
                        return;
                    }

                    var passwordLen=appSettingData.passwordLen;
                    if(this.data.password.length<passwordLen.min || this.data.password.length>passwordLen.max){
                        this.lalterError("密码必须在"+passwordLen.min+"-"+passwordLen.max+"位字符之间");
                        return;
                    }

                    if(this.data.password != this.data.repassword){
                        this.lalterError("密码和确认密码不一致");
                        return;
                    }
                    if(stringUtil.isBlank(this.data.verifyCode)){
                        this.lalterError("验证码不能为空");
                        return;
                    }

                    if(stringUtil.isBlank(this.data.verifyCode)){
                        this.lalterError("验证码不能为空");
                        return;
                    }
                    
                    userInfo.reg(this.data,function (resp) {
                        if (resp.code == 200) {
                            if(_this.isAgentReg.agentRegId){
                                _this.lconfirm('注册成功', {
                                    showCancelButton:false,
                                    closeOnClickModal:false
                                }, function () {
                                    _this.goback()
                                });
                            }else{
                                
                                _this.lconfirm('注册成功，确定后跳转首页！', {
                                    showCancelButton:true,
                                    closeOnClickModal:false
                                }, function () {
                                    let params = {
                                        "username" : _this.data.username ,
                                        "validate" : '' ,
                                        "password" : _this.data.password ,
                                        "_BrowserInfo" : _this.getBrowserInfo()
                                    }
                                    userInfoApi.login(params,(res)=>{
                                        if(res.code == 200){
                                            userBusiness.initMenu=true;
                                            _this.$router.push({path:"index"});
                                        }
                                    })
                                    
                                });
                                
                            }
                            
                        } else {
                            _this.lalterError(resp.msg);
                            _this.refreshCode();
                            _this.data.verifyCode="";
                        }
                    });
                    
                    
                }


            },

            refreshCode: function(){
                this.validateUrl = securityApi.getVerifyCodeUrl()+"?" + Math.random();
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },

            getUrlParam() {
                try{
                    var url= window.location.href;
                    var array = url.substring(url.lastIndexOf("/")+1).split("?")[1].split("&");
                    var obj = Object.create(null)
                    for(var i=0;i<array.length;i++){
                        var pvs=array[i].split("=");
                        obj[pvs[0]]  = pvs[1].trim()
                    }
                    this.isAgentReg = obj
                }catch(ex){
                    return "";
                }
            },

            getBrowserInfo: function () {
                var agent = navigator.userAgent.toLowerCase();
                var regStr_ie = /msie [\d.]+/gi;
                var regStr_ie11 = /(trident.*rv:)([\w.]+)/gi;
                var regStr_ff = /firefox\/[\d.]+/gi;
                var regStr_chrome = /chrome\/[\d.]+/gi;
                var regStr_saf = /safari\/[\d.]+/gi;

                //IE 6 7 8 9 10
                if (agent.indexOf("msie") > 0) {
                    return agent.match(regStr_ie);
                }
                //IE 11
                if (agent.indexOf("trident") > 0) {
                    var ie11 = agent.match(regStr_ie11).toString();
                    return "IE:" + ie11.substr(ie11.indexOf(":") + 1);
                }
                //firefox
                if (agent.indexOf("firefox") > 0) {
                    return agent.match(regStr_ff);
                }

                //Chrome
                if (agent.indexOf("chrome") > 0) {
                    return agent.match(regStr_chrome);
                }

                //Safari
                if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                    return agent.match(regStr_saf);
                }
            },
        },
        components:{
            'v-downloadBanner':downloadBanner,
        },
    }
</script>
<style lang="less" scoped>
    .login-logo h1{
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        font-weight: normal;
        text-align: center;
        color: #fff;
    }
        .noSelect{
        background: #999;
    }
    .login-logo{
        height: 0.45rem;
    }
    .radius{
        border-radius: 24px;
    }
    .text-right{
        text-align: right;
        height: 0.4rem;
        line-height: 0.4rem;
    }
    .login-btn-xx{
        display: inline-block;
        color: antiquewhite;
        padding: 0.1rem;
    }
    .login-right{
        position: absolute;
        width: 0.7rem;
        top: 0;
        right: 0;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        color: antiquewhite;
    }
    .m20{
        margin-top:0.2rem;
    }
    input::-webkit-input-placeholder{
        color:#757575 !important;
    }
    .login-container-top{
        height: 1.3rem;
        color: #666;
        display: flex;
        width: 100vw;
        justify-content: center;
        background: #ff464b;
        .container_img{
            width: 50%;
            margin: 0 auto .5rem;
            img{
                width: 100%;
            }
        }
    }
    .login-container{
       height: 84vh;
    }
    .login-shape{
        border-top: 14vw solid #1c1b21;
        border-top-color: #ff464b;
        width: 0;
        height: 0;
        margin-bottom: -14vw;
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;
    }
    dd input{
        border: 1px solid #eee;
        background-color: rgba(0, 0, 0, 0);
        color: #909090;
        border-radius: 20px;
    }
    .register-box{
        margin: 0 0.16rem;
    }
    .register-service{
        span{
            margin-right: 0.2rem;
        }
    }
</style>