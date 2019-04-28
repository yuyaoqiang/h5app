<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>提现</h1>
            </header>
            <section class="bank-msg">
                可提现金额: <span class="red"> ¥ {{init.BE.accountbalance | fixedMoney}}</span>
            </section>
        </div>
        
        <section class="recording-height">
            <section class="withdraw-bank">
                <div class="bank-content pr" v-for="bank in init.UB">
                    <h2>{{bank.bankname}}</h2>
                    <h3>{{bank.accountno}}</h3>
                    <p>绑定时间：{{bank.adddt | time}}</p>
                    <div class="withdraw-select">
                        <input type="radio" :value="bank.id" v-model="bankId" name="bankno" class="withdraw-radio"/>
                    </div>
                </div>
            </section>
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li>提现金额:</li>
                    <li class="flex-box bank-input"><input  v-model.trim="amount" placeholder="请输入提现金额" type="number"/></li>
                </ul>
                <ul class="display-flex">
                    <li>资金密码:</li>
                    <li class="flex-box bank-input"><input  v-model.trim="password" placeholder="请输入资金密码" type="password"/></li>
                </ul>
                <ul class="display-flex">
                    <li>您的姓名:</li>
                    <li class="flex-box bank-input"><input  v-model.trim="accountname" placeholder="请输入您的姓名" type="text"/></li>
                </ul>
            </div>

            <div class="added-btn-box">
                <button type="button" @click="tixian">确认</button>
            </div>
        </section>
    </div>
</template>

<script>
    import GetBankListApi from "../../assets/js/api/bankApi.js"
    import arrayUtil from  "../../assets/js/util/arrayUtil"
    import validateUtil from  "../../assets/js/util/validateUtil"
    import stringUtil from  "../../assets/js/util/stringUtil"
    import userBusiness from  "../../assets/js/business/user/userBusiness"
    export default {
        data () {
            return {
                init: {
                    BE:{}
                },
                bankId: '',
                accountname: '',
                amount: null,
                password: '',
                user:''
            }
        },
        created() {
            let _this = this;
            userBusiness.getUser(null,user=>{
                _this.user = user;
                if(user.hasWallerPwd==false){
                    _this.lconfirm("请先设置资金密码", {
                        showCancelButton: false,
                        closeOnClickModal: false
                    }, function () {
                        _this.$router.push({
                            path: '/modifyPassword',
                            query: {setType: user.hasWallerPwd? '1' : '0'}
                        });
                    })
                    return;
                }

                _this.initBank();
            })
            ;

        },

        methods: {
            goback: function(){
                this.$router.go(-1);
            },
            initBank(){
                let  _this=this;
                GetBankListApi.init((res) => {
                    _this.init = res.data;
                    if (arrayUtil.isEmpty(res.data.UB)) {
                        _this.lconfirm("您还没绑定银行，请先绑定银行！", {
                            showCancelButton: false,
                            closeOnClickModal: false
                        }, function () {
                            _this.$router.push("bankControl");
                        })
                        return;
                    }


                    var data_ub = res.data.UB;
                    var data_be = res.data.BE;
                    var data_lock = res.data.LOCK;

                    if (data_be.state == 1) {
                        _this.lconfirm("对不起！您的银行卡处于锁定状态，暂时不能提现，锁定时间：" + res.data.NDE + "   解锁时间：" + res.data.EDE, {
                            showCancelButton: false,
                            closeOnClickModal: false
                        }, function () {
                            _this.goback();
                        })

                        return;
                    }
                    if (data_lock) {
                        _this.lconfirm("对不起！您未锁定银行卡不能提现，请到我的账户处选中绑定银行卡进行锁定！", {
                            showCancelButton: false,
                            closeOnClickModal: false
                        }, function () {
                            _this.$router.push("bankControl");
                        })
                        return;
                    }

                    if(this.user.hasWallerPwd==false){
                        this.lconfirm('您还没设置资金密码,请先设置资金密码?',{
                            showCancelButton:false,
                            closeOnClickModal:false
                        }, () => {
                            _this.$router.push({
                                path: 'modifyPassword',
                                query: {setType: _this.user.hasWallerPwd? '1' : '0'}
                            });
                        });
                        return;
                    }

                    _this.bankId = res.data.UB[0].id
                })
            },
            tixian: function(){

                if(this.amount == '' || this.amount<1 ){
                    this.lalterWarning("请输入有效金额");
                    return false;
                };

                if(this.password == ''){
                    this.lalterWarning("请输入资金密码");
                    return false;
                };

                if(stringUtil.isBlank(this.accountname)){
                    this.lalterWarning("请输入账户名称");
                    return false;
                };

                var accountname=this.accountname.trim();
                if(validateUtil.isChineseName(accountname)==false){
                    this.lalterWarning("您的姓名称只允许输入中文、字母、点符号");
                    return false
                }

                var _this = this;
                var params = {
                    bank: _this.bankId,
                    accountname: accountname,
                    amount: _this.amount,
                    password: _this.password
                }
                GetBankListApi.take(params, (res) => {
                    if (res.code == 200 ){
                        _this.password = '';
                        _this.amount = '';
                        _this.accountname = '';
                        //_this.$router.push('/account');
                       this.lalterSuccess("提现申请已提交");
                    }else{
                        this.lalterWarning(res.msg);
                    }
                })
            }
        },
        components: {}
    }
</script>