<template>
    <div>
        <header class="header-box">
            <div class="header-arrow-box" @click="goback">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h1>充值中心</h1>
        </header>
        <div class="recharge-slide-left" :class="openSlide == true?'slide_active':''">
            <ul class="recharge-type">
                <li @click="rechType(item)" v-bind:key="item.id" class="display-flex" v-for="item in rechargeList" v-if="item.list.length>0">
                  <i class="rechicon iconfont" :class="item.icon" :style="{color:item.color}"></i>  <p class="flex-box pay-flex">{{item.desc}}<span v-if="item.type =='zxwy'|| item.type  =='ysf'" class="red-color">(额外赠送1%)</span></p> <p class="report-icon"><i class="el-icon-arrow-right"></i></p>
                </li>
            </ul>
        </div>

        <div class="recharge-slide-right" :class="openSlide == true?'slide_active':''">
            <!--支付方式-->
            <mt-cell title="请选择支付通道"></mt-cell>
            <div class="account-list">
                <mt-radio
                   v-model="selectMerchantId" 
                    :options="payPlatformList">
                </mt-radio>
                <!-- <li class="flex-box " v-bind:key="item.id"  v-for="item in payPlatformList">
                    <input type="radio" name="paltformList"  @change="changeRech()" v-model="selectMerchantId"  :value="item.id" />
                </li> -->
                    <!-- <li class="flex-box bank-select">
                        <select @change="changeRech()" v-model="selectMerchantId">
                            <option v-for="item in payPlatformList" :label="item.descript"
                                    :value="item.id">{{item.descript}}
                            </option>
                        </select>
                    </li> -->
            </div>
            <section v-if="fixedNumber.length>2">
                    <ul class="pay-display-flex">
                        <li v-bind:key="index" v-for="(item,index) in fixedNumber" >
                            <mt-button :class="'btn-border-color'" :type="depositMoney==item?'primary':'default'" size="normal" @click="getFixedMoney(item)">{{item}}</mt-button>
                        </li>
                    </ul>
            </section>
            <!--在线扫码-->
            <section v-if="showType=='zxsm'">
                <div class="account-list mt15">
                    <ul class="display-flex" v-if="fixedNumber.length<=2">
                        <li>充值金额:</li>
                        <li class="flex-box bank-input">
                            <input v-model.trim="depositMoney" type="number" placeholder="请输入金额"/>
                        </li>
                    </ul>
                </div>
                <div v-if="fixedNumber.length<=2" class="recharge-note">最低 ¥ <span class="red">{{merchant.minlimit}}</span> 元,最高 ¥ <span
                        class="red">{{merchant.maxlimit}}</span> 元
                </div>
                <div class="recharge-btn-box">
                    <button type="button" @click="submit()">提交充值</button>
                </div>
            </section>
            <!--在线网银-->
            <section v-if="showType=='wy'">
                <div class="account-list mt15">
                    <ul class="display-flex">
                        <li>支付方式:</li>
                        <li class="flex-box bank-select">
                            <select v-model="selectBankId">
                                <option v-for="item in payBankList"
                                        :label="item.name"
                                        :value="item.id">{{item.name}}
                                </option>
                            </select>
                        </li>
                    </ul>
                    <ul class="display-flex">
                        <li>充值账户:</li>
                        <li class="flex-box bank-select">
                            <select v-model="inMoneyType">
                                <option v-for="item in accountnOption"
                                        :label="item.label"
                                        :value="item.value">{{item.label}}
                                </option>
                            </select>
                        </li>
                    </ul>
                    <ul class="display-flex">
                        <li>充值金额:</li>
                        <li class="flex-box bank-input">
                            <input v-model.trim="depositMoney" type="number" placeholder="请输入金额"/>
                        </li>
                    </ul>
                </div>
                <form id="rechargeForm" action="/moneyInVerify/baofoo.mvc" target="_blank" method="get"
                      style="display: none">
                    <input type="hidden" v-model="selectMerchantId" name="baofooId">
                    <input type="hidden" v-model="selectBankId" name="bankId">
                    <input type="hidden" v-model="depositMoney" name="depositMoney">
                    <input type="hidden" v-model="inMoneyType" name="inMoneyType">
                    <input type="hidden" v-model="merchant.merchantType" name="merchantType">
                    <input type="hidden" v-model="merchant.id" name="baofooId">
                </form>
                <div class="recharge-note">最低 ¥ <span class="red">{{merchant.minlimit}}</span> 元,最高 ¥ <span
                        class="red">{{merchant.maxlimit}}</span> 元
                </div>
                <div class="recharge-btn-box">
                    <button type="button" @click="submit()">提交充值</button>
                </div>
            </section>
            <!--线下充值-->
            <section v-if="showType=='xxcz'">
                <div class="account-list mt15" v-if="!isScanCode">
                    <ul class="display-flex">
                        <li class="bank-title">收款人:</li>
                        <li class="flex-box pl15">{{bankInfo.accountname}}</li>
                        <span class="copy-url"
                            v-clipboard:copy="bankInfo.accountname"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">
                            <img src="../../assets/images/copy.png" alt="copy">
                        </span>
                    </ul>
                    <ul class="display-flex">
                        <li class="bank-title">收款卡号:</li>
                        <li class="flex-box pl15">{{bankInfo.accountno}}</li>
                        <span class="copy-url"
                            v-clipboard:copy="bankInfo.accountno"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">
                            <img src="../../assets/images/copy.png" alt="copy">
                        </span>
                    </ul>
                    <ul class="display-flex">
                        <li class="bank-title">支行名称:</li>
                        <li class="flex-box pl15">{{bankInfo.branchname}}</li>
                    </ul>
                </div>
                <div class="recharge-img" v-if="isScanCode && isAllowRemote!=true">
                    <img :src="scanImgLocalPath+'?t='+imgParam" onerror="this.src='/h5app/static/img/error-qrcode.png'">
                </div>
                <div class="recharge-img" v-if="isScanCode && isAllowRemote==true">
                    <img v-if="payQrUrl.inited==true" :src="payQrUrl.serverUrl+payQrUrl.context.imgurl+'?t='+imgParam"/>
                    <span v-if="payQrUrl.inited==false" style="font-size: 0.1rem">二维码正在加载...</span>
                    <p v-if="isTjhy" style="color: red;margin-top: 0.05rem;">{{bankInfo.markName}}转账备注会员号才能秒到账</p>
                </div>

                <div class="account-list mt15">
                    <!--  <ul class="display-flex">
                          <li>支付银行卡选择:</li>
                          <li class="flex-box bank-select">
                              <select v-model="selectMerchantId" @change="getBankInfo">
                                  <option v-for="item in bankList.platfromLineBank" :label="item.bankname" :value="item.id">
                                      {{item.bankname}}
                                  </option>
                              </select>
                          </li>
                      </ul>-->
                    <ul class="display-flex" v-if="!isScanCode">
                        <li>账户名:</li>
                        <li class="flex-box bank-input">
                            <input type="text" v-if="bankInfo.mark == 'zfb'" placeholder="支付宝真实姓名" v-model.trim="accoutNo"/>
                            <input type="text" v-else-if="bankInfo.mark == 'xxcz'" placeholder="请输入银行卡真实姓名" v-model.trim="accoutNo"/>
                            <input type="text" v-else placeholder="请输入账户名" v-model.trim="accoutNo"/>
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
                        <li class="flex-box bank-input" v-if="bankInfo.bankname == '线下微信'"><input type="number"
                                                                                                  placeholder="请输入充值金额"
                                                                                                  v-model.trim="money"
                                                                                                  @blur="changeRandom()"/>
                        </li>
                        <li class="flex-box bank-input" v-else><input type="number" placeholder="请输入充值金额"
                                                                      v-model.trim="money"/></li>
                    </ul>
                </div>

                <div class="recharge-note">最低 ¥ <span class="red">{{minlimit}}</span>
                    元,最高 ¥ <span class="red">{{maxlimit}}</span> 元
                </div>

                <dl class="recharge-describe">
                    <dd v-if="bankInfo.bankname == '线下微信'">
                        请确认填写姓名与您的付款姓名一致,否则会无法自动到账,充值金额一定要带2位小数点才会及时到账，否则无法及时到账，正确充值金额方式，例如：
                        <span class="red">120.05元</span>，<span class="red">988.02元</span></dd>
                    <dd v-else>请在【账户名】处备注您的真实姓名-提交订单-为您快速入账！</dd>
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
                </dl><dl class="recharge-step" v-if="bankInfo.mark=='wxzyhk'">
                    <dt><b>充值步骤：</b></dt>
                    <dd>
                        <p>第一步：打开微信</p>
                        <p>第二步：点击右上角+号,并选择收付款</p>
                        <p>第三步：选择转账到银行卡</p>
                        <p>第四步：填写入款银行账号</p>
                        <p>第五步：填写您要转入的金额,转账说明填写:真实姓名(重要)</p>
                        <p>第六步：确认金额并确定支付</p>
                        <p>第七步：转账成功,一般到账时间为2分钟内,取决于微信官方</p>
                    </dd>
                </dl>

                <dl class="recharge-step" v-if="bankInfo.mark == 'xxcz'">
                    <dt><b>充值步骤：</b></dt>
                    <dd>
                        <p>1.点击“我要充值”跳转网银登录 » 2.登录网银账号 » 3.复制收款人与金额信息进入转账 » 4.提交审核信息 » 5.转账成功后，可在充值记录中查看</p>
                    </dd>
                </dl>
                <dl class="recharge-step" v-if="bankInfo.mark == 'xxysf'">
                    <dt><b>充值步骤：</b></dt>
                    <dd>
                        <p>打开云闪付APP-享优惠页面-转账-转到云闪付用户-复制平台云闪付账号-姓名-支付-在账户名处备注您的真实姓名-实时到账</p>
                    </dd>
                </dl>
            </section>

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

    import stringUtil  from  '../../assets/js/util/stringUtil';
    import userInfoApi from '../../assets/js/api/userInfo';
    import numberUtil from '../../assets/js/util/numberUtil';
    export default {
        data () {
            return {
                //所有充值列表
                banksList:[],
                rechargeList:[
                    {desc:'网银充值',type:'zxwy',list:[],icon:'icon-wangyin',color:'#9E9E9E'},
                    {desc:'银联充值',type:'yl',list:[],icon:'icon-yinlian',color:'#fd217b'},
                    {desc:'QQ充值',type:'qq',list:[],icon:'icon-tengxunqq',color:'#fd6969'},
                    {desc:'微信充值',type:'wx',list:[],icon:'icon-weixinzhifu',color:'#00de00'},
                    {desc:'支付宝充值',type:'zfb',list:[],icon:'icon-umidd17',color:'#00c2ff'},
                    {desc:'云闪付',type:'ysf',list:[],icon:'icon-ysf',color:'#00c2ff'},
                ],
                payPlatformList:[], //当前选择充值列表
                inMoneyType:'0', //账户类型
                accountnOption:[
                    {value: '0',label: '钱包中心'},
                    // {value: '1',label: '彩票中心'}
                ],
                openSlide:false,
                showType:'',
                //在线扫码
                selectMerchantId:"",
                depositMoney:null,
                merchant:{},
                //网银
                payBankList:[],
                selectBankId:"",
                //线下充值
                bankList: {},
                money: null,
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
                isTjhy:false,
                fixedNumber:[]
            }
        },
        created(){
           this.initBank();
        },
        methods: {
            goback: function(){
                if(this.openSlide){
                    this.openSlide =false;
                }else{
                    this.$router.go(-1);
                }
            },
            initBank(){
                let _this =this;
                GetBankListApi.getUserBankInfo( (res)=>{
                    _this.bankList = res.data;
                    //合并线下线上充值
                    var  onlineBanks = res.data.baoFooMerchant;
                    var  offlineBanks = res.data.platfromLineBank;
                    onlineBanks.forEach(function(item){
                        item.onlineType = 'online';
                    })
                    offlineBanks.forEach(function(item){
                        item.onlineType = 'offline';
                    })

                    _this.banksList = [...onlineBanks,...offlineBanks];
                    //遍历充值银行通过名称分类
                    if(arrayUtil.isEmpty(_this.banksList) == false){
                        _this.banksList.forEach(function(item){
                            //线下充值和线上 名字字段不一致 手动复制descript 字段
                            if(item.descript==null){
                                item.descript = item.bankname
                            }
                            var types=['银联','QQ','微信','支付宝','云闪付'];
                            var count = 0;
                            //遍历自定义的类型 筛选出符合名称的分类 未匹配则统一为在线网银
                            types.forEach(function(tp,index){
                                if(item.descript.toUpperCase().indexOf(types[index]) != '-1'){
                                    _this.rechargeList[index+1].list.push(item);
                                }else{
                                    count++
                                }
                                if(count == types.length){
                                    _this.rechargeList[0].list.push(item);
                                }
                            })
                        })
                    }
                });
            },
            getFixedMoney(money){
                this.depositMoney = money;
            },
            rechType(payType){
                this.openSlide = true;
                this.payPlatformList = payType.list.map(item=>{
                    const min = item.minlimit || item.minmoney
                    const max = item.maxlimit || item.maxmoney
                    const isOnBank =  item.bankname  == '微信转银行卡' || item.bankname  ==  '支付宝转银行卡' 
                    item.label=`${item.descript} (${min}-${max}) ${isOnBank?'(额外送1%)':''}`;
                    item.value=item.id+'';
                    return item;
                });
                
                const payPlatform = this.payPlatformList[0];
                this.selectMerchantId=payPlatform.value;
                this.fixedNumber = payPlatform.url && payPlatform.url.split("#");
                this.changeRech();
            },
            onCopy(e) {
                this.lalterSuccess("复制成功")
            },
            onError(e) {
                this.lalterError("复制失败")
            },
            changeRech(){
                let _this = this;
                var rechType = arrayUtil.findFirst(_this.payPlatformList, item => {
                            return item.value == _this.selectMerchantId
                        });
                if(rechType.onlineType=='online' && rechType.type!= 'wy'){
                    this.showType = 'zxsm';
                }else if(rechType.type == 'wy') {
                    this.payBankList=this.payPlatformList[0].bank;
                    this.selectBankId = this.payBankList[0].id;
                    this.showType = 'wy';
                }else if(rechType.onlineType=='offline'){

                    this.isAllowRemote = platformData.setting.allowRemoteUrl == null ? false : platformData.setting.allowRemoteUrl;
                    this.payPlatformList.forEach(function(item){
                        item.context = '';
                    });
                    this.showType = 'xxcz';
                    this.getBankInfo();
                }
                this.fixedNumber = rechType.url ? rechType.url.split("#"):[];
                this.selectMerchantId=rechType.value;
                this.depositMoney = '';
                this.merchant = rechType
            },
            submit(){
                var _this=this;
                if(this.showType == 'zxsm'){
                    var merchant=_this.merchant;

                    if(this.selectMerchantId == null ){
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
                            "bankId=" + merchant.bank[0].id +
                            "&depositMoney="+this.depositMoney +
                            "&inMoneyType="+this.inMoneyType +
                            "&merchantType="+merchant.merchantType +
                            "&baofooId="+merchant.id;

                    if(platformData.setting.code!="qj"&&platformData.setting.code!="jn"){
                        param+="&pay_page=h";
                    }
                    // window.location=apiUtil.buildUrl('/moneyInVerify/baofoo.mvc?'+ param);
                    window.open(apiUtil.buildUrl('/moneyInVerify/baofoo.mvc?'+ param));
                }
                if(this.showType == 'wy'){
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

                    if(/^[+]{0,1}(\d+)$/.test(this.dewpositMoney)==false){
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
                }
            },
            accoutNoLimint(){
                let pattern = new RegExp("[`~!@#$^&*()=|_%+\"{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                let accoutNo="";
                for (let i = 0; i < this.accoutNo.length; i++) {
                    accoutNo+=this.accoutNo.substr(i, 1).replace(pattern, '');
                }
                this.accoutNo=accoutNo;
                return this.accoutNo;
            },
            getBankInfo(){
                let _this = this;
                this.money = null;
                this.accoutNo = null;
                this.tjhyInfo ='请输入您充值订单号后六位';
                _this.isTjhy = false;
                _this.selectMerchantId = _this.selectMerchantId == null ? _this.bankList.platfromLineBank[0].id : _this.selectMerchantId;

                for (var i = 0; i < this.bankList.platfromLineBank.length; i++) {

                    if (this.bankList.platfromLineBank[i].id == this.selectMerchantId) {
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
                        if(_this.bankInfo.bank.name.indexOf('云闪付')>-1){
                            _this.bankInfo.markName = '云闪付转账'
                            _this.bankInfo.mark = 'xxysf'
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
                        if(_this.bankInfo.bankname=='微信充值' || _this.bankInfo.bankname=='微信转银行卡'){
                            _this.bankInfo.markName = '微信'
                            _this.bankInfo.mark = 'wx'
                        }
                         if(_this.bankInfo.bankname=='微信转银行卡'){
                            _this.bankInfo.markName = '微信'
                            _this.bankInfo.mark = 'wxzyhk'
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
                var bank = _this.selectMerchantId;
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
                if (_this.selectMerchantId == '') {
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

                if (/^[+]{0,1}(\d+)$/.test(this.money) == false  && _this.bankInfo.bankname != '线下微信' && _this.bankInfo.bankname != '支付宝' && _this.bankInfo.bankname != '微信转银行卡') {
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
                var param = {bank: _this.selectMerchantId, depositMoney: _this.money, accoutNo: accoutNo};

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
        },
        components: {
         /*   'v-lineRecharge':lineRecharge,
            'v-onlineRecharge':onlineRecharge,
            'v-onlineBanking':onlineBanking*/
        },
        watch: {
            selectMerchantId (val) {
                this.changeRech();
            }
        }
    }
</script>
<style scoped lang="less">
    .bank-input input,.bank-select select{
        width: 100%;
    }
    .btn-border-color{
        border: 1px solid #b1b1b1;
    }
    .copy-url img {
        width: 0.25rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
    }
    .pay-display-flex{
        padding: 0.05rem 0 0;
        box-shadow: 0 1px 0 #e8e8e8 inset;
        -webkit-box-shadow: 0 1px 0 #e8e8e8 inset;
        box-sizing: border-box;
        display: flex;
        align-items: end;
        flex-flow: wrap;
        background: #fff;
        li{
            flex: 20%;
            margin: 5px;
        }
    }
    .pay-flex{
        display: flex;
    }
    .red-color{
        font-size: 12px;
        color: red;
    }
    .icon-ysf{
        background-image: url('../../assets/images/ysf-icon.jpg');
        background-repeat: no-repeat;
        background-size: contain;
        width: 0.28rem;
        height: 0.3rem;
        margin-top:0.06rem;
    }
</style>