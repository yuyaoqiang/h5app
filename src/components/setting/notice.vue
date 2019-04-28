<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>公告</h1>
            </header>
        </div>
        
        <section class="report-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
            <ul class="notice-list" v-for="(item,index) in notices.roll">
                <li class="notice-title">{{item.title}}</li>
                <li class="notice-text">{{item.content}}</li>
                <li class="text-right notice-footer">
                    <span>{{item.createtime}}</span>
                    <button type="button" @click="openDetails(index)">查看详情</button>
                </li>
            </ul>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <div v-if="dialogVisible">
            <div class="cover-bg" @click="dialogVisible = false"></div>
            <div class="alert-main" style="top:42%">
                <h1 class="alert-title">{{noticeDetails.title}}</h1>
                <div class="notice-alert-content">
                    <div>
                        {{noticeDetails.content}}
                    </div>
                    <p>{{noticeDetails.createtime}}</p>
                </div>

            </div>
            <div class="alert-close" @click="dialogVisible = false"></div>
        </div>
    </div>
</template>

<script>

    import userInfo  from '../../assets/js/api/userInfo.js';
    import arrayUtil from '../../assets/js/util/arrayUtil.js';

    export default {
        data () {
            return {
                notices:{ },
                noticeDetails:{},
                dialogVisible: false,
                loading:false,
                loadicon:false,
                loadingDesc:""
            }
        },
        created(){},
        methods: {
            goback: function () {
                this.$router.go(-1);
            },
            openDetails(index){
                this.dialogVisible=true;
                this.noticeDetails = this.notices.roll[index];
            },
            loadMore() {
                let _this = this;
                this.loading = true;
                this.loadicon = true;
                this.loadingDesc="";
                userInfo.searchNotice({},(res)=>{
                     if(res.code==200){
                         _this.notices = res.data;
                        if(_this.notices.roll.length == 0){
                            _this.loadingDesc="暂无数据";
                        }else{
                            _this.loadingDesc="";
                        }   
                    }else{
                        _this.lalterWarning(res.msg);
                    }                             
                    _this.loadicon = false;
                })
            }
        },
        watch:{
            "dialogVisible":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
            }
        }
    }
</script>