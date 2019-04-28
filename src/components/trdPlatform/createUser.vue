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
        margin-top: 0.10rem;
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
                <h1>创建绑定</h1>
            </header>
            <div class="header-stone"></div>
            <section class="bdlogin-con">
                <p class="bdlogin-tips">创建后，您的{{trdAccountName}}账号可以直接登录</p>
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
                            <i class="iconfont icon-dibu_zhanghu"></i>
                        </p>
                        <p class="flex-box bdlogin-input">
                            <input type="text" placeholder="请输入昵称" name="username" v-model.trim="param.nickName"/>
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
                    <li class="display-flex item">
                        <p  class="input-icon">
                            <i class="iconfont icon-suodingmima"></i>
                        </p>
                        <p class="flex-box bdlogin-input">
                            <input type="password" placeholder="确认密码" name="username" v-model.trim="param.repassword"/>
                        </p>
                    </li>
                    <li class="display-flex item" >
                        <p  class="input-icon">
                            <i class="iconfont icon-yanzhengma"></i>
                        </p>
                        <p class="flex-box bdlogin-input code" >
                            <input type="text" maxlength="4" placeholder="请输入验证码" name="validate" v-model.trim="param.captcha"/>
                            <img title="点击刷新" :src="captchaUrl" @click="refreshCaptcha">
                        </p>
                    </li>
                </ul>
                <button type="button"   @click="bind" class="login-btn">绑 定</button>
                <div class="bdlogin-btn-bottom">
                    <span>我已经有账号?<a @click="toBindUser">马上绑定</a> </span>
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
    import appSettingData from "../../assets/js/data/appSettingData"
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
                    repassword: null,
                    captcha: null
                },
                captchaUrl: null,
                trdAccountName:null
            }
        },

        created(){
            var param = this.param;
            param.type = this.$route.query.type;
            param.nickName = this.$route.query.nickName;
            param.regCode = this.$route.query.regCode;

            this.trdAccountName=trdAuthAccountBusiness.getTrdAccountDesc(param.type);
            this.refreshCaptcha();
        },

        methods: {
            refreshCaptcha(){
                this.captchaUrl = securityApi.getVerifyCodeUrl() + "?" + Math.random();
            },

            openOnlineService:function () {
                userBusiness.openCustomerService();
            },

            bind(){
                var _this = this;
                var param = _this.param;
                if (stringUtil.isBlank(param.username)) {
                    _this.lalterError("请输入账号");
                    return;
                }

                if (param.username.length < 5 || param.username.length > 12) {
                    this.lalterError("账号必须在5-12位字符之间");
                    return;
                }

                if (stringUtil.isBlank(param.nickName)) {
                    this.lalterError("昵称不能为空");
                    return;
                }

                if (param.nickName.length > 16) {
                    this.lalterError("昵称不能超过16位字符");
                    return;
                }


                if (stringUtil.isBlank(param.password)) {
                    _this.lalterError("请输入密码");
                    return;
                }
                var passwordLen = appSettingData.passwordLen;
                if (param.password.length < passwordLen.min || param.password.length > passwordLen.max) {
                    this.lalterError("密码必须在" + passwordLen.min + "-" + passwordLen.max + "位字符之间");
                    return;
                }


                if (stringUtil.isBlank(param.repassword)) {
                    _this.lalterError("请输入确认密码");
                    return;
                }

                if (param.password != param.repassword) {
                    this.lalterError("密码和确认密码不一致");
                    return;
                }


                if (stringUtil.isBlank(param.captcha)) {
                    _this.lalterError("请输入验证码");
                    return;
                }

                _this.lshowWait();
                trdAuthAccount.create(param, (resp) => {
                    _this.lcloseWait();
                    if (resp.code == 200) {
                        _this.$router.push({path: "index"});
                    } else {
                        _this.lalterError(resp.msg);
                    }
                });
            },

            toBindUser(){
                this.$router.push({path: "bindUser", query: {type: this.param.type, nickName: this.param.nickName,regCode:this.param.regCode}})
            }
        }
    }
</script>
