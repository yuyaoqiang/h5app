<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>个人信息</h1>
            </header>
        </div>
        
        <section class="report-height">
            <div  class="account-list mt15">
                <ul class="display-box pr15">
                    <li>头像</li>
                    <li class="info-avatar text-right"><img src="../../assets/images/icon29.png"></li>
                </ul>
                <ul class="display-box pr15">
                    <li>账户名</li>
                    <li class="text-right">{{user.userName}}</li>
                </ul>
                <ul  class="display-box pr15" @click="modifyNickName">
                    <li>个人昵称</li>
                    <li class="info-name text-right">{{user.nickName}}<img src="../../assets/images/edit_icon.png"/></li>
                </ul>
                <ul class="display-box pr15">
                    <li>邮箱</li>
                    <li class="text-right" v-if="user.email != null && user.email != '' && user.email != '****null' ">
                        {{user.email}}
                    </li>
                    <li class="text-right" v-else @click="addEmail">添加邮箱</li>
                </ul>
                <ul class="display-box pr15">
                    <li>注册时间</li>
                    <li class="text-right">{{user.regdt}}</li>
                </ul>
                <ul class="display-box pr15">
                    <li>上次登录时间</li>
                    <li class="text-right">{{user.loginDt}}</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import UserInfor  from '../../assets/js/api/userInfo.js';
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import stringUtil  from '../../assets/js/util/stringUtil';
    export default {
        data () {
            return {
                user: {
                    nickName:'',
                    email:''
                }
            }
        },
        methods: {
            initUserInfo(){
                var _this = this;
                userBusiness.getUser(_this,function (user) {
                    _this.user = user;
                });
            },
            goback: function(){
                this.$router.go(-1);
            },
            modifyNickName(){
                let _this = this;
                _this.lprompt('请输入新昵称', null
                    , (value) => {

                        if (stringUtil.isBlank(value)) return;

                        if (value.length > 12) {
                            this.lalterError("用户昵称必须不能大于12个字符之间！")
                            return false;
                        }

                        let params = {
                            nickname: value
                        }
                        UserInfor.baseInfo(params, (res) => {
                            if (res.code == 200) {
                                _this.lalterSuccess(res.msg);
                               const obj =  Object.assign({},_this.user,{nickName:value})
                               _this.user=obj;
                          
                            } else {
                                _this.lalterWarning(res.msg);
                            }
                        })

                    })
            },
            addEmail(){
                let _this = this;
                this.lprompt('请输入邮箱',
                {inputPattern:/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/}
                    ,(value)=>{
                        let params={
                            email:value
                        }
                        UserInfor.baseInfo(params,(res)=>{
                            if(res.code == 200){
                                _this.lalterSuccess(res.msg);
                                   const obj =  Object.assign({},_this.user,{email:value})
                                  _this.user=obj;
                            }else{
                                _this.lalterWarning(res.msg);
                            }
                        })
                })
            }
        },
        created() {
            this.initUserInfo();
        }
    }
</script>
<style>
    .mint-msgbox-input input{
        height: 34px;
        box-sizing: border-box;
    }
</style>