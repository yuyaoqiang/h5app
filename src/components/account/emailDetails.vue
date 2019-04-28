
<template>
    <div>
       
        <header class="report-header-main">
            <div class="report-select">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>信息详情</h1>
            </div>
        </header>
        
        
        <div class="sendinfo-title">
            <span class="ml-1">发件人: {{data.sendername}}</span>
            <span class="fr mr-1">时间: {{data.sendtime | time}}</span>
        </div>
        <div class="sendinfo-con">
            {{data.messagecontent}}
        </div>
    </div>
</template>

<script>
    import messageApi from '../../assets/js/api/messageApi'
    export default {
        data () {
            return {
                data: {
                    sendername:'',
                    sendtime:'',
                    messagecontent:'',
                    readId:''
                },
            }
        },
        created(){
            let _this = this;
            this.data.sendername =  this.$route.query.sendername;
            this.data.sendtime = this.$route.query.sendtime;
            this.data.messagecontent = this.$route.query.messagecontent;
            this.readId = this.$route.query.readId
            messageApi.updateStatus({"id": _this.readId}, function (resp) {
                
            })
        },
        mounted(){

        },
        methods: {
            goback: function () {
                this.$router.push('/email');
            },
        },
        watch: {
        },
    }
</script>
<style scoped lang="less">
    .sendinfo-title{
      padding-top: 0.5rem;
      background: #fff;
      margin-bottom: 0.05rem;
      position: relative;
    }
    .ml-1{
        margin-left: 0.1rem;
    }
    .mr-1{
        margin-right: 0.1rem;
    }
    .sendinfo-con{
        // position: absolute;
        // top: 0.95rem;
        // bottom: 0;
        // left: 0;
        // right: 0;
        padding: 0.2rem;
        background: #fff;
        text-align: justify
    }
</style>
