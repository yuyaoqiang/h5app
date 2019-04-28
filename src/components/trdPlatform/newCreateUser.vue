<template>
    <div>
        <header class="header-box">
            <h1>创建绑定</h1>
        </header>
        <div class="header-stone">
            <img src="../../assets/images/wechat_bind.png"/>
        </div>
        <section class="bdlogin-con">
            <p class="bdlogin-tips">创建后，您的{{trdAccountName}}账号可以直接登录</p>
            <ul>
                <li class="display-flex item">
                    <p class="input-icon">
                        账号:
                    </p>
                    <p class="flex-box bdlogin-input">
                        <input type="text"  name="username" v-model.trim="param.username"/>
                    </p>
                </li>
                <li class="display-flex item">
                    <p  class="input-icon">
                        昵称:
                    </p>
                    <p class="flex-box bdlogin-input">
                        <input type="text"  name="username" v-model.trim="param.nickName"/>
                    </p>
                </li>
                <li class="display-flex item">
                    <p  class="input-icon">
                        密码:
                    </p>
                    <p class="flex-box bdlogin-input">
                        <input type="password" name="username" v-model.trim="param.password"/>
                    </p>
                </li>

                <li class="display-flex item" v-show="config.captchaVisible==true">
                    <p class="input-icon">
                        验证码:
                    </p>
                    <p class="flex-box bdlogin-input code" >
                        <input type="text" maxlength="4" name="validate" v-model.trim="param.captcha"/>
                        <img title="点击刷新" :src="captchaUrl" @click="refreshCaptcha">
                    </p>
                </li>
            </ul>
            <div class="bdlogin-btn-box">
                <button type="button"  @click="bind">确 定</button>
            </div>
            <div class="bdlogin-btn-bottom">
                我已经有账号?<a @click="toBindUser">马上绑定</a>
            </div>
        </section>
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
                    captcha: null
                },
                config: {
                    captchaVisible: false
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
            param.username = this.$route.query.userName;
            this.trdAccountName=trdAuthAccountBusiness.getTrdAccountDesc(param.type);
            this.checkAndRefreshCaptcha();
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



                if (_this.config.captchaVisible == true) {
                    if (stringUtil.isBlank(param.captcha)) {
                        _this.lalterError("请输入验证码");
                        return;
                    }
                }

                _this.lshowWait();
                trdAuthAccount.create(param, (resp) => {
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

            toBindUser(){
                this.$router.push({path: "newBindUser", query: {type: this.param.type, nickName: this.param.nickName,regCode:this.param.regCode}})
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .bdlogin-tips {
        font-size: 0.14rem;
        line-height: 0.3rem;
        text-align: center;
        color: #666666;
    }
    .bdlogin-con {
        padding:0 0.15rem;
    }
    .bdlogin-con .input-icon{
        width: 0.6rem;
        height: 0.34rem;
        line-height: 0.34rem;
        font-size: 0.14rem;
        text-align: right;
        box-sizing: border-box;
        padding-right: 0.09rem;
    }
    .bdlogin-con li.item {
        margin-top: 0.10rem;
    }
    .bdlogin-input input {
        width: 90%;
        height: 0.34rem;
        color: #666;
        background: #ffffff;
        border: none;
        box-sizing: border-box;
        font-size: 0.14rem;
        border-radius: 0.05rem;
        padding-left: 0.1rem;
        box-shadow: 0 0 0 1px #cccccc;
        -webkit-box-shadow: 0 0 0 1px #cccccc;
    }
    .bdlogin-input.code{
        position: relative;
    }
    .bdlogin-input.code img{
        position: absolute;
        right: 0.25rem;
        top: 0.02rem;
        height: 0.3rem;
        width: 0.8rem;
    }
    .bdlogin-btn-box{
        margin-top: 0.3rem;
    }
    .bdlogin-btn-box button{
        width: 100%;
        height: 0.4rem;
        font-size: 0.18rem;
        border: none;
        border-radius: 0.05rem;
        background: linear-gradient(left, @header-bg-left , @header-bg-right);
        background: -webkit-linear-gradient(left, @header-bg-left , @header-bg-right);
        color: @font-main-color;
    }
    .bdlogin-btn-bottom {
        text-align: center;
        line-height: 0.3rem;
        a{
            color: @active-color;
        }
    }
</style>