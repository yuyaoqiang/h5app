<template>
    <div>
        <div  class="account-list mt15">
            <ul class="display-flex">
                <li>支付方式:</li>
                <li class="flex-box bank-select">
                    <select  @change="change" v-model="selectMerchantId">
                        <option v-for="item in payPlatformList" :label="item.descript"
                                :value="item.id">{{item.descript}}</option>
                    </select>
                </li>
            </ul>
            <ul class="display-flex">
                <li>充值账户:</li>
                <li class="flex-box bank-select">
                    <select  v-model="inMoneyType">
                        <option  v-for="item in accountnOption"
                                 :label="item.label"
                                 :value="item.value">{{item.label}}</option>
                    </select>
                </li>
            </ul>
            <ul class="display-flex">
                <li>充值金额:</li>
                <li class="flex-box bank-input">
                    <input  v-model.trim="depositMoney" type="number"  placeholder="请输入金额"/>
                </li>
            </ul>
        </div>
        <div  class="recharge-note">最低 ¥ <span class="red">{{merchant.minlimit}}</span> 元,最高 ¥ <span class="red">{{merchant.maxlimit}}</span> 元</div>
        <div class="recharge-btn-box">
            <button type="button"  @click="submit">提交充值</button>
        </div>
    </div>
</template>

<script>
    import GetBankListApi  from  '../../assets/js/api/bankApi.js';
    import arrayUtil  from  '../../assets/js/util/arrayUtil.js';
    import apiUtil from '../../assets/js/api/common/apiUtil'
    import platformData from '../../assets/platform/main/platformData'
    import businessValidateUtil from '../../assets/js/business/common/businessValidateUtil'
    import validateUtil from '../../assets/js/util/validateUtil'
    export default {
        data () {
            return {
                payPlatformList:[],
                //wetchat:[],
                accountnOption:[
                    {value: '0',label: '钱包中心'},
                    {value: '1',label: '彩票中心'}
                ],
                inMoneyType:'0',
                selectMerchantId:"",
                depositMoney:null,
                merchant:{}
            }
        },
        created(){
            let _this =this;
            GetBankListApi.getUserBankInfo( (res)=>{
                var  mhList = res.data.baoFooMerchant;
                var payPlatformList =new Array();
                if(arrayUtil.isEmpty(mhList)==false){
                    arrayUtil.forEach(mhList,(item,i)=>{
                        if(item.type != 'wy'){
                            var  bankList = item.bank;
                            if(arrayUtil.isEmpty(bankList)) return;

                            item.bank=bankList[0];
                            payPlatformList.push(item);
                        }
                    });
                }

                this.payPlatformList=payPlatformList;

                if(payPlatformList.length>0){
                    _this.merchant=payPlatformList[0];
                    _this.selectMerchantId=_this.merchant.id;
                }

            });
        },
        methods: {

            change(){
                let _this = this;
                this.merchant = arrayUtil.findFirst(_this.payPlatformList, item => {
                    return item.id == _this.selectMerchantId
                });
            },
            submit(){

                var _this=this;

                var merchant=_this.merchant;
                if(merchant == null || merchant.bank == null){
                    this.lalterWarning("请选择支付方式");
                    return;
                }

                if(this.depositMoney == "" || this.depositMoney <= 0){
                    this.lalterWarning("请输入充值金额");
                    return false;
                }

                var rechargeSetting = $L_appSetting.recharge.online;
                if(rechargeSetting.supportDecimal==false) {
                    if (validateUtil.isDecimal(_this.depositMoney) == false) {
                        this.lalterWarning("充值金额不能包含小数");
                        return false;
                    }
                }


                if(this.depositMoney < merchant.minlimit){
                    this.lalterWarning("充值金额不能小于"+merchant.minlimit+"元");
                    return false;
                }else if(this.depositMoney > merchant.maxlimit){
                    this.lalterWarning("充值金额不能大于"+merchant.maxlimit+"元");
                    return false;
                }


                let param =
                    "bankId=" + merchant.bank.id +
                    "&depositMoney="+this.depositMoney +
                    "&inMoneyType="+this.inMoneyType +
                    "&merchantType="+merchant.merchantType +
                    "&baofooId="+merchant.id;

                if(platformData.setting.code!="qj"&&platformData.setting.code!="jn"){
                    param+="&pay_page=h";
                }
                // window.location=apiUtil.buildUrl('/moneyInVerify/baofoo.mvc?'+ param);
                window.open(apiUtil.buildUrl('/moneyInVerify/baofoo.mvc?'+ param));
            },
            amountChange(){
                var _this=this;
                businessValidateUtil.moneyChangeCheck(_this.depositMoney,m=>{_this.depositMoney=m});
            },

        },
        computed :{

        },
        components: {}
    }
</script>
