<template>
    <div  class="kg-lottery-main">
        <ul class="clearfix kg-pcdd-box" v-if="kgLottery.playTypes!=null && type.isBall==true" v-for="type in kgLottery.playTypes">
            <li v-for="(betType,index) in  type.betTypes"
                @click="toBetChoice(betType,betType.id)" :class="{'active':betType.active}">
                <div>
                    <p>
                        <i class="kg-pcdd-ball" :class="{
                            'ball-red':ballColor.red.indexOf(betType.name)!=-1,
                            'ball-green':ballColor.green.indexOf(betType.name)!=-1,
                            'ball-blue':ballColor.blue.indexOf(betType.name)!=-1,
                            'ball-gray':ballColor.gray.indexOf(betType.name)!=-1}">{{betType.name}}</i>
                        <span class="red">x {{betType.odds}}</span>
                    </p>
                    <p class="betting-money" v-if="betType.active">¥{{kgLottery.totalMoney}}元</p>
                </div>
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
            }
        },
        data () {
            return {
                ballColor:{},
            }
        },
        created(){
            //球的颜色
            this.ballColor = baseData.pcddBallColor;
            this.kgLottery.selectList = [];
        },
        methods: {
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
            }
        },
        components: {},

    }
</script>
