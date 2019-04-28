<template>
    <div>
        
        <header class="report-header-main">
            <div class="report-select">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>意见箱</h1>
            </div>
        </header>
       
        
        <section class="fk-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
            <ul class="fk-wrap">
                <li v-for="item in data.MIR" >
                    <div class="question">
                        <span class="a">提</span>{{item.content}}
                        <p>{{item.opiniondate | time}}</p>
                    </div>
                    <div class="answer" v-if="item.parem1 !=null && item.parem1.length>0">
                        <span>答</span>{{item.parem1}}
                    </div>
                </li>
            </ul>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <div class="fk-btn-box">
            <button type="button" @click="toFkyj">提建议</button>
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
                    MIR:[]
                },
                loading:false,
                loadicon:false,
                loadingDesc:"",
                setting: {
                    beginTime: null,
                    endTime: null,
                    ccPage: 0,
                },
            }
        },
        created(){
        },
        methods: {
            loadMore(){
                var searchTime=dateUtil.getSearchDateLimit(500);
                let _this = this;
                this.loading = true;
                this.loadicon = true;
                this.setting.ccPage++;
                let params = {
                    "timebegin":searchTime.beginTime,
                    "timeend":searchTime.endTime,
                    "ccPage":_this.setting.ccPage,
                }
                recordSearchApi.getOpinionList(params,  (res) =>{
                    var data=res.data;
                    _this.loading = data.PAGE.count<10;
                    if(res.code==200){
                        arrayUtil.pushAll(_this.data.MIR,data.MIR);
                        if(_this.data.MIR.length == 0){
                            _this.loadingDesc="暂无数据";
                            _this.loadicon = false;
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
            toFkyj(){
                userBusiness.toFkyj();
            },
            goback: function () {
                this.$router.push('/account');
            },
        },
        watch: {
        },
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .fk-height {
        // position: absolute;
        // left: 0;
        // top: 0.44rem;
        // bottom: 0.6rem;
        // right: 0;
        // overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
       padding: 0.5rem 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .member-icon img{
        width: initial;
    }
    .fk-wrap li {
        padding: 0.12rem;
        background: #fff;
        margin-bottom: 0.1rem;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
    }
    .fk-wrap .question,.fk-wrap .answer{
        text-align: justify;
        color:#999;
        span{
            display: block;
            float: left;
            width: 0.2rem;
            height: 0.2rem;
            margin-right: 0.1rem;
            line-height: 0.2rem;
            background: @main-color;
            text-align: center;
            color: #fff;
            border-radius: 0.02rem;
        }
        p{
            padding-left: 0.3rem;
            color: #b0b0b0;
        }

    }
    .fk-wrap .answer {
        margin-left: 0.2rem;
        margin-top: 0.05rem;
        color: #4c4c4c;
        padding: 0.1rem;
        background: #f5f7fa;
        border-radius: 0.05rem;
        overflow: hidden;
        span {background: @tips01-color}
    }
    .fk-btn-box{
        position: fixed;
        bottom: 0.1rem;
        left: 0.12rem;
        right: 0.12rem;
        z-index: 9;
    }
    .fk-btn-box button {
        width: 100%;
        height: 0.4rem;
        background: linear-gradient(left, @header-bg-left , @header-bg-right);
        background: -webkit-linear-gradient(left, @header-bg-left , @header-bg-right);
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 0.15rem;
    }
</style>
