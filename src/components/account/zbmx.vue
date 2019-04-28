<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>帐变明细</h1>
                <div class="member-icon" @click="dialogDate=true">
                    <i class="iconfont icon-tou_riqixuanze"></i>
                </div>
            </header>
        </div>
        
        <section class="report-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
            <ul class="display-box recording-list"  v-for="item in records.MIR">
                <li>
                    <p>{{records.MCDTYPE[item.profitlosssubtypeid]}}</p>
                    <p>单号: <span>{{item.ordernumber}}</span></p>
                    <p>{{item.profitlossdt | time}}</p>
                </li>
                <li class="text-right">
                    <p class="red">¥ {{item.profitlossmoney}}</p>
                    <p>余额：¥ <span class="green">{{item.currentavailableamount | fixedMoney}}</span></p>
                </li>
            </ul>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <div v-show="dialogDate">
            <div class="trend-cover-bg"></div>
            <div class="data-alert-main">

                <div class="data-set-main">
                    <div class="display-flex pt10">
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
    import dateUtil from '../../assets/js/util/dateUtil';
    import RecordList from '../../assets/js/api/recordSearchApi';
    import arrayUtil from '../../assets/js/util/arrayUtil.js';

    export default {
        data () {
            return {
                records: {
                    MIR:[]
                },
                ccPage: 0,
                loading:false,
                loadicon:false,
                loadingDesc:"",
                searchTime:null,

                dialogDate: false,
                quickDate:-1,
                pickerValue: '',
                thirdPlatform:false,
                setting: {
                    beginTime: null,
                    endTime: null
                },
            }
        },
        methods: {
            confirm(){
                this.dialogDate = false;
                this.loadMore()
            },
            setDate(d){
                this.quickDate = d;
                this.setting.beginTime = dateUtil.getBeforeDayDate(d);
                this.setting.endTime = dateUtil.getBeforeDayDate(1);
                this.searchTime = this.setting;
            },
            goback:function(){
                this.$router.go(-1);
            },
            loadMore(){
                let _this = this;
                
                this.loading = true;
                this.loadicon = true;
                this.ccPage++;
                let params = {
                        "profitlossdt_begin":_this.searchTime.beginTime,
                        "profitlossdt_end":_this.searchTime.endTime,
                        "ccPage":this.ccPage,
                        "profitlosssubtypeid":'-1' //账变类型
                    }
                RecordList.getProfitLossList(params,  (res) =>{
                    _this.loadicon = false;
                    if(res.code==200){
                        var data=res.data;
                        _this.loading = data.PAGE.count<10;
                        _this.records.MCDTYPE = data.MCDTYPE;
                        arrayUtil.pushAll(_this.records.MIR,data.MIR);
                        if(_this.records.MIR.length == 0){
                            _this.loadingDesc="暂无数据";
                        }else{
                            _this.loadingDesc="";
                        }   
                    }else{
                        _this.lalterWarning(res.msg);
                    }                             
                    
                });
            },
        },
        created(){
            this.setting.beginTime = dateUtil.getBeforeDayDate(-1);
            this.setting.endTime = dateUtil.getBeforeDayDate(1);
            this.searchTime = this.setting
        },
        components: {}
    }
</script>
<style scoped>

</style>
