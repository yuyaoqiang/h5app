<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>添加银行卡</h1>
            </header>
        </div>
        
        <div class="bank-msg" style="padding-top:0.5rem">
            <p><b>!</b>新增加的银行卡需要 <span class="red">{{withdrawHours}}</span> 个小时后才能提款</p>
        </div>
        <div class="recording-height" style="padding-top:0.3rem">
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li class="bank-title">开户名:</li>
                    <li class="flex-box bank-input"><input type="text" placeholder="请输入开户名" v-model.trim="bankCard.accountname"></li>
                </ul>
                <ul class="display-flex">
                    <li class="bank-title">支行名称:</li>
                    <li class="flex-box bank-input"><input type="text" placeholder="请输入支行名称" v-model.trim="bankCard.branchname"></li>
                </ul>
            </div>
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li class="bank-title">选择银行:</li>
                    <li class="flex-box bank-select">
                        <select  v-model="bankCard.bankname">
                            <option  v-for="option in listPlatformBank.listPlatformBank"  :label="option.bankname" :value="option.bankname">{{ option.bankname }}</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li class="bank-title">银行卡号:</li>
                    <li class="flex-box bank-input"><input type="number" v-model.trim="bankCard.accountno" placeholder="银行卡号"></li>
                </ul>
            </div>
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li>确认银行卡号:</li>
                    <li class="flex-box bank-input"><input type="number" v-model.trim="bankCard.validate_accountNo" placeholder="确认银行卡号"></li>
                </ul>
            </div>
            <div class="add-back-btn">
                <button type="button"  @click="addCard">确认</button>
            </div>
        </div>
    </div>
</template>
<script>
    
    import stringUtil from  "../../assets/js/util/stringUtil"
    import GetBankListApi from "../../assets/js/api/bankApi";
    import validateUtil from '../../assets/js/util/validateUtil'

    export default {
        data () {
            return {
                bankCard: {
                    accountname: '',
                    branchname: '',
                    accountno: '',
                    validate_accountNo:'',
                    bankname: '',

                },
                listPlatformBank: {},
                withdrawHours:0
            }
        },
        created() {
            this.withdrawHours=this.$route.query.withdrawHours;
            var _this = this
            GetBankListApi.initOne( function(res){
                _this.listPlatformBank = res.data;
            });
        },
        methods: {
            goback: function () {
                this.$router.go(-1);
            },
            addCard: function () {
                var _this = this;


                if(stringUtil.isBlank(this.bankCard.accountname )){
                    this.lalterWarning("请输入开户名称");
                    return false
                }

                if(validateUtil.isChineseName(this.bankCard.accountname.trim())==false){
                    this.lalterWarning("开户名称只允许输入中文、字母、点符号");
                    return false
                }

                if(this.bankCard.accountname.trim().length>20){
                    this.lalterWarning("开户名称长度不能超过20位");
                    return false
                }

                if (stringUtil.isBlank(this.bankCard.branchname)){
                    this.lalterWarning("请输入支行名称");
                    return false
                }

                if(validateUtil.isChAz09(this.bankCard.branchname.trim())==false){
                    this.lalterWarning("支行名称只允许输入中文、字母、数字");
                    return false
                }

                if(stringUtil.isBlank(this.bankCard.bankname)){
                    this.lalterWarning("请选择银行");
                    return false
                }

                if (stringUtil.isBlank(this.bankCard.accountno)){
                    this.lalterWarning("请输入银行卡号");

                    return false
                }
                if (stringUtil.isBlank(this.bankCard.validate_accountNo)){
                    this.lalterWarning("请输入确认银行卡号");
                    return false
                }

                if(this.bankCard.accountno.trim() != this.bankCard.validate_accountNo.trim()){
                    this.lalterWarning("两次输入的银行卡号不一致");
                    return false
                }

                var params = {
                    "accountname" : this.bankCard.accountname.trim() ,
                    "branchname" : this.bankCard.branchname.trim() ,
                    "accountno" : this.bankCard.accountno.trim() ,
                    "validate_accountNo" : this.bankCard.validate_accountNo.trim() ,
                    "bankname" : this.bankCard.bankname
                };
                this.lconfirm('您是否确定添加该银行卡？', null, () => {
                    GetBankListApi.addBankCard(params,function(res){
                        if(res.code==200){
                            _this.lalterSuccess(res.msg);
                            _this.$router.push('/bankControl');
                        }else{
                            _this.lalterError(res.msg);
                            _this.bankCard.accountno = '';
                            _this.bankCard.validate_accountNo = '';
                        }
                    });
                });
            }
        }
    }
</script>
<style scoped>

</style>
