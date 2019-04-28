<style scoped lang="less">
    .bdlogin-tips {
        font-size: 0.13rem;
        margin: 0.2rem 0;
    }
    .bdlogin-con {
        padding:0 0.15rem;
    }
    .bdlogin-con .input-icon{
        width: 0.6rem;
        height: 0.4rem;
        text-align: center;
        box-sizing: border-box;
        padding-top: 0.07rem;
    i.iconfont{
        font-size: 0.24rem;
    }
    }
    .bdlogin-con li.item {
        margin-top: 0.14rem;
        box-shadow: 0 -2px 0 -1px #e3e3e3 inset;
        -webkit-box-shadow: 0 -2px 0 -1px #e3e3e3 inset;
    }
    .bdlogin-input input {
        width: 100%;
        height: 0.4rem;
        color: #666;
        background: none;
        border: none;
        box-sizing: border-box;
        font-size: 0.14rem;
    }
    .bdlogin-input.code input {
        width: 60%;
    }
    .bdlogin-input.code img{
        display: inline-block;
        height: 0.3rem;
        vertical-align: top;
        width: 0.8rem;
        margin-top: 0.04rem;
    }
    .login-btn {
        margin-top: 0.3rem;
    }
    .bdlogin-btn-bottom {
        margin-top: 0.1rem;
    a{
        color: red;
    }
    }
</style>
<template>
    <div>
        <div>
            <header class="header-box">
                <h1>登录绑定</h1>
            </header>
            <div class="header-stone"></div>
            <section class="bdlogin-con">
                <p class="bdlogin-tips">绑定后，您的{{trdAccountName}}账号可以直接登录</p>
                <ul>
                    <li class="display-flex item">
                        <p class="input-icon">
                            <i class="iconfont icon-dibu_zhanghu"></i>
                        </p>
                        <p class="flex-box bdlogin-input">
                            <input type="text" placeholder="请输入账号" name="username" v-model.trim="param.username"/>
                        </p>
                    </li>
                    <li class="display-flex item">
                        <p  class="input-icon">
                            <i class="iconfont icon-suodingmima"></i>
                        </p>
                        <p class="flex-box bdlogin-input">
                            <input type="password" placeholder="请输入密码" name="username" v-model.trim="param.password"/>
                        </p>
                    </li>
                    <li class="display-flex item"  v-show="config.captchaVisible==true">
                        <p  class="input-icon">
                            <i class="iconfont icon-yanzhengma"></i>
                        </p>
                        <p class="flex-box bdlogin-input code" >
                            <input type="text" maxlength="4" placeholder="请输入验证码" name="validate" v-model.trim="param.captcha"/>
                            <img  title="点击刷新" :src="captchaUrl" @click="refreshCaptcha">
                        </p>
                    </li>
                </ul>
                <button type="button"   @click="bind" class="login-btn">绑 定</button>
                <div class="bdlogin-btn-bottom">
                    <span>还没有账号?<a @click="toCrateUser">马上创建</a> </span>
                    <span @click="openOnlineService" class="fr">在线客服</span>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import trdAuthAccount from "../../assets/js/api/trdAuthAccount";
    import securityApi from "../../assets/js/api/securityApi";
    import stringUtil from "../../assets/js/util/stringUtil";
    import userInfo from "../../assets/js/api/userInfo";
    import userBusiness from "../../assets/js/business/user/userBusiness";
    import trdAuthAccountBusiness from "../../assets/js/business/user/trdAuthAccountBusiness";

    export default {
        data(){
            return {
                param: {
                    regCode:null,
                    nickName: null,
                    type: null,
                    username: null,
                    password: null,
                    captcha: null
                },
                captchaUrl: null,
                config: {
                    captchaVisible: false
                },
                trdAccountName:null
            }
        },

        created(){
            var param = this.param;

            param.regCode = this.$route.query.regCode;
            param.type =this.$route.query.type;
            param.nickName = this.$route.query.nickName;
            this.trdAccountName=trdAuthAccountBusiness.getTrdAccountDesc(param.type);
            this.checkAndRefreshCaptcha();
        },

        methods: {
            refreshCaptcha(){
                this.captchaUrl = securityApi.getVerifyCodeUrl() + "?" + Math.random();
            },

            bind(){
                var _this = this;
                var param = _this.param;
                if (stringUtil.isBlank(param.username)) {
                    _this.lalterError("请输入账号");
                    return;
                }

                if (stringUtil.isBlank(param.password)) {
                    _this.lalterError("请输入密码");
                    return;
                }
                if (_this.config.captchaVisible == true) {
                    if (stringUtil.isBlank(param.captcha)) {
                        _this.lalterError("请输入验证码");
                        return;
                    }
                }
                _this.lshowWait();
                trdAuthAccount.bind(param, (resp) => {
                    _this.lcloseWait();

                    if (resp.code == 200) {
                        _this.$router.push({path: "index"});
                    } else {
                        _this.lalterError(resp.msg);
                        _this.checkAndRefreshCaptcha();
                    }
                });
            },
            checkAndRefreshCaptcha(){
                var _this=this;
                userInfo.needValidateCode((resp)=>{
                    if(resp.code==200){
                        _this.config.captchaVisible=resp.data;
                        if(_this.config.captchaVisible ==true){
                            _this.refreshCaptcha();
                        }
                    }
                });
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },
            toCrateUser(){
                this.$router.push({path:"createUser",query:{type:this.param.type,nickName:this.param.nickName,regCode:this.param.regCode}})
            }
        }
    }
</script>
