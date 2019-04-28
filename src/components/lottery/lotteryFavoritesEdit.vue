<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>编辑收藏列表</h1>
                <div v-show="changed" @click="confirm" class="member-icon">
                    <p>保存</p>
                </div>
            </header>
        </div>
        
        <section class="report-height">
            <div  v-if="favoritedQty>0">
                <div class="collect-title"><p>已收藏</p></div>
                <div  class="collect-main clearfix">
                    <ul @click="favorite(item.id,false)"  v-for="item in lotteryList" v-if="item.permission && item.favorited==true">
                        <li class="collect-img">
                            <img :src="require('../../assets/images/lottery/'+item.logo)">
                        </li>
                        <li>{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <div v-if="unfavoritedQty>0">
                <div class="collect-title"><p>未收藏</p></div>
                <div  class="collect-main clearfix">
                    <ul v-for="item in lotteryList" v-if="item.permission && item.favorited==false">
                        <li class="collect-img" @click="favorite(item.id,true)">
                            <img :src="require('../../assets/images/lottery/'+item.logo)">
                        </li>
                        <li>{{item.name}}</li>
                    </ul>
                </div>

            </div>
        </section>
    </div>
</template>

<script>

    import userBussiness from "../../assets/js/business/user/userBusiness"
    import arrayUtil from "../../assets/js/util/arrayUtil"
    import userInfoApi from "../../assets/js/api/userInfo"

    export default {
        data () {
            return {
                lotteryList:[],
                favoritedQty:0,
                unfavoritedQty:0,
                changed:false
            }
        },
        created(){
            var _this=this;
            userBussiness.getUser(this,function (user) {
                _this.lotteryList = userBussiness.getLotteryList();
                _this.stats();
            })
        },
        methods: {
            goback(){

                if(this.favoritedQty>0){
                    this.$router.go(-1);
                }else {
                    this.$router.go(-2);
                }
                /* if (this.changed) {
                 this.$router.go(-1);
                 } else {
                 this.$router.go(-1);
                 }*/
            },
            favorite(id,isFav){
                var _this = this;
                var index = -1;
                var lottery = null;
                for (var i in _this.lotteryList) {
                    lottery = _this.lotteryList[i];
                    if (lottery.id == id / 1) {
                        _this.lotteryList.splice(i, 1);
                        break;
                    }
                }

                lottery.favorited = isFav
                _this.lotteryList.splice(0, 0, lottery);
                _this.changed = true;
                _this.stats();

            },
            confirm(){
                var _this = this;
                if (_this.changed == false) return;

                var ids = arrayUtil.join(_this.lotteryList, item => {
                    if(item.favorited ==false) return null;
                    return item.id;
                });
                userInfoApi.saveFavorites({lotteryIds: ids}, function (resp) {
                    _this.changed = false;
                    if (resp.code == 200) {
                        _this.lalterSuccess("保存成功");
                        //_this.goback();
                    } else {
                        _this.lalterSuccess(resp.msg);
                    }
                })
            },
            stats(){
                var favoritedQty = 0;
                var unfavoritedQty = 0;
                for (var i in this.lotteryList) {
                    var lottery = this.lotteryList[i];
                    if(lottery.permission==false){
                        continue;
                    }
                    if (lottery.favorited) {
                        favoritedQty++;
                    } else {
                        unfavoritedQty++;
                    }
                }
                this.favoritedQty=favoritedQty;
                this.unfavoritedQty=unfavoritedQty;
            }
        },
        components: {}
    }
</script>