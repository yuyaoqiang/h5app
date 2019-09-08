<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>新增用户</h1>
            </header>
        </div>
        
        <section class="report-height">
            <div class="lottery-title">
                <p>用户信息</p>
            </div>
            <div class="account-list">
                <ul class="display-flex">
                    <li>用户账号:</li>
                    <li class="flex-box bank-input"><input type="text" placeholder="请输入用户账号" v-model.trim="username"></li>
                </ul>
                <ul class="display-flex">
                    <li>用户昵称:</li>
                    <li class="flex-box bank-input"><input type="text" placeholder="请输入用户昵称" v-model.trim="nickname"></li>
                </ul>
                <ul class="display-flex">
                    <li>登录密码:</li>
                    <li class="flex-box bank-input"><input type="password" placeholder="请输入密码" v-model.trim="password"></li>
                </ul>
            </div>
            <div class="lottery-title">
                <p>用户类型</p>
            </div>
            <div  class="account-list">

                <ul class="added-user">
                    <li v-if="is50K != '50k'">
                        <input type="radio" id="usertype_1" v-model="usertype"  name="usertype" value="1" class="user-radio"/>
                        <label for="usertype_1">代理</label>
                    </li>
                    <li><input type="radio" id="usertype_2" v-model="usertype"  name="usertype" value="2" class="user-radio"/>
                        <label for="usertype_2">会员</label>
                    </li>
                </ul>

            </div>
            <div class="lottery-title">
                <p>返点设置</p>
            </div>
            <div class="added-box">
                <ul class="display-flex text-center" v-if="is50K != '50k'">
                    <li>我的返点: <span class="red">{{user.bonus}}</span></li>
                    <li class="flex-box">代理/会员返点: <span class="red">{{bonus}}</span></li>
                    <li class="flex-box">保留返点: <span class="red">{{(user.bonus - bonus) | fixed(1)}}</span></li>
                </ul>

                <ul class="display-flex text-center" v-if="is50K == '50k'">
                    <li>我的返点:<span class="red">{{user.bonus}}</span></li>
                    <li class="flex-box">会员返点:<span class="red">7.5</span></li>
                    <!-- <li class="flex-box">保留返点:<span class="red">{{(user.bonus - bonus) | fixed(1)}}</span></li> -->
                </ul>

                <ul class="display-flex" v-if="is50K != '50k'">
                    <li class="added-bonus">{{bonus==null?0:bonus}}</li>
                    <li class="flex-box">
                        <input type="range" step="0.1" min="0" :max="user.bonus" v-model.number="bonus"
                               class="user-range" @change="selectBonus(bonus,user.bonus)"/>
                    </li>
                    <li class="added-bonus">{{user.bonus}}</li>
                </ul>
            </div>
            <div class="added-btn-box">
                <button type="button" @click="addUser">确认</button>
            </div>
        </section>
    </div>
</template>

<script>
    import userInfo from "../../assets/js/api/userInfo" //个人信息接口
    import userBusiness from "../../assets/js/business/user/userBusiness" //个人信息接口
    
    import platformData from '../../assets/platform/main/platformData';

    export default {
        data () {
            return {
                user:{},
                usertype: '1',
                username:'',
                password:'',
                bonus:0,
                nickname:'',
                is50K:'',
            }
        },
        methods: {
            selectBonus(value,rebate){
                let range= document.querySelector(".user-range");
                let progress = (value/rebate).toFixed(2);
                range.style.background= '-webkit-linear-gradient(left, #ffa800 0%,'+'#ffa800'+' '+ progress*100+'%'+ ',#d0d0d0'+' '+progress*100+'%' +',#d0d0d0 100%)';
            },
            goback: function(){
                this.$router.go(-1);
            },
            addUser(){
                let _this = this;
                if(this.username.length <= 0 || this.password.length <= 0 || this.nickname.length <= 0 || this.bonus.length <= 0){
                    this.lalterError("所有信息均为必填项，请填写完成后再进行确认！")
                    return false;
                }
                if(this.username.length < 5 || this.username.length > 12){
                    this.lalterError("账号必须在5-12个字符之间！")
                    return false;
                }

                if(this.nickname.length > 12){
                    this.lalterError("用户昵称必须不能大于12个字符之间！")
                    return false;
                }
                if(this.password.length <6 || this.password.length > 16){
                    this.lalterError("密码必须在8-16个字符之间！")
                    return false;
                }
                if(this.is50K=='50k'){
                    this.bonus = 7.5
                }
                let params = {
                    usertype: this.usertype,
                    username: this.username,
                    password: this.password,
                    bonus: this.bonus,
                    nickname: this.nickname
                };
                this.lconfirm("是否确定新增用户？",null,function () {
                    userInfo.addUser(params,(res) =>{
                        if(res.code == 200){
                            _this.lalterSuccess('添加成功');
                            _this.$router.push("/memberManagement");
                        }else{
                            _this.lalterError(res.msg);
                        }
                    });
                });
            }
        },
        created() {
            var _this = this;
            userBusiness.getUser(_this,function (user) {
                _this.user = user;
            });
            this.is50K = platformData.setting.code;
            if(this.is50K=='50k'){
                this.usertype = 2
            }else{
                this.usertype = 1
            }
        },
        components: {}
    }
</script>