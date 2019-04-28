<template>
    <div>
        <!-- <header class="header-box over">
            <div class="column-icon-box" @click='leftSlide'>
                <i class="column-icon"></i>
            </div>
            <h1>设置</h1>
        </header> -->
        <section class="overflow-height">
            <div  class="account-list mt15">
                <ul @click="toBankContr({path:'bankControl'})"  class="display-flex">
                    <li class="flex-box">银行卡管理</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
            </div>
            <div class="account-list mt15">
                <ul  @click="toUserInfor({path:'userInfor'})"  class="display-flex">
                    <li class="flex-box">个人信息</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toLoadPassword({path:'loadPassword'})"  class="display-flex">
                    <li class="flex-box">修改登录密码</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toModifyPassword({path:'modifyPassword',query:{setType:user.hasWallerPwd?'1':'0'}})"  class="display-flex">
                    <li class="flex-box pr">修改资金密码 <span class="setting-no" v-if='user.hasWallerPwd==false'>未设置</span></li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
            </div>

            <router-link tag="div" to="moreInfo" class="account-list mt15">
                <ul  class="display-flex">
                    <li class="flex-box">更多信息</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
            </router-link>

            <div class="setting-btn-box">
                <button type="button"  @click="dropOut">退出登录</button>
            </div>
        </section>
    </div>
</template>

<script>

    import UserInfor from "../../assets/js/api/userInfo"
    import userBusiness from "../../assets/js/business/user/userBusiness"
    import appContext from "../../assets/js/context/appContext"
    export default {
        props: {
            user: {
                type: Object
            }
        },
        data () {
            return {
                postUrl:"/login/loginOut.mvc",
                msg:'',
            }
        },
        created(){
            var _this=this;
        },
        methods: {

            leftSlide(){
                this.$parent.leftSlide();
            },


            back:function() {
                this.$router.go(-1);
            },
            toBankContr(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub["我的账户"] || {};
                    if (myAccount["all"] != true) {
                        var bindBank = myAccount["绑定银行卡"] || {};
                        if(bindBank["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
               _this.lalterWarning("银行卡功能暂时关闭,若有疑问请联系客服!");
            },
            toUserInfor(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub["我的账户"] || {};
                    if (myAccount["all"] != true) {
                        var userInfo = myAccount["个人资料"] || {};
                        if(userInfo["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
                _this.lalterWarning("个人信息功能暂时关闭,若有疑问请联系客服!");
            },
            toLoadPassword(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub["我的账户"] || {};
                    if (myAccount["all"] != true) {
                        var bindBank = myAccount["安全中心"] || {};
                        if(bindBank["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
                _this.lalterWarning("该功能暂时关闭,若有疑问请联系客服!");
            },
            toModifyPassword(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub["我的账户"] || {};
                    if (myAccount["all"] != true) {
                        var bindBank = myAccount["安全中心"] || {};
                        if(bindBank["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
                _this.lalterWarning("该功能暂时关闭,若有疑问请联系客服!");
            },
            dropOut:function(){
                var _this = this;
                this.lconfirm('您是否确定退出？', null, () => {
                    UserInfor.loginOut((res)=>{
                        appContext.destroy();
                    })
                });
            }
        }
    }
</script>