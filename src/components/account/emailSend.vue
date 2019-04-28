<template>
    <div>
        <header class="report-header-main">
            <div class="report-select">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left" @click="chosieUser"></i>
                </div>
                <h1>发送信息</h1>
            </div>
        </header>
        <section class="send-height" >
            <div class="send-title">
                <span>收件人：{{sendPrams.receivernames==null?null:sendPrams.receivernames.length<=20?sendPrams.receivernames:sendPrams.receivernames.substr(0,20)+'...'}}</span>
                <p class="user-select"><i class="icon iconfont icon-tou_tianjia" @click="chosieUser"></i></p>
            </div>
           <div class="send-con">
               <textarea placeholder="请输入消息内容"  v-model="sendPrams.messagecontent" maxlength="800">

               </textarea>
           </div>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        <div class="send-btn-box">
            <button type="button" @click="sendEmail()">发送</button>
        </div>
        <!--搜索设置-->
        <div v-show="dialogSearch">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">选择收件人</h1>
                <ul class="send-set-main">
                    <li class="display-flex send-user" v-for="(item,index) in data.USER">
                        <p class="">
                            <img src="../../assets/images/icon29.png">
                        </p>
                        <p class="inp-wrap flex-box">
                            <label :for="index">{{item.username}}</label>
                            <input type="checkbox" :id="index" v-model="userNameList"  :value="item.username" class="user-radio"/>
                        </p>
                    </li>
                </ul>
                <ul class="display-box alert-btn-box">
                    <li @click="dialogSearch = false" class="alert-cancel">取 消</li>
                    <li @click="selectUser()">确 定</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import userInfo from  "../../assets/js/api/userInfo"
    import recordSearchApi from '../../assets/js/api/recordSearchApi';
    export default {
        data () {
            return {
                data:{},
                loadicon:false,
                loadingDesc:"",
                content:'',
                userNameList:[],
                setting:{
                    username:'',
                    onlinestatus:'-1'
                },
                sendPrams:{
                    receivernames:'',
                    messagecontent:'',
                    subType:'',
                    userState:0,
                },
                dialogSearch:false
            }
        },
        created(){
        },
        methods: {
            chosieUser(){
                this.search();
                this.dialogSearch = true;
            },
            search(){
                let _this = this;
                let params = {
                    username: this.setting.username,
                    onlinestatus: this.setting.onlinestatus
                }
                this.loadicon = true;
                recordSearchApi.searchSenderUser(params, function (res) {
                    _this.data = res.data;
                    if(res.code==200){
                        if(_this.data.USER.length == 0){
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

                })
            },
            selectUser(){
                this.sendPrams.receivernames = this.userNameList.join(',');
                this.dialogSearch = false;
            },
            sendEmail(){
                let _this = this;
                if (this.sendPrams.receivernames == "") {
                    this.lalterWarning("请添加收件人");
                    return
                }
                if (this.sendPrams.messagecontent == "") {
                    this.lalterWarning("内容不能为空！");
                    return
                }
                let params = {
                    receivernames: this.sendPrams.receivernames,
                    messagecontent: this.sendPrams.messagecontent,
                    subType: this.sendPrams.subType,
                    userState: this.sendPrams.userState
                }
                _this.lshowWait();
                recordSearchApi.sendMessage(params, (res) => {
                    if (res.code == 200) {
                        _this.search();
                        _this.sendPrams.receivernames = "";
                        _this.sendPrams.messagecontent = "";
                    }
                     _this.lcloseWait();
                    _this.lalterSuccess(res.msg);
                })
            },
            goback: function () {
                this.$router.push('/email');
            },
        },
        watch: {
        },
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .send-set-main {
        background:#f1f1f1;
        padding: 0.05rem 0;
        overflow: auto;
        height: 2.4rem;
        .send-user{
            padding: 0.05rem 0.08rem;
            margin: 0.05rem;
            background: #fff;
            img{
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.5rem;
            }
            .inp-wrap{
                padding: 0.1rem 0;
                input{float: right;}
            }
        }
    }
    .send-title{
        padding: 0 0.12rem;
        background: #fff;
        overflow: hidden;
        height: 0.4rem;
        line-height: 0.4rem;
        box-sizing: border-box;
    }
    .user-select{
        float: right;
        padding:0 0.1rem;
        i{
            font-size: 0.28rem;
            color: @main-color;
        }
    }
    .send-height {
        position: fixed;
        left: 0;
        top: 0.5rem;
        bottom: 0.6rem;
        right: 0;
        width: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .send-con{
        margin-top:0.1rem;
    }
    .send-con textarea{
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
    .send-btn-box{
        position: fixed;
        bottom: 0.1rem;
        left: 0.12rem;
        right: 0.12rem;
        z-index: 9;
    }
    .send-btn-box button {
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
