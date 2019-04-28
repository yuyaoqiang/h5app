<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>新增注册链接</h1>
            </header>
        </div>
        
        <section class="report-height">
            <div class="lottery-title">
                <p>用户信息</p>
            </div>
            <div  class="account-list">
                <ul class="added-user">
                    <li v-if="is50K != '50k'">
                        <input type="radio" id="usertype_1" v-model="usertype"  name="usertype" value="1" class="user-radio"/>
                        <label for="usertype_1">代理</label>
                    </li>
                    <li>
                        <input type="radio" id="usertype_2" v-model="usertype"  name="usertype" value="2" class="user-radio"/>
                        <label for="usertype_2">会员</label>
                    </li>
                </ul>

                <ul v-if="autoRegEnable==true" class="added-user">
                    <li>
                        <input type="radio" id="regType1" v-model="regType"  name="regType" value="NORMAL" class="user-radio"/>
                        <label for="regType1">普通注册</label>
                    </li>
                    <li>
                        <input type="radio" id="regType2" v-model="regType"  name="regType" value="AUTO" class="user-radio"/>
                        <label for="regType2">自动注册</label>
                    </li>
                </ul>

            </div>
            <div class="lottery-title">
                <p>返点设置</p>
            </div>
            <div class="added-box" v-if="is50K == '50k'">
                <ul class="display-flex text-center">
                    <li>我的返点:<span class="red">{{user.bonus}}</span></li>
                    <li class="flex-box">会员返点:<span class="red">7.5</span></li>
                </ul>   
            </div>
            <div class="added-box" v-if="is50K != '50k'">
                <ul class="display-flex text-center">
                    <li>我的返点:<span class="red">{{user.bonus}}</span></li>
                    <li class="flex-box">代理/会员返点:<span class="red">{{bonus==null?0:bonus}}</span></li>
                    <li class="flex-box">保留返点:<span class="red">{{(user.bonus - bonus) | fixed(1)}}</span></li>
                </ul>
                <ul  class="display-flex">
                    <li class="added-bonus">{{bonus==null?0:bonus}}</li>
                    <li class="flex-box">
                        <input type="range" step="0.1" min="0" :max="user.bonus" v-model.number="bonus"
                               class="user-range"  @change="selectBonus(bonus,user.bonus)"/>
                    </li>
                    <li class="added-bonus">{{user.bonus}}</li>
                </ul>
            </div>
            <ul class="link-register">

                <li v-if="regData.pcUrl != null" >
                    <span class="link-address">普通注冊:{{regData.pcUrl}}</span>
                    <span class="link-img link-code" @click="showDialog(regData.pcUrl,'扫一扫注册')">
                        <img  src="../../assets/images/code_icon.png">
                    </span>
                </li>
                <li v-if="regData.wechatUrl != null" >
                    <span class="link-address">微信注冊:{{regData.wechatUrl}}</span>
                    <span class="link-img  link-code"   @click="showDialog(regData.wechatUrl,'微信扫一扫登录')"><img
                            src="../../assets/images/code_icon_wechat.png"></span>
                </li>
            </ul>
            <div class="added-btn-box">
                <button type="button" @click="creatLink">生成注册链接</button>
            </div>
        </section>
        <div v-show="showCodeDialog">
            <div class="cover-bg"></div>
            <div class="link-alert">
                <span class="copy-url"
                      v-clipboard:copy="qrCodeVal"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError">
                    <img src="../../assets/images/copy.png" alt="copy">
                </span>
                <h1>{{qrCodeDesc}}</h1>
                <div class="link-code-img"></div>
            </div>
            <div class="alert-close" @click="showCodeDialog = false"></div>
        </div>
    </div>
</template>

<script>
    import UserInfor  from '../../assets/js/api/userInfo.js';
    import userBusiness from "../../assets/js/business/user/userBusiness" //个人信息接口
    import platformData from '../../assets/platform/main/platformData';
    import systemConfigBusiness from '../../assets/js/business/config/systemConfigBusiness';
    export default {
        data () {
            return {
                user:{},
                registLink:'',
                usertype:"1",
                bonus:0,
                is50K:'',
                regType:"NORMAL",
                autoRegEnable:false,
                showCodeDialog: false,
                qrCodeDesc: null,
                qrCodeVal: null,
                regData:{
                    wechatUrl:null,
                    pcUrl:null
                }
            }
        },
        created(){
            var _this = this;

            systemConfigBusiness.getConfig((config)=>{
                _this.autoRegEnable = config.autoRegEnable=="1";
            });

            userBusiness.getUser(_this,function (user) {
                _this.user=user;
                _this.password = "";
                _this.money = "";
            })
            this.is50K = platformData.setting.code;
            if(this.is50K=='50k'){
                this.usertype = 2
            }else{
                this.usertype = 1
            }
        },
        methods: {
            goback:function() {
                this.$router.go(-1);
            },
            selectBonus(value,rebate){
                let range= document.querySelector(".user-range");
                let progress = (value/rebate).toFixed(2);
                range.style.background= '-webkit-linear-gradient(left, #ffa800 0%,'+ '#ffa800'+' '+ progress*100+'%'+ ',#d0d0d0'+' '+progress*100+'%' +',#d0d0d0 100%)';
            },
            creatLink(){
                let _this = this;
                if(this.is50K=='50k'){
                    this.bonus = 7.5
                }
                let params = {
                    usertype:this.usertype,
                    bonus:this.bonus,
                    regType:this.regType,
                    returnDataType:'obj' //数据返回类型 obj是代表返回一个对象(PC版注册地址 微信版注册地址)
                }
                UserInfor.produceLink(params,(res) =>{
                    if(res.code == 200){
                        if(typeof res.data == "string"){
                            _this.regData.pcUrl = res.data ;
                        }else {
                            _this.regData=res.data;
                        }
                        _this.lalterSuccess("创建成功！")
                    }else {
                    _this.lalterError(res.msg);
                }
                });
            },
            openUrl(url){
                
                if(url==null||url==''){
                    this.lalterSuccess("链接地址不能为空")
                    return false;
                }
                window.open(url);
            },
            showDialog(url, desc){
                var _this = this;
                $(".link-code-img").empty();


                _this.lshowWait("正在生成二维码")
                setTimeout(function () {
                    _this.lcloseWait();
                    _this.createQRCode(url);
                    _this.showCodeDialog = true;
                    _this.qrCodeVal = url;
                    _this.qrCodeDesc = desc;
                }, 300)
            },
            createQRCode(url){
                let _this = this;
                $(".link-code-img").qrcode({
                    render: "canvas",
                    width: 200,
                    height: 200,
                    correctLevel: 0,
                    text: url,
                })
            },
            onCopy(e) {
                this.lalterSuccess("复制成功")
            },
            onError(e) {
                this.lalterError("复制失败")
            },
        },
        components: {}
    }
</script>