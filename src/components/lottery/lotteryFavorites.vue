<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>我的收藏</h1>
                <router-link tag="div" :to="{path:'lotteryFavoritesEdit'}" class="member-icon">
                <i class="iconfont icon-tou_bianji"></i>
                </router-link>
            </header>
        </div>
        
        <section class="report-height">
            <div  class="collect-main clearfix">
                <ul  v-for="item in lotteryList" v-if="item.permission && item.favorited" @click="toGame(item)" >
                    <li  class="collect-img">
                        <img :src="require('../../assets/images/lottery/'+item.logo)">
                    </li>
                    <li>{{item.name}}</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>

    import userBussiness from "../../assets/js/business/user/userBusiness"
    import arrayUtil from "../../assets/js/util/arrayUtil"

    export default {
        data () {
            return {
                lotteryList:[]
            }
        },
        created(){
            var _this=this;
            userBussiness.getUser(this,function (user) {

                _this.lotteryList = userBussiness.getLotteryList();
                var favQty=0;
                arrayUtil.forEach(_this.lotteryList,(item,i)=>{
                    if(item.favorited){
                        favQty++;
                    }
                });
                if(favQty == 0){
                    _this.$router.push({path:'lotteryFavoritesEdit'});
                    return;
                }
            })
        },
        methods: {

            toGame(lottery){
                userBussiness.toGame(this,lottery.id);
            },
            goback(){
                this.$router.go(-1);
            },
        },
        components: {}
    }
</script>