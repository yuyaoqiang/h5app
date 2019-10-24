<template>
    <div>

        <div class="lottery-height">
            <!-- <v-downloadBanner v-if="showDLBanner"></v-downloadBanner> -->
            <header class="pr">
                <!-- <section class="index-header-box">
                    <div class="column-icon-box" @click="leftSlide" v-if="user.init==true">
                        <i class="column-icon"></i>
                    </div>
                    <h1>{{platformName}}</h1>
                    <div class="index-login-to" v-if="user.apiReqFinish==true&&user.init==false"><a @click="toLogin">登录</a></div>
                    <div class="index-login-try" v-if="user.apiReqFinish==true&&user.init==false"><a href="javascript:void(0);" @click="loginShiWan">试玩</a></div>
                </section> -->
                <div class="banner-main">
                    <mt-swipe :auto="2000" :stopPropagation="true">
                        <mt-swipe-item v-for="(item,i) in rotationUrl.context" :key="i+'-l'">
                            <img :src="rotationUrl.serverUrl+item.imgurl"   @click="toActive(item)"/>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                
                <div class="lottery-note">

                    <ul class="display-flex">
                        <li class="lottery-note-icon">
                            <img src="../../assets/images/lb.png">
                            <span>公告:</span>
                        </li>
                        <li class="flex-box lottery-note-box">
                            <p v-for='(item,index) in notice.roll' :content="item.content" @click="openDetails(index)">
                                {{item.title}}</p>
                        </li>
                        <router-link tag="li" to="notice"  class="lottery-note-more">更多</router-link>
                    </ul>
                </div>
            </header>
            <section class="index-menu">
                <ul class="display-box">
                    <li @click="toWyczPage({path:'chongzhi'})">
                        <div>
                            <img src="../../assets/images/recharge-iocn.png"/>
                        </div>
                        <p>充值</p>
                    </li>
                    <li @click="toWytxPage({path:'withdraw'})">
                        <div>
                            <img src="../../assets/images/withdraw-icon.png"/>
                        </div>
                        <p>提现</p>
                    </li>
                    <li @click="toActivity">
                        <div>
                            <img src="../../assets/images/activity-icon.png"/>
                        </div>
                        <p>活动</p>
                    </li>
                    <li @click='toThirdGame'>
                        <div>
                            <img src="../../assets/images/play-icon.png"/>
                        </div>
                        <p>视讯</p>
                    </li>
                </ul>
            </section>
            <section class="lottery-list-box">
                <ul class="hot-lottery clearfix">
                    <li  @click="toLotteryFavorites">
                        <div>
                            <img src="../../assets/images/collection.png">
                        </div>
                        <div class="hot-collect">
                            <h2>我的收藏</h2>
                        </div>
                    </li>
                    <li v-for="item in lotteryList" v-if="item.openTradition==true || item.openKg==true || item.displayType=='VR'&&item.permission"
                        @click="toGame(item)">
                        <div>
                            <img :src="require('../../assets/images/lottery/'+item.logo)">
                        </div>
                        <div class="hot-name">
                            <h2>{{item.name}} <i class="hot-icon" v-if="item.hot"></i></h2>
                            <p>
                                <span v-if="item.indexCountdown.status!=null"
                                      :class="{'red2':item.indexCountdown.status=='BETTING','green':item.indexCountdown.status=='CLOSED'}">
                                {{item.indexCountdown.status == "BETTING" ? "投注" : "封盘"}}
                                </span>

                                <span :class="{'red2':item.indexCountdown.status=='BETTING','green':item.indexCountdown.status=='CLOSED'}">{{item.indexCountdown.content}}</span>

                            </p>
                        </div>
                    </li>

                </ul>
            </section>
        </div>
        
    </div>
</template>

<script>
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import viewUtil from '../../assets/js/business/common/viewUtil';
    //import RecordList  from '../../common/api/RecordList.js';
    import lotteryApi from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from '../../assets/js/api/userInfo';
    import platformData from '../../assets/platform/main/platformData';
    import kgBusiness from '../../assets/js/business/lottery/kg/kgBusiness'
    import lotteryCountDownCenter from '../../assets/js/business/lottery/lotteryCountDownCenter'
    import downloadBanner from '../download/download_banner.vue'
    import bus from '../eventBus'
    
    // import 'mint-ui/lib/style.css'
    export default {
        props: {
            showDLBanner: {
                type: Boolean,
            }
        },
        data() {
            return {
                modal:true,
                user: {
                    lotteryBal: 0
                },
                notice: {
                    "roll": []
                },
                rotationUrl: {
                    serverUrl: '',
                    context: ''
                },
                noticeDetails: {
                    title:'',
                    content:''
                },
                images: [],
                dialogVisible: false,
                lotteryList: [],
                trdGames: [],
                accountMenus: {},
                isAllowRemote: false,
                playNoticInterval: null,
                platformName:'',
                
            }
        },
        created() {
            var _this = this;
            userBusiness.getUser(this, function (user) {
                _this.user = user;
                bus.$on('btnBoxMessage',function(val){
                    userInfoApi.notice((res) => {
                        
                        if (res.code == 200) {
                            var data = res.data;
                            _this.notice.roll = data.roll || [];
                            
                            if(_this.notice.roll.length&&!_this.user.isShiWan){
                                _this.$parent.noticeDetails = _this.notice.roll[0];
                                _this.dialogVisible = true;
                                _this.$parent.dialogVisible = true;
                                // setTimeout(function(){
                                //     _this.dialogVisible = false
                                //     _this.$parent.dialogVisible = false;
                                // },6000)
                            }     
                        }
                    });
                    
                })   
            }, true)
            
            _this.images = platformData.indexBanners;
            _this.isAllowRemote = platformData.setting.allowRemoteUrl;
            _this.platformName = platformData.setting.name;
            
            _this.trdGames = userBusiness.getTrdGames();
            _this.accountMenus = userBusiness.getAccountMenus();
           
            this.getListGame();

            userBusiness.getBannerList((res) => {
                var data = res.data;
                _this.rotationUrl.serverUrl = data.serverUrl;
                _this.rotationUrl.context = data.list;
            });

            userInfoApi.notice((res) => {
                if (res.code == 200) {
                    var data = res.data;
                    _this.notice.roll = data.roll || [];
                    _this.lotteryNote();
                }
            });

        },
        mounted(){
            let _this = this;
            bus.$on('btnBoxMessage',function(val){
                userBusiness.refreshBal(_this,function(user){
                    _this.user = user
                   
                },false)
            })
            bus.$on('getGameList',function(val){
                if(val){
                    _this.getListGame()
                }
            });   
        },
        methods: {
            toActive(item){
                if(!item.name || item.name.indexOf("@")==-1) return;
                var name = item.name.split('@')[1];
                this.$router.push({path: "activity", query: {name: name}});
            },
            getListGame(){
                let _this = this;
                _this.lotteryList = [];
                lotteryBusiness.getIndexLotteryList(function (indexLotteryList) {
                    if (indexLotteryList && indexLotteryList.length > 0 && indexLotteryList.length <= 200) {
                        var ids = arrayUtil.join(indexLotteryList, item => {
                            return item.id;
                        }, ",");
                        lotteryApi.getBettingTimeList({gameIds: ids}, function (resp) {
                            if (resp.code == 200) {
                                //todo
                                var data = resp.data;
                                arrayUtil.forEach(indexLotteryList, item => {
                                    var countdown = data[item.id];
                                    if (countdown != null) {
                                        lotteryCountDownCenter.add(item, countdown);
                                    }
                                });
                            }
                        });
                    } else {
                        /*  arrayUtil.forEach(indexLotteryList, l => {
                            l.indexCountdown.content ="玩法新颖 惊喜不断"
                        });*/
                    }
                    _this.lotteryList = indexLotteryList;
                });
            },
            toLogin(){
              viewUtil.toLoginView();
            },
            toLotteryFavorites(){
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                this.$router.push({path:"lotteryFavorites"});
            },
            leftSlide() {
                this.$parent.leftSlide();
            },
            toGame(lty) {
                userBusiness.toGame(this, lty.id);
            },
            lotteryNote() {
                var _this = this;
                if (_this.notice.roll.length <= 1) {
                    return;
                }
                this.stopAutoNotic();
                let noteContent = document.querySelector(".lottery-note-box");
                if (noteContent){
                    _this.playNoticInterval = setInterval(function () {
                        let note = document.querySelectorAll(".lottery-note-box p")[0];
                        noteContent.appendChild(note);
                    }, 3 * 1000)
                }
            },

            toWytxPage(path) {
                userBusiness.toWytxPage(path);
            },
            toWyczPage(path) {
                userBusiness.toWyczPage(path);
            },
            toActivity(){
                userBusiness.toActivity();
            },
            toTrdGame(item) {
                var falg = userBusiness.checkIsTryPlayer();
                if (falg) {
                    return;
                }
                if (item.permission != true) {
                    this.lalterWarning(item.name + "游戏暂未开放");
                    return;
                }
                this.$router.push({path: "thirdGame", query: {code: item.code}});
            },
            toLotteryHome(type) {
                this.$router.push({path: 'lotteryHome', query: {lotteryType: type}});
            },
            toThirdGame(){
                this.$router.push({path: 'thirdGame'});
            },
            onlineServer() {
                userBusiness.openCustomerService();
            },
            openDetails(index) {
                
                this.dialogVisible = true;
                this.$parent.dialogVisible = true;
                this.$parent.noticeDetails = this.notice.roll[index];
            },
            stopAutoNotic() {
                if (this.playNoticInterval != null) {
                    clearInterval(this.playNoticInterval);
                    this.playNoticInterval = null;
                }
            },
            loginShiWan(){
                var _this = this;
                var params = {
                    "device" : 0,
                };
                _this.lshowWait();
                userInfoApi.loginShiWan(params,(res)=>{
                    _this.lcloseWait();
                    if(res.code == 200){
                        userBusiness.initMenu=true;
                        userBusiness.getUser(this, function (user) {
                            _this.user = user;
                        }, true)

                    }else {
                        this.lalterError(res.msg);
                    }
                })
            },


        },
        components: {
            'v-downloadBanner': downloadBanner,
            
        },
        watch:{
            
             "$parent.dialogVisible":function(a,n){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
                
             }
        },
        beforeDestroy() {
            this.stopAutoNotic();
            lotteryCountDownCenter.clearAll();
        }
    }
</script>