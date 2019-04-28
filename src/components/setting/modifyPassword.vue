<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="back">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>资金密码</h1>
            </header>
        </div>
        
        <section  class="report-height">
            <!--修改资金密码-->
            <article  v-if='this.$route.query.setType == 1'>
                <ul class="password-box">
                    <li>
                        <input type="password" placeholder="请输入旧的资金密码" v-model.trim="newUserPassword.CurrentPassword">
                    </li>
                    <li>
                        <input type="password" placeholder="请输入新的资金密码" v-model.trim="newUserPassword.NewPassword">
                    </li>
                    <li>
                        <input type="password" placeholder="请再次输入新的资金密码" v-model.trim="newUserPassword.NewPasswordReKey">
                    </li>
                </ul>
                <div class="password-btn-box">
                    <button type="button" @click="ensure">确定</button>
                </div>
            </article>
            <!--设置资金密码-->
            <article  v-if='this.$route.query.setType == 0'>
                <ul class="password-box">
                    <li>
                        <input type="password" placeholder="请输入资金密码" v-model.trim="takePassword">
                    </li>
                    <li>
                        <input type="password" placeholder="请再次确认资金密码" v-model.trim="takePassword2">
                    </li>
                </ul>
                <div class="password-btn-box">
                    <button type="button"  @click="setPassword">确定</button>
                </div>
            </article>
        </section>
    </div>
</template>
<script>
    import userInfo from "../../assets/js/api/userInfo"
    import appSettingData from "../../assets/js/data/appSettingData"
    export default {
        data () {
            return {
                newUserPassword: {
                    CurrentPassword:'',
                    NewPassword:'',
                    NewPasswordReKey:''
                },
                tips: {
                    noCurrentPassword: false,
                    noNewPassword: false,
                    noNewPasswordReKey: false
                },
                takePassword:'',
                takePassword2:''
            }
        },
        methods:{
            back(){
                this.$router.push({path:"setting"});
            },
            ensure(){
                var _this = this;
                if(this.newUserPassword.CurrentPassword == ''){
                    this.lalterWarning("请输入旧的资金密码");
                    return false
                }
                if (this.newUserPassword.NewPassword == ''){
                    this.lalterWarning("请输入新的资金密码！");
                    return false
                }


                var passwordLen=appSettingData.passwordLen;
                if (this.newUserPassword.NewPassword.length<passwordLen.min || this.newUserPassword.NewPassword.length>passwordLen.max){
                    this.lalterWarning("新资金密码必须在"+passwordLen.min+"-"+passwordLen.max+"个字符之间");
                    return;
                }

                if (this.newUserPassword.NewPasswordReKey == ''){
                    this.lalterWarning("请再次输入新的资金密码！");
                    return false
                }

                if (this.newUserPassword.NewPassword != this.newUserPassword.NewPasswordReKey){
                    this.lalterWarning("两次输入新的资金密码不一致！");
                    return false
                }


                var params = {
                    "takePassword" : this.newUserPassword.CurrentPassword ,
                    "newTakePassword": this.newUserPassword.NewPassword ,
                    "againNewTakePassword": this.newUserPassword.NewPasswordReKey
                };
                this.lconfirm('您是否确定修改资金密码？', null, () => {
                    userInfo.takePassword(params,function(res){
                        if(res.code == 200){
                            _this.lalterSuccess(res.msg);
                            _this.$router.push('/setting');
                        }else{

                            _this.newUserPassword.CurrentPassword='';
                            _this.newUserPassword.NewPassword='';
                            _this.newUserPassword.NewPasswordReKey='';
                            _this.lalterWarning(res.msg);
                        }
                    })
                });
            },
            setPassword(){
                let _this = this;
                if(this.takePassword == ''){
                    this.lalterWarning("请输入资金密码！");
                    return false
                }

                var passwordLen=appSettingData.passwordLen;
                if (this.takePassword.length<passwordLen.min || this.takePassword.length>passwordLen.max){
                    this.lalterWarning("资金密码必须在"+passwordLen.min+"-"+passwordLen.max+"个字符之间");
                    return;
                }


                if (this.takePassword2 == ''){
                    this.lalterWarning("请再次输入资金密码！");
                    return false
                }
                if (this.takePassword2 != this.takePassword){
                    this.lalterWarning("两次密码不一致！");
                    return false
                }
                let params = {
                    "takePassword" : this.takePassword,
                    "takePassword2" : this.takePassword2
                };
                this.lconfirm('您是否确定设置资金密码？', null, () => {
                    userInfo.updatePwd(params, (res) =>{
                        if(res.code == 200){
                            _this.lalterSuccess(res.msg);
                            _this.$router.push('/setting');
                        }else{
                            _this.lalterWarning(res.msg);
                        }
                    })
                });
            }
        }
    }
</script>
<style scoped>

</style>
