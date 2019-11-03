<template>
    <div class="slide-right">
            <section v-touch:swipe.right='swiperleft' class="betting-main" v-if="kgLottery.init==true" :class="{'kg-lottery-container':submenuType=='xglhc'||submenuType=='xyxz','betting-main-active':kgLottery.zhushu>=1}">
                <!--六合彩一级菜单-->
                <div class="kg-lottery-menu" v-if="submenuType=='xglhc'||submenuType=='xyxz'">
                    <ul>
                        <li :class="{'active':playType==item.viewType}"
                            v-for="(item,index) in kgLottery.playTypes"
                            @click="changeType(item.viewType,index)" v-if="item.permission&&item.betTypes.length>0">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
                <div :class="{'kg-lottery-submenu':submenuType=='xglhc'||submenuType=='xyxz'}" class="clearfix">
                    <div class="kg-menu">
                        <ul>
                            <li  :class="{'active':playType==item.type}" v-if="submenuType !='xglhc'&&submenuType!='xyxz' && item.permission&&item.list.length>0"
                                v-for="item in submenu[submenuType]" @click="changeType(item.type,null)" :key="item.type">
                                {{item.desc}}
                            </li>
                            <!--六合彩二级菜单-->
                            <li  :class="{'active':item.name == kgLottery.showDesc}"  v-if="submenuType=='xglhc' ||submenuType=='xyxz'"
                                v-for="(item,index) in kgLottery.playTypes[kgLottery.menuIndex].betTypes" @click="changeDesc(item,index)" :key="item.name">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                </div>
                <!--投注区域-->
                
                <component :is="betType" :kgLottery="kgLottery" :submenuType="submenuType" :class="{'kg-xglhc-submenu':submenuType=='xglhc'||submenuType=='xyxz'}"></component>
                
                
            
                
            </section>
        <footer class="lottery-footer">
            <ul class="display-flex lottery-odds-box" v-show="kgLottery.zhushu>0">
                <li>
                    <div class="lottery-odds-input">
                        <input type="number" maxlength="5" v-model.trim="kgLottery.totalMoney" class="lottery-odds lottery-odds-money-wrap" @keyup="multipleChange" @blur="multipleBlur">
                    </div>
                </li>
                <li><p>元</p></li>
                <li class="chips">
                    <span @click.stop="showChips()" class="showChips">筹</span>
                    <ul class="lottery-prize-box pr" v-if="chipsShow">
                        <li v-for="item in setMoney" @click="addTotalMoney(item)" class="showChips">
                            <img :src="item.imgUrl" alt="" class="showChips">
                            <i class="showChips">{{item.label}}</i>
                        </li>
                    </ul>
                </li>
                <li><p>追号</p></li>
                <li>
                    <div class="lottery-odds-input">
                        <input type="number" maxlength="5" v-model.trim="zhuihaoInfor.zhuihaoQishu" class="lottery-odds">
                    </div>
                </li>
                <li><p>期</p></li>
                <li class="kg-chase-stop">
                    <button type="button"  @click="winStop" :class="{'active':zhuihaoInfor.stop}">中奖停止</button>
                </li>
            </ul>
            <ul class="display-flex lottery-betting-nav">
                <li class="lottery-machine" @click="rangSelect" v-if="kgLottery.init==true && kgLottery.type.hasLzt==true">
                    <img src="../../assets/images/icon1.png">
                </li>
                <li class="flex-box lottery-betting-money">
                    <p v-if="user.init==true">已选: <b class="orange">{{kgLottery.zhushu?kgLottery.zhushu:0}}</b> 注 <b class="orange">{{kgLottery.allMoney | fixedMoney }}</b> 元</p>
                    <p v-if="user.init==true">余额: <b class="orange">{{walletBal}}</b></p>
                    <p v-if="user.init==false">已选: <b class="orange">{{kgLottery.zhushu?kgLottery.zhushu:0}}</b> 注 </p>
                    <p v-if="user.init==false">总计：<b class="orange">{{kgLottery.allMoney | fixedMoney }}</b> 元</p>
                    <!-- <div class="icon-refresh"><img src="../../assets/images/icon_refresh.png" @click="loadUser()"/></div> -->
                </li>
                <li class="kg-reset-btn"  @click="resetMoney">
                    <i class="el-icon-delete delete"></i>
                </li>
                <li class="lottery-betting-btn"  @click="beforbet" :class="{'active':kgLottery.zhushu>=1}">
                    {{zhuihaoInfor.zhuihaoQishu>0?"追 号":"投 注"}}
                </li>
            </ul>
        </footer>

        <div v-if="showBetList">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">下注明细</h1>
                <div class="kg-alert-betting">
                    <ul class="display-box kg-alert-header">
                        <li>号码</li>
                        <li>赔率</li>
                        <li>金额</li>
                        <li>操作</li>
                    </ul>
                    <div class="kg-alert-content">
                        <ul class="display-box"  v-for="(item,index) in betList" v-if="item.active">
                            <li class="kg-play-title">
                                {{item.playtypename}} -<span class="red">{{item.name}}</span>
                            </li>
                            <li>{{item.odds}}</li>
                            <li>{{item.val}}</li>
                            <li>
                                <button type="button" class="kg-alert-delete"  @click="delBetItem(item,index)">删除</button>
                            </li>
                        </ul>
                    </div>
                    <div class="kg-alert-footer">
                        <p class="kg-chase-msg" v-if="zhuihaoInfor.zhuihaoQishu>0 && zhuihaoInfor.stop==true">中奖停止追号</p>

                        <p v-if="zhuihaoInfor.zhuihaoQishu>0">
                            追 <span class="red">{{zhuihaoInfor.zhuihaoQishu}}</span>期,
                            每期 <span class="red">{{kgLottery.betZhushu}}</span> 注 ,
                            共 <span class="red">{{kgLottery.betAllMoney}}</span> 元
                        </p>
                        <p v-else="zhuihaoInfor.zhuihaoQishu==null||0">
                            共 <span class="red">{{kgLottery.betZhushu}}</span>
                            注 <span class="red">{{kgLottery.betAllMoney}}</span> 元
                        </p>
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel"  @click="showBetList = false">取 消</li>
                    <li class="alert-entry"  @click="bet">
                        {{zhuihaoInfor.zhuihaoQishu>0 ? '追号' : '投注'}}
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="showBetList02">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1  class="alert-title">下注明细</h1>
                <div  class="kg-alert-betting">
                    <h3 class="kg-alert-issue">第{{kgLottery.issue}}期</h3>
                    <ul class="kg-issue-content">
                        <li  class="kg-issue-title" v-if="kgLottery.groupBetLM">
                            {{kgLottery.kgSpecial.name.split('|')[0]}} ：
                            <span>{{kgLottery.kgSpecial.name.split('|')[1]}}</span>
                        </li>
                        <li  class="kg-issue-title" v-if="kgLottery.groupBetLX">
                            {{kgLottery.showDesc}} ：
                            <span>{{kgLottery.kgSpecial.name}}</span>
                        </li>
                        <li>
                            总注数：
                            <span class="green">{{kgLottery.zhushu}}</span> 注
                        </li>
                        <li>
                            总金额：
                            <span class="red">{{kgLottery.totalMoney}}*{{kgLottery.zhushu}}={{kgLottery.totalMoney*kgLottery.zhushu}}</span> 元
                        </li>
                    </ul>
                    <ul class="kg-issue-content" v-if="zhuihaoInfor.zhuihaoQishu>0">
                        <li>中奖后是否停止追号 <span class="red">{{zhuihaoInfor.stop ? '是' : '否'}}</span></li>
                        <li>
                            追 <span class="red">{{zhuihaoInfor.zhuihaoQishu}}</span> 期,
                            每期 <span class="red">{{kgLottery.zhushu}}</span> 注 ,
                            共 <span class="red">{{kgLottery.totalMoney*kgLottery.zhushu*zhuihaoInfor.zhuihaoQishu}}</span> 元
                        </li>
                    </ul>
                </div>
                <ul class="display-box alert-btn-box">
                    <li class="alert-cancel"  @click="showBetList02 = false">取 消</li>
                    <li class="alert-entry" @click="bet" >
                        {{zhuihaoInfor.zhuihaoQishu>0 ? '追号' : '投注'}}
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="luzhuQiu">
            <div class="cover-bg" @click="luzhuQiu=false"></div>
            <div class="center-box_top" v-if="kgLottery.init==true && kgLottery.type.hasLzt==true">
                <ul id="dewdrop" class="lzt-tag clearfix">
                    <li class="lzt-title">露珠图</li>
                    <li class="lzt-bits">
                        <dl>
                            <dd v-for="item in lztColumns" :class="{'active':lzballActive==item.id}" @click="ballnum(item.id)">{{item.name}}</dd>
                        </dl>
                    </li>
                
                </ul>
                <div class="center-box_ball clearfix">
                    <div class="left-ball fl">
                        <div class="tab-tr_red1" :class='{"active":lztypeActive=="ds"}' @click='lztype("ds")'>
                            <i class="tab-tr_red2 lzt-ball">单</i>
                            <i class="block">{{ lztData.danQty }}</i>
                            <i class="tab-tr_blue1 lzt-ball">双</i>
                            <i class="block">{{lztData.suangQty}}</i>
                        </div>
                        <div class="tab-tr_red1" :class="{'active':lztypeActive=='dx'}" @click='lztype("dx")'>
                            <i class="tab-tr_red2 lzt-ball">大</i>
                            <i class="block">{{lztData.daQty}}</i>
                            <i class="tab-tr_blue1 lzt-ball">小</i>
                            <i class="block">{{ lztData.xiaoQty }}</i>
                        </div>
                    </div>
               
                    <div class="right-ball">
                        <div>
                            <table border="0" width="100%" cellspacing="0" cellpadding="0" class="findActive">

                                <tr v-for="(tr,i) in lztData.list">
                                    <td v-for="(td,index) in tr" v-if="index<20" @click="showLzt(td,$event)" :class="{'active':td!=null&&td.active==true}">
                                        <span style="cursor: default" v-if="td!=null" :class="(td.desc=='双'||td.desc=='小')?'tab-tr_blue1':'tab-tr_red2'">
                                            {{td.desc}}
                                        </span>
                                        <span v-else class="none-block"></span>
                                    </td>
                                </tr>
                            </table>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import appContext from '../../assets/js/context/appContext';
    import arrayUtil from  "../../assets/js/util/arrayUtil";
    import objectUtil from  "../../assets/js/util/objectUtil";
    import businessValidateUtil from  "../../assets/js/business/common/businessValidateUtil";
    import userBusiness from  "../../assets/js/business/user/userBusiness";
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import kgBusiness from  "../../assets/js/business/lottery/kg/kgBusiness"
    import kgApi from "../../assets/js/api/kgApi"

    //时时彩组件
    import sscTwoface from "./ssc/sscTwoface.vue"
    import sscNumber from "./ssc/sscNumber.vue"
    import sscDouniu from "./ssc/sscDouniu.vue"
    import sscTeshu from "./ssc/sscTeshu.vue"
    import sscOneSpan from "./ssc/sscOneSpan.vue"
    //11选5组件
    import x5Twoface from "./11x5/x5Twoface.vue"
    import x5Number from "./11x5/x5Number.vue"
    //快乐彩组件
    import klTwoface from "./kl/klTwoface.vue"
    import klBall0102 from "./kl/klBall0102.vue"
    import klBall0304 from "./kl/klBall0304.vue"
    import klBall0506 from "./kl/klBall0506.vue"
    import klBall0708 from "./kl/klBall0708.vue"
    import klZH from "./kl/klZH.vue"
    //pk8  ---组件
    import pk8Twoface from "./pk8/pk8Twoface.vue"
    import pk8Ball0104 from "./pk8/pk8Ball0104.vue"
    import pk8Ball0508 from "./pk8/pk8Ball0508.vue"
    import pk8GYH from "./pk8/pk8GYH.vue"
    //pk10
    import pkTwoface from "./pk10/pkTwoface.vue"
    import pkBall0105 from "./pk10/pkBall0105.vue"
    import pkBall0610 from "./pk10/pkBall0610.vue"
    import pkGYH from "./pk10/pkGYH.vue"
    //k3
    import k3HZ from "./k3/k3HZ.vue"
    import k3LLDD from "./k3/k3LLDD.vue"
    import k3BZDZ from "./k3/k3BZDZ.vue"
     import k3TS from "./k3/k3TS.vue"
    //福彩3D
    import fc3DBall0103 from "./fc3D/fc3DBall0103.vue"
    import fc3DTs from "./fc3D/fc3DTs.vue"
    //pc蛋蛋
    import pcddBall from "./pcdd/pcddBall.vue"
    import pcddTs from "./pcdd/pcddTeshu.vue"
    //六合彩
    import lhcTM from "./lhc/lhcTM.vue"
    import lhcZM from "./lhc/lhcZM.vue"
    import lhcTwoface from "./lhc/lhcTwoface.vue"
    import lhcLM from "./lhc/lhcLM.vue"
    import lhcLX from "./lhc/lhcLX.vue"
    import lhcLW from "./lhc/lhcLW.vue"
    import lhcSX from "./lhc/lhcSX.vue"
    import lhcSB from "./lhc/lhcSB.vue"
    import lhcTWS from "./lhc/lhcTWS.vue"
    import lhcHX from "./lhc/lhcHX.vue"

    //幸运星座
    import xyxzTM from "./xyxz/lhcTM.vue"
    import xyxzZM from "./xyxz/lhcZM.vue"
    import xyxzTwoface from "./xyxz/lhcTwoface.vue"
    import xyxzLM from "./xyxz/lhcLM.vue"
    import xyxzLX from "./xyxz/lhcLX.vue"
    import xyxzLW from "./xyxz/lhcLW.vue"
    import xyxzSX from "./xyxz/lhcSX.vue"
    import xyxzSB from "./xyxz/lhcSB.vue"
    import xyxzTWS from "./xyxz/lhcTWS.vue"
    import xyxzHX from "./xyxz/lhcHX.vue"
    export default {

        data () {
            return {
                lotteryTypeList:[],
                GameOptions: [],
                selectedOptions: ['sscrules','1'],
                gameSelectIndex:'0',
                gameSelectId:'0',

                kgLottery: {
                    //筹码金额
                    totalMoney: 0,
                    init: false,
                    playTypes: [],
                    name: "",
                    issue: "0000-00-00",
                    status: lotteryBusiness.STATUS_LIST.init,
                    firstHistory: {issueno: "0000-00-00", nums: "- - - - -"},
                    history: [],
                    type:{
                        bits:[]
                    },
                    data: {
                        betting: []
                    },
                    zeroNums: "",
                    groupBetLM:false,//六合彩中组合玩法 。投注方式 ：bettype只能单选 号码多选组合一个注单
                    groupBetLX:false,//六合彩中组合玩法 。投注方式 ：bettype多选 一个注单
                    //二级菜单
                    showDesc:'',
                    menuIndex:0,
                    submenuIndex:0,
                    resetStatu:false,
                    selectList:[],
                    zhushu:0,
                    allMoney:0,
                    countdownContext:{
                        days: "00",
                        hours: "00",
                        munites: "00",
                        secondes: "00",
                    },
                    selectBall:[],
                    selectID:[],
                    betZhushu: 0,   //投注注数
                    betAllMoney: 0   //投注注数
                },
                betType:'v-sscTwoface',
                explainType:'v-sscExplain',
                playType: 'twoface',
                submenu:{
                    "sscrules":[
                        {name:"ssc","prdesc": '数字盘',"desc":'数字盘',"type":'sscNumber',"permission":false,'control':'isNum','list':[]},
                        {name:"ssc","prdesc": '两面盘',"desc":'两面盘',"type":'sscTwoface',"permission":false,'control':'isLmp','list':[]},
                        {name:"ssc","prdesc": '斗牛盘',"desc":'斗牛盘',"type":'sscDouniu',"permission":false,'control':'isDn','list':[]},
                        {name:"ssc","prdesc": '特殊盘',"desc":'特殊盘',"type":'sscTeshu',"permission":false,'control':'isTs','list':[]},
                        {name:"ssc","prdesc": '一字、跨度',"desc":'一字、跨度',"type":'sscOneSpan',"permission":false,'control':'isOneSpan','list':[]}
                    ],
                    "11c5rules":[
                        {name:"11x5","prdesc": '数字盘',"desc":'数字盘',"type":'x5Number',"permission":false,'control':'isNum','list':[]},
                        {name:"11x5","prdesc": '两面盘',"desc":'两面盘',"type":'x5Twoface',"permission":false,'control':'isLmp','list':[]},
                    ],
                    "pk8rules": [
                        {name: "pk8", "desc": '两面盘', "type": 'pk8Twoface', "permission": false,'control':'isLmp','list':[]},
                        {name: "pk8", "desc": '1-4名', "type": 'pk8Ball0104', "permission": false,'control':'isBall0104','list':[]},
                        {name: "pk8", "desc": '5-8名', "type": 'pk8Ball0508', "permission": false,'control':'isBall0508','list':[]},
                        {name: "pk8", "desc": '冠亚和', "type": 'pk8GYH', "permission": false,'control':'isGYH','list':[]}
                    ],
                    "pk10rules":[
                        {name:"pk10","prdesc": '两面盘',"desc":'两面盘',"type":'pkTwoface',"permission":false,'control':'isLmp','list':[]},
                        {name:"pk10","prdesc": '1-10名',"desc":'1~5名',"type":'pkBall0105',"permission":false,'control':'isBall0105','list':[]},
                        {name:"pk10","prdesc": '1-10名',"desc":'6~10名',"type":'pkBall0610',"permission":false,'control':'isBall0610','list':[]},
                        {name:"pk10","prdesc": '冠亚和',"desc":'冠亚和',"type":'pkGYH',"permission":false,'control':'isGYH','list':[]}
                    ],
                    "k3rules":[
                        {name:"k3","prdesc": '和值',"desc":'和值',"type":'k3HZ',"permission":false,'control':'isHZ','list':[]},
                        {name:"k3","prdesc": '骰子',"desc":'连号、独胆',"type":'k3LLDD',"permission":false,'control':'isLLDD','list':[]},
                        {name:"k3","prdesc": '骰子',"desc":'豹子、对子',"type":'k3BZDZ',"permission":false,'control':'isBZDZ','list':[]},
                        {name:"k3","prdesc": '骰子',"desc":'特殊盘',"type":'k3TS',"permission":false,'control':'isTs','list':[]},
                    ],
                    "kl10rules":[
                        {name:"kl","prdesc": '两面',"desc":'两面',"type":'klTwoface',"permission":false,'control':'all','list':[]},
                        {name:"kl","prdesc": '第一,第二球',"desc":'第1~2球',"type":'klBall0102',"permission":false,'control':'isBall0102','list':[]},
                        {name:"kl","prdesc": '第三,第四球',"desc":'第3~4球',"type":'klBall0304',"permission":false,'control':'isBall0304','list':[]},
                        {name:"kl","prdesc": '第五,第六球',"desc":'第5~6球',"type":'klBall0506',"permission":false,'control':'isBall0506','list':[]},
                        {name:"kl","prdesc": '第七,第八球',"desc":'第7~8球',"type":'klBall0708',"permission":false,'control':'isBall0708','list':[]},
                        {name:"kl","prdesc": '总和',"desc":'总和',"type":'klZH',"permission":false,'control':'isZH','list':[]},
                    ],
                    "3rules":[
                        {name:"fc3D","prdesc": '1-3球',"desc":'1~3球',"type":'fc3DBall0103',"permission":false,'control':'isBall0103','list':[]},
                        {name:"fc3D","prdesc": '特殊',"desc":'特殊',"type":'fc3DTs',"permission":false,'control':'isTs','list':[]},
                    ],
                    "pcdd": [
                        {name:"pcdd","desc": '数字', "type": 'pcddBall',"permission":false,'control':'isBall','list':[]},
                        {name:"pcdd","desc": '特殊', "type": 'pcddTs',"permission":false,'control':'isTs','list':[]},
                    ],
                    "xglhc":[],
                    "xyxz":[]
                },
                submenuType:'sscrules',
                walletBal:0,    
                user:{
                    kgBal:0,
                    kjlotteryBal:0,

                },
                setMoney: [{
                    value: 1,
                    label: '1元',
                    imgUrl:'/h5app/static/img/chips/1.png'
                }, {
                    value: 10,
                    label: '10元',
                    imgUrl:'/h5app/static/img/chips/2.png'
                }, {
                    value: 50,
                    label: '50元',
                    imgUrl:'/h5app/static/img/chips/3.png'
                }, {
                    value: 100,
                    label: '100元',
                    imgUrl:'/h5app/static/img/chips/4.png'
                }],
                zhuihaoInfor: {
                    stop: false,
                    zhuihaoQishu: null,
                    zhuiHaoQiHao: []
                },
                betLoading: {
                    loading: false,
                    normalText: "投注",
                    loadingText: "投注中"
                },
                betList:[],
                showBetList:false,
                showBetList02:false,
                chipsShow:false,
                mixins:null,
                luzhuQiu:false,
                lzballActive:0,
                lztypeActive: "dx",
                lztZh: {id: 99999, name: '总和'},
                lztColumns: [],
                lztData: {
                    daQty: 0,
                    xiaoQty: 0,
                    danQty: 0,
                    suangQty: 0,
                    list: []
                },
                lmclList:[]
            }
        },
        created() {
            this.initGame();
            this.loadUser();
            this.mixins = window.outerHeight;
        },
        methods: {
            swiperleft(){
                this.$router.push('/index')
            },
            multipleChange() {
                
                var _this = this;
                var result = businessValidateUtil.multipleChangeCheck(_this.kgLottery.totalMoney, m => {
                    _this.kgLottery.totalMoney = m;
                });
                if (result == false) {
                    return;
                }
                
            },
            multipleBlur() {
                var _this = this;
                var multiple = Number(_this.kgLottery.totalMoney);
                if (isNaN(multiple) || multiple < 1) {
                    _this.kgLottery.totalMoney = 1;
                    
                } else {
                    _this.kgLottery.totalMoney = multiple;
                }
            },
            goExplain(){

                this.$router.push({path:'explain',query:{explainType:this.submenuType,lotteryName:this.kgLottery.name,gameId:this.kgLottery.id}});
            },
            gameChange(value){
                this.gameSelectId = value;
                this.$router.push({path:'kgGameBet',query:{gameId:value}});
                this.initGame();
            },
            initMenu(){
                let _this = this;
                //头部二级联动菜单

                var list=userBusiness.getLotteryList();
                var types = lotteryBusiness.getDisplayTypeList();
                var data = [];
                arrayUtil.forEach(types, t => {
                    var lotteryList = arrayUtil.filter(list, l => {
                        return l.displayType == t.name
                    });
                    if (lotteryList.length > 0) {
                        data.push({type: t, list: lotteryList});
                    }
                });

                var id = _this.$route.query.gameId;
                arrayUtil.forEach(data, (d, dIndex) => {
                    arrayUtil.forEach(d.list, l => {
                        if (l.id == id) {
                            _this.gameSelectIndex = dIndex;
                            _this.gameSelectId = id;
                        }
                    })
                })

                _this.lotteryTypeList = data;

                /* _this.selectedOptions[0] = this.kgLottery.displayType;
                 _this.selectedOptions[1] = this.kgLottery.id+'';*/
            },
            initLottery(){
                this.initGame();
            },
            initGame(){
                let _this = this;
                
                var id = _this.$route.query.gameId;
                this.kgLottery.id = id;
                _this.lshowWait()
                kgBusiness.init(this.kgLottery, success => {
                    setTimeout(function () {
                        _this.lcloseWait();
                    }, 100)
                    if (success == false) {
                        _this.lalterError("该KG彩票游戏已经暂时关闭,若有疑问请联系客服!");
                        return;
                    }
                    _this.$parent.lottery = _this.kgLottery;
                    var typeName = _this.kgLottery.type.name;
                    _this.submenuType = typeName;


                    //kg玩法权限控制
                    var menuRole = _this.kgLottery.data.menuRoleChils;
                    var count = 0;
                    if(typeName!='xglhc'&&typeName!='xyxz'){

                        arrayUtil.forEach(_this.submenu[typeName],menu=>{
                            menu.permission = true;
                            if(JSON.stringify(menuRole) == "{}"){
                                menu.permission = true;
                            }else {
                                for(let k in  menuRole){
                                    if(menuRole[k].all&&menu.prdesc == k){
                                        menu.permission = false;
                                    }
                                }
                            }
                        });
                        let playTypes = _this.kgLottery.playTypes;
                        let submenuTypes = _this.submenu[typeName];
                        for(let k = 0; k < submenuTypes.length; k++){
                            let control = submenuTypes[k].control;
                            submenuTypes[k].list = [];
                            for(let i=0;i<playTypes.length; i++){
                                let menus = playTypes[i];
                                if(menus[control]==true){
                                    submenuTypes[k].list.push(playTypes[i])
                                }
                                if(control=='all'){
                                    submenuTypes[k].list.push(playTypes[i])
                                }
                                
                            }
                            
                        }
                        
                        //加载第一个有权限的组件
                        for(let m of _this.submenu[typeName]){
                            if (m.permission){
                                count++;
                                _this.betType = `v-${m.type}`;
                                _this.explainType = `v-${m.name}Explain`;
                                _this.playType = m.type;
                                break;
                            }
                        }


                    }else {
                        arrayUtil.forEach(_this.kgLottery.playTypes,menu=>{
                            menu.permission = true;
                            if(JSON.stringify(menuRole) == "{}"){
                                menu.permission = true;
                            }else {
                                for(let k in  menuRole){
                                    if(menuRole[k].all&&menu.name == k){
                                        menu.permission = false;
                                    }
                                }
                            }
                        });
                        //加载第一个有权限的组件

                        for(let index=0;index<_this.kgLottery.playTypes.length;index++){
                            let m = _this.kgLottery.playTypes[index];
                            if (m.permission){
                                count++;
                                _this.betType = `v-${m.viewType}`;
                                if(typeName=='xglhc'){
                                    _this.explainType = `v-lhcExplain`;
                                }
                                if(typeName=='xyxz'){
                                    _this.explainType = `v-xyxzExplain`;
                                }
                                
                                _this.playType = m.viewType;
                                _this.kgLottery.showDesc = m.betTypes[0].name;
                                _this.kgLottery.submenuIndex = 0;
                                _this.kgLottery.menuIndex = index;
                                break;
                            }
                        }
                    }
                    _this.initMenu();


                    if(count==0){
                        this.lalterWarning("该彩种玩法暂未开放");
                        _this.betType = "";
                        _this.explainType = "";
                        _this.playType = "";
                    }


                    this.kgLottery.groupBetLX = false;
                    this.kgLottery.groupBetLM = false;



                    let index = this.kgLottery.menuIndex;

                    //刷新浏览器获取当前的 playtype
                    if(this.submenuType == 'xglhc' || this.submenuType == 'xyxz'){
                        this.activeMenu();

                        arrayUtil.forEach(this.kgLottery.playTypes,(item,index)=>{
                            if(item.viewType == this.playType){
                                this.kgLottery.menuIndex = index;
                            }
                        })
                        this.changeType(this.playType, this.kgLottery.menuIndex);
                        let betType = this.kgLottery.playTypes[this.kgLottery.menuIndex].betTypes[0];
                        this.changeDesc(betType,0);
                    }

                    var lztColumns = [];
                    arrayUtil.forEach(_this.kgLottery.type.bits, (b, i) => {
                        lztColumns.push({id: i, name: b});
                    });

                    if(this.kgLottery.type.name != "pk10rules"){
                        lztColumns.push(_this.lztZh);
                    }

                    this.lzballActive = lztColumns[0].id;
                    this.lztColumns = lztColumns;

                    if (this.kgLottery.type.hasLzt == true) {
                        _this.buildSelectLztData();
                        _this.buildLmclData();
                    }


                });
            },
            changeDesc(betType,index){
                this.kgLottery.showDesc = betType.name;
                this.kgLottery.submenuIndex = index;
                this.clearBetcon();
                this.kgLottery.resetStatu = true
            },

            getSubModule(){
                var locationStrs = window.location.href.split("/");
                let _this = this;
                if(locationStrs[locationStrs.length-1].indexOf("&")>0){
                    let locationStrs02 = locationStrs[locationStrs.length-1].split("&");
                    let locationStrs03 = locationStrs02[locationStrs02.length-1].split("=");
                    return locationStrs03[1];
                }else{
                    //return 'lhcTM';
                    //加载第一个有权限的组件
                    for(let index=0;index<_this.kgLottery.playTypes.length;index++){
                        let m = _this.kgLottery.playTypes[index];
                        if (m.permission){
                            return m.viewType;
                            break;
                        }
                    }
                }
            },
            activeMenu(){
                this.playType =  this.getSubModule();
            },
            changeType(type,index){

                this.playType = type;
                this.betType = "v-" + type;
              /*  if(this.submenuType=='xglhc'){
                    this.$router.push({path:'kgGameBet?gameId='+this.kgLottery.id,query:{playType:type}});
                    // this.getSubModule();
                }*/
                if(index!=null){
                    //如果是六合彩 保存一级菜单索引
                    this.kgLottery.menuIndex = index;
                    //初始化 二级菜单 显示第一项
                    this.kgLottery.showDesc=this.kgLottery.playTypes[index].betTypes[0].name;
                    this.kgLottery.submenuIndex = 0;
                }
                this.kgLottery.groupBetLX = false;
                this.kgLottery.groupBetLM = false;
                //初始化投注区域
                this.clearBetcon();
            },
            winStop(){
                this.zhuihaoInfor.stop =!this.zhuihaoInfor.stop;
            },
            clearBetcon(){
                let _this = this;
                if(this.submenuType!='xglhc'&&this.submenuType!='xyxz'){
                    arrayUtil.forEach(this.kgLottery.playTypes, pt => {
                        arrayUtil.forEach(pt.betTypes, bt => {
                            bt.active = false;
                            bt.val = null;
                        });
                    });
                }else{
                    arrayUtil.forEach(this.kgLottery.playTypes,pt=>{
                        arrayUtil.forEach(pt.betTypes,bt=>{
                            arrayUtil.forEach(bt.beteTypes,bet=>{
                                if(_this.kgLottery.groupBetLM ==false){
                                    bet.active=false;
                                    bet.val=null;
                                }else {
                                    //重设 针对子组件有静态选项面板
                                    this.kgLottery.resetStatu = true
                                }
                            })
                        })
                    })
                }
                this.kgLottery.selectList=[];
                this.kgLottery.selectBall=[];
                this.kgLottery.selectID=[];
                this.kgLottery.zhushu = 0;
                this.kgLottery.allMoney = 0;
                if(this.submenuType!='xglhc'&&this.submenuType!='xyxz'){
                    if(this.$children[0].titleView){
                        for(let i in this.$children[0].titleView){
                            this.$children[0].titleView[i].arr = [];
                        }
                    }
                }
                
                
            },
            resetMoney(){
                this.kgLottery.totalMoney = 0;
                this.clearBetcon();
                //重设 针对子组件有静态选项面板
                this.kgLottery.resetStatu = true;
               
            },
            reloadOdds(showWait){
                let _this = this;

                if (kgBusiness.isClose(showWait)) {
                    return false;
                }

                let param = {gameID: this.kgLottery.id};
                if (showWait == true) {
                    _this.lshowWait();
                }

                kgBusiness.hideOdds(this.$route.query.gameId);
                kgApi.reloadKjOdds(param, (res) => {
                    if (showWait == true) {
                        _this.lcloseWait();
                    }

                    if (res.data != null) {
                        let oddsData = res.data;
                        let playTypes = this.kgLottery.playTypes;
                        if(this.$route.query.gameId!=66){
                            arrayUtil.forEach(playTypes, pt => {
                                arrayUtil.forEach(pt.betTypes, bt => {
                                    var reloaded = false;
                                    var odds =oddsData[bt.id];
                                    if(odds){
                                        bt.odds = odds;
                                        bt.realOdds = bt.odds;
                                    }else {
                                        bt.odds = bt.realOdds;
                                    }
                                });
                            });
                        }else {
                            arrayUtil.forEach(playTypes,pt=>{
                                arrayUtil.forEach(pt.betTypes,bt=>{
                                    arrayUtil.forEach(bt.beteTypes,bet=>{
                                        var reloaded = false;
                                        var odds =oddsData[bet.id];
                                        if(odds){
                                            bet.odds = odds;
                                            bet.realOdds = bet.odds;
                                        }else {
                                            bet.odds = bet.realOdds;
                                        }
                                    })
                                })
                            });
                        }

                    }
                })
            },
            //下期时刷新触发
            nextIssueEvent(){
                //重新加载赔率
                this.reloadOdds(false);
            },
            //封盘时触发
            closeLotteryEvent(){
                //隐藏赔率
                kgBusiness.hideOdds(this.$route.query.gameId);
                //重置投注区。
                this.clearBetcon();
            },
            beforbet(){
                let _this = this;

                let qishu = _this.zhuihaoInfor.zhuihaoQishu //期数
                _this.zhuihaoInfor.zhuiHaoQiHao = [];
                let betting = this.kgLottery.data.betting;

                if (_this.kgLottery.status != lotteryBusiness.STATUS_LIST.betting) {

                    this.lalterWarning("当期已封盘,禁止投注");
                    return false;
                }

                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if (qishu > betting.length) {
                    _this.lalterWarning("所选追号期数大于可追号的期数,请重新选择追号期数");
                    _this.zhuihaoInfor.zhuihaoQishu = null;
                    return false;
                } else {
                    for (let j = 0; j < qishu; j++) {
                        let zhuiHaoQiHaoItem = {};
                        zhuiHaoQiHaoItem.qiHao = betting[j].issueno; //期号
                        zhuiHaoQiHaoItem.beiShu = '1'; //倍数
                        _this.zhuihaoInfor.zhuiHaoQiHao.push(zhuiHaoQiHaoItem);
                    }
                }

                this.betList = [];

                if(this.submenuType!='xglhc'&&this.submenuType!='xyxz'){
                    arrayUtil.forEach(this.kgLottery.playTypes, pt => {
                        arrayUtil.forEach(pt.betTypes, bt => {
                            if (bt.active == true) {
                                _this.betList.push(bt);
                            }
                        });
                    });
                }else{
                    //一级菜单 二级菜单 idex 找到目前的投注数据
                    let menuIndex = this.kgLottery.menuIndex;
                    let subIndex = this.kgLottery.submenuIndex;
                    let kgBetTypes = this.kgLottery.playTypes[menuIndex].betTypes[subIndex].beteTypes;
                    //遍历当前选择区域数据 active 为true 则push到betList
                    arrayUtil.forEach(kgBetTypes,bt =>{
                        if(bt.active == true){
                            _this.betList.push(bt);
                        }
                    })

                }


                if (this.betList.length <= 0) {
                    this.lalterWarning("请先选择投注内容");
                    return;
                }
                if(this.kgLottery.groupBetLM == false && this.kgLottery.groupBetLX == false){
                    this.showBetList = true;
                }
                //六合彩种多选投注项
                if(this.kgLottery.groupBetLM||this.kgLottery.groupBetLX){
                    let flag = objectUtil.hasProperty(this.kgLottery.kgSpecial);

                    if(flag && this.kgLottery.kgSpecial.name==''){
                        this.lalterWarning('请选择投注内容');
                        return
                    }
                    if (this.kgLottery.totalMoney == null || this.kgLottery.totalMoney == 0) {
                        this.lalterWarning("请先选择投注金额");
                        return;
                    }

                    let minLength = this.kgLottery.kgSpecial.minlength;
                    let selectLength = 0;
                    //连码的号码长度
                    if( this.kgLottery.kgSpecial.name.indexOf('|')!=-1){
                        selectLength = this.kgLottery.kgSpecial.name.split(',').length;
                    }else{
                        selectLength = this.kgLottery.kgSpecial.name.length;
                    }
                    //连肖选的号码长度
                    if(this.kgLottery.groupBetLX){
                        selectLength = this.kgLottery.kgSpecial.name.split('.').length;
                    }
                    if(selectLength<minLength){
                        this.lalterWarning(`最少选择${minLength}个选项`);
                        return;
                    }
                    this.showBetList02 = true;
                }
                //计算投注注数金额
                this.comZhushu();
            },
            delBetItem(item,index){
                item.active = false;
                item.val = null;
                let list = 0;
                for (let i = 0; i < this.betList.length; i++) {
                    if (this.betList[i].active == true) {
                        list++;
                    }

                }
                if (list == 0) {
                    this.showBetList = false;
                }
                if(this.submenuType!='xglhc'&&this.submenuType!='xyxz'){
                    if(this.$children[0].titleView){
                        this.$children[0].titleView[item.playtype].arr.shift(true);
                    }
                }
                this.kgLottery.zhushu -=1;
                this.kgLottery.allMoney -= this.kgLottery.totalMoney;

                this.betList.splice(index,1);
                if(this.kgLottery.selectList.length){
                    this.kgLottery.selectList.splice(index,1);
                }
                
                this.comZhushu();
            },
            bet(){
                this.betLoading.loading = true;
                let _this = this;
                let datas = this.kgLottery.data;
                let touzhuList = [];
                //bettype 为单选一注
                for (let i = 0; i < this.betList.length; i++) {
                    if (this.betList[i].active == true) {
                        let betItem = {};
                        betItem.wanFaID = this.betList[i].id; //玩法ID bettype 对象的id
                        betItem.touZhuHaoMa = this.betList[i].name;//投注的号码如两面盘的0-9，大小单双、牛0-牛牛 无牛 等
                        betItem.digit = this.betList[i].playTypeObj.digit;//购买的位置 如第一球 0 ，第二球1 第三2  ;如前三则 0,1,2
                        betItem.touZhuBeiShu = this.betList[i].val;//倍数 其实也就是下注金额  ---*
                        betItem.danZhuJinEDanWei = '1';//单位 默认为1就可以了  ---*
                        betItem.yongHuSuoTiaoFanDian = '0';//所选的返点 默认为0 就可以了暂时没用到 ------*
                        betItem.zhuShu = '1';// 默认为1可以了 ---*
                        betItem.bouse = this.kgLottery.data.userBonus;//自身返点 ----*
                        betItem.BaseScale = this.betList[i].odds;// 玩法 赔率
                        touzhuList.push(betItem);
                    }
                }
                if(this.kgLottery.groupBetLM){
                    touzhuList[0].touZhuHaoMa = this.kgLottery.kgSpecial.name.split('|')[1];
                }
                //六合彩 bettype 为多选 一注
                if(this.kgLottery.groupBetLX){
                    touzhuList.splice(1,touzhuList.length-1);
                    touzhuList[0].touZhuHaoMa = this.kgLottery.kgSpecial.name;
                    touzhuList[0].wanFaID = this.kgLottery.kgSpecial.wanFaID;

                    let playtype = this.betList[0]&&this.betList[0].playtype;

                    touzhuList[0].BaseScale = this.betList.filter(item => item.id===touzhuList[0].wanFaID )[0].odds
                    
                }
                
                let params = {
                    'token': datas.token_tz,
                    'mobileBet': appContext.getDevice().betVal,
                    'issueNo': datas.current.lotteryNums.issueno,//期号
                    'gameId': this.kgLottery.id,//彩种
                    'tingZhiZhuiHao': this.zhuihaoInfor.stop,//是否追号-- 停止追号 --------*
                    'zhuiHaoQiHao': this.zhuihaoInfor.zhuiHaoQiHao,
                    'touZhuHaoMa': touzhuList
                }

                var postJson = JSON.stringify(params);
                kgApi.cathectic({json: postJson}, (res) => {
                    _this.betLoading.loading = false;
                    if(res.data){
                        datas.token_tz = res.data.token_tz;
                    }
                    if (res.code == 200) {
                        _this.lalterSuccess(res.msg);
                        _this.loadUser(false);
                        //隐藏弹出框
                        _this.showBetList = false;
                        _this.showBetList02 = false;

                        _this.betList = [];
                        _this.resetMoney()
                        /*if(_this.submenuType!='xglhc'){
                         arrayUtil.forEach(_this.kgLottery.playTypes, pt => {
                         arrayUtil.forEach(pt.betTypes, bt => {
                         bt.active = false;
                         bt.val = null;
                         });
                         });
                         }else{
                         arrayUtil.forEach(_this.kgLottery.playTypes, pt => {
                         arrayUtil.forEach(pt.betTypes, bt => {
                         arrayUtil.forEach(bt.beteTypes,bet =>{

                         bet.active = false;
                         bet.val = null;
                         })
                         });
                         });
                         }

                         this.kgLottery.allMoney = 0;
                         this.kgLottery.zhushu= 0;
                         this.kgLottery.selectList=[];
                         this.resetMoney();*/
                        _this.clearBetcon()
                        return;
                    } 
                   
                    var status = res.data.STATUS;
                    if(status==1104){

                        _this.lconfirm("余额不足，点击前往充值页面！", {confirmButtonText: '充值'}, () => {
                            userBusiness.toWyczPage({path:'chongzhi'})
                            
                        });
                        return
                    }
                        
                    _this.lalterError(res.msg);
                    

                });

            },
            //计算投注注数和总金额
            comZhushu(){
                this.kgLottery.betZhushu = this.betList.length;
                this.kgLottery.betAllMoney = 0;
                arrayUtil.forEach(this.betList, item => {
                    this.kgLottery.betAllMoney += item.val / 1
                });
                if (this.zhuihaoInfor.zhuihaoQishu>0) {
                    this.kgLottery.betAllMoney = this.zhuihaoInfor.zhuihaoQishu * this.kgLottery.betAllMoney;
                }
            },
            loadUser(cache){
                var _this=this;
                if(cache != undefined){
                    userBusiness.enableCache=cache;
                }
                userBusiness.getUser(_this,function (user) {
                    _this.user = user
                })
            },
            toTrend(){
               this.$router.push({path:'/lotteryTrend',query:{id:this.kgLottery.id,kgLottery:this.kgLottery}});
            },
            showChips(){
                this.chipsShow = !this.chipsShow;
            },
            addTotalMoney(item){
                this.kgLottery.totalMoney += Number(item.value);
            },
            rangSelect(){
               
                //if(this.kgLottery.init==true && this.kgLottery.type.hasLzt==true){
                    this.luzhuQiu = true;
                //}else{
                    //this.lalterWarning('该功能暂未开放');
                //}
                
            },
            ballnum(type){
                this.lzballActive = type;
                this.buildSelectLztData();
            },
            lztype(type){
                this.lztypeActive = type;
                this.buildSelectLztData();
            },
            buildSelectLztData(){

                var lztData = this.buildLztData(this.lzballActive, this.lztypeActive);
                var colLen = 20;
                var rowLen = 8;

                var list = lztData.list;

                if (list.length > rowLen) {

                    var realList = [];
                    var muList = [];
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];

                        if (i < (rowLen - 1)) {
                            realList.push(item)
                        } else {
                            arrayUtil.forEach(item, (sub, subIndex) => {
                                if (sub != null) {
                                    var mu = arrayUtil.findFirst(muList, ml => {
                                        return ml.index == subIndex
                                    });
                                    if (mu == null) {
                                        mu = {index: subIndex, list: []};
                                        muList.push(mu);


                                    }
                                    mu.list.push(sub);
                                }

                            });
                        }

                        
                    }

                    realList.push([]);

                    var beginIndex = realList.length - 1;
                    arrayUtil.forEach(muList, (item) => {
                        var curIndex = item.index;
                        arrayUtil.forEach(item.list, sub => {
                            realList[beginIndex][curIndex] = sub;
                            curIndex++;
                        });
                        beginIndex--;
                    });

                    list = realList;

                } else {
                    var remainLen = rowLen - list.length;
                    for (var i = 0; i < remainLen; i++) {
                        var emptyRow = [];
                        arrayUtil.forEach(list[0], item => {
                            emptyRow.push(null)
                        });
                        list.push(emptyRow)
                    }
                }


                arrayUtil.forEach(list, item => {
                    
                    var remainLen = colLen - item.length;
                    if (remainLen > 0) {
                        for (var i = 0; i < remainLen; i++) {
                           
                            item.push(null)
                        }
                    }
                });

                lztData.list = list;
                this.lztData = lztData;

            },
            getCatalog(){
                this.walletBal = this.user.walletBal
            },
            buildLztData(lzballActive, lztypeActive){
                var history = this.buildAnalysisHistory();
                var lotteryType = this.kgLottery.type;
                var fullNums = lotteryType.fullNums;

                var allDescList = [];
                var currentDescList = [];
                var prevDesc = null;
                var maxLen = 0;
                var daQty = 0;
                var xiaoQty = 0;
                var danQty = 0;
                var suangQty = 0;


                if (lzballActive != this.lztZh.id) {
                    arrayUtil.forEach(history, (item) => {

                        var nums = item.nums.split(" ");
                        var n = nums[lzballActive];
                        if (n == "-") {
                            return;
                        }
                        n = n / 1;

                        var desc = null;


                        if (n >= lotteryType.singleDx.da.begin && n <= lotteryType.singleDx.da.end) {
                            if (lztypeActive == "dx") {
                                desc = "大";
                            }
                            daQty++;
                        }

                        if (n >= lotteryType.singleDx.xiao.begin && n <= lotteryType.singleDx.xiao.end) {
                            if (lztypeActive == "dx") {
                                desc = "小";
                            }
                            xiaoQty++;
                        }


                        if (n % 2 != 0) {
                            if (lztypeActive == "ds") {
                                desc = "单";
                            }
                            danQty++;
                        } else {
                            if (lztypeActive == "ds") {
                                desc = "双";
                            }
                            suangQty++;
                        }

                        if (desc != prevDesc) {
                            currentDescList = [];
                            currentDescList.push({issueno: item.issueno, nums: item.nums, desc: desc,active:false});
                            allDescList.push(currentDescList);
                            prevDesc = desc;
                        } else {
                            currentDescList.push({issueno: item.issueno, nums: item.nums, desc: desc,active:false});
                        }


                        if (currentDescList.length > maxLen) {
                            maxLen = currentDescList.length;
                        }

                    });
                }

                if (lzballActive == this.lztZh.id) {
                    arrayUtil.forEach(history, (item) => {
                        if (item.nums == null || item.nums.indexOf("-") >= 0) {
                            return;
                        }

                        var nums = item.nums.split(" ");
                        var sum = 0;
                        arrayUtil.forEach(nums, n => {
                            sum += n / 1;
                        });
                        var desc = null;
                        if (sum >= lotteryType.sumDx.da.begin && sum <= lotteryType.sumDx.da.end) {
                            if (lztypeActive == "dx") {
                                desc = "大";
                            }
                            daQty++;
                        }

                        if (sum >= lotteryType.sumDx.xiao.begin && sum <= lotteryType.sumDx.xiao.end) {
                            if (lztypeActive == "dx") {
                                desc = "小";
                            }
                            xiaoQty++;
                        }


                        if (sum % 2 == 0) {
                            if (lztypeActive == "ds") {
                                desc = "双";
                            }
                            suangQty++;
                        } else {
                            if (lztypeActive == "ds") {
                                desc = "单";
                            }
                            danQty++;
                        }

                        if (desc != prevDesc) {
                            currentDescList = [];
                            currentDescList.push({issueno: item.issueno, nums: item.nums, desc: desc,active:false});
                            allDescList.push(currentDescList);
                            prevDesc = desc;
                        } else {
                            currentDescList.push({issueno: item.issueno, nums: item.nums, desc: desc,active:false});
                        }


                        if (currentDescList.length > maxLen) {
                            maxLen = currentDescList.length;
                        }

                    });
                }


                var trs = [];

                arrayUtil.forEach(allDescList, (descList, index) => {
                    if (index == 0) {
                        arrayUtil.forEach(descList, dl => {
                            trs.push([dl]);
                        });

                        var remainSize = maxLen - descList.length;
                        if (remainSize > 0) {
                            for (var i = 0; i < remainSize; i++) {
                                trs.push([null]);
                            }
                        }

                    } else {
                        arrayUtil.forEach(descList, (dl, subIndex) => {
                            trs[subIndex].push(dl)
                        });

                        var remainSize = maxLen - descList.length;
                        if (remainSize > 0) {
                            for (var i = 0; i < remainSize; i++) {
                                trs[descList.length + i].push(null)
                            }
                        }
                    }
                });

                var lztData = {};
                lztData.daQty = daQty;
                lztData.xiaoQty = xiaoQty;
                lztData.danQty = danQty;
                lztData.suangQty = suangQty;
                lztData.list = trs;
                return lztData;

            },
            buildLmclData(){
                var _this = this;
                var lztColumns = this.lztColumns;

                var descFlagList = ["dx", "ds"];

                var lmclList = [];
                arrayUtil.forEach(lztColumns, col => {
                    arrayUtil.forEach(descFlagList, desc => {

                        var lztData = _this.buildLztData(col.id, desc);

                        var qty = 0;
                        var displayDesc = null;
                        for (var i = 0; i < lztData.list.length; i++) {
                            var tds = lztData.list[i]
                            var td = tds[tds.length - 1];
                            if (td == null) {
                                break;
                            }
                            displayDesc = td.desc;
                            qty++;

                        }
                        lmclList.push({name: col.name, desc: displayDesc, qty: qty});

                    });
                });

                //排序
                lmclList.sort(function (a, b) {
                    return b.qty - a.qty;
                })
                this.lmclList = lmclList;

            },
            buildAnalysisHistory(){
                var history = [];
                arrayUtil.pushAll(history, this.kgLottery.history);
                var spliceLen = 40;
                history.splice(spliceLen, history.length - spliceLen);
                history.reverse();
                return history;
            },

            showLzt(item,event){
                //console.log(item) 
                $('.findActive').children().find('.active').removeClass('active');
                if(item){
                    item.active = true;
                    this.lalterSuccess('期号：'+item.issueno+'号码：'+item.nums);
                    setTimeout(() =>{
                        item.active = false;
                    },3000)
                }
                
            }

        },
        components: {
            'v-sscTwoface':sscTwoface,
            'v-sscNumber':sscNumber,
            'v-sscDouniu':sscDouniu,
            'v-sscTeshu':sscTeshu,
            'v-sscOneSpan':sscOneSpan,

            'v-x5Twoface':x5Twoface,
            'v-x5Number':x5Number,

            'v-klTwoface':klTwoface,
            'v-klBall0102':klBall0102,
            'v-klBall0304':klBall0304,
            'v-klBall0506':klBall0506,
            'v-klBall0708':klBall0708,
            'v-klZH':klZH,
            "v-pk8Twoface":pk8Twoface,
            "v-pk8Ball0104":pk8Ball0104,
            "v-pk8Ball0508":pk8Ball0508,
            "v-pk8GYH":pk8GYH,
            'v-pkTwoface':pkTwoface,
            'v-pkBall0105':pkBall0105,
            'v-pkBall0610':pkBall0610,
            'v-pkGYH':pkGYH,
            'v-k3HZ':k3HZ,
            'v-k3LLDD':k3LLDD,
            'v-k3BZDZ':k3BZDZ,
            'v-k3TS':k3TS,
            'v-fc3DBall0103':fc3DBall0103,
            'v-fc3DTs':fc3DTs,
            'v-pcddBall':pcddBall,
            'v-pcddTs':pcddTs,

            'v-lhcTM':lhcTM,
            'v-lhcZM':lhcZM,
            'v-lhcTwoface':lhcTwoface,
            'v-lhcLM':lhcLM,
            'v-lhcLX':lhcLX,
            'v-lhcLW':lhcLW,
            'v-lhcSX':lhcSX,
            'v-lhcSB':lhcSB,
            'v-lhcTWS':lhcTWS,
            'v-lhcHX':lhcHX,

            //幸运星座
            'v-xyxzTM':xyxzTM,
            'v-xyxzZM':xyxzZM,
            'v-xyxzTwoface':xyxzTwoface,
            'v-xyxzLM':xyxzLM,
            'v-xyxzLX':xyxzLX,
            'v-xyxzLW':xyxzLW,
            'v-xyxzSX':xyxzSX,
            'v-xyxzSB':xyxzSB,
            'v-xyxzTWS':xyxzTWS,
            'v-xyxzHX':xyxzHX,
        },
        watch: {
            'kgLottery.totalMoney':function(){
                var _this = this;
                if(_this.submenuType!='xglhc'&&this.submenuType!='xyxz'){
                    arrayUtil.forEach(_this.kgLottery.playTypes, pt => {
                        arrayUtil.forEach(pt.betTypes, bt => {
                            if(bt.active){
                                bt.val = _this.kgLottery.totalMoney;
                            }
                        });
                    });
                }else{
                    arrayUtil.forEach(_this.kgLottery.playTypes, pt => {
                        arrayUtil.forEach(pt.betTypes, bt => {
                            arrayUtil.forEach(bt.beteTypes,bet =>{
                                if(bet.active){
                                    bet.val = _this.kgLottery.totalMoney;
                                }
                            })
                        });
                    });
                }
            },
            
        },
        mounted(){
            
            let _this = this;
            document.addEventListener('click',function(e){
                if(e.target.className!='showChips'){
                    _this.chipsShow = false;
                }
            },true)
            this.$watch('user', this.getCatalog, {
                deep: true,
            });

        },
        beforeDestroy () {
            if(this.$parent.isDestory){
                console.log("kg destroy...")
                kgBusiness.destroy();
            }
        }
        
    }
</script>
<style>
    .chatroom-area{
        overflow-x: hidden;
        
    }
    .kg-xglhc-submenu{
        /* position: fixed;
        top: 1.18rem;
        right: 0;
        bottom: 0;
        min-height: 100%; */
        min-height: 3.1rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .kg-xglhc-submenu ul{
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .delete{
        font-size: 0.2rem
    }
</style>
