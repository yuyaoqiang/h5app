<template>
    <div>
        <div class="account-list mt15" v-if="!isScanCode">
            <ul class="display-flex">
                <li class="bank-title">收款人:</li>
                <li class="flex-box pl15">{{bankInfo.accountname}}</li>
            </ul>
            <ul class="display-flex">
                <li class="bank-title">收款卡号:</li>
                <li class="flex-box pl15">{{bankInfo.accountno}}</li>
            </ul>
            <ul class="display-flex">
                <li class="bank-title">支行名称:</li>
                <li class="flex-box pl15">{{bankInfo.branchname}}</li>
            </ul>
        </div>

        <!--  <div class="recharge-img" v-if="isScanCode && !isAllowRemote">
              <img :src="require('../../assets/platform/main/images/pay/'+payName+'.png')+'?t='+new Date().getTime()">
          </div>

          <div class="recharge-img" v-if="isScanCode && isAllowRemote">
              <img :src="payQrUrl.serverUrl+payQrUrl.context.imgurl+'?t='+new Date().getTime()"/>
          </div>-->

        <div class="recharge-img" v-if="isScanCode && isAllowRemote!=true">
            <img :src="scanImgLocalPath+'?t='+imgParam" onerror="this.src='/h5app/static/img/error-qrcode.png'">
        </div>
        <div class="recharge-img" v-if="isScanCode && isAllowRemote==true">
            <img v-if="payQrUrl.inited==true" :src="payQrUrl.serverUrl+payQrUrl.context.imgurl+'?t='+imgParam"/>
            <span v-if="payQrUrl.inited==false"  style="font-size: 0.1rem">二维码正在加载...</span>
            <p v-if="isTjhy" style="color: red;margin-top: 0.05rem;">{{bankInfo.markName}}转账备注会员号才能秒到账</p>
        </div>

        <div class="account-list mt15">
            <ul class="display-flex">
                <li>支付银行卡选择:</li>
                <li class="flex-box bank-select">
                    <select v-model="platformBank" @change="getBankInfo">
                        <option v-for="item in bankList.platfromLineBank" :label="item.bankname" :value="item.id">
                            {{item.bankname}}
                        </option>
                    </select>
                </li>
            </ul>
            <ul class="display-flex" v-if="!isScanCode">
                <li>账户名:</li>
                <li class="flex-box bank-input">
                    <input type="text" placeholder="请输入账户名" v-model.trim="accoutNo"/>
                </li>
            </ul>
            <ul class="display-flex" v-if="isScanCode">
                <li>{{isTjhy?'备注信息:':'充值单号:'}}</li>
                <li class="flex-box bank-input">
                    <input type="text" :placeholder="tjhyInfo" v-model.trim="accoutNo" @keyup="accoutNoLimint"/>
                </li>
            </ul>
            <ul class="display-flex">
                <li>充值金额:</li> 
                <li class="flex-box bank-input" v-if="bankInfo.bankname == '线下微信'">
                    <input type="number" placeholder="请输入充值金额" v-model.trim="money" @blur="changeRandom()"/>
                </li>
                <li class="flex-box bank-input" v-else><input type="number" placeholder="请输入充值金额" v-model.trim="money"/></li>
            </ul>
        </div>

        <div class="recharge-note">最低 ¥ <span class="red">{{minlimit}}</span>
            元,最高 ¥ <span class="red">{{maxlimit}}</span> 元
        </div>

        <dl class="recharge-describe">
            <dd v-if="bankInfo.bankname == '线下微信'">请确认填写姓名与您的付款姓名一致,否则会无法自动到账,充值金额一定要带2位小数点才会及时到账，否则无法及时到账，正确充值金额方式，例如：
                <span class="red">120.05元</span>，<span class="red">988.02元</span></dd>
            <dd v-else>请确认填写姓名与您的付款姓名一致,否则会无法自动到账</dd>
        </dl>

        <div class="recharge-btn-box">
            <button type="button" @click="recharge(isScanCode)">发起申请</button>
        </div>

        <dl class="recharge-step" v-if="bankInfo.mark == 'zfb' || bankInfo.mark=='wx'">
            <dt><b>充值步骤：</b></dt>
            <dd>
                <p>第一步：提交申请</p>
                <p>第二步：登录【手机{{bankInfo.markName}}】</p>
                <p>第三步：点击【转账】</p>
                <p>第四步：点击【转账到银行卡】</p>
                <p>第五步：根据以上信息按步骤完成充值。</p>
            </dd>
        </dl>
        <dl class="recharge-step" v-if="bankInfo.mark == 'xxcz'">
            <dt><b>充值步骤：</b></dt>
            <dd>
                <p>1.点击“我要充值”跳转网银登录 » 2.登录网银账号 » 3.复制收款人与金额信息进入转账 » 4.提交审核信息 » 5.转账成功后，可在充值记录中查看</p>
            </dd>
        </dl>
    </div>
</template>

<script>
    import GetBankListApi  from  '../../assets/js/api/bankApi.js';
    import validateUtil  from  '../../assets/js/util/validateUtil';
    import stringUtil  from  '../../assets/js/util/stringUtil';
    import userInfoApi from '../../assets/js/api/userInfo';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import numberUtil from '../../assets/js/util/numberUtil';
    import platformData from '../../assets/platform/main/platformData';
    import businessValidateUtil from '../../assets/js/business/common/businessValidateUtil';
    export default {
        data () {
            return {
                bankList: {},
                money: null,
                platformBank: null,
                bankInfo: {
                    bank: {minlimit: 0, maxlimit: 0},
                    markName:'',
                    mark:''
                },
                accoutNo: '',
                payName: '',

                isScanCode: false,
                isAllowRemote: false,
                payQrUrl: {
                    inited: false,
                    serverUrl: '',
                    context: null,
                },
                imgParam: "",
                scanImgLocalPath: null,
                minlimit: null,
                maxlimit: null,
                tjhyInfo:'',
                isTjhy:false
            }
        },
        created(){

            let _this = this;
            _this.isAllowRemote = platformData.setting.allowRemoteUrl == null ? false : platformData.setting.allowRemoteUrl;

            GetBankListApi.getUserBankInfo((res) => {
                _this.bankList = res.data;
            if (_this.bankList.platfromLineBank.length > 0) {
                arrayUtil.forEach(_this.bankList.platfromLineBank, (item) => {
                    item.context = '';
            })
                _this.getBankInfo();
            }
        })
        },
        computed: {},
        methods: {
            accoutNoLimint(){
                let pattern = new RegExp("[`~!@#$^&*()=|_%+\"{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                let accoutNo="";
                for (let i = 0; i < this.accoutNo.length; i++) {
                    accoutNo+=this.accoutNo.substr(i, 1).replace(pattern, '');
                }
                this.accoutNo=accoutNo;
                return this.accoutNo;
            },
            goback: function () {
                this.$router.push('/account');
            },
            getBankInfo: function () {
                let _this = this;
                this.money = null;
                this.accoutNo = null;
                this.tjhyInfo ='请输入您充值订单号后六位';
                _this.isTjhy = false;
                _this.platformBank = _this.platformBank == null ? _this.bankList.platfromLineBank[0].id : _this.platformBank;

                for (var i = 0; i < this.bankList.platfromLineBank.length; i++) {

                    if (this.bankList.platfromLineBank[i].id == this.platformBank) {
                        _this.bankInfo = _this.bankList.platfromLineBank[i];
                        _this.minlimit = _this.bankInfo.minmoney;
                        _this.maxlimit = _this.bankInfo.maxmoney;
                        if (_this.bankInfo.bank.name.indexOf("扫码") == -1 && _this.bankInfo.bank.name.indexOf("添加好友") == -1) {
                            _this.isScanCode = false;
                            _this.bankInfo.mark = 'xxcz'
                        } else {

                            _this.payName = _this.bankInfo.bank.name;
                            _this.imgParam  = new Date().getTime();
                            _this.payQrUrl.context = _this.bankInfo.context;
                            _this.isScanCode = true;
                            _this.payQrUrl.inited = false;
                            if (_this.isAllowRemote == true) {
                                userInfoApi.getUrlAddrs({type: "2"}, (res) => {
                                    if (res.code == 200) {
                                    var data = res.data;
                                    _this.payQrUrl.serverUrl = data.serverUrl;
                                    arrayUtil.forEach(data.list, (item) => {
                                        arrayUtil.findFirst(_this.bankList.platfromLineBank, (i) => {
                                        if (item.name == i.bank.name) {
                                        i.context = item;
                                    }
                                })
                                })
                                    _this.payQrUrl.context = _this.bankInfo.context;
                                    _this.payQrUrl.inited = true;
                                }
                            });
                            }
                        }

                        if(_this.bankInfo.bank.name.indexOf('支付宝')>-1 && _this.bankInfo.bank.name.indexOf('添加好友')>-1){
                            _this.isTjhy = true;
                            _this.bankInfo.markName = '支付宝'
                            _this.tjhyInfo = `输入您的${_this.bankInfo.markName}昵称或账号`;
                        }
                        if(_this.bankInfo.bank.name.indexOf('微信')>-1 && _this.bankInfo.bank.name.indexOf('添加好友')>-1){
                            _this.isTjhy = true;
                            _this.bankInfo.markName = '微信';
                            _this.tjhyInfo = `输入您的${_this.bankInfo.markName}昵称或账号`;
                        }
                        if(_this.bankInfo.bankname=='支付宝'){
                            _this.bankInfo.markName = '支付宝'
                            _this.bankInfo.mark = 'zfb'
                        }
                        if(_this.bankInfo.bankname=='微信充值'){
                            _this.bankInfo.markName = '微信'
                            _this.bankInfo.mark = 'wx'
                        }
                        if (_this.isAllowRemote == false) {
                            if (platformData.setting.code == "qj" || platformData.setting.code == "jn") {
                                if (_this.bankInfo.icon) {
                                    var prefix = _this.bankInfo.icon.indexOf("/") == 0 ? "" : "/";
                                    _this.scanImgLocalPath = prefix + _this.bankInfo.icon;
                                }
                            } else {
                                _this.scanImgLocalPath = '/pcapp/static/img/pay/' + _this.bankInfo.bank.name + '.png';
                            }
                        }
                    }
                }
            },
            isZfb(bank){
                return bank.code=="ALPAY" || bank.name=="支付宝";
            },
            isWx(bank){
                return bank.code=="xxwxcz" || bank.name=="线下微信";
            },
            rechargeScan(){
                var _this = this;
                var accoutNo = _this.accoutNo;
                if(this.isTjhy){
                    if (stringUtil.isBlank(accoutNo)) {
                        this.lalterWarning(`输入您的${_this.bankInfo.markName}昵称或账号`);
                        return false;
                    }
                }else {
                    if (stringUtil.isBlank(accoutNo)) {
                        this.lalterWarning("充值单号不能为空");
                        return false;
                    }else if (accoutNo.length>16) {
                        this.lalterWarning("充值单号不能超过十六位");
                        return false;
                    }else if (accoutNo.length<4) {
                        this.lalterWarning("充值单号不能少于四位");
                        return false;
                    }
                }


                if (stringUtil.isBlank(_this.money)) {
                    this.lalterWarning("请输入充值金额");
                    return false;
                }

                var rechargeSetting = $L_appSetting.recharge.scan;
                if (rechargeSetting.supportDecimal == false) {
                    if (validateUtil.isDecimal(_this.money) == false) {
                        this.lalterWarning("充值金额不能包含小数");
                        return false;
                    }
                }

                if (_this.money / 1 < _this.minlimit) {
                    this.lalterWarning("充值金额不能小于" + _this.minlimit + "元");
                    return false;
                }

                if (_this.money / 1 > _this.maxlimit) {
                    this.lalterWarning("充值金额不能大于" + _this.maxlimit + "元");
                    return false;
                }
                var bank = _this.platformBank;
                var params = {
                    bank: bank,
                    depositMoney: this.money,
                    accoutNo: this.accoutNo,
                }
                GetBankListApi.lotteryVerify(params, function (res) {
                    if (res.code == 200) {
                        _this.lalterSuccess(res.msg);
                        _this.accoutNo = "";
                        _this.money = ""
                        return
                    } else {
                        _this.lalterError(res.msg);
                        return
                    }
                })

            },
            recharge: function (flag) {
                let _this = this;
                //判断是否是微信支付宝充值
                if (flag) {
                    _this.rechargeScan();
                    return;
                }
                //线下充值
                if (_this.platformBank == '') {
                    this.lalterWarning("请选择支付银行");
                    return false;
                }
                if (stringUtil.isBlank(_this.accoutNo)) {
                    this.lalterWarning("请输入账户名");
                    return false;
                }
                var accoutNo = _this.accoutNo.trim();

                /*   if (validateUtil.isChineseName(accoutNo) == false) {
                 this.lalterWarning("账户名只允许输入中文、字母、点符号");
                 return false;
                 }*/


                if (stringUtil.isBlank(_this.money)) {
                    this.lalterWarning("请输入充值金额");
                    return false;
                }

                var rechargeSetting = $L_appSetting.recharge.offline;
                if (rechargeSetting.supportDecimal == false) {
                    if (validateUtil.isDecimal(_this.money) == false) {
                        this.lalterWarning("充值金额不能包含小数");
                        return false;
                    }
                }

                if (/^[+]{0,1}(\d+)$/.test(this.money) == false  && _this.bankInfo.bankname != '线下微信' && _this.bankInfo.bankname != '支付宝') {
                    this.lalterWarning("请输入有效的充值金额");
                    return false;
                }

                if (_this.money / 1 < _this.minlimit) {
                    this.lalterWarning("充值金额不能小于" + _this.minlimit + "元");
                    return false;
                }

                if (_this.money / 1 > _this.maxlimit) {
                    this.lalterWarning("充值金额不能大于" + _this.maxlimit + "元");
                    return false;
                }
                var flag = numberUtil.isDecimalTwo(_this.money/1);
                if(_this.bankInfo.bankname == '线下微信' && !flag){
                    this.lalterWarning("充值金额要包含2位小数，且最后位小数不为0");
                    return false;
                }
                this.money = Number(this.money).toFixed(2);
                var param = {bank: _this.platformBank, depositMoney: _this.money, accoutNo: accoutNo};

                if(this.bankInfo.bankname == '线下微信'){
                    let strMessage = '充值金额为：'+ Number(this.money).toFixed(2);
                    _this.lconfirm(strMessage, null,function () {
                        _this.submitRecharge(param)
                    })
                }else{
                    _this.submitRecharge(param)
                }
                
            },
            submitRecharge(param){
                let _this = this;
                GetBankListApi.lotteryVerify(param, function (res) {
                    if (res.code == 200) {
                        _this.lalterSuccess(res.msg);
                    } else {
                        _this.lalterWarning(res.msg);
                    }
                    _this.accoutNo = '';
                    _this.money = '';
                });
            },
            amountChange(){
                var _this = this;
                businessValidateUtil.moneyChangeCheck(_this.money, m => {
                    _this.money = m
            });
            },
            isChn(str){
                var reg = /^[\u4E00-\u9FA5]+$/;
                if (!reg.test(str)) {
                    return false;
                }
                return true;
            },
            changeRandom(){
                var flag = numberUtil.isDecimalTwo(this.money/1);
                if(!this.money){
                    return false
                }
                if (this.money / 1 < this.minlimit) {
                    this.lalterWarning("充值金额不能小于" + this.minlimit + "元");
                    return false;
                }

                if (this.money / 1 > this.maxlimit) {
                    this.lalterWarning("充值金额不能大于" + this.maxlimit + "元");
                    return false;
                }
                if(this.bankInfo.bankname == '线下微信' && !flag){
                    this.money = (parseInt(this.money)+ Number(Math.random().toFixed(2))).toFixed(2);
                    if(!numberUtil.isDecimalTwo(this.money/1)){
                        this.money = (Number(this.money) + 0.01).toFixed(2);
                    }
                }
            }
        }
    }
</script>
<style>

</style>
