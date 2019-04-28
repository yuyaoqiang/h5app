<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>{{titleBank}} </h1>

                <div  class="header-add" @click="addBankcard">
                    +
                </div>
                <!--<router-link tag="div" v-if="add"-->
                            <!--:to="{path:'addBankcard',query:{withdrawHours:listPlatformBank.addBankCardNHWithdraw}}">-->

                <!--</router-link>-->
                <div @click="openOnlineService" class="service">
                <!-- <img src="../../assets/images/kf.png">-->
                    <i class="iconfont icon-zhanghu_kefu"></i>
                </div>
            </header>
        </div>
       

        <section class="report-height" v-show="showBank==true">
            <div class="bank-main">
                <div v-if="listPlatformBank.userBankList != null" v-for="option in listPlatformBank.userBankList" class="bank-content">
                    <h2>{{option.bankname }}</h2>
                    <p>储蓄卡</p>
                    <h3>{{option.accountno}}</h3>
                    <div class="bank-lock">
                        <img src="../../assets/images/icon_lock.png" v-if="locked">
                    </div>
                    <div class="xiugai" v-if="locked==false&&isUpdateCard" @click="showUpdateCard(option)">
                        <img src="../../assets/images/edit_icon.png"/>
                    </div>
                </div>

                <div v-if='init==true&&listPlatformBank.userBankList != null && listPlatformBank.userBankList.length < listPlatformBank.addBankCardMaxNum' class="bank-add">
                    <div @click="addBankcard">
                        + 添加银行卡
                    </div>
                </div>
                <ul class="bank-note">
                    <li>1.银行卡添加成功后，平台任何区域都不会出现您的完整银行信息</li>
                    <li>2.每个平台账号最多 <span class="red">添加 {{listPlatformBank.addBankCardMaxNum}} 张银行卡</span></li>
                    <li>3.一个账号只能添加同一个开户人姓名的银行卡</li>
                    <li>4.添加/修改/锁定银行卡信息后， <span class="green">需要 {{listPlatformBank.addBankCardNHWithdraw}} 小时</span> 以上方可提现</li>
                    <li>5.必须锁定银行卡后方可提现</li>
                    <li>6.添加新银行卡需用户联系客服解锁已绑定的银行卡。</li>
                </ul>
                <div class="bank-btn-box">
                    <button type="button" v-if='listPlatformBank.userBankList.length>=1' @click="lockBank"
                            :class="{ 'locking': locked==false, 'unactive': locked }">{{locked==false?'锁定银行卡':'银行卡已锁定'}}</button>
                </div>
            </div>
        </section>
        <section class="report-height" v-if="showBank==false">
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li class="bank-title">选择银行:</li>
                    <li class="flex-box bank-select">
                        <select  v-model="bankCard.bankname">
                            <option :value="bankCard.bankname">{{bankCard.bankname}}</option>
                            <option  v-for="option in listPlatformBank.listPlatformBank"  :label="option.bankname" :value="option.bankname">{{ option.bankname }}</option>
                        </select>
                    </li>
                </ul>
                <ul class="display-flex">
                    <li class="bank-title">支行名称:</li>
                    <li class="flex-box bank-input"><input type="text"  v-model.trim="bankCard.branchname"></li>
                </ul>
            </div>
   
            <div class="account-list mt15">
                <ul class="display-flex">
                    <li class="bank-title">银行卡号:</li>
                    <li class="flex-box bank-input"><input type="number" v-model.trim="bankCard.accountno" placeholder="银行卡号"></li>
                </ul>
                <ul class="display-flex">
                    <li>确认银行卡号:</li>
                    <li class="flex-box bank-input"><input type="number" v-model.trim="bankCard.validate_accountNo" placeholder="确认银行卡号"></li>
                </ul>
            </div>
           
            <div class="add-back-btn">
                <button type="button"  @click="upDateCard">确认</button>
            </div>
        </section>
    </div>
</template>

<script>
    import GetBankListApi from '../../assets/js/api/bankApi'
    import securityApi from '../../assets/js/api/securityApi'
    import arrayUtil from '../../assets/js/util/arrayUtil'
    import userBusiness from '../../assets/js/business/user/userBusiness'
    import stringUtil from  "../../assets/js/util/stringUtil"
    import validateUtil from '../../assets/js/util/validateUtil'
    export default {
        data () {
            return {
                listPlatformBank: {
                    userBankList:[],
                    addBankCardMaxNum:0,
                    addBankCardNHWithdraw:0,
                },
                init:false,
                locked:true,
                add:false,

                isUpdateCard:false,
                showBank:true,
                bankCard:{},
                titleBank:'银行卡管理'
            }
        },
        methods: {
            goback: function () {
                if(this.showBank){
                    this.$router.push("/setting");
                }else{
                    this.showBank = true;
                }
            },
            addBankcard(){
                if (this.locked){
                    return this.lalterWarning("添加新银行卡需用户联系客服解锁已绑定的银行卡!")
                }
                this.$router.push({path:'addBankcard'});
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },
            initBank(){
                var _this = this;
                GetBankListApi.initOne( (res) => {
                    if(res.code==200){
                        var userBankList = res.data.userBankList;
                        if(res.data.ableToModifyUserBank=="1"){
                            _this.isUpdateCard = true;
                        }
                        if(userBankList && userBankList.length>0){

                            for (var i=0;i<userBankList.length;i++){
                                var item=userBankList[i];
                                if(item.locked == "1"){
                                    _this.locked = true;
                                    _this.add=false;
                                    break;
                                }else {
                                    _this.locked = false;
                                    _this.add=true;
                                }
                            }
                        }else {
                            _this.locked = false;
                            _this.add = true;
                        }
                        _this.listPlatformBank=res.data;
                        _this.init=true;
                    }else{
                            _this.lalterError(res.msg)
                        }
                    });
            },
            lockBank(){
                let _this = this;
                if(this.locked==false){
                    _this.lconfirm('确定锁定银行卡？',null,() =>{
                        GetBankListApi.lockBankCard((res)=>{
                            if(res.code == 200){
                                _this.lalterSuccess(res.msg);
                                  _this.locked=true;
                                  _this.add=false;
                            }else{
                                _this.lalterWarning(res.msg);
                            }
                        })
                    })
                }else{
                    if(_this.add) return;
                   _this.lalterWarning('银行卡已经锁定，请联系客服解锁');
                }
            },
            showUpdateCard(item){
                if(!item) return;
                this.bankCard = {};
                for(let key in item){
                    this.bankCard[key] = item[key]
                }
                this.bankCard.accountno = '';
                this.bankCard.validate_accountNo = '';
                this.showBank = false;
            },
            upDateCard(){
                var _this = this;
                
                if(stringUtil.isBlank(this.bankCard.bankname)){
                    this.lalterWarning("请选择银行");
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
                    "branchname" : this.bankCard.branchname.trim() ,
                    "accountno" : this.bankCard.accountno.trim() ,
                    "bankname" : this.bankCard.bankname,
                    "id": this.bankCard.id
                };
                console.log(this.bankCard,666);
                this.lconfirm('您是否确定修改该银行卡？', null, () => {
                    GetBankListApi.updatedBank(params,function(res){
                        if(res.code==200){
                            _this.bankCard = {};
                            _this.lalterSuccess(res.msg);
                            _this.initBank();
                            _this.showBank = true;
                        }else{
                            _this.lalterWarning(res.msg);
                        }
                    });
                });
            
            }
        },
        created() {
            this.initBank();
        },
        watch:{
            showBank:function(a,b){
                if(a){
                    this.titleBank = '银行卡管理'
                }else{
                    this.titleBank = '修改银行卡'
                }
            }
        }
    }
</script>


<style scoped>
    .xiugai{
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        right: 0.5rem;
        top:0.15rem;
    }
    .xiugai img{
        width: 0.25rem;
        display: block;
    }
    
</style>
