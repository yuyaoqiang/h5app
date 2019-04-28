<template>
    <div>
        <header class="header-box">
            <div class="header-arrow-box" @click="leftSlide">
                <i class="el-icon-more"></i>
            </div>
            <h1 v-if="user.isOpenKg==false">彩票大厅</h1>
            <div  class="report-select">
                <ul class="display-box" v-if="user.isOpenKg==true">
                    <li :class="{'active':selectType==lotteryFlag}" @click="typeChange(lotteryFlag)">彩票大厅</li>
                    <li :class="{'active':selectType==kgFlag}" @click="typeChange(kgFlag)">KG大厅</li>
                </ul>
            </div>
        </header>
        <section class="overflow-height">
            <section  v-for="d in data" v-if="d.list.length>0">
                <div class="lottery-title">
                    <p>{{d.type.desc}}</p>
                </div>
                <ul class="clearfix lottery-hall">
                    <li  v-for="item in d.list" v-if="item.permission==true || selectType==kgFlag">
                        <i  @click="favorit($event,item)"  class="collect-icon "
                            :class="{'delcollect':item.favorited,'addcollect':item.favorited==false}">
                        </i>
                        <div class="lottery-hall-img">
                            <img @click="toLotteryBet(item)" :src="require('../../assets/images/lottery/'+item.logo)">
                        </div>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </section>
        </section>
    </div>
</template>

<script >
    import slippery from "../slippery/slippery.vue"
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import kgBusiness from  "../../assets/js/business/lottery/kg/kgBusiness"
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import userInfoApi from '../../assets/js/api/userInfo'
    import arrayUtil from '../../assets/js/util/arrayUtil'
    export default {
        props: {
            user: {
                type: Object
            }

        },
        data () {
            return {
                data:[],
                lotteryFlag:"lottery",
                kgFlag:"kg",
                selectType: null,
                init:false,
            }
        },
        created(){
            var selectType = this.$route.query.lotteryType;
            selectType=selectType==null?this.lotteryFlag:selectType
            this.typeChange(selectType)
        },
        methods: {

            leftSlide(){
                this.$parent.leftSlide();
            },

            typeChange(type){
                this.selectType = type;
                let _this = this;
                var types=lotteryBusiness.getDisplayTypeList();
                if(type == _this.lotteryFlag){
                    types=arrayUtil.filter(types,item=>{return item.isTradition==true});
                    var list=userBusiness.getLotteryList();
                    _this.bindingData(types,list);
                }else {
                    kgBusiness.initLotteryList(function (lotteryList) {
                        _this.bindingData(types,lotteryList);
                    });
                }

                this.$router.push({path:'lotteryHome',query:{lotteryType:type}});

            },

            bindingData(types,list){
                if(list.length==0){
                    this.lalterWarning((this.lotteryFlag==this.selectType?"彩票大厅":"KG大厅")+"的游戏暂时关闭")
                }

                var data=[];
                arrayUtil.forEach(types,t=>{
                    var lotteryList = arrayUtil.filter(list,l=>{return l.displayType == t.name});
                    if(lotteryList.length>0){
                        data.push({type:t,list:lotteryList});
                    }
                });
                this.data=data;
            },
            favorit(e,item){
                var _this = this;
                var lotteryFavIds = _this.user.lotteryFavorites.split(",");
                var isCancel = false;
                var newLotteryFavIds = arrayUtil.join(lotteryFavIds, idStr => {
                    if (idStr == item.id) {
                        isCancel = true;
                        return null;
                    }
                    return idStr;
                });
                if (isCancel == false) {
                    newLotteryFavIds += "," + item.id;
                }



                item.favorited = !item.favorited;
                userInfoApi.saveFavorites({lotteryIds: newLotteryFavIds}, function (resp) {
                    if (resp.code == 200) {


                        _this.user.lotteryFavorites = newLotteryFavIds;

                        //_this.lalterSuccess("收藏成功");
                    } else {
                        _this.lalterError(resp.msg);
                        item.favorited = !item.favorited;
                    }
                });
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
            },

            toLotteryBet(lottery){

                if(this.selectType == this.lotteryFlag){
                    this.$router.push({path:'lotteryBet',query:{gameId:lottery.id}});
                }else {
                    this.$router.push({path:'kgGameBet',query:{gameId:lottery.id}});
                }
            },

            goback(){
                this.$router.push({path:'index'});
            },

        },
        watch:{

        },
        components: {
            "v-slippery":slippery
        }
    }
</script>
<style>

</style>
