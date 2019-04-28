<template>
    <div>
        <header class="report-header-main">
            <div class="report-select">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
               <h1>团队盈亏</h1>
               <!-- <ul class="display-box">
                    <li :class="{'active':selectType=='cp'}" @click="typeChange('cp',true)">彩票</li>
                    <li :class="{'active':selectType=='kg'}" @click="typeChange('kg',true)" v-if="user.isOpenKg">KG</li>
                    <li :class="{'active':selectType=='sx'}" @click="typeChange('sx',true)">视讯</li>
                </ul>-->
                <div class="member-icon" @click="dialogDate=true">
                    <i class="iconfont icon-tou_riqixuanze"></i>
                </div>
            </div>
            <div class="report-header">
                <div><b>{{data.ALLSSUM.allprofitloss>0?'+':''}}{{data.ALLSSUM.allprofitloss | fixedMoney}}</b> <span class="report-header-tip">(元)</span></div>
                <p class="title_desc">活动赠送: {{data.ALLSSUM.hdzs | fixedMoney}}</p>
            </div>
        </header>
        <section class="report-con-main">
          <!--  <component :is="reportType" :data="data" ref="subReport"></component>-->
            
           <ul class="platform-report-wrap">
               <li v-for="item in platformList" class="platform-report">
                   <div class="list-top">
                       <div class="w-60">
                           <img :src="require('../../assets/images/account/report_icon_'+item.name+'.png')" alt="">
                       </div>
                       <div class="platform-name">
                           {{item.desc}}
                           <p v-if="item.name == 'lottery'"> {{(data.ALLSSUM.lotterywinmoneytotal-data.ALLSSUM.lotteryordermoneytotal+
                               data.ALLSSUM.lotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal)>0?'+':''}}{{(data.ALLSSUM.lotterywinmoneytotal-data.ALLSSUM.lotteryordermoneytotal+
                               data.ALLSSUM.lotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal)  | fixedMoney}}
                           </p>
                           <p v-if="item.name == 'kg'"> {{(data.ALLSSUM.kjlotterywinmoneytotal-data.ALLSSUM.kjlotteryordermoneytotal+
                               data.ALLSSUM.kjlotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal)>0?'+':''}}{{(data.ALLSSUM.kjlotterywinmoneytotal-data.ALLSSUM.kjlotteryordermoneytotal+
                               data.ALLSSUM.kjlotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal)  | fixedMoney}}
                           </p>
                           <p v-if="item.name == 'AG'"> {{data.ALLSSUM.agvideowinmoneytotal + data.ALLSSUM.agselfbonusmoney>0?'+':''}}{{(data.ALLSSUM.agvideowinmoneytotal + data.ALLSSUM.agselfbonusmoney) | fixedMoney}}
                           </p>
                           <p v-if="item.name == 'BBIN'"> {{((data.ALLSSUM.bbinvideowinmoneytotal + data.ALLSSUM.bbinsportwinmoneytotal + data.ALLSSUM.bbinvideogamewinmoneytotal) / 1
                               + data.ALLSSUM.bbselfbonusmoney / 1)>0?'+':''}}{{((data.ALLSSUM.bbinvideowinmoneytotal + data.ALLSSUM.bbinsportwinmoneytotal + data.ALLSSUM.bbinvideogamewinmoneytotal) / 1
                               + data.ALLSSUM.bbselfbonusmoney / 1)  | fixedMoney}}
                           </p>
                           <p v-if="item.name == 'MG'"> {{(data.ALLSSUM.mgvideowinmoneytotal + data.ALLSSUM.mgselfbonusmoney)>0?'+':''}}{{(data.ALLSSUM.mgvideowinmoneytotal + data.ALLSSUM.mgselfbonusmoney)  | fixedMoney}}
                           </p>
                           <p v-if="item.name == 'PT'"> {{(data.ALLSSUM.ptvideowinmoneytotal + data.ALLSSUM.ptselfbonusmoney)>0?'+':''}}{{(data.ALLSSUM.ptvideowinmoneytotal + data.ALLSSUM.ptselfbonusmoney)  | fixedMoney}}
                           </p>
                          
                           <p v-if="item.name == 'VR'"> {{data.ALLSSUM.vrvideowinmoneytotal - data.ALLSSUM.vrvideoordermoneytotal - data.ALLSSUM.vrvideodashangtotal + data.ALLSSUM.vrselfbonusmoney>0?'+':''}}{{data.ALLSSUM.vrvideowinmoneytotal - data.ALLSSUM.vrvideoordermoneytotal - data.ALLSSUM.vrvideodashangtotal + data.ALLSSUM.vrselfbonusmoney | fixedMoney}}
                           </p>
                           <p v-if="item.name == 'SB'"> {{data.ALLSSUM.sbvideowinmoneytotal + data.ALLSSUM.sbselfbonusmoney>0?'+':''}}{{(data.ALLSSUM.sbvideowinmoneytotal + data.ALLSSUM.sbselfbonusmoney) | fixedMoney}}
                           </p>
                          
                           <p v-if="item.name == 'KY'"> {{data.ALLSSUM.kyvideowinmoneytotal + data.ALLSSUM.kyselfbonusmoney>0?'+':''}}{{(data.ALLSSUM.kyvideowinmoneytotal + data.ALLSSUM.kyselfbonusmoney) | fixedMoney}}
                           </p>
                       </div>
                   </div>
                   <ul class="list-bottom display-box ">
                       <li>
                           投注
                           <p v-if="item.name == 'lottery'">
                               {{(data.ALLSSUM.lotteryordermoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'kg'">
                               {{(data.ALLSSUM.kjlotteryordermoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'AG'">
                               {{data.ALLSSUM.agvideoordermoneytotal | fixedMoney}}</p>
                           <p v-if="item.name == 'BBIN'">
                               {{(data.ALLSSUM.bbinvideoordermoneytotal + data.ALLSSUM.bbinsportordermoneytotal + data.ALLSSUM.bbinvideogameordermoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'MG'">
                               {{data.ALLSSUM.mgvideoordermoneytotal | fixedMoney}}</p>
                           <p v-if="item.name == 'PT'">
                               {{data.ALLSSUM.ptvideoordermoneytotal | fixedMoney}}</p>
                           
                           <p v-if="item.name == 'VR'">
                               {{data.ALLSSUM.vrvideoordermoneytotal | fixedMoney}}</p>
                            <p v-if="item.name == 'SB'">
                               {{data.ALLSSUM.sbvideoordermoneytotal | fixedMoney}}</p>
                           
                           <p v-if="item.name == 'KY'">
                               {{data.ALLSSUM.kyvideoordermoneytotal | fixedMoney}}</p>
                       </li>
                       <li>
                           中奖
                           <p v-if="item.name == 'lottery'">
                               {{(data.ALLSSUM.lotterywinmoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'kg'">
                               {{(data.ALLSSUM.kjlotterywinmoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'AG'">
                               {{data.ALLSSUM.agvideowinmoneytotal | fixedMoney}}</p>
                           <p v-if="item.name == 'BBIN'">
                               {{(data.ALLSSUM.bbinvideowinmoneytotal + data.ALLSSUM.bbinsportwinmoneytotal + data.ALLSSUM.bbinvideogamewinmoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'MG'">
                               {{data.ALLSSUM.mgvideowinmoneytotal | fixedMoney}}</p>
                           <p v-if="item.name == 'PT'">
                               {{data.ALLSSUM.ptvideowinmoneytotal | fixedMoney}}</p>
                           
                           <p v-if="item.name == 'VR'">
                               {{data.ALLSSUM.vrvideowinmoneytotal | fixedMoney}}</p>
                            <p v-if="item.name == 'SB'">
                               {{data.ALLSSUM.sbvideowinmoneytotal | fixedMoney}}</p>
                            
                           <p v-if="item.name == 'KY'">
                               {{data.ALLSSUM.kyvideowinmoneytotal | fixedMoney}}</p>
                       </li>
                       <li>
                           返点
                           <p v-if="item.name == 'lottery'">
                               {{(data.ALLSSUM.lotteryselfbonusmoney+data.ALLSSUM.agentbonusmoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'kg'">
                               {{(data.ALLSSUM.kjlotteryselfbonusmoney+data.ALLSSUM.kjagentbonusmoneytotal) | fixedMoney}}</p>
                           <p v-if="item.name == 'AG'">
                               {{data.ALLSSUM.agselfbonusmoney | fixedMoney}}</p>
                           <p v-if="item.name == 'BBIN'">
                               {{data.ALLSSUM.bbselfbonusmoney | fixedMoney}}</p>
                           <p v-if="item.name == 'MG'">
                               {{data.ALLSSUM.mgselfbonusmoney | fixedMoney}}</p>
                           <p v-if="item.name == 'PT'">
                               {{data.ALLSSUM.ptselfbonusmoney | fixedMoney}}</p>
                           
                           <p v-if="item.name == 'VR'">
                               {{data.ALLSSUM.vrselfbonusmoney | fixedMoney}}</p>
                            <p v-if="item.name == 'SB'">
                               {{data.ALLSSUM.sbselfbonusmoney | fixedMoney}}</p>
                            
                           <p v-if="item.name == 'KY'">
                               {{data.ALLSSUM.kyselfbonusmoney | fixedMoney}}</p>
                       </li>
                   </ul>
               </li>
           </ul>
        </section>

        <div v-show="dialogDate">
            <div class="trend-cover-bg"></div>
            <div class="data-alert-main">
                <div class="data-set-main">
                    <div class="display-flex search-title">
                        <div class="flex-box" :class="searchType == 'user'?'active':''" @click="searchTag('user')">用户</div>
                        <div class="flex-box" :class="searchType == 'time'?'active':''" @click="searchTag('time')">时间</div>
                    </div>
                    <div class="search-time" v-if="searchType == 'time'">
                        <div class="display-flex">
                            <div class="report-set-title">时间跨度 :</div>
                            <div class="flex-box">
                                <ul class="display-flex data-select">
                                    <li class="flex-box" :class="quickDate == '-30'?'active':'' " @click="setDate(-30)">一个月</li>
                                    <li class="flex-box" :class="quickDate == '-15'?'active':'' " @click="setDate(-15)">半个月</li>
                                    <li class="flex-box" :class="quickDate == '-7'?'active':'' " @click="setDate(-7)">一周内</li>
                                    <li class="flex-box" :class="quickDate == '-1'?'active':'' " @click="setDate(-1)">当天</li>
                                </ul>
                            </div>
                        </div>
                        <div class="display-flex">
                            <div class="report-set-title">开始日期 :</div>
                            <div class="flex-box data-set-periods">
                                <div class="date-box" @click="openPicker('beginTime')">
                                    {{setting.beginTime}}
                                </div>
                            </div>
                        </div>
                        <div class="pt5 display-flex">
                            <div class="report-set-title">结束日期 :</div>
                            <div class="flex-box data-set-periods">
                                <div class="date-box" @click="openPicker('endTime')">
                                    {{setting.endTime}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-user" v-if="searchType == 'user'">
                        <div><img src="../../assets/images/icon37_b.png" alt="search"><input type="text" placeholder="请输入用户名" v-model="setting.username"></div>
                        <div @click="setting.usernameQuery = 1" :class="setting.usernameQuery == 1?'active':''">个人</div>
                        <div @click="setting.usernameQuery = 2" :class="setting.usernameQuery == 2?'active':''">团队</div>
                    </div>
                </div>
                <ul class="display-box trend-set-btn">
                    <li class="trend-set-cancel" @click="dialogDate = false">取 消</li>
                    <li @click="confirm">确 定</li>
                </ul>
            </div>
        </div>
        <mt-datetime-picker
                ref="picker" type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="pickerValue">
        </mt-datetime-picker>
    </div>
</template>

<script>
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import userBusiness from "../../assets/js/business/user/userBusiness" //个人信息接口
    import dateUtil from "../../assets/js/util/dateUtil";
    import recordSearchApi from '../../assets/js/api/recordSearchApi';
    import platformData from "../../assets/platform/main/platformData"

    export default {
        data () {
            return {
                user: {},
                platformList:[],
                quickDate:-1,
                searchType:'time',
                setting: {
                    beginTime: null,
                    endTime: null,
                    username:null,
                    usernameQuery:2,
                },
                pickerValue: '',
                datePropName: null,
                dialogDate: false,
                data: {
                    init:false,
                    ALLSSUM:{
                        allprofitloss:0
                    }
                }
            }
        },
        created(){
            var _this = this;
            var platforms = [
                {name: "lottery", desc: "彩票平台",},
                {name: "kg", desc: "KG平台", },
            ];
            arrayUtil.forEach(platformData.trdPlatforms, item => {
                if (item.enabled == false) return;
                var trdPlatform = {
                    name: item.code,
                    desc: item.desc +'平台',
                };
                platforms.push(trdPlatform);
            });
            _this.platformList=platforms;

            this.setting.beginTime = dateUtil.getBeforeDayDate(-1);
            this.setting.endTime = dateUtil.getBeforeDayDate(1);
            userBusiness.getUser(_this, function (user) {
                _this.user = user;
            });
            this.search();
        },
        methods: {
            confirm(){
                this.dialogDate = false;
                this.search();
            },
            searchTag(type){
              this.searchType = type;
            },
            setDate(d){
                this.quickDate = d;
                this.setting.beginTime = dateUtil.getBeforeDayDate(d);
                this.setting.endTime = dateUtil.getBeforeDayDate(1);
            },
            search() {
                var _this = this;

                var params = {
                    statisticsTime_begin: _this.setting.beginTime,
                    statisticsTime_end: _this.setting.endTime,
                    username: _this.setting.username,
                    usernameQuery: _this.setting.usernameQuery,
                }
               // _this.lshowWait();
                recordSearchApi.TeamLoss(params, function (res) {
                    _this.lcloseWait()
                    if(res.code!=200){
                        _this.lalterWarning(res.msg)
                        return
                    }
                    var data = res.data;
                    if(data.MIR==null || data.MIR.length==0){
                        _this.lalterWarning("暂时查询不到数据")
                        return;
                    }
                    data.init=true;
                    _this.data = data;
                });
            },

            openPicker(propName) {
                this.datePropName = propName;
                this.pickerValue = new Date(this.setting[propName]);
                this.$refs.picker.open();
            },
            goback: function () {
                this.$router.push('/agentCenter');
            },
        },
        watch: {
            "pickerValue": function () {
                this.setting[this.datePropName] =dateUtil.toYYYY_MM_DD(new Date( this.pickerValue));
            },
            "dialogDate":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
            }
        },
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .member-icon img{
        width: initial;
    }
    .search-title{
        line-height:0.3rem;
        div{
            text-align: center;
            &.active{
                 background: #7d7d7d;
                 color: #fff;
             }
        }
    }
    .search-user img{
        width: 0.16rem;
        vertical-align: middle;
    }
    .search-user input{
        height: 0.25rem;
        border: none;
        font-size: 0.12rem;
        text-align: center;
    }
    .search-user div.active{
        color: @main-color;
    }
    .w-60 img{
        width:0.5rem;
        height: 0.5rem;
    }
</style>
