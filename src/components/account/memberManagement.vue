<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>会员管理</h1>
                <router-link tag="div" to="newUsers" class="member-icon">
                <i class="iconfont icon-tou_tianjia"></i>
                </router-link>
            </header>
            <div class="member-box">
                <ul class="display-flex member-search">
                    <li class="flex-box member-input">
                        <input type="text" placeholder="输入账号搜索" v-model.trim="searchName" />
                        <div class="search-icon" @click="search">
                            <img src="../../assets/images/icon37.png"/>
                        </div>
                    </li>
                    <li class="member-search-btn">
                        <button type="button" @click="dialogSearch = true">搜索设置</button>
                    </li>
                </ul>
            </div>
        </div>
        
        <section class="member-main" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
                 nfinite-scroll-immediate-check="false">
            <div class="member-content" v-for="item in userList.US">
                <ul class="display-box pt10">
                    <li class="member-proxy"><span :class="{'active':item.user.usertype == '2'}">{{userList.UT[item.user.usertype]}}</span>{{item.user.username}}</li>
                    <li>{{item.user.regdt | time}}</li>
                </ul>
                <ul class="display-box pb10">
                    <li>用户返点: <p class="red">{{item.user.bonus}}</p></li>
                    <li>账户余额: <p class="red">{{item.capitalCenter.accountbalance | fixedMoney}}</p></li>
                    <li  @click="showTj(item)">⊙⊙⊙<p>综合统计</p></li>
                   <!-- <li>
                        状态: <span class="orange">{{ONLINE_STATUS[item.user.onlinestatus].desc}} </span> |
                    </li>-->
                </ul>
                <ul class="display-box member-rebate">
                    <li @click="xgfd(item)" v-if="(userList.FLOOR+1)==item.user.floor  || userList._User.floor<=userList.userRebateLeve"
                        :data="item.user.uniqueness" :floor="item.user.floor">
                        <img src="../../assets/images/account/member_icon_01.png"/>
                        修改返点
                    </li>
                    <li @click="quotaContr(item,1)" v-if="item.user.bonus>userList.userMinRebate && ((userList.FLOOR+1)==item.user.floor
                                || userList._User.floor<=userList.userRebateLeve)"
                        :data="item.user.uniqueness">
                        <img src="../../assets/images/account/member_icon_02.png"/>
                        发放配额
                    </li>
                    <li @click="quotaContr(item,2)" v-if="item.user.bonus>userList.userMinRebate
                                && ((userList.FLOOR+1)==item.user.floor || userList._User.floor<=userList.userRebateLeve)"
                        :data="item.user.uniqueness">
                        <img src="../../assets/images/account/member_icon_02.png"/>
                        回收配额
                    </li>
                    <li @click="transfer(item)"  v-if=" 1 == userList._User.transferAccounts && item.user.id != userList._User.id"
                        :dataName="item.user.username" :dataId="item.user.id">
                        <img src="../../assets/images/account/member_icon_03.png"/>
                        转账
                    </li>
                    <li @click="wageModify(item)"
                        v-if="userList._User.dailyWage>0 && (userList.FLOOR+1)==item.user.floor">
                        <img src="../../assets/images/account/member_icon_04.png"/>
                        工资管理
                    </li>
                    <li @click="showFh(item)"  v-if="userList.USER.isSetDividend =='1' &&　item.user.id != userList._User.id">
                        <img src="../../assets/images/account/member_icon_05.png"/>
                        分红比例
                    </li>
                </ul>
            </div>
            <div class="recording-no" ><i class="el-icon-loading" v-if="loadicon"></i></div>
        </section>
        <!--搜索设置-->
        <div v-show="dialogSearch">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">搜索设置</h1>
                <div class="trend-set-main">
                    <div class="display-flex">
                        <div class="trend-set-title">层级 :</div>
                        <div class="flex-box trend-set-periods">
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="username_2" v-model="usernameQuery" name="usernameQuery" value="2" class="user-radio"/>
                                    <label for="username_2">直属下级</label>
                                </li>
                                <li>
                                    <input type="radio" id="username_3" v-model="usernameQuery" name="usernameQuery" value="3"  class="user-radio"/>
                                    <label for="username_3">所有下级</label>
                                </li>
                            </ul>
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="username_5" v-model="usernameQuery" name="usernameQuery" value="5" class="user-radio"/>
                                    <label for="username_5">所有上级</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="display-flex">
                        <div class="trend-set-title">类型 :</div>
                        <div class="flex-box trend-set-periods">
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="usertype_0" v-model="usertype" name="usertype" value="-1" class="user-radio"/>
                                    <label for="usertype_0">全部</label>
                                </li>
                                <li>
                                    <input type="radio" id="usertype_1" v-model="usertype" name="usertype" value="1"  class="user-radio"/>
                                    <label for="usertype_1">代理</label>
                                </li>
                            </ul>
                            <ul class="display-box">
                                <li>
                                    <input type="radio" id="usertype_2" v-model="usertype" name="usertype" value="2" class="user-radio"/>
                                    <label for="usertype_2">会员</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li @click="dialogSearch = false" class="alert-cancel">取 消</li>
                    <li @click="search">确 定</li>
                </ul>
            </div>
        </div>
        <!--修改返点-->
        <div v-if="dialogXgfd">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">修改返点</h1>
                <div class="alert-modify-rebate">
                    <div class="modify-rebate-quota">
                        <div class="modify-quota-box">
                            <ul class="display-box">
                                <li>返点</li>
                                <li>我的配额</li>
                            </ul>
                            <ul class="display-box"  v-for="item in modifyBonus.MIR" v-if="item.limit.beginbonus<=modifyBonus.MYBONUS">
                                <li>{{item.limit.beginbonus}}-{{(item.limit.endbonus)}}</li>
                                <li>{{item.quota}}</li>
                            </ul>
                        </div>
                    </div>
                    <ul class="display-flex rebate-range-box">
                        <li class="added-bonus">{{startBonus}}</li>
                        <li class="flex-box">
                            <input type="range" step="0.1" :min="modifyBonus.UUSER.bonus" :max="modifyBonus.MYBONUS" v-model.number="setBonus"
                                   class="user-range"  @change="selectBonus(startBonus,modifyBonus.MYBONUS)"/>
                        </li>
                        <li class="added-bonus">{{modifyBonus.MYBONUS}}</li>
                    </ul>
                    <ul class="display-box text-center rebate-value">
                        <li>
                            <p>{{modifyBonus.MYBONUS}}</p>
                            <h5>我的返点</h5>
                        </li>
                        <li>
                            <p>{{setBonus}}</p>
                            <h5>代理/会员返点</h5>
                        </li>
                        <li>
                            <p>{{(modifyBonus.MYBONUS-setBonus) | fixed(1)}}</p>
                            <h5>保留返点</h5>
                        </li>
                    </ul>
                    <div class="rebate-note">
                        <h4 class="green">说明：</h4>
                        <ul>
                            <li>从一个返点区间级别调节到下一个返点级别</li>
                            <li>将在上个返点区间级别增加一个配额</li>
                            <li>将在下个返点区间级别减少一个配额</li>
                        </ul>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel" @click="dialogXgfd = false">取 消</li>
                    <li @click="modifySubmit">确 定</li>
                </ul>
            </div>
        </div>
        <!--发放配额 跟 回收配额-->
        <div v-show="dialogQuota">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">{{quotaOprate=='1'?'发放配额':'回收配额'}}</h1>
                <div class="alert-modify-rebate">
                    <div class="modify-rebate-quota">
                        <div class="quota-box">
                            <div class="modify-quota-box">
                                <ul class="display-box">
                                    <li>返点</li>
                                    <li>我的配额</li>
                                    <li>下级配额</li>
                                    <li>{{quotaOprate=='1'?'增加配额':'回收配额'}}</li>
                                </ul>
                                <ul class="display-box" v-for="item in quotaControl">
                                    <li>{{item.qujian}}</li>
                                    <li>{{item.mypeie}}</li>
                                    <li>{{item.userpeie}}</li>
                                    <li>
                                        <div class="quota-input-box">
                                            <div class="quota-input">
                                                <input type="number" placeholder="请输入" :data="item.unique"/>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel" @click="dialogQuota = false">取 消</li>
                    <li @click="quotaOut(quotaOprate)">确 定</li>
                </ul>
            </div>
        </div>

        <!--转账-->
        <div v-show="dialogZz">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">转账</h1>
                <div class="alert-modify-rebate">
                    <div class="transfer-alert">
                        <dl class="display-flex">
                            <dt>转出方:</dt>
                            <dd class="flex-box">
                                <input type="text" v-model="transData.NAME" disabled/>
                            </dd>
                        </dl>
                        <dl class="display-flex">
                            <dt>转入方:</dt>
                            <dd class="flex-box">
                                <input type="text" v-model="transInName" disabled/>
                            </dd>
                        </dl>
                        <dl class="display-flex">
                            <dt>可用金额:</dt>
                            <dd class="flex-box">
                                <input type="text" v-model="transData.AVAIL" disabled/>
                            </dd>
                        </dl>
                        <dl class="display-flex">
                            <dt>转账类型:</dt>
                            <dd class="flex-box transfer-select-triangle">
                                <select  v-model="transferType">
                                    <option v-for="item in transferpower"
                                            :label="item.label"
                                            :value="item.value">{{item.label}}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="display-flex">
                            <dt>转账金额:</dt>
                            <dd class="flex-box">
                                <input type="number" v-model.trim="transfermoney" placeholder="请输入转账金额"/>
                            </dd>
                        </dl>
                        <dl class="display-flex">
                            <dt>资金密码:</dt>
                            <dd class="flex-box">
                                <input type="password" v-model.trim="capitalpassword" placeholder="请输入资金密码"/>
                            </dd>
                        </dl>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel" @click="dialogZz = false">取 消</li>
                    <li @click="transferSubmit">确 定</li>
                </ul>
            </div>
        </div>
        <!--工资管理设置-->
        <div  v-if="currentOperateUser!=null" v-show="showWageModifyView">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">工资管理设置</h1>
                <div class="alert-modify-rebate">
                    <div class="alert-wage">
                        <dl class="display-flex">
                            <dt>日工资:</dt>
                            <dd class="flex-box alert-wage-input">
                                <input type="number" v-model.trim="currentOperateUser.dailyWage"/>
                            </dd>
                            <dd class="pl15">%</dd>
                        </dl>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel" @click="showWageModifyView = false">取 消</li>
                    <li @click="doWageModify">确 定</li>
                </ul>
            </div>
        </div>
        <!--分红-->
        <div   v-if="fhglDialog">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">分红管理</h1>
                <div class="alert-modify-fh">
                    <li>用户名称: <span>{{fhglData.username}}</span></li>
                    <li>用户昵称: <span>{{fhglData.nickname}}</span></li>
                    <li>当前分红: <span>{{fhglData.slaveDividend+'%'}}</span></li>
                    <li>分红设置:
                        <div>
                            <span class="pr10">0%</span>
                            <input type="range" step="1" min="0" :max="fhglData.leadDividend" v-model.number="fhglData.slaveDividend"
                                   class="user-range"  @change="selectFh(0,fhglData.leadDividend)"/>
                            <span class="pl10">{{fhglData.leadDividend+'%'}}</span>
                        </div>
                    </li>

                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel" @click="fhglDialog = false">取 消</li>
                    <li @click="confirmfhgl">确 定</li>
                </ul>
            </div>
        </div>
        <!-- 统计 -->
        <div v-show="tjDialog">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">统计</h1>
                <div class="alert-modify-rebate">
                    <div class="transfer-tj">
                        <dl class="display-flex">
                            <dt>充值人数:{{statisticalData.inMoneyPeopleCount}}</dt>
                            <dt>统计人数:{{statisticalData.peopleCount}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>新增人数:{{statisticalData.newRegistCount}}</dt>
                            <dt>投注人数:{{statisticalData.betPeopleCount}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>活动金额:<br/>{{statisticalData.hdzsCount| fixedMoney}}</dt>
                            <dt>充值金额:<br/>{{statisticalData.inMoneyCount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>提现金额:<br/>{{statisticalData.outMoneyCount | fixedMoney}}</dt>
                            <dt>团队钱包余额:<br/>{{statisticalData.termCapitalCenterBalance| fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>KG团队余额:<br/>{{statisticalData.termKJBalance| fixedMoney}}</dt>
                            <dt>团队彩票余额:<br/>{{statisticalData.termLotteryBalance | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>团队盈亏:<br/>{{statisticalData.termProfitloss | fixedMoney}}</dt>
                            <dt>KG投注金额:<br/>{{statisticalData.kjBetAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>KG返点金额:<br/>{{statisticalData.kjRebateAmount| fixedMoney}}</dt>
                            <dt>KG中奖金额:<br/>{{statisticalData.kjWinAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>VR投注金额:<br/>{{statisticalData.vrBetAmount| fixedMoney}}</dt>
                            <dt>VR返点金额:<br/>{{statisticalData.vrRebateAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>VR中奖金额:<br/>{{statisticalData.vrWinAmount| fixedMoney}}</dt>
                            <dt>AG投注金额:<br/>{{statisticalData.agBetAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>AG返点金额:<br/>{{statisticalData.agRebateAmount| fixedMoney}}</dt>
                            <dt>AG中奖金额:<br/>{{statisticalData.agWinAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>BBIN投注金额:<br/>{{statisticalData.bbinBetAmount| fixedMoney}}</dt>
                            <dt>BBIN返点金额:<br/>{{statisticalData.bbinRebateAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>BBIN中奖金额:<br/>{{statisticalData.bbinWinAmount| fixedMoney}}</dt>
                            <dt>DS投注金额:<br/>{{statisticalData.dsBetAmount | fixedMoney}}</dt>
                        </dl>

                        <dl class="display-flex">
                            <dt>DS返点金额:<br/>{{statisticalData.dsRebateAmount| fixedMoney}}</dt>
                            <dt>DS中奖金额:<br/>{{statisticalData.dsWinAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>PT投注金额:<br/>{{statisticalData.ptBetAmount | fixedMoney}}</dt>
                            <dt>PT返点金额:<br/>{{statisticalData.ptRebateAmount| fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>PT中奖金额:<br/>{{statisticalData.ptWinAmount | fixedMoney}}</dt>
                            <dt>MG投注金额:<br/>{{statisticalData.mgBetAmount | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>MG返点金额:<br/>{{statisticalData.mgRebateAmount | fixedMoney}}</dt>
                            <dt>MG中奖金额:<br/>{{statisticalData.mgWinAmount| fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt v-if="statisticalData.sbWinAmount">沙巴中奖金额:<br/>{{statisticalData.sbWinAmount | fixedMoney}}</dt>
                            <dt v-else>沙巴中奖金额:<br/>{{0.000 | fixedMoney}}</dt>

                            <dt v-if="statisticalData.sbBetAmount">沙巴投注金额:<br/>{{statisticalData.sbBetAmount}}</dt>
                            <dt v-else>沙巴投注金额:<br/>{{0.000 | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt v-if="statisticalData.sbRebateAmount">沙巴返点:<br/>{{statisticalData.sbRebateAmount | fixedMoney}}</dt>
                            <dt v-else>沙巴返点:<br/>{{0.000 | fixedMoney}}</dt>

                            <dt>代理返点总金额:<br/>{{statisticalData.agentbonusmoneytotal | fixedMoney}}</dt>
                        </dl>
                        <dl class="display-flex">
                            <dt>KG代理返点金额:<br/>{{statisticalData.kjagentbonusmoneytotal| fixedMoney}}</dt>
                            <dt>彩票返点金额:<br/>{{statisticalData.lotteryRebateAmount | fixedMoney}}</dt>
                        </dl>
                        <!-- <dl class="display-flex">
                            
                        </dl> -->
                        <dl class="display-flex">
                            <dt>彩票投注金额:<br/>{{statisticalData.lotteryBetAmount| fixedMoney}}</dt>
                            <dt>彩票中奖金额:<br/>{{statisticalData.lotteryWinAmount| fixedMoney}}</dt>
                        </dl>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel" @click="tjDialog = false">确定</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import userInfo from "../../assets/js/api/userInfo" //个人信息接口
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import recordSearchApi from "../../assets/js/api/recordSearchApi" //个人信息接口
    import arrayUtil from '../../assets/js/util/arrayUtil.js';
    import objectUtil from '../../assets/js/util/objectUtil.js';
    export default {
        data () {
            return {
                user:{},
                userList:{
                    US:[]
                },
                searchName:'',//搜索用户名
                //修改返点data
                modifyBonus:{
                    MYBONUS:'',
                    MIR:[],
                    UUSER:{}
                },
                ccPage:0,
                loading:false,
                loadicon:false,
                startBonus:0,//起始返点
                setBonus:0,//修改返点设置
                floor:'', //用户层级
                //配额管理data
                quotaControl:{},
                quotaOprate:'', //1：发放配额  2：回收配额
                //转账data
                transData:{},
                transInName:'', //转入名称
                transInID:'',//转入ID
                transferpower:[],//账户转账类型
                transferType: "",//转账类型选择
                transfermoney: '', //转账金额
                capitalpassword:'',//资金密码
                labelPosition: 'left',
                dialogXgfd: false, //修改返点
                dialogQuota: false,//配额管理
                dialogZz: false,//转账
                tjDialog: false,
                ONLINE_STATUS:{"1":{code:"1",desc:"在线"},"2":{code:"2",desc:"离线"}},
                dialogSearch:false,
                usertype:'-1',//用户类型 -1全部 1代理 2会员
                usernameQuery:'2',
                searchUser :null,
                currentOperateUser:null,
                showWageModifyView:false,
                fhglDialog:false,
                fhglData:{
                    userid:'',
                    username:'',
                    nickname:'',
                    slaveDividend:0,
                    leadDividend:0
                },
                statisticalData:Object
            }
        },
        methods: {
            goback: function(){
                this.$router.push('/agentCenter');
            },
            selectBonus(startBonus,rebate){
                let _this=this;
                let range= document.querySelector(".user-range");
                let progress = ((_this.modifyBonus.MYBONUS - _this.setBonus)/(rebate-startBonus)).toFixed(2);
                let progressValue = 1 - (progress/1);
                range.style.background= '-webkit-linear-gradient(left, #ffa800 0%,'+ '#ffa800'+' '+ progressValue*100+'%'+ ',#d0d0d0'+' '+progressValue*100+'%' +',#d0d0d0 100%)';
            },
            selectFh(startBonus,rebate){
                let _this=this;
                let range= document.querySelector(".user-range");
                let progress = ((_this.fhglData.leadDividend - _this.fhglData.slaveDividend)/(rebate-startBonus)).toFixed(2);
                let progressValue = 1 - (progress/1);
                range.style.background= '-webkit-linear-gradient(left, #ffa800 0%,'+ '#ffa800'+' '+ progressValue*100+'%'+ ',#d0d0d0'+' '+progressValue*100+'%' +',#d0d0d0 100%)';
            },
            search(){
                var _this = this;
                _this.dialogSearch=false;
                _this.ccPage=0;

                _this.userList.US=[];
                _this.searchUser ==null;

                //查询规则先查询当前搜索用户(搜索框为空则查询当前登录用户)、再查询搜索用户的下级用户
                _this.loadicon = true;
                _this.findSearchUser(function () {
                    _this.findSubUsers();
                });

            },

            loadMore(){
                var _this = this;

                if(_this.searchUser != null){
                    _this.loadicon = true;
                    _this.findSubUsers();
                }else {
                    _this.search();
                }
            },

            //查找当前搜索用户自己
            findSearchUser(successAfter){
                var _this=this;
                let params = {
                    username: _this.searchName,
                    ccPage: 1,
                    usernameQuery:1
                }
                userInfo.getUserList(params,function(res) {

                    if (res.code != 200 || arrayUtil.isEmpty(res.data.US)) {
                        _this.loadicon = false;
                        _this.lalterError("搜索不到账号[" + _this.searchName + "]");
                        return;
                    }

                    _this.searchUser = res.data.US[0];
                    if (successAfter) {
                        successAfter();
                    }


                });
            },

            //搜索当前搜索用户的下级信息
            findSubUsers(){
                let _this = this;
                this.loading = true;

                this.ccPage++
                let params = {
                    username: this.searchName,
                    usernameQuery: _this.usernameQuery, //2为用户下级
                    usertype: _this.usertype, //用户类型 -1全部 1代理 2会员
                    accountbalance_begin: 0,//余额
                    accountbalance_end: 0,
                    ccPage: this.ccPage
                }
                userInfo.getUserList(params,function(res){

                    var data =res.data;
                    _this.loading = data.PAGE.count<10;
                    _this.loadicon = false;
                    if(res.code != 200){
                        _this.lalterError("搜索数据失败");
                        return;
                    }
                    _this.bindUserData(data);
                });
            },

            bindUserData(data){
                var _this = this;
                _this.userList.UT = data.UT;
                _this.userList._User = data._User;
                _this.userList.FLOOR = data.FLOOR;
                _this.userList.USER = data.USER;
                _this.userList._Bonus = data._Bonus;
                _this.userList._MinBonus = data._MinBonus;
                _this.userList.userMinRebate = data.userMinRebate;
                if(arrayUtil.isEmpty(_this.userList.US)){
                    _this.userList.US=[_this.searchUser];
                }
                arrayUtil.pushAll(_this.userList.US, data.US);
            },



            //修改返点初始化用户信息
            xgfd(event){
                let _this = this;
                _this.setBonus = 0;
                let uniqueness = event.user.uniqueness;
                let params = {
                    'uniqueness': uniqueness
                }
                userInfo.initUpdate(params, (res) =>{
                    if(res.code == 200){
                        _this.floor =  event.user.floor;
                        _this.modifyBonus = res.data;
                        _this.dialogXgfd = true;

                        _this.setBonus = res.data.UUSER.bonus;
                        _this.startBonus= res.data.UUSER.bonus;//起始返点的值

                    }else{
                        _this.lalterWarning(res.msg);
                    }
                });
            },
            //提交修改返点
            modifySubmit(){
                let _this = this;
                let params = {
                    "uniqueness":this.modifyBonus.UNIQUE,
                    "floor": this.floor,
                    "nowBonus": this.setBonus,
                    "oldBonus": this.modifyBonus.UUSER.bonus
                }
                userInfo.update(params, (res)=>{
                    if(res.code==200){
                        _this.lalterSuccess(res.msg);
                        var u = arrayUtil.findFirst(_this.userList.US,item=>{return item.user.uniqueness == _this.modifyBonus.UNIQUE});
                        u.user.bonus=_this.setBonus;
                        _this.dialogXgfd = false;
                    }else{
                        _this.lalterError(res.msg);
                        _this.dialogXgfd = false;
                    }
                });
            },
            //配额管理初始化
            quotaContr(event,type){
                let _this = this;
                this.quotaOprate = type;
                let uniqueness = event.user.uniqueness;
                let params = {
                    'unique': uniqueness
                }
                userInfo.intUserQuota(params, (res) =>{
                    // _this.dialogQuota = true;
                    if(res.code == 200){
                        _this.quotaControl= eval('(' + res.data + ')');
                        _this.dialogQuota = true;
                    }else{
                        _this.lalterWarning(res.msg);
                    }
                });
            },
            //修改配额
            quotaOut(oprate){
                let _this = this;
                let quot = $(".total");
                let bolean = true;
                $.each(quot,function(i,n){
                    var td = $("td",n);
                    if(td.eq(1).text()/1 < td.eq(3).find("input").val()/1){
                        _this.lalterWarning("发放的配额不足！");
                        bolean = false;
                    }
                })
                if(bolean){
                    let update = "";
                    $(".quota-input input").each(function () {
                        if(update.length==0){
                            update+=$(this).attr("data")+"&"+$(this).val();
                        }else{
                            update+="|"+$(this).attr("data")+"&"+$(this).val();
                        }
                    })
                    
                    let param = {"oprate":oprate,"update":update};
                    userInfo.updateUserQuota(param,function(res){
                        if(res.code==200){
                            _this.lalterSuccess(res.msg);
                            _this.dialogQuota = false;
                        }else{
                            _this.lalterWarning(res.msg);
                        }
                    })
                }
            },
            //转账初始化
            transfer(event){
                let _this = this;
                var transferOpts=[
                    {"value":'1',"label":'其它'},
                    {"value":'2',"label":'充值'},
                    {"value":'3',"label":'分红'},
                    {"value":'4',"label":'日工资'},
                ]

                var power=_this.userList.USER.transferpower;
                _this.transferpower=[];
                if(power != null){
                    for (var i=0;i<transferOpts.length;i++){
                        var item=transferOpts[i];
                        if(power.indexOf(item.value)!= -1){
                            _this.transferpower.push(item);
                        }
                    }
                }

                if(_this.transferpower.length>0){
                    _this.transferType = _this.transferpower[0].value;
                }
                this.transInName = $(event.target).attr("dataName");
                this.transInName = event.user.username;
                this.transInID = event.user.id;
                userInfo.transferPrepare( (res) =>{
                    _this.transData = res.data;
                    _this.dialogZz = true;
                })
            },
            transferSubmit(){
                let _this = this;
                let params = {
                    "token": this.transData.token_zz,
                    "targetID": this.transInID,
                    "targetName":this.transInName,
                    "transferMoney":this.transfermoney,
                    "avilaPassword":this.capitalpassword,
                    "transferType": this.transferType
                }
                userInfo.transfer(params,(res)=>{
                    if(res.code == 200){
                        _this.lalterSuccess(res.msg);
                    }else{
                        _this.lalterWarning(res.msg);
                    }
                    _this.dialogZz = false;
                })
            },
            showTj(item){
                var _this = this;
                _this.tjDialog = true;
                _this.lshowWait();
                recordSearchApi.overAllCount({username:item.user.username},function (resp) {
                    _this.lcloseWait();

                    if(resp.code==200){
                        _this.statisticalData=resp.data;

                    }else {
                        _this.lalterError(resp.msg);
                    }
                })

            },
            wageModify(item){
                var _this=this;

                _this.currentOperateUser=item;

                userInfo.initUpdate({'uniqueness': item.user.uniqueness}, (resp) =>{
                    if(resp.code == 200){
                        _this.currentOperateUser.dailyWage=resp.data._UpdateUser.dailyWage;
                        this.showWageModifyView=true;
                    }else{
                        _this.lalterWarning(resp.msg);
                    }
                });
            },
           
            doWageModify(){
                var _this = this;
                var params = {
                    'id': _this.currentOperateUser.user.id,
                    'username': _this.currentOperateUser.user.username,
                    'dailyWage': _this.currentOperateUser.dailyWage
                };

                userInfo.updateDailyWage(params,function (resp) {
                    if(resp.msg=="用户日工资修改成功！"){
                        _this.showWageModifyView=false;
                        _this.lalterSuccess(resp.msg);
                    }else {
                        _this.lalterWarning(resp.msg);
                    }
                })
            },
            showFh(item){
                var _this = this;
                _this.fhglDialog = true;
                _this.fhglData.leadDividend = _this.user.dividend/1;
                userInfo.initUpdate({'uniqueness': item.user.uniqueness}, (resp) => {
                    if (resp.code == 200) {
                        var user = resp.data._UpdateUser;
                        _this.fhglData.userid = user.id;
                        _this.fhglData.username = user.username;
                        _this.fhglData.nickname = user.nickname;
                        var afterDivi = Number(user.dividend);
                        if(isNaN(afterDivi)){
                            _this.fhglData.slaveDividend = 0;
                        }else{
                            _this.fhglData.slaveDividend =afterDivi;
                        }

                    } else {
                        _this.lalterError(resp.msg)
                    }
                });
            },
            confirmfhgl(){
                var _this = this;
                var param = {
                    id:this.fhglData.userid,
                    username : this.fhglData.username,
                    dividend : this.fhglData.slaveDividend
                };
                userInfo.updateDividend(param,(res)=>{
                    if(res.code== 200 || res.msg=='用户分红修改成功！'){
                         _this.lalterSuccess(res.msg)
                        _this.fhglDialog = false;
                        }else{
                            _this.lalterError(res.msg)
                    }
                });
            }
        },
        created(){
            // this.search();
            var _this = this;
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            });

        },
        watch:{
            "dialogZz":function(stat){
                if(stat==false){
                    this.transfermoney='';//转账金额
                    this.capitalpassword='';//资金密码
                     //methodsScroll.enabledScroll();  
                }else{
                     //methodsScroll.forbidScroll(); 
                }
            },
     
        },
        computed:{

        },
        components: {}
    }
</script>
<style>

</style>
