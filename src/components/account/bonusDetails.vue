<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1 class="text-center">奖金详情</h1>
            </header>
            <section class="tab-nav-box">
                <ul class="text-center">
                    <li v-for="item in gameRebate.gameTypes" :class="{'active':showMenu===item.id}" @click="changeMenu(item.id)">{{item.name}}</li>
                </ul>
            </section>
        </div>
        
        <div class="bonus-con">
            <ul v-for="item in gameRebate.playTypes" v-if="item.gameTypeId == showMenu">
                <li class="title">
                    {{item.playTypeName}} <span>返点{{(user.bonus - item.bonusDiff)> 0 ?(user.bonus - item.bonusDiff):'0.0' | fixed(2)}}%</span>
                </li>
                <li v-for="subitem in item.data">
                    {{subitem.betTypeName}} <span>{{subitem.baseScale}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import arrayUtil  from '../../assets/js/util/arrayUtil.js';
    import lotteryApi  from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from "../../assets/js/api/userInfo";
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import lotteryBusiness  from '../../assets/js/business/lottery/lotteryBusiness';
    export default {
        data () {
            return {
                user: {},
                gameRebate: {},
                showMenu:1,
            }
        },
        created(){
            var _this = this;
            userBusiness.getUser(_this, function (user) {
                _this.user = user;
            });

            userInfoApi.serachGameRebate(function (res) {
                let data = res.data;
                var allGameTypes = [
                    {id: 1, name: "高频彩"},
                    {id: 5, name: "3D/3P"},
                    {id: 19, name: "PK10/飞艇"},
                    {id: 25, name: "十一选五"},
                    {id: 28, name: "快三"},
                    {id: 38, name: "快乐十分"}
                ]
                var gameTypes = [];
                var playTypes = [];

                for (var key in data.gameTypeMap) {
                    var t = arrayUtil.findFirst(allGameTypes, function (gt) {
                        return gt.id == (key / 1)
                    })
                    if (t != null) {
                        gameTypes.push(t);
                    }
                }

                var map = {};
                for( var k in data.gameRebateMap){
                    var playList = data.gameRebateMap[k];
                    for(var p in playList){
                        var pt = playList[p];
                        if(!map[pt.playTypeId]){
                            playTypes.push({
                                playTypeId: pt.playTypeId,
                                playTypeName: pt.playTypeName,
                                gameTypeId: pt.gameTypeId,
                                bonusDiff: pt.bonusDiff,
                                data:[pt],
                            });
                            map[pt.playTypeId] = pt;
                        } else {
                            for (var j = 0; j < playTypes.length; j++) {
                                var pj = playTypes[j];
                                if (pj.playTypeId == pt.playTypeId) {
                                    pj.data.push(pt);
                                    break;
                                }
                            }
                        }
                    }
                }
                _this.gameRebate = data;
                _this.gameRebate.gameTypes = gameTypes;
                _this.gameRebate.playTypes = playTypes;
                _this.changeMenu(1);
            })
        },
        methods: {
            goback: function () {
                this.$router.push('/account');
            },
            changeMenu(id){
                this.showMenu = id;
            },
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .tab-nav-box{
        overflow-x: auto;
        ul{
            overflow: auto;
            white-space: nowrap;
            li{
                display: inline-block;
                padding: 0 0.08rem;
            }
        }
    }
    .bonus-con{
        // position: absolute;
        // top:0.79rem;
        // bottom: 0;
        // left: 0;
        // right: 0;
        padding-top: 0.8rem
    }
    .bonus-con ul li{
        line-height: 0.35rem;
        padding: 0 0.12rem;
        line-height: 0.3rem;
        padding: 0 0.12rem;
        border-bottom: 1px solid #cecece;
        background: #fff;
        &.title{
            line-height: 0.35rem;
            background: #ececec;
            color: @main-color;
         }
        span{
            float: right;
        }
    }
</style>