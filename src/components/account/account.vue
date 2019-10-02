<template>
    <div>
        <div class="account-header-wrap">
            <header class="account-header">
                <!-- <div class="column-icon-box" @click='leftSlide'>
                    <i class="column-icon"></i>
                </div> -->
                <div class="account-img">
                    <img src="../../assets/images/icon29.png">
                    <div class="btn_chongzhi" @click="toWyczPage({path:'chongzhi'})"><i class="iconfont icon-zhanghu_chongzhi"></i>充值</div>
                    <div class="btn_tixian" @click="toWytxPage({path:'withdraw'})"><i class="iconfont icon-zhanghu_tixian"></i>提现</div>
                </div>
                <div class="account-name">{{user.isShiWan==true?'试玩用户':user.userName}}
                    <span v-if="levelActive.isopen&&user.isShiWan==false" class="levelActive">({{levelActive.name}})</span>
                </div>
                <ul class="account-money">
                    <li class="account-wallet">¥ {{user.walletBal | fixedTo2}} 元</li>
                    <router-link class="account-money-icon"  tag="li" to="quotaConversion"> <i class="iconfont icon-zhanghu_zhuanhuan"></i>额度转换</router-link>
                </ul>
            </header>

            <ul class="display-box account-submenu">
                <router-link tag="li" to="betrecord">
                    <div>
                        <img src="../../assets/images/account/account_icon01_01.png">
                    </div>
                    <p>投注记录</p>
                </router-link>
                <router-link tag="li" to="zuihaoRecord">
                    <div>
                        <img src="../../assets/images/account/account_icon01_02.png">
                    </div>
                    <p>追号记录</p>
                </router-link>
                <router-link tag="li" to="KgBetrecord" v-if="user.isOpenKg==true" >
                    <div>
                        <img src="../../assets/images/account/account_icon02_01.png">
                    </div>
                    <p>KG投注</p>
                </router-link>
                <router-link tag="li" to="KgZuihaoRecord" v-if="user.isOpenKg==true" >
                    <div>
                        <img src="../../assets/images/account/account_icon02_02.png">
                    </div>
                    <p>KG追号</p>
                </router-link>
            </ul>
        </div>
        <article class="account-main">
            <section class="account-list">
                <ul @click="toMyReport"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_baobiao"></i></li>
                    <li class="flex-box">我的报表</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toStatis"  class="display-flex" v-if="user.userType==1" >
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_tongji"></i></li>
                    <li class="flex-box">综合统计</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <router-link tag="ul" to="agentCenter" v-if="user.userType==1"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_daili1"></i></li>
                    <li class="flex-box">代理中心</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </router-link>
                <ul  @click="toActivity"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_youhui"></i></li>
                    <li class="flex-box">优惠活动</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toBonusDetails"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_jiangjin"></i></li>
                    <li class="flex-box">奖金详情</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toLotteryLimited"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_xianhong"></i></li>
                    <li class="flex-box">彩票限红</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toFklb"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_yijian"></i></li>
                    <li class="flex-box">意见箱</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
                <ul @click="toEmail"  class="display-flex">
                    <li class="account-list-icon"><i class="iconfont icon-zhanghu_zhanneixin"></i></li>
                    <li class="flex-box">站内信</li>
                    <li class="account-arrow-right"><i class="el-icon-arrow-right"></i></li>
                </ul>
            </section>
        </article>
    </div>
</template>
<script>
    //import MessageBox from 'vue-msgbox';

    import userInfo  from '../../assets/js/api/userInfo.js';
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import kgBusiness  from '../../assets/js/business/lottery/kg/kgBusiness';
    import betRecordApi from '../../assets/js/api/betRecordApi.js'
    import platformData from '../../assets/platform/main/platformData'
    export default {
        data () {
            return {
                accountMenus:{},
                user:{},
                levelActive:{
                    isopen:false,
                    name:''
                }
            }
        },
        created() {
            var _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            })
            _this.accountMenus = userBusiness.getAccountMenus();
           
            if(platformData.setting.code=='bjc'){
                betRecordApi.getLevelName(res =>{
                    if(res.code==200){
                        this.levelActive = res.data;
                    }
                })
            }
            

        },
        mounted(){

        },
        methods: {
            leftSlide(){
                this.$parent.leftSlide();
            },


            toMyReport(){
                userBusiness.toMyReport()
            },
            toStatis(){
              userBusiness.toStatis();
            },
            toLotteryLimited(){
                userBusiness.toLotteryLimited();
            },
            toFklb(){
              userBusiness.toFklb();
            },
            toEmail(){
                userBusiness.toEmail();
            },
            toWyczPage(path){
                var _this = this;
                userBusiness.toWyczPage(path);
            },
            toWytxPage(path){
                userBusiness.toWytxPage(path);
            },
            toActivity(){
                userBusiness.toActivity();
            },
            toBonusDetails(){
                userBusiness.toBonusDetails();
            },
            onlineServer(){
                userBusiness.openCustomerService();
            }
        }
    }
</script>
<style scoped lang="less">
    .account-list {
        background: #ffffff;
        margin: 0 0.15rem;
        padding: 0.05rem;
    }
    .account-list ul {
        height: 0.44rem;
        margin: 0 0.06rem;
        line-height: 0.44rem;
        box-shadow: 0 -1px 0 #e8e8e8 inset;
        -webkit-box-shadow: 0 -1px 0 #e8e8e8 inset;
    }
    .levelActive{
        padding-left: 0.1rem;
        color: #2a2424;
    }
</style>