<template>
    <div class="kg-lottery-main">
        <section class="kg-betting-niu-hz"  v-if="kgLottery.playTypes!=null && type.isHZ==true" v-for="type in kgLottery.playTypes">
            <h2  class="kg-betting-title">{{type.desc}}</h2>
            <dl  v-for="(betType,index) in  type.betTypes">
                <dd @click="toBetChoice(betType,betType.id)" :class="{'active':betType.active}">
                    <div>
                        <p>{{betType.name}}</p>
                          <p class="red">{{betType.odds}}</p>
                        <!-- <p class="betting-money" v-if="betType.active">¥{{kgLottery.totalMoney}} 元</p> -->
                    </div>
                </dd>
            </dl>
        </section>
    </div>
</template>

<script>
    import arrayUtil from '../../../assets/js/util/arrayUtil'
    import kgBusiness from '../../../assets/js/business/lottery/kg/kgBusiness'
    export default {
        props: {
            kgLottery:{
                type: Object
            }
        },
        data () {
            return {

            }
        },
        created(){
            this.kgLottery.selectList = [];
        },
        methods: {
            toBetChoice(betType,ID){
                if(kgBusiness.isClose()){
                    return
                }
                if(this.kgLottery.totalMoney == null || this.kgLottery.totalMoney==0){
                    this.kgLottery.totalMoney=1;
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
