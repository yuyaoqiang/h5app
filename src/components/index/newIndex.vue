<template>
    <div>

        <v-header :titleName="titleName" v-show="showTitle"></v-header>
        <!-- <v-suspension></v-suspension> -->
        <div class="lottery-slide-left">
            <v-slippery :user="user" ref="tagIndex"></v-slippery>
        </div>
        <div class="lottery-slide-right" id="wathScrol" ref="wathScrol" >
            <router-view :user="user" :showDLBanner="showDLBanner"></router-view>
        </div>
        <v-footer></v-footer>
        <div v-if="dialogVisible&&user.init" ref="coverBg">
            <div class="cover-bg"></div>
            <div class="alert-main">
                <h1 class="alert-title">{{noticeDetails.title}}</h1>
                <div class="notice-alert-content">
                    <div>
                        {{noticeDetails.content}}
                    </div>
                </div>
                <ul class="display-box alert-btn-box">
                    <li @click="dialogVisible = false">确 定</li>
                </ul>
            </div>
        </div>
        <v-redPack :isShow='true'></v-redPack>
    </div>
</template>
<script>
    import footer from '../footer/footer.vue';
    import header from '../header/header.vue';
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import kgBusiness  from '../../assets/js/business/lottery/kg/kgBusiness';
    import slippery from '../slippery/slippery.vue'
    import arrayUtil  from '../../assets/js/util/arrayUtil';
    import platformData from '../../assets/platform/main/platformData.js';
    import userInfo from  "../../assets/js/api/userInfo";
    import suspension from  "../suspension/suspension.vue";
    import redPack from '../commots/redPack.vue';
    export default {
        data () {
            return {
                user:{
                    lotteryBal:0
                },
                tagIndex:0,
                showDLBanner:true,
                titleName:'',
                showTitle:true,
                dialogVisible:false,
                noticeDetails: {
                    title:'',
                    content:''
                },
            }
        },
        methods:{
            scrollWatch() {
                var scroll =  document.querySelector('#wathScrol').scrollTop;
                if( scroll <10){
                    this.showDLBanner =true;
                }else {
                    this.showDLBanner = false
                }
               
            },
            toLogin(){
              viewUtil.toLoginView();
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
            toFriendStr(val,defaultDisplay,splitFlag) {
                if(defaultDisplay==false && val<1){
                    return "";
                }
                return (val<10?("0"+val):val)+(splitFlag?":":"");
            },
        },
        created() {
            var _this = this;
            
            userBusiness.getUser(this,function (user) {
                _this.user=user;
            });
            _this.titleName = platformData.setting.name;
            let route = this.$route;
            let meta = route.meta || {};
            if(meta.show){
                this.showTitle = true;
                if(meta.index!=1){
                    this.titleName = meta.title;
                }
            }else{
                this.showTitle = false;
            }
            
        },
        watch:{
            "$route":function(to,from){
                let _this = this;
                if(to.path!=from.path){
                    if(to.meta.show){
                        this.showTitle = true;
                        if(to.meta.index==1){
                            this.titleName = platformData.setting.name;
                        }else{
                            this.titleName = to.meta.title;
                        }
                        
                    }else{
                        this.showTitle = false;
                    }
                    
                }
            },
            "dialogVisible":function(a,b){
                if(a==true){
                   //methodsScroll.forbidScroll();  
                }else{
                   //methodsScroll.enabledScroll();  
                }
            }
        },
        components: {
            'v-footer': footer,
            'v-slippery': slippery,
            'v-header':header,
            "v-suspension":suspension,
            'v-redPack': redPack,
            
        }
    }
</script>


<style lang="less" scoped>

</style>
