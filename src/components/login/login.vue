<template>
    <div class="login-main">
        <div class="login-box">
            <header class="login-logo">
                <div class="login-left" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <section>
                    <img src="../../assets/platform/main/images/logo.png" :class="platformSetting.code+'_img'">
                </section>
            </header>
            <div class="login-container">
                <dl class="display-flex">
                    <dt class="login-icon">
                        <!-- <img src="../../assets/images/icon11.png">-->
                        <i class="iconfont icon-dibu_zhanghu_hover"></i>
                    </dt>
                    <dd class="flex-box login-input">
                        <input type="text" placeholder="用户名" name="username" v-model.trim="newUserInfo.userName"/>
                    </dd>
                </dl>
                <dl class="display-flex pt15">
                    <dt class="login-icon">
                        <!-- <img src="../../assets/images/icon12.png">-->
                        <i class="iconfont icon-suodingmima"></i>
                    </dt>
                    <dd class="flex-box login-input">
                        <input type="password" placeholder="密码"  v-model.trim="newUserInfo.password"/>
                    </dd>
                </dl>
                <dl v-if="loginNeedValidateCode != false" class="display-flex pt15">
                    <dt class="login-icon">
                        <img src="../../assets/images/yzm.png">
                    </dt>
                    <dd class="flex-box login-input">
                        <input type="text" maxlength="4" placeholder="验证码" name="validate" v-model.trim="newUserInfo.validate"/>
                    </dd>
                    <dd class="login-code">
                        <img title="点击刷新" id="randImage" :src="validateUrl" @click="refreshCode">
                    </dd>
                </dl>

                <div class="login-btnbox">
                    <button type="button" class="login-btn"  @click="logins">登 录</button>
                </div>
                <div class="login-msg clearfix">
                    <p><span @click="openOnlineService" class="fl">在线客服</span></p>
                    <!-- <p><span v-if="regUrl != ''&& regUrl!=null && disableDomain==-1" @click="openRegUrl">立即注册</span></p> -->
                    <p><span v-if="platformSetting.allowTryPlay==true" @click="loginShiWan" class="fr">立即试玩</span></p>
                </div>
            </div>
            <div class="login-dloadbanner">
                <!-- <v-downloadBanner></v-downloadBanner> -->
            </div>
            <footer class="login-footer">
                <p>Copyright © 2018 {{platformSetting.name}} 版权所有 All Right Reserved</p>
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
    import bus from '../eventBus'
    export default {
        data () {
            return {
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
                    this.lalterWarning("用户名不能为空");
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
                    }else {
                        this.lalterError(res.msg);
                        _this.newUserInfo.validate = '';
                        _this.refreshCode();
                        _this.loginNeedValidateCode=res.data.needValidateCode;
                    }
                })
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
                    _this.$router.go(-1);
                }else {
                    _this.$router.push({path:"index"});
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
                this.$router.push({path:`reg?code=${_this.regUrl}`});
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
<style>
    .login-btnbox{
        margin-top: 0.30rem;
    }
</style>
