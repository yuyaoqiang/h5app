<template>

        <div  class="transElement">
            <section class="display-vertical">
                <header class="pr header-box">
                    <div class="header-arrow-box" id="back_icon" @click="goback">
                        <i class="el-icon-arrow-left back-icon"></i>
                    </div>
                    <h1 class="header-title">提现</h1>
                    <img src="../../assets/images/zjmx.png">
                </header>
                <section class="activity-nav-box">
                    <p></p>
                </section>
                <section class="pocket">
                    <p>钱包中心：<img src="../../assets/images/pocket_ico.png"><span class="red">{{init.BE.accountbalance}}</span></p>
                </section>
                <section class="flex-box pocket-main">
                    <ul class="pocket-content  clearfix" v-for="bank in init.UB">
                        <label>
                        <li @click="openBottomSheet">
                            <div class="yh fl"><img src="../../assets/images/gh_ico.png"></div>
                            <div class="info fl">
                                <p class="title">{{bank.bankname}}</p>
                                <p>{{bank.accountname | truncate("1","**")}}</p>
                                <p>{{bank.accountno}}</p>
                                <p>绑定时间：{{bank.adddt | time}}</p>
                            </div>
                            <div class="circle fr"><el-radio class="radio" :nativeValue="bank.id" v-model="bankId" name="bankno"></el-radio></div>
                            <!--<mu-radio   :nativeValue="bank.id" v-model="bankId" name="bankno" /><br/>-->
                        </li>
                        </label>
                    </ul>
                </section>
            </section>
            <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                <section class="tx pr">
                  <!--  <div class="error"><img src="../../assets/images/error_ico.png"></div>-->
                    <div class="tx-info">
                        <p>可提取金额：{{init.BE.accountbalance}}元</p>
                        <form>
                            <p>提取金额:&nbsp;<input type="text" v-model="amount"></p>
                            <p>资金密码:&nbsp;<input type="password" v-model="password"></p>
                            <p>账户名称:&nbsp;<input type="text" v-model="accountname"></p>
                        </form>
                    </div>
                    <a href="javascript:;" id="click"><div class="sure1" @click="tixian">确认</div></a>
                </section>
            </mu-bottom-sheet>
            <div id="goodcover"></div>
            <div id="code">
                <img src="../../assets/images/fail.png">
                <p class="fail">提现失败</p>
                <p class="wait">系统处理失败，请稍后再试</p>
                <button type="button" id="closebt">返回操作</button>
            </div>
        </div>

</template>

<script>
//    import GetBankListApi from "../../api/bankApi.js"
    export default {
        data () {
            return {
//                init: {},
//                bankId: '',
//                accountname: '',
//                amount: '',
//                password: '',
//                bottomSheet: false
            }
        },
        created() {
//            let _this = this;
//            GetBankListApi.init( (res) => {
//                _this.init = res.data;
//            });


        },
        methods: {
            goback: function(){
                this.$router.go(-1);
            },
//            closeBottomSheet () {
//                this.bottomSheet = false
//            },
//            openBottomSheet () {
//                this.bottomSheet = true
//            },
//            tixian: function(){
//                var _this = this;
//                var params = {
//                    bank: _this.bankId,
//                    accountname: _this.accountname,
//                    amount: _this.amount,
//                    password: _this.password
//                }
//                GetBankListApi.take(params, (res) => {
//                    alert(res.msg);
//                    if (res.code == 200 ){
//                        this.bottomSheet = false
//                    }
//                })
//            }
        }
    }
</script>


<style>

</style>
