<template>
    <div class="kg-lottery-main">
        <ul  class="clearfix kg-lottery-betting">
            <li v-for="(betType,index) in kgBetTypes"   @click="toBetChoice(betType,betType.id)"
                :class="{'active':betType.active}">
                <i class="lottery-ball" :class="[
                        ballColor.red.indexOf(betType.name)!=-1?'ball-red':
                        ballColor.green.indexOf(betType.name)!=-1?'ball-green':
                        'ball-blue']">{{betType.name}}</i>
                <span class="red">x {{betType.odds}}</span>
                <span  class="betting-money" v-if="betType.active">¥ {{kgLottery.totalMoney}}元</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import arrayUtil from '../../../assets/js/util/arrayUtil'
    import kgBusiness from '../../../assets/js/business/lottery/kg/kgBusiness'
    import baseData from '../../../assets/js/data/kgPlayTypeData'

    export default {
        props: {
            kgLottery:{
                type: Object
            },
            submenuType:{
                type: String
            }
        },
        data () {
            return {
                ballColor:{},
                kgBetTypes:[],
            }
        },
        created(){
            this.kgLottery.selectList = [];
            //二级菜单 默认为0
            this.init();
            let index = this.kgLottery.menuIndex;
            this.kgLottery.showDesc=this.kgLottery.playTypes[index].betTypes[0].name;
            this.ballColor = baseData.lhcBallColor;
        },
        methods: {

            init(){
                //一级菜单 idnex
                let index = this.kgLottery.menuIndex;
                let subIndex = this.kgLottery.submenuIndex;
                this.kgBetTypes = this.kgLottery.playTypes[index].betTypes[subIndex].beteTypes;
            },
            toBetChoice(betType,ID){
                if(kgBusiness.isClose()){
                    return
                }
                if(this.kgLottery.totalMoney == null || this.kgLottery.totalMoney==0){
                    this.kgLottery.totalMoney=2;
                }
                let selectItem = {
                    id:ID,
                    betType:betType,
                }
                if(betType.active == false){
                    betType.val = this.kgLottery.totalMoney;
                    betType.active = true;
                    this.kgLottery.selectList.push(selectItem);

                }else{
                    betType.val = null;
                    betType.active = false;
                    let _this = this;
                    for(let i=0;i<this.kgLottery.selectList.length;i++){
                        if(this.kgLottery.selectList[i].id == betType.id){
                            this.kgLottery.selectList.splice(i,1);
                        }
                    }
                }
               this.compuSelect();
            },
            //计算注数金额
            compuSelect(){
                this.kgLottery.zhushu = this.kgLottery.selectList.length;
                this.kgLottery.allMoney = this.kgLottery.selectList.length*this.kgLottery.totalMoney;
            }
        },
        watch:{
            "kgLottery.totalMoney": function () {
                this.compuSelect();
            },
            "kgLottery.submenuIndex":function(){
                this.init();
            }
        },
        components: {},

    }
</script>
