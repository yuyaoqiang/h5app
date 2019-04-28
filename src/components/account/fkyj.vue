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
        
        
        <section class="fk-height" >
           <div class="fkyj-con">
               <textarea placeholder="请输入您的宝贵意见或建议.（限500字）"  v-model="content" maxlength="500">

               </textarea>
           </div>
            <!-- <div class="recording-no">
                <i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span>
            </div> -->
        </section>
        <div class="fk-btn-box">
            <button type="button" @click="suggestions()">发送</button>
        </div>
    </div>
</template>

<script>
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import userInfo from  "../../assets/js/api/userInfo"

    export default {
        data () {
            return {
                content:'',
                loadicon:false
            }
        },
        created(){
        },
        methods: {
            suggestions(){
                var _this =this;
                _this.content == '';

                var params = {"content":this.content};
                if(_this.content == ''){
                    _this.lalterWarning('意见不能为空')
                }
                userInfo.getAdvise(params, resp =>{
                    if(resp.msg=="提交用户意见成功！" || resp.code==200){
                        _this.content = '';
                        _this.lalterSuccess("提交成功");
                        _this.$router.push('/fklb');
                    }
                })
            },

            goback: function () {
                this.$router.push('/fklb');
            },
        },
        watch: {
        },
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .fk-height {
        position: fixed;
        left: 0;
        top: 0.44rem;
        bottom: 0.6rem;
        right: 0;
        width: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .fkyj-con textarea{
        width: 100%;
        height: 2rem;
        border: none;
        display: inline-block;
        padding: 0.12rem;
        font-size: 0.12rem;
        color: #666;
        line-height: 0.18rem;
        border-radius: 0.05rem;
        text-align: justify;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
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
