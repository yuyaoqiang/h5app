<template>
    <section class="display-vertical pl-height">
        <div class="box-header">
            <header class="pr header-box">
                <div class="header-arrow-box" id="back_icon" @click="goback">
                    <i class="el-icon-arrow-left back-icon"></i>
                </div>
                <h1 class="header-title">优惠活动</h1>
            </header>
        </div>
        
        <div class="wrap-content">
            <section class="flex-box activity-main" v-if="list.length>0">
                <div v-for="(item,index) in list">
                    <div class="pr activity-title" :style = "{backgroundImage:'url('+serverUrl+item.wapheadurl+')'}"  @click="showActivity(item,index)">
                        <!-- <img :src="serverUrl+item.wapheadurl"/> -->
                    </div>
                    <div class="activity-content animated slideInUp"  v-show="item.flag">
                            <div class="labels">
                            </div>
                            <span class="btn-activity"  v-if="item.type==6 && item.promreceiveurl!='0'&&  item.promreceiveurl.length>10" @click="openOnlineService()" >
                                联系客服
                            </span>
                            <span class="btn-activity"  v-if="item.type!=6" @click="getPrize(item)" >
                                立即领取
                            </span>
                    </div>
                </div>
            </section>
            <section class="flex-box activity-main" v-if="list.length==0">
                <div class="no-active">
                   正在加载中
                </div>
            </section>
        </div>
    </section>
</template>

<script>
    import  arrayUtil from  "../../assets/js/util/arrayUtil"
    import  userInfo from  "../../assets/js/api/userInfo"
    import  appContext from  "../../assets/js/context/appContext"
    import  userBusiness from  "../../assets/js/business/user/userBusiness"
    import  appController from  "../../assets/js/business/app/appController"
    import platformData from '../../assets/platform/main/platformData';

    export default {
        data () {
            return {
                selectType: '',
                serverUrl:'',
                selectIndex:0,
                list:[
                ],
                nowMills: null,
                deviceCode:'',
                userName:null,
                isTryPlayer:true,
                isApp:false,
                appNotLogin:true,
            }
        },
        created(){
            var  _this=this;
            var isApp = appController.isApp();
            if(isApp==false){
                userBusiness.getUser(this,function (user) {
                    _this.userName=user.userName;
                    _this.isTryPlayer=user.isShiWan;

                })
            }else {
                _this.userName=this.$route.query.userName;
                if(_this.userName!= null){
                    var isTryPlayer=this.$route.query.isTryPlayer;
                    if(isTryPlayer != null){
                        _this.isTryPlayer=isTryPlayer=="true";
                    }
                    _this.appNotLogin=false;
                }

            }

            this.isApp=isApp;
            this.search(0);
        },
        methods: {
            goback(){
                var appCtr = appController.getController();
                if(appCtr == null){
                    this.$router.go(-1);
                }else {
                    appCtr.goback();
                }
            },

            search: function(type,state) {
                var _this = this;
                this.selectType = type;
                this.nowMills = new Date().getTime();
                let param = {
                    ismobile:true
                }
                userInfo.getActivity(param,res=>{
                    if(res.code==200){
                       var data =  res.data;
                       var lists =[];
                       if(data.list){
                           data.list.forEach((item,index)=>{
                               if (item.timebegin < _this.nowMills && _this.nowMills < item.timeend && item.enable!=0) {
                                   item.index = index;
                                   item.flag = false;
                                   lists.push(item)
                               }
                           })
                       }
                       _this.list =  lists;
                        setTimeout(()=>{
                            if (lists.length > 0){
                                var name = this.$route.query.name;
                                if (name) {
                                    let index =  lists.findIndex((item)=>{
                                        return item.title == unescape(String(name))
                                    });
                                    _this.showActivity(lists[index],index);
                                }
                            }
                        },500);

                       _this.serverUrl =res.data.serverUrl;
                    }else{
                        _this.lalterError(res.msg);
                    }
                })
            },


            getPrize(item){
                var _this = this;

                if(this.isApp==false){
                    if(userBusiness.checkIsNotLoginPlayer()){
                        return;
                    }

                    if(userBusiness.checkIsTryPlayer()){
                        return;
                    }
                }else {
                    if(this.appNotLogin==true){
                        _this.lalterSuccess("您还没登录,马上登录赢钱吧!");
                        return;
                    }
                }


                let params = {
                    "username":_this.userName,
                    "infoid": item.id
                };
                _this.lshowWait()
                userInfo.receiveRewards(params, function (res) {
                    _this.lcloseWait()
                    if(res.code != 200){
                        _this.lalterSuccess(res.msg);
                        return 
                    }
                    if (res.code == 200) {
                        var data = res.data
                        if(Object.prototype.toString.call(data) === '[object Object]'){
                            var amount = data.takeAmount;
                            if(amount>0){
                                _this.lalterSuccess(`恭喜您获得${amount}元奖金！`);
                            }
                            if(amount==0){
                                _this.lalterSuccess(`很遗憾您本次未中奖，谢谢您的参与！`);
                            }
                            return
                        }
                        if(item.title.indexOf('天天签到')>-1){
                            if(platformData.setting.code=='ds'){
                                var amount = res.data
                                if(amount<=1){
                                    _this.lalterSuccess('已经签到成功,继续加油哦!')
                                }else{
                                    _this.lalterSuccess(res.msg);
                                }
                                return
                            }
                        }
                        
                        _this.lalterSuccess(res.msg);
                    }
                })
            },
            openOnlineService:function () {
                userBusiness.openCustomerService();
            },
            showActivity: function(item,index) {
                this.list.forEach((l,listIndex)=>{
                    if(index!=listIndex){
                        l.flag = false;
                    }else{
                        item.flag = !item.flag;
                    }
                })
                var doms = $.parseHTML( item.wapcontent);
                $('.labels').empty();
                $('.labels').append(doms);
            }
        }
    }
</script>
<style lang="less">
    @import "../../assets/platform/main/platform.less";
    .wrap-content{
        padding-top:0.44rem;
    }
    .activity-main{
        padding: 0.09rem;
    }
    .activity-title{
        margin-bottom: 0.03rem;
        margin-top: 0.02rem;
        width: 100%;
        height: 1rem;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .activity-title img{
        width: 100%;
        height: 100%;
        border-radius: 0.04rem;
    }
    .activity-content {
        background-color: #f4f4f4;
        border: 1px solid #e4e2e2;
        border-radius: 0.04rem;
    }
    .btn-activity{
        display: inline-block;
        background: @main-color;
        color: #fff;
        border-radius: 0.02rem;
        padding: 0.05rem;
        width: 20%;
        margin: 0.05rem 0 0.05rem 2.2rem;
        text-align: center;
    }
    .labels{
        word-wrap: break-word;
    }
    @-webkit-keyframes slideInUp {
        from {
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideInUp {
        from {
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
    .animated {
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    .slideInUp {
        -webkit-animation-name: slideInUp;
        animation-name: slideInUp;
    }
    .no-active{
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.16rem;
        font-weight: normal;
    }
</style>