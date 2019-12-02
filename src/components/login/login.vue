<template>
    <div class="login-main">
        <div class="login-box">
            <header class="login-logo">
                <div class="login-left" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>登录</h1>
            </header>
            <div class="login-container">
                <div class="login-container-top">
                 <section class="container_img">
                    <img src="../../assets/platform/main/images/logo.png" :class="platformSetting.code+'_img'">
                    <img src="https://cdn.haobinfen.com/3f3ce093-f7e0-49a3-9d15-c7fc89c94740.png" :class="platformSetting.code+'_img'">
                </section>
                </div>
                <div class="login-shape"></div>
                <div class="login-main-wrap">
                    <dl class="display-flex login-input-wrap">
                        <dd class="flex-box login-input">
                            <input type="text" placeholder="请输入账号" name="username" v-model.trim="newUserInfo.userName"/>
                        </dd>
                    </dl>
                    <dl class="display-flex login-input-wrap">
                        <dd class="flex-box login-input">
                            <input type="password" placeholder="请输入密码"  v-model.trim="newUserInfo.password"/>
                        </dd>
                    </dl>
                    <dl v-if="loginNeedValidateCode != false" class="display-flex  login-input-wrap verification-line-wrap">
                        <dd class="flex-box login-input">
                            <input type="text" maxlength="4" placeholder="验证码" name="validate" v-model.trim="newUserInfo.validate"/>
                        </dd>
                        <dd class="login-code">
                            <img title="点击刷新" id="randImage" :src="validateUrl" @click="refreshCode">
                        </dd>
                    </dl>
                   <dl class="display-flex rember-wrap">
                        <label class="mint-checklist-label remember-checkbox">
                        <span class="mint-checkbox">
                                <input class="mint-checkbox-input out-line" type="checkbox"  v-model="remember"/>
                                <span class="mint-checkbox-core"></span>
                        </span>
                        </label>
                    <dd class="flex-box remember-text">记住密码</dd>
                    </dl>
                    <div class="login-btnbox">
                        <button type="button" class="login-btn"  @click="logins">登 录</button>
                    </div>
                     <div class="login-msg clearfix">
                        <p><span @click="openOnlineService" class="fl">在线客服</span></p>
                        <p><span v-if="regUrl != ''&& regUrl!=null" @click="openRegUrl">立即注册</span></p>
                        <p><span v-if="platformSetting.allowTryPlay==true" @click="loginShiWan" class="fr">立即试玩</span></p>
                    </div>
                </div>
            </div>
            <div class="login-dloadbanner">
                <!-- <v-downloadBanner></v-downloadBanner> -->
            </div>
            <footer class="login-footer">
                <p>Copyright © 2015 {{platformSetting.name}} 版权所有 All Right Reserved</p>
            </footer>
        </div>
    </div>
</template>

<script>
    import downloadBanner from '../download/download_banner.vue'
    import userInfoApi from '../../assets/js/api/userInfo'
    import securityApi from '../../assets/js/api/securityApi'
    import userBusiness from '../../assets/js/business/user/userBusiness'
    import platformData from '../../assets/platform/main/platformData'
    import arrayUtil from '../../assets/js/util/arrayUtil'
    import userRegDomainBusiness from '../../assets/js/business/user/userRegDomainBusiness'
    import appContext from '../../assets/js/context/appContext'
    import cacheUtil from '../../assets/js/util/cacheUtil'
    import { Base64 } from 'js-base64';
    import bus from '../eventBus'
    export default {
        data () {
            return {
                remember:false,
                loginNeedValidateCode:false,
                validateUrl: "",
                regUrl: "",
                newUserInfo: {
                    userName:'',
                    password:'',
                    validate:''
                },
                tips: {
                    noUser: false,
                    noPass: false,
                    noCode: false
                },
                platformSetting:{
                    allowTryPlay:false
                },
                disableDomain:-1,
            }
        },
        created(){
            let _this = this;
            this.initValidateCodeDisplay();
            this.isSafe();
            this.platformSetting = platformData.setting;
            this.isRemember();
            this.refreshCode();

            var array = $L_appSetting.disableDomain || [];
            var value = location.href;
            
            //域名禁止注册
            for(var i=0,l=array.length;i<l;i++){
                if(value.indexOf(array[i])>0){
                    this.disableDomain = 1;
                    break;
                }
            }

            var domianRegCode = userRegDomainBusiness.getCurrentDomainRegCode();
            if(domianRegCode != null){
                _this.regUrl = domianRegCode;
            }else {
                userInfoApi.regCode((res)=>{
                    if(res.code == '200'){
                        if(res.data.sysDefaultRegCode != '' && res.data.sysDefaultRegCode !=null){
                            _this.regUrl = res.data.sysDefaultRegCode;
                        }
                    }
                });
            }

        },
        methods:{
            initValidateCodeDisplay(){
                var _this=this;
                userInfoApi.needValidateCode(function (resp) {
                    if(resp.code==200){
                        _this.loginNeedValidateCode=resp.data;

                    }else {
                        _this.loginNeedValidateCode=true;
                    }
                })
            },
            createIframe(){
                var iframe;
                return function(){
                    if(iframe){
                        return iframe;
                    }else{
                        iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        document.body.appendChild(iframe);
                        return iframe;
                    }
                }
            },
            logins:function(){
                var _this = this;
                if(this.newUserInfo.userName == ''){
                    this.lalterWarning("账号不能为空");
                    return false
                }
                if (this.newUserInfo.password == ''){
                    this.lalterWarning("密码不能为空");
                    return false
                }
                if (this.loginNeedValidateCode &&this.newUserInfo.validate == ''){
                    this.lalterWarning("验证码不能为空");
                    return false
                }
                var params = {
                    "username" : this.newUserInfo.userName ,
                    "validate" : this.newUserInfo.validate ,
                    "password" : this.newUserInfo.password ,
                    "_BrowserInfo" : this.getBrowserInfo()
                };
                userInfoApi.login(params,(res)=>{
                    if(res.code == 200){
                        _this.loginSuccess();
                        _this.remember2pw();
                    }else {
                        this.lalterError(res.msg);
                        _this.newUserInfo.validate = '';
                        _this.refreshCode();
                        _this.loginNeedValidateCode=res.data.needValidateCode;
                    }
                })
            },
            remember2pw(){
                if(!this.remember)return;
                cacheUtil.setLocalStorage("user",this.newUserInfo.userName);
                cacheUtil.setLocalStorage("encode2pw",Base64.encode(this.newUserInfo.password));
            },
            isRemember(){
                let user = cacheUtil.getLocalStorage("user")
                let password = cacheUtil.getLocalStorage("encode2pw")
                if(user){
                    this.remember = true;
                    this.newUserInfo.userName = user;
                    this.newUserInfo.password = Base64.decode(password);
                }
            },
            refreshCode: function(){
                this.validateUrl = securityApi.getVerifyCodeUrl()+"?" + Math.random();
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },
            isSafe(){
                var _this=this;
                securityApi.getSafe((res)=>{
                    if(res.code==200){
                    var state = res.data.state;
                    var date = res.data.date;
                    if(state == 1 && (date-new Date().getTime())>3000){
                        this.$router.push({path: 'maintain'});
                    }
                }
            })
            },
            loginShiWan(){
                var _this = this;
                var params = {
                    "device" : 0,
                };
                _this.lshowWait();
                userInfoApi.loginShiWan(params,(res)=>{
                    _this.lcloseWait();
                if(res.code == 200){
                    _this.loginSuccess();
                }else {
                    this.lalterError(res.msg);
                }
            })
            },
            loginSuccess(){
                userBusiness.initMenu=true;
                this.goback();
            },
            goback(){
                var _this=this;
                if(_this.$route.query.ref){
                    _this.$router.goBack('/index')
                }else {
                     _this.$router.goBack('/index')
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
            openRegUrl(){
                let _this = this;
                this.$router.push({path: `reg`,query: {code: _this.regUrl}});
            }
        },
        destroyed(){
            bus.$emit('btnBoxMessage',true);
        },
        components:{
            'v-downloadBanner':downloadBanner,
        },
        computed:{

        },

    }
</script>
<style lang="less">
    .login-btnbox{
        margin-top: 0.12rem;
        margin: 0 0.1rem;
    }
    .remember-checkbox{
        width: 0.6rem;
        text-align: center;
        box-sizing: border-box;
    }
    .remember-text{
        color: #666;
        background: none;
        border: none;
        box-sizing: border-box;
    }
    .mint-checkbox-core{
        background-color: #c6c6c6  !important;
        border-color: #c6c6c6  !important;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core::after{
            border-color: #fff;
    }
    .login-input-wrap{
        box-shadow: none;
        margin: 0 0.1rem;
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
    .login-shape{
        border-top: 14vw solid #1c1b21;
        border-top-color: #ff464b;
        width: 0;
        height: 0;
        margin-bottom: -14vw;
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;
    }
    .login-main-wrap{
        background-color: #fff; 
        padding: 0.2rem 0 0.2rem;
        border-radius: .1rem;
        width: 84%;
    }
    .verification-line-wrap{
        position: relative;
    }
    .rember-wrap{
        padding-bottom: 0.05rem;
    }
    .login-logo h1{
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        font-weight: normal;
        text-align: center;
        color: #fff;
    }
</style>
