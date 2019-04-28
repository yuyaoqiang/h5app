
<template>
    <div>
        <header class="report-header-main">
            <div class="report-select">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>站内信息</h1>
                <div class="member-icon" @click="dialogDate=true">
                    <span @click="dialogSearch = true">
                        <i class="iconfont icon-dibu_shezhi"></i>
                    </span>
                     <span  @click="toSendEmail()">
                        <i class="iconfont icon-tou_xinxi"></i>
                    </span>
                </div>
            </div>
        </header>
        <section class="email-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
            <ul class="email-wrap">
                <li v-for="item in data.MAG" class="display-flex" @click="toDetails(item)">
                    <div>
                        <img src="../../assets/images/icon29.png">
                    </div>
                    <div class="email-info">
                        <span>{{item.messagetype == '0'?'系统消息':'私人消息'}}</span>
                        <span>{{item.isread == '0'?'未读':'已读'}}</span>
                        <span class="time">{{item.sendtime | time}}</span>
                        <p>
                            {{item.messagecontent==null?null:item.messagecontent.length<=20?item.messagecontent:item.messagecontent.substr(0,20)+'...'}}
                        </p>
                    </div>
                    <div class="delete" @click.stop="deleteMessage(item)"><i class="el-icon-delete"></i></div>
                </li>
            </ul>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <!--搜索设置-->
        <div v-show="dialogSearch">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">搜索设置</h1>
                <div class="trend-set-main">
                    <div class="display-flex" v-for="s in searchSetting">
                        <div class="trend-set-title">{{s.desc}} :</div>
                        <div class="flex-box trend-set-periods">
                            <ul class="display-box">
                                <li v-for="item in s.options" >
                                    <input type="radio" :id="item.desc" v-model="setting[s.type]" :name="s.type" :value="item.value" class="user-radio"/>
                                    <label :for="item.desc">{{item.label}}</label>
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
    </div>
</template>

<script>
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import dateUtil from "../../assets/js/util/dateUtil";
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import recordSearchApi from '../../assets/js/api/recordSearchApi';

    export default {
        data () {
            return {
                data: {
                    MAG:[]
                },
                loading:false,
                loadicon:false,
                loadingDesc:"",
                dialogSearch:false,
                searchSetting:[
                    {
                        desc:'类型',
                        type:'messagetype',
                        options: [
                            {desc:'mesall',value: '-1', label: '全部'},
                            {desc:'os',value: '0', label: '系统'},
                            {desc:'self',value: '1', label: '私人'}
                        ],
                    },
                    {
                        desc:'收发',
                        type:'astype',
                        options: [
                            {desc:'asall',value: '-1', label: '全部'},
                            {desc:'accept',value: '0', label: '接收'},
                            {desc:'send',value: '1', label: '发送'}
                        ],
                    },
                    {
                        desc:'状态',
                        type:'isread',
                        options: [
                            {desc:'readall',value: '-1', label: '全部'},
                            {desc:'not',value: '0', label: '未阅读'},
                            {desc:'has',value: '1', label: '已阅读'}
                        ],
                    }
                ],
                setting: {
                    sendername: '',
                    betTime_begin: null,
                    betTime_end: null,
                    messagetype: -1,
                    astype: -1,
                    isread: -1,
                    ccPage: 0,
                },
            }
        },
        created(){
        },
        methods: {
            loadMore(){
                let _this = this;
                var searchTime=dateUtil.getSearchDateLimit(500);
                this.loading = true;
                this.loadicon = true;
                this.setting.ccPage++;

                let params = {
                    sendername: this.setting.sendername,
                    send_time_begin: searchTime.beginTime,
                    send_time_end: searchTime.endTime,
                    messagetype: this.setting.messagetype || -1,
                    astype: this.setting.astype || -1,
                    isread: this.setting.isread || -1,
                    ccPage: this.setting.ccPage,
                }
                recordSearchApi.getMessageRecords(params,  (res) =>{
                    if(res.code==200){
                         var data=res.data;
                        _this.loading = data.PAGE.count<10;
                        arrayUtil.pushAll(_this.data.MAG,data.MAG);
                        if(_this.data.MAG.length == 0){
                            _this.loadingDesc="暂无数据";
                            this.loadicon = false;
                            return;
                        }else{
                            _this.loadingDesc="";
                        }
                    }else{
                        _this.lalterWarning(res.msg);
                    }
                    _this.loadicon = false;
                });
            },
            search(){
                let _this = this;
                var searchTime=dateUtil.getSearchDateLimit(500);
                this.loadicon = true;
                this.setting.ccPage= 1;
                let params = {
                    sendername: this.setting.sendername,
                    send_time_begin: searchTime.beginTime,
                    send_time_end: searchTime.endTime,
                    messagetype: this.setting.messagetype || -1,
                    astype: this.setting.astype || -1,
                    isread: this.setting.isread || -1,
                    ccPage: this.setting.ccPage,
                }
                recordSearchApi.getMessageRecords(params,  (res) =>{
                    if(res.code==200){
                         _this.data=res.data;
                        if(_this.data.MAG.length == 0){
                            _this.loadingDesc="暂无数据";
                            this.loadicon = false;
                            return;
                        }else{
                            _this.loadingDesc="";
                        }
                    }else{
                        _this.lalterWarning(res.msg);
                    }
                    _this.loadicon = false;
                });
                _this.dialogSearch=false;
            },
            toDetails(d){
                
                this.$router.push({path:'/emailDetails',query:{sendername: d.sendername,sendtime: d.sendtime,messagecontent: d.messagecontent,readId:d.id}});
            },
            toSendEmail(){
                this.$router.push({path:'/emailSend'});
            },
            goback: function () {
                this.$router.push('/account');
            },
            deleteMessage(item){
                
                let _this = this;
                this.lconfirm("确定删除选中的消息?", null, function () {
                    let params = {
                        ids: item.id
                    }
                    
                    recordSearchApi.deleteMessage(params, function (res) {
                        if (res.code == 200) {
                            _this.search();
                            _this.lalterSuccess("删除成功");
                        } else {
                            _this.lalterError(res.msg);
                        }
                    })
                })
            }
        },
        watch: {
            "dialogDate":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
            },
            "dialogSearch":function(a,b){
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
    .trend-set-title {
        width: 0.6rem;
        line-height: 0.28rem;
        text-align: center;
    }
    .member-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: initial;
        height: 0.44rem;
        box-sizing: border-box;
        text-align: center;
    }
    .member-icon img {
        width: 0.2rem;
        margin-top: 0.12rem;
        margin-right: 0.12rem;
    }
    .email-height {
        // position: absolute;
        // left: 0;
        // top: 0.44rem;
        // bottom: 0;
        // right: 0;
        // overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
        padding-top: 0.44rem;
    }
    .email-wrap li {
        padding: 0.12rem;
        background: #fff;
        margin: 0.05rem 0.1rem;
        border: 1px solid #ddd;
        border-radius: 0.05rem;
        position: relative;
        img {
            width: 0.5rem;
            height: 0.5rem;
        }
    }
    div.email-info{
        flex: 1;
        padding-left: 0.1rem;
        color:#000;
        span:nth-of-type(1){
            margin-right: 0.1rem;
        }
        .time{ float: right; }
        p{margin-top: 0.1rem;}
    }
    div.delete{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0.3rem;
        height: 0.4rem;
        text-align: center;
    }
</style>
