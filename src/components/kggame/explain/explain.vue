<template>
    <div>
        <div class="box-header">
            <header class="header-box" >
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>{{lotteryName}}</h1>
            </header>
        </div>
        
        <!--玩法选择-->
        <component :is="showExplain" ></component>
    </div>
</template>

<script>
    import appContext from  "../../../assets/js/context/appContext"
    import platformData from  "../../../assets/platform/main/platformData"
    import kgBusiness from  "../../../assets/js/business/lottery/kg/kgBusiness"
    import lotteryBusiness from  "../../../assets/js/business/lottery/lotteryBusiness"
    import arrayUtil from  "../../../assets/js/util/arrayUtil"
    //玩法说明
    import sscExplain from './sscExplain.vue'
    import x5Explain from './11x5Explain.vue'
    import pk10Explain from './pk10Explain.vue'
    import pk8Explain from './pk8Explain.vue'
    import klExplain  from './klExplain.vue'
    import k3Explain  from './k3Explain.vue'
    import fc3DExplain from './fc3DExplain.vue'
    import lhcExplain from './lhcExplain.vue'
    import xyxzExplain from './xyxzExplain.vue'
    import pcddExplain from './pcddExplain.vue'
    import appController from  "../../../assets/js/business/app/appController"

    

    export default {
        data () {
            return {
                //切换彩种
                lotteryName:'',
                showExplain:null,
            }
        },
        created() {
            
            var gameId = this.$route.query.gameId;

            //var explainType =this.$route.query.explainType;
            //var lotteryName =this.$route.query.lotteryName;

            var array = platformData.lotteryGames;

            var gameType = arrayUtil.findFirst(array,item=>{
                if(gameId==item.id){
                    return item
                }
                
            });
            var explainType = null;
            var lotteryName = null;
            
            if(gameType.types){
                explainType = gameType.types
                lotteryName = gameType.name
            }else{
                explainType = gameType.type
                lotteryName = gameType.name
            }

            this.lotteryName=lotteryName;

            this.showExplain=`v-${explainType}Explain`;

        },
        methods: {
            goback: function(){
                var appCtr = appController.getController();
                if(appCtr == null){
                    this.$router.go(-1);
                }else {
                    appCtr.goback();
                }
            }
        },
        components: {
            'v-sscrulesExplain': sscExplain,
            'v-11c5rulesExplain': x5Explain,
            'v-kl10rulesExplain': klExplain,
            'v-pk10rulesExplain': pk10Explain,
            'v-pk8rulesExplain': pk8Explain,
            'v-k3rulesExplain': k3Explain,
            'v-3rulesExplain': fc3DExplain,
            'v-xglhcExplain': lhcExplain,
            'v-pcddExplain': pcddExplain,
            'v-xyxzExplain': xyxzExplain,
        },
        watch: {
        },
        mounted(){
        },

    }


</script>