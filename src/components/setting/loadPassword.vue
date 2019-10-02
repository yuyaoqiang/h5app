<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>修改登录密码</h1>
            </header>
        </div>
        
        <section class="report-height">
            <ul class="password-box">
                <li><input type="password" placeholder="请输入当前登录密码" v-model.trim="newUserPassword.loginPassword"></li>
                <li><input type="password" placeholder="请输入新的登录密码" v-model.trim="newUserPassword.newLoginPassword"></li>
                <li><input type="password" placeholder="请再次输入新的登录密码"  v-model.trim="newUserPassword.againNewLoginPassword"></li>
            </ul>
            <div class="password-btn-box">
                <button type="button" @click="ensure">确定</button>
            </div>
        </section>
    </div>
</template>

<script>
    import UserInfor from '../../assets/js/api/userInfo'
    import stringUtil from '../../assets/js/util/stringUtil'
    import appSettingData from '../../assets/js/data/appSettingData'
    export default {
        data () {
            return {
                newUserPassword: {
                    loginPassword:'',
                    newLoginPassword:'',
                    againNewLoginPassword:''
                }
            }
        },
        methods:{
            goback:function() {
                this.$router.go(-1);
            },
            ensure:function(){
                var _this = this;
                if(this.newUserPassword.loginPassword == ''){
                    this.lalterWarning("请输入登录密码");
                    return;
                }
                if (this.newUserPassword.newLoginPassword == ''){
                    this.lalterWarning("请输入新登录密码");
                    return;
                }

                var passwordLen=appSettingData.passwordLen;
                if (this.newUserPassword.newLoginPassword.length<passwordLen.min || this.newUserPassword.newLoginPassword.length>passwordLen.max){
                    this.lalterWarning("新登录密码必须在"+passwordLen.min+"-"+passwordLen.max+"个字符之间");
                    return;
                }

                if (this.newUserPassword.againNewLoginPassword == ''){
                    this.lalterWarning("请再次输入新登录密码");
                    return;
                }
                if (this.newUserPassword.againNewLoginPassword != this.newUserPassword.newLoginPassword){
                    this.lalterWarning("两次输入密码不一致");
                    return;
                }
                var params = {
                    "loginPassword" : this.newUserPassword.loginPassword,
                    "newLoginPassword": this.newUserPassword.newLoginPassword ,
                    "againNewLoginPassword" : this.newUserPassword.againNewLoginPassword
                }
                this.lconfirm('您是否确定修改登录密码？', null, () => {
                    UserInfor.updateLoginPwd(params,(res) =>{
                        if(res.code == 200){
                            _this.lalterSuccess(res.msg);
                            _this.$router.push('/setting');
                        }else{
                            _this.newUserPassword.loginPassword = '';
                            _this.newUserPassword.newLoginPassword ='';
                            _this.newUserPassword.againNewLoginPassword ='';
                            _this.lalterWarning(res.msg);
                        }

                    })
                });
            }
        }
    }
</script>
<style scoped>
 input::placeholder {
  color: #999 !important;
}
</style>