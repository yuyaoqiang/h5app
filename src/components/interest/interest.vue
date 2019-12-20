<template>
    <div class="interest-content">
        <header class="pr interest-header-box">
            <div class="header-arrow-box" id="back_icon" @click="goback">
                <i class="el-icon-arrow-left back-icon"></i>
            </div>
            <h1 class="header-title">余额宝</h1>
            <span class="active-deatil" @click="changeVisiableDetail">活动说明</span>
        </header>
        <article class="interest-titble">
                <p class="interest-yesterday">昨日收益(元)</p>    
                <p class="interest-monery"><span>{{user.yebYesterdayProfit}}</span></p>    
                <p class="interest-monery-count">总余额 {{user.yebBal}}</p>    
        </article>
            <article class="interest-money">
            <p>
                <span>累计收益 (元)</span>
                <span>{{user.yebTotalProfit}}</span>
            </p>
            <p>
                <span>月收益利率</span>
                <span>39%</span>     
            </p>
        </article>
        <article class="interest-echart">
           <v-line  v-if="loaded"  :styles="{height: '2.2rem',margin:'0.2rem 0 0 0', position: 'relative'}" :chartdata="datacollection" :options="datacollection.options"></v-line>
        </article>
        <div class="translate-interest-detail" v-if="visiableDetail">
            <div class="mask-interest"></div>
            <div class="translate-interest-detail-modal">
                <h3>活动说明</h3>
                <article>
                    <p>由于支付风控形势日益严峻，亚博娱乐为了减轻财务资金流的压力，特推出【余额宝】优惠活动，与会员实现共赢。</p>
                    <p class="cneter-p">★活动内容★</p>
                    <p>1：当日基准利率<span class="red">0.3%</span>。额外利率<span class="red">1%</span>，以小时为单位。</p>
                    <p>2：当日存款资金需完成打码量方可存入余额宝。</p>
                    <p>3：余额宝转入账户余额，加赠<span class="red">1%彩金</span>，相当于银行存款。</p>
                    <p class="cneter-p">★收益计算规则★</p>
                    <p>在<span class="red">24</span>小时内，可获取额外利率：</p>
                    <p>收益=<span class="red">存入金额*（基准利率+额外利率）/24H*存入小时</span></p>
                    <p>在<span class="red">24</span>小时之外，只获取基准利率：</p>
                    <p>收益=<span class="red">存入金额*（基准利率+0）/24H*（存入小时-24H）</span></p>
                    <p>存入时间=终止时间 - 买进时间，按时取整。</p>
                    <p class="cneter-p">★规则条款★</p>
                    <p>1.此优惠特为真实玩家而设，如发现任何团体或个人，以不诚实方式套取红利等行为，公司有权保留冻结该账户的权利。</p>
                    <p>2.亚博集团保留对活动的最终解释权；以及在无通知的情况下修改、终止活动的权利；适用于所有优惠。</p>
                </article>
                <div class="login-btnbox-detail"  @click="changeVisiableDetail">关闭</div>
            </div>
        </div>
        <div class="translate-interest-main" v-if="visiable">
            <div class="mask-interest"></div>
            <div class="translate-interest-modal">
                <h3>{{transferin == 20?'转入余额宝':'转出余额宝'}}</h3>
                <p v-if="transferin == 20">当前钱包余额:{{user.walletBal}}元</p>
                <p v-if="transferin != 20">当前余额宝余额:{{user.yebBal}}元</p>
                <dl class="display-flex login-input-wrap">
                    <dd class="flex-box interest-input">
                        <span>请输入金额</span>
                        <input type="number" v-if="transferin == 20" placeholder="请输入转入金额" name="username" v-model.trim="money"/>
                        <input type="number"  v-if="transferin != 20"  placeholder="请输入转出金额" name="username" v-model.trim="money"/>
                    </dd>
                </dl>
                <div class="login-btnbox">
                        <button type="button" class="login-btn"  @click="changeVisiable()">取消</button>
                        <button type="button" class="login-btn"  @click="submitInterest()">确定</button>
                </div>
            </div>
        </div>
        <footer class="interest-footer">
            <span @click="changeVisiable(20,0)">转入</span>
            <span @click="changeVisiable(0,20)">转出</span>
        </footer>
    </div>
</template>
<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import userInfo from  "../../assets/js/api/userInfo";
    import { Indicator,Toast } from 'mint-ui';
    import bankApi from "../../assets/js/api/bankApi.js"    
    import line from "./line.vue"
    export default {
        data () {
           return {
                datacollection: null,
                loaded: false,
                outMoney:0,
                visiable:false,
                visiableDetail:false,
                user:{},
                token:'',
                money:null,
                transferout:'',
                transferin:''
            }
        },
        created() {
              this.fillData();
              this.getUser();
              this.getTokent();
        },
        components: {
        'v-line':line
        },
        
        methods:{
            getUser(){
                var _this = this;
                userBusiness.getUser(this,function (user) {
                _this.user=user;
                _this.userGrade = user.userGrade?user.userGrade.slice(3):0;
                _this.datacollection.labels = user.days;
                _this.datacollection.datasets[0].data = user.profit;
                _this.loaded = true
            });
            },
            getTokent(){
            let _this = this;
            bankApi.TransfInit(function (res) {
                _this.token = res.data
            });
            },   
            submitInterest(){
               var _this = this;
               if(this.money == 0 ){
                    _this.lalterWarning('最低额度为一元整');
                    return false;
                }
                Indicator.open('加载中...');
                var params = {
                    "money": this.money,
                    "transferout": this.transferout,
                    "transferin": this.transferin,
                    "token": this.token
                };
                    bankApi.capitalTransfer(params, (resp) => {
                        _this.token = resp.data
                        if (resp.code == 200) {
                            Indicator.close();
                            Toast({
                                message: '提交成功',
                            });
                             this.visiable = false;
                            _this.getUser();

                        }else{
                            Indicator.close();
                            Toast( {
                                message: resp.msg,
                                duration: 2000
                            })
                        }
                    });
            },
            changeVisiableDetail(){
                this.visiableDetail = !this.visiableDetail;
            },
            changeVisiable(tranformIn,tranformOut){
                this.transferin = tranformIn;
                this.transferout = tranformOut
                this.money= null;
                this.visiable = !this.visiable;
            },
            goback(){
                this.$router.push('/home')
            },
            fillData () {
                this.datacollection = {
                labels: [],
                datasets: [
                    {
                    backgroundColor: '#ff6b61',
                    pointBackgroundColor: '#33bd64',
                    borderWidth: 6,
                    pointBorderColor: '#33bd64',
                    data: []
                    }
                ],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title:{
                        display:true,
                        text:'7日收益走势图',
                        fontSize:16
                      },
                    legend:{
                        display:false
                    },
                    tooltips:{
                        intersect:false,
                        mode: 'x'
                        }
                    }
                }
            }
        },
    }
</script>


<style lang="less" scoped>
.interest-header-box{
    height: 0.44rem;
    line-height: 0.44rem;
    color: #fff;
    background:#ff6b61;
    .header-title{
        font-size: 0.14rem;
        font-weight: normal;
        text-align: center;
    }
}
.active-deatil{
    position: absolute;
    right: 0.05rem;
    top: 0;
    z-index: 4;
    text-align: center;
    font-size: 0.12rem;
}
.interest-titble{
    width: 100%;
    height: 1.5rem;
    background-image: url("../../assets/images/interest/header-interest.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .interest-yesterday{
    }
    .interest-monery{
        padding: 0.1rem 0;
        font-size: 0.22rem;
    }
    .interest-monery-count{
        font-size: 0.14rem;
    }
}
.interest-content{
    background:#fff;
    position: relative;
}
.interest-money{
    display: flex;
    padding: 0.1rem 0;
    color: #8a8a8a;
    p{
        flex: 1 1 50%;
        display: flex;
        flex-flow: column;
        justify-content: center;   
        align-items: center;
        span:nth-last-child(1){
            color: #ff6b61;
        }
    }
}
.interest-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.4rem;
    width: 100%;
    display: flex;
    color: #ff6b61;
    box-shadow: 0 -1px 0 #f4f4f4;
    -webkit-box-shadow: 0 -1px 0 #f4f4f4;
    font-size: 0.14rem;
    span{
        flex: 1 1 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span:nth-last-child(1){
        background: #ff6b61;
        color: #fff;
    }
    span:nth-last-child(2){
        background: #ffffff;
    }
}  
.interest-echart{
    height: 1rem !important;
}
.mask-interest{
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.9;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #8a8a8a;
    z-index: 99;
}
.translate-interest-modal{
    width: 80%;
    height: 2rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:#ff857b;
    background-size: 100%;
    background-repeat: no-repeat;
    margin: auto;
    z-index: 199;
    border-radius: 0.2rem;
        color: #fff;
    h3{
        text-align: center;
        padding: 0.12rem;
        border-bottom: 1px solid #fff;
    }
    p{
        text-align: center;
        padding: 0.16rem 0;
        color: #fff;
    }
    .login-input-wrap{
        margin: 0 0.1rem;
    }
    .interest-input{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: baseline;
        span{
            flex: 1 1;
        }
     input {
        flex: 1 1;
        height: 0.32rem;
        background: #fff;
        box-sizing: border-box;
        font-size: 0.12rem;
        border-radius: 20px;
        border: 1px solid rgb(255, 127, 127);
        margin-bottom: 8px;
        color: #3d3d3d;
        padding: 0px 0px 0 0.05rem;
        background-position: 15px 12px;
        }
    }
    .login-btnbox{
        display: flex;
        flex-flow: nowrap;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0;
        box-shadow: 0 -1px 0 #f4f4f4;
        -webkit-box-shadow: 0 -1px 0 #f4f4f4;
        .login-btn{
            flex: 1 1 50%;
            height: 0.34rem;
            border: none;
            font-size: 0.16rem;
            color: #292c35;
            color: #fff;
            background: #ff464b;
        }
        button:nth-child(1){
            color: #c3c3c3;
            background: #fff;
            border-radius: 0  0  0 0.2rem !important;
        }
        button:nth-child(2){
            background: #ff857b;
            border-radius: 0  0 0.2rem 0 !important ;
        }
    }
}

.translate-interest-detail-modal{
    width: 90%;
    max-height: 4rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:#ff857b;
    background-size: 100%;
    background-repeat: no-repeat;
    margin: auto;
    z-index: 199;
    border-radius: 0.2rem;
    color: #fff;
    article{
       height: 3.2rem;;
       overflow: hidden;
       overflow-y: auto;
       padding: 0 0.08rem;
       background: white;
    }
    h3{
        text-align: center;
        padding: 0.12rem;
        border-bottom: 1px solid #fff;
    }
    p{
        padding: 0.08rem 0 0 0;
        color: #585858;
        font-size: 0.12rem;
    }
    .cneter-p{
        text-align: center;
    }
    .login-input-wrap{
        margin: 0 0.1rem;
    }
    .login-btnbox-detail{
        height: 0.38rem;
        line-height: 0.38rem;
        background: #ff857b;
        border-radius: 0 0 0.2rem 0.2rem;
        text-align: center;
        color: #ffffff;
        font-weight: 600;
    }
    .login-btnbox{
        display: flex;
        flex-flow: nowrap;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0;
        box-shadow: 0 -1px 0 #f4f4f4;
        -webkit-box-shadow: 0 -1px 0 #f4f4f4;
        .login-btn{
            flex: 1 1 50%;
            height: 0.34rem;
            border: none;
            font-size: 0.16rem;
            color: #292c35;
            color: #fff;
            background: #ff464b;
        }
    }
}
</style>
