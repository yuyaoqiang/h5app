<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>额度转换</h1>
            </header>
            <section class="bank-msgs">
                <p>{{(user[transferPlatformList[0].name + 'Bal']) | fixedMoney}}</p>
                <p class="msg-name"> {{transferPlatformList[0].desc}}(元)</p>
            </section>
        </div>
        <div class="account-header-wrap">
            
            
            <article class="quota-platform">
                <ul class="pr" v-if="i>0" v-for="(item,i) in transferPlatformList">


                    <li v-show="item.opened" class="platform-money">
                        {{(item.isOwn == true ? user[item.name + 'Bal'] : item.bal) | fixedMoney}}
                    </li>
                    <li class="pb10 platform-name">
                        {{item.desc}}(元)
                        <button type="button" class="platform-opened" v-show="item.opened==false" @click="openTrdGame(item.name)">开通</button>
                    </li>

                    <li v-if="item.isOwn == false && item.opened==true"  @click="refreshTrdBal(true,item.name)" class="quota-refresh">
                        <img src="../../assets/images/icon_refresh.png"/>
                    </li>
                </ul>
            </article>

        </div>
        <section class="recording-height" style="padding-top:0">
            <div class="account-list">
                <ul class="display-flex">
                    <li class="inpitem-name">转出平台</li>
                    <li class="flex-box bank-select">
                        <span class="transfer-icon">
                            <i class="iconfont" :class="iconlist[transferout]"></i>
                        </span>
                       <!-- <img :src="require('../../assets/images/account/platform-icon-'+transferout+'.png')" alt="" class="platform-icon">-->
                        <select  v-model="transferout" @change="transferoutChanged">
                            <option v-if="item.opened&&item.permission" :label="item.desc" :value="item.value"
                                    v-for="item in transferPlatformList">
                                {{item.desc}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="display-flex">
                    <li class="inpitem-name">转入平台</li>
                    <li class="flex-box bank-select">
                      <!--  <img :src="require('../../assets/images/account/platform-icon-'+transferin+'.png')" alt="" class="platform-icon">-->
                        <span class="transfer-icon" >
                              <i class="iconfont" :class="iconlist[transferin]"></i>
                        </span>
                        <select  v-model="transferin" @change="transferinChanged">
                            <option v-if="item.opened&&item.permission" :label="item.desc" :value="item.value"
                                    v-for="item in transferPlatformList">{{item.desc}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="display-flex">
                    <li class="inpitem-name">资金密码</li>
                    <li class="flex-box bank-input"><input  type="password" v-model.trim="password" class="entry"  placeholder="请输入资金密码"/></li>
                </ul>
                <ul class="display-flex">
                    <li class="inpitem-name">转账金额</li>
                    <li class="flex-box bank-input"><input  type="number" v-model.trim="money" class="entry"  placeholder="请输入转账金额"/></li>
                </ul>
                <ul class="money-btn">
                    <li  @click="setMoney(100)" :class="money=='100'?'active':''">100元</li>
                    <li  @click="setMoney(200)" :class="money=='200'?'active':''">200元</li>
                    <li  @click="setMoney(500)" :class="money=='500'?'active':''">500元</li>
                </ul>

                <div class="quota-btn-box">
                    <button type="button" @click="submit">提交</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import bankApi from "../../assets/js/api/bankApi.js"
    import UserInfor from "../../assets/js/api/userInfo.js"
    import userBusiness from "../../assets/js/business/user/userBusiness"
    import arrayUtil from "../../assets/js/util/arrayUtil"

    import objectUtil  from '../../assets/js/util/objectUtil';
    import cacheUtil  from '../../assets/js/util/cacheUtil';

    import platformData from "../../assets/platform/main/platformData"
    import kgBusiness from "../../assets/js/business/lottery/kg/kgBusiness"

    export default {
        data () {
            return {

                form: {
                    name: '',
                },
                transferPlatformList: [],
                user: {
                    init: false,
                    walletBal: 0,
                    lotteryBal: 0,
                    kgBal: 0,
                },
                transferout: 0,
                transferin: 1,
                money: null,
                password: '',
                token: '',
                iconlist:{
                    0:'icon-zhuanhuan_qianbao',
                    1:'icon-zhuanhuan_',
                    2:'icon-zhuanhuan_a',
                    3:'icon-zhuanhuan_b',
                    4:'icon-zhuanhuan_m',
                    5:'icon-zhuanhuan_p',
                    6:'icon-zhuanhuan_d',
                    7:'icon-zhuanhuan_fenhong',
                    8:'icon-zhuanhuan_k',
                    9:'icon-zhuanhuan_v',
                    10:'icon-zhuanhuan_p',
                },
                grzxPermissions:null,
            }
        },
        created(){

            let _this = this;

            _this.loadUser();

            bankApi.TransfInit(function (res) {
                _this.token = res.data
            });
            
            var platforms = [
                {name: "wallet", desc: "钱包中心", value: 0, isOwn: true, opened: true,permission:true},
                {name: "lottery", desc: "彩票平台", value: 1, isOwn: true, opened: true,permission:true}
            ];
            _this.transferPlatformList = userBusiness.getTrdPlatforms();
            
            arrayUtil.forEach(platformData.trdPlatforms, item => {

                if (item.enabled == false) return;

                var trdPlatform = {
                    name: item.code,
                    desc: item.desc,
                    bal: 0,
                    opened: false,
                    value: item.value,
                    isOwn: false
                };
                platforms.push(trdPlatform);
            });
            
            _this.transferPlatformList=platforms;
            
            

        },
        methods: {
            goback(){
                this.$router.go(-1);
            },

            loadUser(){
                var _this = this;

                userBusiness.getUser(_this, function (user) {
                    _this.user = user;
                })
            },

            transferinChanged(){
                
                if (this.transferout == this.transferin) {
                    if (this.transferin == 0) {
                        this.transferout = 1;
                    } else {
                        this.transferout = 0;
                    }
                    return;
                }

                if (this.transferout > 0 && this.transferin > 0) {
                    this.transferout = 0;
                }
            },

            transferoutChanged(){
                if (this.transferout == this.transferin) {
                    if (this.transferout == 0) {
                        this.transferin = 1;
                    } else {
                        this.transferin = 0;
                    }
                    return;
                }
                if (this.transferout > 0 && this.transferin > 0) {
                    this.transferin = 0;
                }
            },

            refreshTrdBal(showWait){
                let _this = this;
                if (showWait == true) {
                    _this.lshowWait();
                }
                bankApi.thirBalancer((res) => {
                    _this.lcloseWait();

                    if (res.code == 200) {
                        var data = res.data;
                        arrayUtil.forEach(_this.transferPlatformList, item => {
                            let key = "_" + item.name + "Balance";
                            var bal = data[key];
                            if (bal != null) {
                                item.bal = bal.balance;
                            }
                        });
                    } else {
                        _this.lalterError(res.msg);
                    }
                });
            },
            //开通第三方
            openTrdGame(platformCode) {

                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if (falg) {
                    return;
                }
                // if(platformCode=='SB'){
                //     _this.lalterWarning("该游戏暂时关闭,若有疑问请联系客服!");
                //     return false;
                // }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub['我的账户'] || {};
                    if (myAccount["all"] != true) {
                        var cbzb = myAccount['钱包中心'] || {};
                        if (cbzb["all"] == true) {
                            _this.lalterWarning(platformCode + "功能暂时关闭,若有疑问请联系客服!");
                            return
                        }

                        if (cbzb[platformCode + "平台"] == true) {
                            _this.lalterWarning(platformCode + "功能暂时关闭,若有疑问请联系客服!");
                            return
                        }
                    }
                }

                this.lconfirm('您是否要开通', null, () => {
                    _this.lshowWait();
                    UserInfor.createTrdGameUser(platformCode, function (resp) {
                        _this.lcloseWait();
                        if (resp.code == 200) {
                            _this.lalterSuccess("开通成功");
                            var platform = arrayUtil.findFirst(_this.transferPlatformList, item => {
                                return item.name == platformCode
                            });
                            platform.opened = true;
                        } else {
                            _this.lalterError(resp.msg);
                        }
                    });
                });
            },
            setMoney(val){
                this.money = val;
            },
            submit(){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if (falg) {
                    return;
                }
                var password = _this.password;
                var money = _this.money / 1;
                if (money < 1) {
                    this.lalterWarning("请输入有效的转账金额");
                    return;
                }
                if (password.length <= 0) {
                    this.lalterWarning("请输入资金密码");
                    return;
                }

                var transferout = _this.transferout;
                var transferin = _this.transferin;
                var token = _this.token;
                var params = {
                    "money": money,
                    "transferout": transferout,
                    "transferin": transferin,
                    "password": password,
                    "token": token
                };
                this.lconfirm('您是否要转换', null, () => {

                    bankApi.capitalTransfer(params, (resp) => {
                        _this.lalterSuccess(resp.msg);
                        _this.token = resp.data
                        if (resp.code == 200) {
                            _this.password = "";
                            _this.money = "";
                            _this.loadUser();
                            _this.refreshTrdBal(false);

                        }
                    });
                });
            },
            userInitAfter(){
                var _this = this;
                var user = this.user;
                if (user.init == false) {
                    return;
                }

                var platforms = _this.transferPlatformList;

                if (user.isOpenKg == true) {
                    var kgPlatform = {name: "kg", desc: "KG彩票", value: 8, isOwn: true, opened: true,permission:true};
                    arrayUtil.insertAt(platforms, 2, kgPlatform);
                }

                if (user.isOpenDividends == true) {
                    var kgPlatform = {name: "dividends", desc: "分红账号", value: 7, isOwn: true, opened: true,permission:true};
                    arrayUtil.insertAt(platforms, 3, kgPlatform);
                }

                arrayUtil.forEach(platforms, item => {
                    let key = "isOpen" + item.name;
                    var val = user[key];
                    if (val != null) {
                        item.opened = val == "1";
                    }
                });

                _this.refreshTrdBal(false);

                this.grzxPermissions = userBusiness.getAccountMenuPermissions();
                   
                    var grzx = this.grzxPermissions.grzx||{};
                    var sub = objectUtil.safeGet(grzx,"sub");
                    var wdzh = objectUtil.safeGet(sub,"我的账户");
                    var qbzx = objectUtil.safeGet(wdzh,"钱包中心");
                    arrayUtil.forEach(_this.transferPlatformList ,item =>{             
                        var parentPermission = qbzx[item.name+'平台'];
                        if(parentPermission){
                            item.permission = false
                        }else{
                            item.permission = true
                        }
                    })
                }
        },
        updated(){
            
        },
        watch: {
            "user.init": function () {
                this.userInitAfter();
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .account-list{
        padding: .15rem;
        box-shadow:none;
        -webkit-box-shadow:none;
    }
    .bank-msgs{
        color: @font-main-color;
        font-size: 0.23rem;
        font-weight: bold;
        text-align: center;
        background: linear-gradient(left, @header-bg-left , @header-bg-right);
        background: -webkit-linear-gradient(left, @header-bg-left , @header-bg-right);
    }
    .bank-msgs .msg-name{
        font-size: 0.12rem;
        font-weight: normal;
        color:@font-main-color;
    }
    .account-header-wrap{
        padding-bottom: 0.05rem;
        // height: 3.5rem;
        // overflow-y: auto;
    }
    .recording-height{
        // position: absolute;
        // left: 0;
        // right: 0;
        // bottom: 0;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        background: #fff;
        box-shadow: 0 1px 0 #e8e8e8 inset, 0 -1px 0 #e8e8e8 inset;
        -webkit-box-shadow: 0 1px 0 #e8e8e8 inset, 0 -1px 0 #e8e8e8 inset;
        border-radius: 0.08rem 0.08rem 0 0;
        overflow: initial;
    }

    .platform-money{
        color: rgb(51,51,51);
        font-size: 0.16rem;
        font-weight: bold;
    }
    .platform-name{
        margin-top: 0.05rem;
        font-size: 0.12rem;
        color: #666666;
        padding-bottom: 0.02rem;
    }
    .quota-platform {
        text-align: center;
        overflow: hidden;
        margin: 0.1rem;
        padding-top:0.88rem;
        border-radius: 0.06rem 0.06rem 0 0;
        background: #fff;
    }
    .inpitem-name{
        position: relative;
        padding-right: 0.1rem;
    }
    .inpitem-name:after{
        content: '';
        display: inline-block;
        position: absolute;
        right: -0.04rem;
        top: 0.1rem;
        border-right: 1px solid #dedede;
        height: 60%;
    }
    .platform-icon{
        position: absolute;
        left: 0.18rem;
        top: 0.15rem;
    }
    .bank-input input, .bank-select select {
        height: 0.4rem;
        width: 60%;
        border: none;
        font-size: 0.13rem;
        margin-left: 0.22rem;
        box-sizing: border-box;
        background: none;
        color: #333333;
    }
    .bank-input input{
        margin-left: 0;
    }
    .money-btn{
        display: flex;
        height: 0.3rem;
        box-shadow: none;
        -webkit-box-shadow: none;
        border: none;
        padding: 0;
        margin-top: 0.1rem;
        justify-content: space-between;
    }
    .money-btn li{
        width: 30%;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        box-shadow: 0 -1px 0 #e8e8e8 inset;
        -webkit-box-shadow: 0 -1px 0 #e8e8e8 inset;
        border: 1px solid #e8e8e8;
        border-radius: 0.05rem;
    }

</style>