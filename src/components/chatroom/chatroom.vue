<template>
    <div>
        <header class="chatroom-header-box" v-if="isShowHeader">
            <div class="header-arrow-box"  @click="goback">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h1>聊天室</h1>
        </header>
        <!--<div>-->
            <!--<header class="header-box betting-header">-->
                <!--<div class="column-icon-box">-->
                    <!--<i class="column-icon"></i>-->
                <!--</div>-->
                <!--<h2>-->
                    <!--{{$parent.lottery.name}}-->
                <!--</h2>-->
                <!--<div class="betting-point-box">-->
                    <!--<i class="betting-point-icon"></i>-->
                <!--</div>-->
            <!--</header>-->
            <!--<header class="lottery-issue-box">-->
                <!--<ul class="display-box">-->
                    <!--<li class="lottery-issue">-->
                        <!--<span>第{{$parent.lottery.issue}}期</span>-->
                    <!--</li>-->
                    <!--<li class="lottery-time">-->
                        <!--<div class="lottery-time-box">-->
                            <!--<div><img src="../../assets/images/countdown-icon.png"></div>-->
                            <!--<div>{{$parent.lottery.status.desc}}: </div>-->
                            <!--<dl class="betting-time">-->
                                <!--<dd class="betting-day" v-show="$parent.displayTime.days">00</dd>-->
                                <!--<dt v-if="$parent.displayTime.days">:</dt>-->
                                <!--<dd class="betting-hours"  v-show="$parent.displayTime.hours">00</dd>-->
                                <!--<dt v-if="$parent.displayTime.hours">:</dt>-->
                                <!--<dd class="betting-munites">00</dd>-->
                                <!--<dt>:</dt>-->
                                <!--<dd class="betting-secondes">00</dd>-->
                            <!--</dl>-->
                        <!--</div>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</header>-->
            <!--<nav class="lottery-tab-box">-->
                <!--<ul class="display-box">-->
                    <!--<li v-for="item in $parent.menuList" :class="{'active':item.active}" v-if="item.isOpen==true">-->
                        <!--<i :class="item.icon" class="iconfont"></i>{{item.name}}-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</nav>-->
        <!--</div>-->

        <div class="chatroom-loading" v-show="chatroomLoading">
            <div>
                <dl class="loaders line-scale">
                    <dd></dd>
                    <dd></dd>
                    <dd></dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
                <p>正在登录聊天室</p>
            </div>
        </div>
        <div class="chatroom-close" v-show="chatroomClose.isClose">
            <div>{{chatroomClose.text}}</div>
        </div>

        <div class="chatroom-enter"  v-if="online.people.length >0 ">
            <div v-for="(item,index) in online.people"  v-show="index<3">{{item}}</div>
        </div>

        <div class="chatroom-screen">
            <p  @click="screenScroll"><i class="chatroom-screen-icon"></i> 滚屏</p>
            <p @click="clearScreen"><i class="chatroom-clear-screen"></i> 清屏</p>
            <p :class="[onlyShowPlan?'chatroom-plan-active':'']" @click="showPlan"><i class="chatroom-plan"></i> 计划</p>
        </div>


        <div class="chatroom-container"
             :style="{paddingBottom:chatroomEexpression?'1.78rem':'0.48rem'}">
            <dl  class="chatroom-bg-ordinary" v-for="item in chatroom.message"
                 v-if="onlyShowPlan?item.msgType=='推送通知':true"
                :class="[item.betInfo?'chatroom-bet-info':'',
                item.sourceClientId==chatroomPermission.clientId?'display-row-reverse chatroom-self':'display-flex chatroom-message',
                item.msgType=='推送通知'?'chatroom-bg-push':'']">
                <dt>
                    <img :src="`${basePathFile}webChat/common/file/down/${item.headPortrait}.jpg`"/>
                </dt>
                <dd class="flex-box chatroom-text-box">
                    <ul class="chatroom-user">
                        <li>{{item.nickname}}</li>

                        <li class="chatroom-manage" v-if="item.manage">
                            <i></i>
                            <!--<img src="../../assets/images/icon_master.gif">  -->
                        </li>

                        <li class="chatroom-time" v-if="item.cutTime && item.cutTime !=''">{{item.cutTime}}</li>
                    </ul>
                    <article class="clearfix chatroom-text">

                        <section   v-if="!item.file && !item.betShare"
                                   v-html="item.pushText?item.pushText:item.content">
                        </section>

                        <section  class="chatroom-img" v-if="item.file && item.img"
                                  @click="viewImg(item)" v-html="item.img">
                        </section>

                        <section   v-if="item.betShare">
                            <div>
                                <div class="chatroom-share-note"  v-html="item.betShareNote"></div>
                                <div class="chatroom-bet-follow">
                                    <span  @click="showShare(item)">跟单</span>
                                </div>
                            </div>
                        </section>

                    </article>
                </dd>
            </dl>
        </div>
        <div class="chatroom-footer">
            <div class="chatroom-send-box">
                <ul class="display-flex">
                    <li class="chatroom-hongbao-send"
                        v-if="permissionControl.RED_ENVELOPE_FUNCTION && permissionControl.RED_ENVELOPE_FUNCTION.value == 1">
                        <i></i>
                    </li>
                    <li class="flex-box chatroom-send">
                        <textarea  :placeholder="'发言条件:前二天充值不少于'+speakingConditions.rechargeAmount+
                            '元;打码量不少于'+speakingConditions.betAmount+'元'"
                                   v-model.trim="chatroom.textarea" class="chatroom-textarea"
                                   :maxlength="[forbidSpeak.textLength && forbidSpeak.textLength !=''?forbidSpeak.textLength.split(',')[1]:'']"
                                   :disabled="isForbidSpeak"
                                   @keyup.enter="send()"></textarea>
                    </li>
                    <li class="chatroom-expression" @click.stop="chatroomExpression"><i></i></li>
                    <li style="display: none;">
                        <input id="select_file" type="file" accept=".jpg, .png, .gif, .jpeg, image/jpeg, image/png, image/gif"
                               @change="selectImg" />
                    </li>
                    <li class="chatroom-photo"  @click="sendImg()" v-if="permissionControl.SEND_IMAGE && permissionControl.SEND_IMAGE.value == 1">
                        <i></i>
                    </li>
                </ul>
            </div>
            <div class="expression-chatroom-box" v-show="chatroomEexpression">
                <ul class="clearfix expression-chatroom-icon">
                    <li  v-for="item in expression"  @click.stop="express(item)">
                        <i class="expression" :class="item.className" :alt="item.alt"></i>
                    </li>
                </ul>
                <div class="expression-chatroom-btn">
                    <button type="button" @click="send()">发送</button>
                </div>
            </div>
        </div>
        <!--隐藏表情-->
        <div class="chatroom-expression-cover"  v-show="chatroomEexpression"  @click.stop="chatroomExpression"></div>

        <!--查看发送的图片-->
        <div v-if="chatroomImgView">
            <div class="cover-bg" @click="chatroomImgView=false"></div>
            <div class="view-img">
                <div class="chatroom-view-img" v-html="viewImageContent">
                    <!--<img :src="`${basePathFile}webChat/common/file/down/${viewImage.path}.jpg`"/>-->
                </div>
            </div>
            <div class="close-view" @click="chatroomImgView=false"></div>
        </div>

        <div v-if="showShareAlert">
            <div class="cover-bg" @click="showShareAlert=false"></div>
            <div class="chatroom-share-alert">
                <!--<div class="close-view"  @click="showShareAlert=false"></div>-->
                <ul class="clearfix chatroom-share-column">
                    <li class="chatroom-share-msg">彩票:</li>
                    <!--<li>{{currentShare.issueno}}</li>-->
                    <li>{{currentShare.gametypename}}</li>
                </ul>
                <ul class="clearfix chatroom-share-column">
                    <li class="chatroom-share-msg">期号:</li>
                    <!--<li>{{currentShare.issueno}}</li>-->
                    <li>当前最新期号</li>
                </ul>
                <ul class="clearfix chatroom-share-column">
                    <li class="chatroom-share-msg">玩法:</li>
                    <li>{{currentShare.playtypename}}、{{currentShare.bettypename}}</li>
                </ul>
                <ul class="clearfix chatroom-share-column">
                    <li  class="chatroom-share-msg">投注位:</li>
                    <li>{{currentShare.digitName}}</li>
                </ul>
                <ul class="clearfix chatroom-share-column">
                    <li  class="chatroom-share-msg">投注号码:</li>
                    <li class="chatroom-share-number">
                        <p>{{currentShare.nums}}</p>
                        <div>{{currentShare.nums}}</div>
                    </li>
                </ul>
                <ul class="clearfix chatroom-share-column" v-if="currentShare.isKj===false">
                    <li>倍数:</li>
                    <li class="chatroom-share-input">
                        <input type="text"
                               v-model="currentShare.multiple" @keyup="enterShareMultiple" @blur="leaveShareMultiple"/>
                    </li>
                    <li class="chatroom-share-mode">模式:</li>
                    <li class="chatroom-share-select">
                        <select v-model="moneyModeValue" @change="changeMoneyMode">
                            <option v-for="item in moneyModeOptions" :value="item.value">{{item.label}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="clearfix chatroom-share-column">
                    <li>共计:</li>
                    <li><b class="red">{{currentShare.betmoneytotal}}</b> 元</li>
                </ul>
                <div class="chatroom-shate-btn">
                    <button type="button" class="chatroom-cancel"  @click="showShareAlert=false">取消</button>
                    <button type="button" class="chatroom-define" @click="chatroomBet()">投注</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import VueSocket from "socket.io-client";
    import "lrz";
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import userApi from '../../assets/js/api/userInfo.js';
    import dateUtil from "../../assets/js/util/dateUtil.js";
    import lotteryApi from "../../assets/js/api/lotteryApi.js";
    import kgApi  from '../../assets/js/api/kgApi.js';
    import appContext from "../../assets/js/context/appContext.js";

    import appController from '../../assets/js/business/app/appController';
    import cacheUtil from "../../assets/js/util/cacheUtil.js";

    export default {
        data(){
            return{
                status:'NONE',
                statusCodes:{
                    error:"0",
                    processing:"1",
                    success:"2",
                },
                isShowHeader:true,
                onlyShowPlan:false,
                chatroomEexpression:false,
                chatroomMain:true,
                chatroomWindow:null,
                isShowAvatar:false,
                showUpload: false,
                noticeData: {
                    list: [],
                },
                chatroomLoading:true,
                chatroomImgView:false,
                viewImage: {},
                user:{},
                nameSign:null,
                roomArray:[],
                selectRoomId:"",
                permissionControl:{

                },
                forbidSpeak:{
                    textLength:""
                },
                isForbidSpeak:true,
                timeJudge:0,
                chatroom:{
                    avatarPath:"",
                    avatar:false,
                    message:[],
                    textarea:"",
                },
                online:{online:0,people:[]},
                setPeople:null,
                basePath:"",
                basePathFile:"",
                expression: [
                    {className: "expression-01", alt: "[大笑]"},
                    {className: "expression-02", alt: "[坏笑]"},
                    {className: "expression-03", alt: "[微笑]"},
                    {className: "expression-04", alt: "[色]"},
                    {className: "expression-05", alt: "[阴险]"},
                    {className: "expression-06", alt: "[白眼]"},
                    {className: "expression-07", alt: "[呲牙]"},
                    {className: "expression-08", alt: "[亲亲]"},
                    {className: "expression-09", alt: "[挤眼]"},
                    {className: "expression-10", alt: "[害羞亲亲]"},
                    {className: "expression-11", alt: "[调皮]"},
                    {className: "expression-12", alt: "[睡]"},
                    {className: "expression-13", alt: "[失望]"},
                    {className: "expression-14", alt: "[汗]"},
                    {className: "expression-15", alt: "[吃惊]"},
                    {className: "expression-16", alt: "[苦笑]"},
                    {className: "expression-17", alt: "[泪]"},
                    {className: "expression-18", alt: "[生气]"},
                    {className: "expression-19", alt: "[感冒]"},
                    {className: "expression-20", alt: "[惊吓]"},
                    {className: "expression-21", alt: "[酷]"},
                    {className: "expression-22", alt: "[强]"},
                    {className: "expression-23", alt: "[鼓掌]"},
                    {className: "expression-24", alt: "[ok]"},
                ],
                moneyModeOptions: [
                    {value: 1, label: '元'},
                    {value: 10, label: '角'},
                    {value: 100, label: '分'},
                    {value: 1000, label: '厘'}
                ],
                moneyModeValue:1,
                showShareAlert:false,
                shareSwitch:false,
                currentShare:{},
                speakData:{

                },
                chatroomPermission:{},
                speakingConditions:{},
                showIssuePushInfo:false,
                viewImageContent:null,
                appCtr:null,
                chatroomClose:{
                    text:"",
                    isClose:false
                },
                socket:null,
                connectingNumber:0,

            }
        },
        activated(){
            if (appContext.chatroomKeepAlive === false) {
                this.getUser();
                this.initChatroom();
            }
        },
        created(){
            appContext.chatroom = this;

            this.appCtr = appController.getController();

            if (this.appCtr != null) {
                //移动端初始化聊天
                this.isShowHeader = false;

                let userName = this.$route.query.userName;

                let account = this.$route.query.account;//账号加密
                let nickName = this.$route.query.nickName;//用户昵称

                let nameSign = this.$route.query.nameSign;
                let id = this.$route.query.id;

                if (userName == null) {
                    this.lalterError("获取账号信息失败");
                    return;
                }

                this.user = {
                    userName: unescape(String(userName)),
                    id:unescape(String(id)),
                    account:unescape(String(account)),
                    nickName:unescape(String(nickName))
                };
                this.nameSign = unescape(String(nameSign));

                this.initChatroom();
            } else {
               this.getUser();
               this.initChatroom();
            }
        },
        methods:{
            goback(){
                if(this.appCtr == null){
                    this.$router.go(-1);
                }else {
                    this.appCtr.goback();
                }
            },
            initChatroom(){
                let param = {
                    userName:this.user.account || this.user.userName,
                    nameSign:this.nameSign || ""
                };
                this.status=this.statusCodes.processing;
                userApi.getChatroomInfo(param,(res)=>{
                    if(res.isServerError){
                        this.status=this.statusCodes.error;
                        return;
                    }

                    if (res.code == 200){
                        this.chatroomPermission = res.data;
                        let urlArr = res.data.chatUrl.split(",");

                        this.basePathFile = urlArr[0];
                        this.basePath = urlArr[1];

                        this.init();
                    }else {
                        this.chatroomClose.isClose = true;
                        this.chatroomClose.text = res.msg || "聊天室已关闭";
                    }
                });
            },
            init(){
                let param = {
                    tenantCode:this.chatroomPermission.platform,
                    platform:"",
                    userName:this.user.account || this.user.userName,
                    nameSign:this.nameSign || ""
                };
                $.ajax({
                    // url: "http://172.168.30.236:8686/webChat/commom/room/findRoomAvailable",
                    url: this.basePathFile+"webChat/commom/room/findRoomAvailable",
                    type: "POST",
                    dataType: "json",
                    data: param,
                    async: true,
                    success:(res)=> {
                        if (res.code == 200){
                            this.roomArray = res.data;

                            this.selectRoomId = this.roomArray[0].roomId;
                            this.selectRoom = this.roomArray[0];

                            this.isBanned();//是否禁言
                        }
                    },
                    error:(resp)=>{
                        if(resp.status && resp.status>=400){
                            this.status=this.statusCodes.error;
                        }
                    }
                });
            },
            isBanned(){

                let paramMap = this.selectRoom.paramMap;

                let signObj = paramMap.find((item)=>{
                    return item.code == "sign"
                });

                let amount = paramMap.find((item)=>{
                    return  item.code == "SPEECH_CONDITIONS"
                });

                this.speakingConditions = JSON.parse(amount.value);

                let param = {
                    sign:signObj.value,
                    rechargeAmount:this.speakingConditions.rechargeAmount,
                    betAmount:this.speakingConditions.betAmount,
                    userName:this.user.account || this.user.userName,
                    nameSign:this.nameSign || ""
                };
                userApi.getChatroomUserIsSpeak(param,(res)=>{
                    if(res.isServerError){
                        this.status=this.statusCodes.error;
                        return;
                    }
                    if (res.code == 200){
                        this.speakData = res.data;
                        if (res.data.isSpeak){
                            this.isForbidSpeak = false;
                        }else {
                            this.isForbidSpeak = true;
                        }
                        this.chatroomSocket();//打开聊天室
                    }
                });
            },
            chatroomSocket(){
                this.getLocalStoragePlan();
                // this.basePath = "http://172.168.30.207:8668/";//平台
                // this.basePathFile = "http://172.168.30.207:8081/";

                let user = this.user;

                this.permissionFn();

                // let httpBaseURL = 'webChat/commom/room/findRoomAvailable';

                let id = user.id;
                let nickName = user.nickName || "";
                let userName = user.userName;

                let clientId = this.chatroomPermission.clientId;
                let platform = this.chatroomPermission.platform;//平台

                let userType = "客户";

                let ct = this.speakData.timeLong;
                let pd = this.speakData.chatSign;
                let cis = this.speakData.isSpeak;

                // id = 用户ID ri = 房间ID cn = 用户昵称 sct = 用户类型 tc = 平台前缀 clientId = 客户端ID（平台前缀+用户ID+加密KEY） cis 是否可以发言

                let query = "id="+id+"&cn="+nickName+"&clientId="+clientId+"&tc="+platform+"&sct="+userType+"&ct="+ ct +"&pd="+pd+
                    "&account="+userName+"&cis="+ cis+"&ri="+ this.selectRoomId;

                let socketConnectPath = this.basePath + "?" + query;
                // let socketConnectPath = "http://172.168.30.236:8668/" + "?" + query;
                this.socket = VueSocket(socketConnectPath, { 'connect': true });

                this.socket.on("connect",()=>{
                    this.status=this.statusCodes.success;
                    console.log("连接成功");
                    this.getAvatar();//获取头像
                    setTimeout(()=>{
                        this.chatroomLoading = false;//加载动画
                    },300)
                });

                this.socket.on("getHistoryMsgInfo",(data)=>{//历史记录
                    this.receiveMessage(data);
                });

                this.socket.on("csChatC", (item)=> {//发送记录

                    if (item.msgType =="推送通知"){
                        item.pushText = this.filterPushMessag(item);
                    }
                    item.cutTime = this.cutTimeFn(item.time);
                    if (item.file && item.fileType ==="图片"){//图片 加载
                        this.loadImgView(item);
                    }
                    if (item.betShare){
                        item.betShareNote = this.shareNote(item)
                    }
                    item.nickname = this.filterUserName(item)
                    this.chatroom.message.push(item);

                    if (this.onlyShowPlan && item.msgType !='推送通知'){
                        return
                    }

                    setTimeout(()=>{
                        this.screenScroll();
                    },100);
                });
                this.socket.on("csIntoRoom", (data)=> {
                    this.chatroonOnline(data);
                });
                this.socket.on("chatBanned", (data)=> {
                    this.isForbidSpeak = JSON.parse(data);
                });
                this.socket.on("chatRoomUpdate", (data)=> {
                    this.initChatroom();
                });
                this.socket.on("connecting", (data)=> {//重连
                    this.connectingNumber++;
                    if (this.connectingNumber > 20){
                        this.socket.disconnect(true);
                        return
                    }
                    this.chatroomSocket()
                });
                this.socket.on("reconnecting", (data)=> {//连接失败次数
                    this.status=this.statusCodes.error;
                });
            },
            shareBetNote(){
                if (this.isForbidSpeak || this.shareSwitch) {
                    return
                }
                this.shareSwitch = true;
                userApi.getSareBet({"gameType": null},(res)=>{
                    this.shareSwitch = false;
                    if (res.code == 200){
                        if (res.data){
                            let param = {
                                //消息发送到房间,房间ID对于客户而言就是客户的clientID
                                targetClientId:this.selectRoom.roomId, //发送方
                                targetUserName:this.selectRoom.customerName, //接收方
                                targetClientType: "聊天室", //接收方类型 -- -
                                msgType: "房间消息",
                                path: "",
                                content: JSON.stringify(res.data),
                                betShare:true,
                            };
                            this.socket.emit("csChatC", param);
                        }
                    } else {
                        this.lalterWarning("暂无注单！");
                    }
                })
            },
            getUser() {
                userBusiness.getUser(this,(user) => {
                    this.user = user;
                });
            },
            getLocalStoragePlan(){
                this.onlyShowPlan = JSON.parse(cacheUtil.getLocalStorage(this.user.userName+"Plan")) || false;
                cacheUtil.setLocalStorage(this.user.userName+"Plan",JSON.stringify(this.onlyShowPlan));
            },
            selectChatroom(){
                this.socket.disconnect(true);
                let selectRoom = this.roomArray.find((item)=>{
                    return this.selectRoomId == item.roomId
                });
                if (selectRoom){
                    this.selectRoomId = selectRoom.roomId;
                    this.selectRoom = selectRoom;
                    this.chatroom.message = [];
                    this.isBanned();//重新打开聊天室
                }
            },
            permissionFn(){
                let permissionArr = this.selectRoom.paramMap;

                for (let i=0;i<permissionArr.length;i++){
                    let item = permissionArr[i];
                    this.$set(this.permissionControl,item.code,item)
                }

                if (this.permissionControl.SPEECH_LIMIT) {
                    this.forbidSpeak = JSON.parse(this.permissionControl.SPEECH_LIMIT.value);
                }

                // if (this.permissionControl.TIME_FORMAT.value &&  this.permissionControl.TIME_FORMAT.value === "TIME-ISSUE"){
                //     this.showIssuePushInfo = true;//显示投注期号推送
                // }
            },
            chatroonOnline(data){
                if (this.permissionControl.ROOM_DYNAMIC && this.permissionControl.ROOM_DYNAMIC.value != 1){
                    return
                }
                //  data.online// 在线人数
                // data.content // 人 进入房间
                data = JSON.parse(data);
                this.online.online = data.online;
                this.online.people.push(data.content);

                if (this.online.people.length > 0 && this.setPeople === null){

                    this.setPeople = setInterval(()=>{
                        this.online.people.splice(0,1);
                        if (this.online.people.length <=0){
                            clearInterval(this.setPeople);
                            this.setPeople = null;
                        }
                    },1200);
                }
            },
            getAvatar(){
                let uploadUrl = this.basePathFile + "webChat/common/file/userInfo";

                let param = {
                    tenantCode:this.chatroomPermission.platform,
                    customerId:this.chatroomPermission.clientId,
                    pwdConnect:this.chatroomPermission.pwdConnect,
                };
                $.ajax({
                    url: uploadUrl,
                    data: param,
                    dataType:"json",
                    async:true,
                    type:"POST",
                    success:(res)=>{
                        if (res.code === 200){
                            this.chatroom.avatarPath = res.data.headPortrait;
                        }
                    }
                })
            },
            receiveMessage(data){
                data.forEach((item)=>{
                    if (item.msgType =="推送通知"){
                        item.pushText = this.filterPushMessag(item);
                    }
                    item.cutTime = this.cutTimeFn(item.time);
                    if (item.betShare){
                        item.betShareNote = this.shareNote(item)
                    }
                    if (item.file && item.fileType ==="图片"){//图片 加载
                        this.loadImgView(item)
                    }
                    item.nickname = this.filterUserName(item)
                });
                this.chatroom.message = data;
                setTimeout(()=>{
                    this.screenScroll()
                },50)
            },
            filterPushMessag(item){
                let content = item.content;
                try {
                    let contentObj = JSON.parse(content);
                    if(typeof contentObj == "object"){
                        if (contentObj.now){

                            let text = "<h3>"+contentObj.now.gametypename+"</h3>"+
                                "<p>"+"第【 "+contentObj.now.issueno+" 】期 开奖号码:"+"</p>";

                            let num = "";
                            if (contentObj.now.nums){
                                contentObj.now.nums.split("").forEach((li)=>{
                                    num += "<b>"+li+"</b>";
                                });
                            }

                            if (num != ""){
                                text += "<p class='chatroom-push-num'>"+num+"</p>"
                            }

                            let txt = "";
                            contentObj.data.forEach((li,index)=>{
                                txt +="<p>"+li.issue2+" "+li.digit+" 【 "+li.formalu+" 】 "+
                                    "<b style='display: inline-block;font-weight: normal;'>"+(li.zissue?li.zissue+" 期 ":'')+
                                    (li.flag?'中':'错')+"</b>"+"</p>"+"<p>"+
                                    ((index ===(contentObj.data.length-1))?"进行中 ( "+li.indexIssue+" )":'')+"</p>"
                            });

                            text += txt;

                            return text;
                        }
                    }
                }catch (e) {
                    return  content;
                }
            },
            filterUserName(item) {
                if (item.sourceUserName === this.user.userName) {
                    let nameArr = String(item.sourceUserName).split("");
                    return nameArr[0] + "****" + nameArr[nameArr.length - 1];
                } else {
                    return item.sourceUserName;
                }
            },
            shareNote(item){
                let content = JSON.parse(item.content);
                if (!content){
                    return "";
                }
                return  `<div><span>彩票：</span><b>${content.gametypename}</b></div>
                         <div><span>期号：</span><b>${content.issueno}</b></div>
                         <div><span>玩法：</span><b>${content.playtypename}-${content.bettypename}</b></div>
                         <div><span>投注位：</span><b>${content.digitName}</b></div>
                         <div><span>投注号码：</span><b>${content.nums}</b></div>`;
            },
            showShare(item){
                if (this.isForbidSpeak) {
                    return
                }
                let content = JSON.parse(item.content);
                this.moneyModeValue = "1";
                content.betmoneytotal =content.betcount*2;
                content.multiple = "1";
                this.currentShare = content;
                this.showShareAlert = true;
            },
            enterShareMultiple(){
                this.currentShare.multiple = isNaN(this.currentShare.multiple/1)||(this.currentShare.multiple/1)===0?"":
                    isNaN(this.currentShare.multiple/1)===false?(this.currentShare.multiple/1):this.currentShare.multiple.replace(/[^0-9]/gi,"");
                this.currentShare.betmoneytotal = (this.currentShare.multiple*(this.currentShare.betcount*2)/this.moneyModeValue);
            },
            leaveShareMultiple(){
                if (this.currentShare.multiple == "" || this.currentShare.multiple == 0) {
                    this.currentShare.multiple = "1";
                    this.currentShare.betmoneytotal = (this.currentShare.multiple*(this.currentShare.betcount*2)/this.moneyModeValue);
                }
            },
            changeMoneyMode(){
                this.currentShare.betmoneytotal = (this.currentShare.multiple*(this.currentShare.betcount*2)/this.moneyModeValue);
            },
            cutTimeFn(time){
                if (isNaN(time/1)){
                    return time;
                }

                let date = dateUtil.toYYYY_MM_DDHHmmss(new Date(parseInt(time)));

                if (this.permissionControl.TIME_FORMAT && !isNaN(this.permissionControl.TIME_FORMAT.value/1)){

                    if (this.timeJudge > 0){
                        if ((time/1000)/60 - (this.timeJudge/1000)/60 <= this.permissionControl.TIME_FORMAT.value){
                            return "";
                        }
                    }

                    this.timeJudge = time;

                    return String(date).substr(date.length - 8,5);
                }else {
                    return String(date).substr(date.length - 8,8)
                }
            },
            loadImgView(item){//图片 加载
                let img = new Image();
                img.src = `${this.basePathFile}webChat/common/file/down/${item.path}.jpg`;
                item.img = `<img class="chatroom-img-loading" src='/h5app/static/img/chatroom-loading.jpg'>`;
                img.onload = (ev) => {
                    item.img = `<img src='${img.src}'>`;
                    setTimeout(() => {
                        this.screenScroll();
                    }, 400);
                    ev.stopPropagation();
                };
            },
            send(){
                if (this.status != 2){
                    return this.lalterWarning("发送失败!");
                }
                if (this.isForbidSpeak) {
                    return
                }

                let message = this.chatroom.textarea;
                if (message.length <= 0) {
                    this.lalterWarning("请输入发送内容！");
                    return;
                }
                message = message.replace(/</g, "&lt;");
                message = message.replace(/>/g, "&gt;");

                let text = /\[[\u0391-\uFFE5A-Za-z]+\]/g;
                let pattern = /\[[\u0391-\uFFE5A-Za-z]+\]/;
                let textIcon = message.match(text);
                if (textIcon != null) {
                    let expression = this.expression;
                    for (let j = 0; j < textIcon.length; j++) {
                        for (let i = 0; i < expression.length; i++) {
                            let item = expression[i];
                            if (item.alt === textIcon[j]) {
                                message = message.replace(pattern, '<i class="expression  ' + item.className + '"></i>');
                                break;
                            }
                        }
                    }
                }
                let param = {
                    //消息发送到房间,房间ID对于客户而言就是客户的clientID
                    targetClientId:  this.selectRoom.roomId, //发送方
                    targetUserName: this.selectRoom.customerName, //接收方
                    targetClientType: "聊天室", //接收方类型 -- -
                    msgType: "房间消息",
                    path: "",
                    content: message,
                };

                this.socket.emit("csChatC", param);
                this.chatroom.textarea = "";
                this.sendDisable();

                this.expressionHide();
            },
            expressionHide(){
                if (this.chatroomEexpression) {
                    this.chatroomEexpression = false;
                }
            },
            sendDisable(){
                if (this.forbidSpeak.timeInterval){
                    this.isForbidSpeak = true;
                    setTimeout(()=>{
                        this.isForbidSpeak = false;
                    },this.forbidSpeak.timeInterval*1000);
                }
            },
            express(item) {
                if (this.isForbidSpeak) {
                    return
                }
                this.chatroom.textarea += item.alt;
            },
            chatroomExpression(){
                if (this.isForbidSpeak){
                    return
                }
                this.chatroomEexpression = !this.chatroomEexpression;
                // if (this.chatroomEexpression) {
                //     this.screenScroll();
                // }
            },
            sendImg(){
                if (this.isForbidSpeak){
                    return
                }
                document.querySelector("#select_file").click();
            },
            selectImg(event){
                let files = event.target.files || event.dataTransfer.files;
                if (!files.length) return;
                if (typeof FileReader === 'undefined') {
                    this.lalterWarning("您的浏览器不支持图片上传，请升级您的浏览器！");
                    return;
                }
                if ((files[0].size / 1024) > 2048) {
                    this.lalterWarning("您发送的图片过大！");
                    return;
                }
                lrz(files[0]).then((rst)=>{
                    let uploadUrl = this.basePathFile + "webChat/common/file/upload";

                    rst.formData.append("tenantCode", this.chatroomPermission.platform);
                    rst.formData.append("customerId", this.chatroomPermission.clientId);
                    rst.formData.append("pwdConnect",this.chatroomPermission.pwdConnect);
                    rst.formData.append("userName",this.user.userName);
                    $.ajax({
                        url: uploadUrl,
                        data: rst.formData,
                        processData: false,
                        contentType: false,
                        type: 'POST'
                    }).done( (res)=>{
                        if (res.code === 200) {

                            // 发送信息给服务器
                            let jsonObject = {
                                //消息发送到房间,房间ID对于客户而言就是客户的clientID
                                targetClientId:  this.selectRoom.roomId,
                                targetUserName: this.selectRoom.customerName,
                                targetClientType: "聊天室",
                                msgType: "房间消息",
                                path: res.data,
                                fileType: "图片",
                                file: true
                            };
                            this.socket.emit("csChatC", jsonObject);
                            event.target.value = null;
                        }
                    });
                    return rst;
                }).catch(()=>{ // 万一出错了，这里可以捕捉到错误信息 || 而且以上的then都不会执行
                    this.lalterWarning("发送图片失败！");
                }).always(()=>{ // 不管是成功失败，这里都会执行

                });
                event.target.value = null;
            },
            viewImg(item){
                this.viewImage = item;
                this.chatroomImgView = true;

                let img = new Image();
                img.src = `${this.basePathFile}webChat/common/file/down/${this.viewImage.path}.jpg`;
                this.viewImageContent = `<img class="chatroom-img-loading" src='/h5app/static/img/chatroom-loading.jpg'>`;
                img.onload = (ev) => {
                    this.viewImageContent = `<img src='${img.src}'>`;
                    ev.stopPropagation();
                };
            },
            clearScreen() {
                this.chatroom.message = [];
            },
            showPlan(){
                this.onlyShowPlan = !this.onlyShowPlan;
                cacheUtil.setLocalStorage(this.user.userName+"Plan",JSON.stringify(this.onlyShowPlan));
            },
            uploadAvatar() {
                // v-if="permissionControl.SEND_IMAGE && permissionControl.SEND_IMAGE.value == 1" 不能发送图片就不能更换头像
                if (!this.permissionControl.SEND_IMAGE || this.permissionControl.SEND_IMAGE.value != 1 ) {
                    return
                }
                this.showUpload = true;
            },
            chatroomBet(){

                let params = {
                    gameId:this.currentShare.gametype,//彩票ID
                    token:appContext.tokens.lottery_token,//彩票token
                    issueNo:this.currentShare.issueno,//彩票期号
                    zhuiHaoQiHao:[],//彩票追号
                    tingZhiZhuiHao:false,//彩票是否追号
                    touZhuHaoMa:[
                        {
                            wanFaID:this.currentShare.bettype,//彩票玩法ID
                            touZhuHaoMa:this.currentShare.nums,//彩票号码
                            touZhuBeiShu:this.currentShare.multiple,//彩票倍数
                            danZhuJinEDanWei:this.moneyModeValue,//彩票金额的单位
                            yongHuSuoTiaoFanDian:"0",//默认0返点
                            digit:this.currentShare.digit,//彩票号码digit
                            bouse:this.user.bonus,//用户返点
                            zhuShu:"1", //默认注数
                            BaseScale:this.currentShare.bonus?this.currentShare.bonus:0//赔率
                        }
                    ],
                };

                let postJson = JSON.stringify(params);

                if(this.currentShare.isKj){
                    kgApi.cathectic({json: postJson},(res)=>{
                        if (res.data && res.data.token_tz) {
                            appContext.tokens.lottery_token = res.data.token_tz;
                        }
                        this.showShareAlert = false;
                        if (res.code == 200){
                            this.lalterWarning("投注成功!");
                        }else {
                            this.lalterWarning(res.msg);
                        }
                    })
                }else {
                    lotteryApi.confirmBet({json: postJson},(res)=>{

                        if (res.data && res.data.token_tz) {
                            appContext.tokens.lottery_token = res.data.token_tz;
                        }
                        this.showShareAlert = false;
                        if (res.code == 200){
                            this.lalterWarning("投注成功!");
                        }else {
                            this.lalterWarning(res.msg);
                        }
                    });
                }
            },
            // chatroomBetInfo(data){
            //
            //     // if(this.showIssuePushInfo === false || this.selectRoom.customerId != data.id){
            //     //     return
            //     // }
            //
            //     let   bettingInfo = {
            //         betInfo:true,
            //         content: "<div style='color:#faff00'>"+data.name+"</div>"+"<div> 第<span>"+data.issue+"</span>期 开始投注</div>",
            //         headPortrait: "",
            //         msgType: "房间消息",
            //         path: "",
            //         sourceClientId: "",
            //         sourceUserName: "",
            //         targetClientId: "",
            //         targetUserName: "",
            //         time: new Date().getTime(),
            //         cutTime:String(data.time).substr(data.time.length - 8,8)
            //     };
            //     this.chatroom.message.push(bettingInfo);
            //     setTimeout(()=>{
            //         this.screenScroll();
            //     },200);
            // },
            screenScroll() {
                let element = document.querySelector(".chatroom-container");
                if (element) {
                    $("html,body").animate({scrollTop:element.scrollHeight},300);
                }
            },
        },
        watch:{
            'status'() {
                if(this.status == this.statusCodes.error){
                    if(this.socket != null){
                        this.socket.disconnect(true);
                    }
                    this.retryTimes=this.retryTimes||1;
                    if(this.retryTimes>=10){
                        return;
                    }
                    this.initChatroom();
                    this.retryTimes++;
                }
            }
        },
        beforeDestroy() {
            clearInterval(this.setPeople)
        },
    }
</script>
<style scoped lang="less">
</style>

