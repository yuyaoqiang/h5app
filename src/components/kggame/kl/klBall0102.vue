<template>
    <div  class="kg-lottery-main">
        <dl  class="kg-betting-farm" v-if="kgLottery.playTypes!=null  && type.isBall0102  && titleView[type.id]!=null" v-for="type in kgLottery.playTypes">
            <dt>
                <h3 :class="{'active':titleView[type.id/1].arr.length>0}">{{titleView[type.id].ballName}}</h3>
                <p>{{titleView[type.id].desc}}</p>
            </dt>
            <dd v-for="(betType,index) in  type.betTypes"
                @click="toBetChoice(betType,betType.id,type.id)" :class="{'active':betType.active}">
                <div class="betting-ball">
                    <p>
                        <i :class="{'ball':betType.name>=0,'active':betType.active}">{{betType.name}}</i>
                        <span class="red">x {{betType.odds}}</span>
                    </p>
                    <p v-if="betType.active">¥{{kgLottery.totalMoney}}元</p>
                </div>
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
                    1:{ballName:'一',desc:'第一球',arr:[],},
                    2:{ballName:'二',desc:'第二球',arr:[],},
                    3:{ballName:'三',desc:'第三球',arr:[],},
                    4:{ballName:'四',desc:'第四球',arr:[],},
                    5:{ballName:'五',desc:'第五球',arr:[],},
                    18:{ballName:'六',desc:'第六球',arr:[],},
                    19:{ballName:'七',desc:'第七球',arr:[],},
                    20:{ballName:'八',desc:'第八球',arr:[],},
                    6:{ballName:'总',desc:'总和',arr:[],}
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
                    let _this = this;
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
