<template>
    <div class="kg-lottery-main">
        <dl class="kg-betting-area" v-if="kgLottery.playTypes!=null && type.isNum==true" v-for="type in kgLottery.playTypes">
            <dt>
                <h3 :class="{'active':titleView[type.id/1].arr.length>0}">{{titleView[type.id/1].ballName}}</h3>
                <p>{{titleView[type.id/1].desc}} <strong class="red">{{type.betTypes[0].odds}}</strong></p>
            </dt>
            <dd v-for="(betType,index) in  type.betTypes" v-if="betType.name>=0"
                @click="toBetChoice(betType,betType.id,type.id)" :class="{'active':betType.active}">
                <i>{{betType.name}}</i>
                <!--<span>x <i>{{betType.odds}}</i></span>-->
                <!--<span v-if="betType.active">¥ <strong class="betting-money">{{kgLottery.totalMoney}}</strong></span>-->
            </dd>
        </dl>
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
                titleView:{
                    1:{ballName:'万',desc:'第一球',arr:[],},
                    2:{ballName:'千',desc:'第二球',arr:[],},
                    3:{ballName:'百',desc:'第三球',arr:[],},
                    4:{ballName:'十',desc:'第四球',arr:[],},
                    5:{ballName:'个',desc:'第五球',arr:[],},
                }
            }
        },
        created(){
            this.kgLottery.selectList = [];
        },
        methods: {
            toBetChoice(betType,ID,numberId){
                
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
                    this.titleView[numberId].arr.push(true);
                }else{
                    betType.val = null;
                    betType.active = false;
                    this.titleView[numberId].arr.shift(true);
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
