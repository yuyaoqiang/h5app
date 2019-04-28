<template>
    <div>
        <section>
            <div  class="account-list mt15">
                <ul class="display-flex">
                    <li>充值分类:</li>
                    <li  class="flex-box bank-select">
                        <select @change="change" v-model="selectMerchantId">
                            <option v-for="item in payPlatformList"
                                    :label="item.descript"
                                    :value="item.id">{{item.descript}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="display-flex">
                    <li>支付方式:</li>
                    <li  class="flex-box bank-select">
                        <select  v-model="selectBankId">
                            <option  v-for="item in payBankList"
                                     :label="item.name"
                                     :value="item.id">{{item.name}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="display-flex">
                    <li>充值账户:</li>
                    <li  class="flex-box bank-select">
                        <select  v-model="inMoneyType">
                            <option v-for="item in accountnOption"
                                    :label="item.label"
                                    :value="item.value">{{item.label}}</option>
                        </select>
                    </li>
                </ul>
                <ul  class="display-flex">
                    <li>充值金额:</li>
                    <li class="flex-box bank-input">
                        <input  v-model.trim="depositMoney" type="number"  placeholder="请输入金额"/>
                    </li>
                </ul>
            </div>
            <div class="recharge-note">最低 ¥ <span class="red">{{merchant.minlimit}}</span> 元,最高 ¥ <span class="red">{{merchant.maxlimit}}</span> 元</div>

            <div class="recharge-btn-box">
                <button type="button"  @click="submit">提交充值</button>
            </div>
        </section>
        <form id="rechargeForm" action="/moneyInVerify/baofoo.mvc" target="_blank" method="get" style="display: none">
            <input type="hidden" v-model="selectMerchantId" name="baofooId">
            <input type="hidden" v-model="selectBankId" name="bankId">
            <input type="hidden" v-model="depositMoney" name="depositMoney">
            <input type="hidden" v-model="inMoneyType" name="inMoneyType">
            <input type="hidden" v-model="merchant.merchantType" name="merchantType">
            <input type="hidden" v-model="merchant.id" name="baofooId">
        </form>
    </div>
</template>

<script>
    import GetBankListApi  from  '../../assets/js/api/bankApi.js';
    import arrayUtil  from  '../../assets/js/util/arrayUtil.js';
    import apiUtil from '../../assets/js/api/common/apiUtil'
    import platformData from '../../assets/platform/main/platformData'
    export default {
        data () {
            return {
                payPlatformList:[],
                payBankList:[],
                accountnOption:[
                    {value: '0',label: '钱包中心'},
                    {value: '1',label: '彩票中心'}
                ],
                inMoneyType:'0',
                selectMerchantId:"",
                selectBankId:"",
                depositMoney:null,
                merchant:{
                    bank:[]
                }
            }
        },
        created(){
            let _this =this;
            GetBankListApi.getUserBankInfo( (res)=>{
                var  mhList = res.data.baoFooMerchant;
                if(arrayUtil.isEmpty(mhList)==false){
                    arrayUtil.forEach(mhList,(item,i)=>{
                        if(item.type == 'wy'){
                            var  bankList = item.bank;
                            if(arrayUtil.isEmpty(bankList)) return;
                            _this.payPlatformList.push(item);
                        }
                    });
                }
                if(_this.payPlatformList.length>0){
                    _this.merchant =_this.payPlatformList[0];
                    _this.selectMerchantId= _this.merchant.id;
                    _this.payBankList =  _this.merchant.bank;
                    _this.selectBankId = _this.payBankList[0].id;
                }

            });
        },
        methods: {

            change(){
                let _this = this;
                this.merchant = arrayUtil.findFirst(_this.payPlatformList, item => {
                    _this.payBankList =item.bank;
                    _this.selectBankId =_this.payBankList[0].id;
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

                if(/^[+]{0,1}(\d+)$/.test(this.depositMoney)==false){
                    this.lalterWarning("请输入有效的充值金额");
                    return false;
                }


              
                if(this.depositMoney < merchant.minlimit){
                    this.lalterWarning("输入的金额不能小于"+merchant.minlimit+"元，请重新输入！");
                    return false;
                }else if(this.depositMoney > merchant.maxlimit){
                    this.lalterWarning("输入的金额不能大于"+merchant.maxlimit+"元，请重新输入！");
                    return false;
                }


                $("#rechargeForm").submit();
            },

        },
        computed :{
          
        },
        components: {}
    }
</script>
<style>

</style>
