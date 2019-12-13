<template>
    <div  class="kg-lottery-main">
        <dl  class="kg-betting-two" v-if="kgLottery.playTypes!=null  && titleView[type.id]!=null && type.isLmp==true" v-for="type in kgLottery.playTypes">
            <dt class="pk10-two">
                <h3 :class="{'active':titleView[type.id/1].arr.length>0}">{{titleView[type.id].ballName}}</h3>
                <p>{{titleView[type.id].desc}}</p>
            </dt>
            <div class="fr w6667">
                <dd v-for="(betType,index) in type.betTypes" v-if="betType.name>=0 == false"
                    @click="toBetChoice(betType,betType.id,type.id)" :class="{'active':betType.active}">
                    <div>
                        {{betType.name}} <span :class="{'active':betType.active,'red':'red'}"> {{betType.odds}}</span>

                        <!-- <p v-if="betType.active">¥{{kgLottery.totalMoney}}元</p> -->
                    </div>
                </dd>
            </div>
            
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
                    35:{ballName:'冠',desc:'冠军',arr:[],},
                    36:{ballName:'亚',desc:'亚军',arr:[],},
                    22:{ballName:'一',desc:'第一名',arr:[],},
                    23:{ballName:'二',desc:'第二名',arr:[],},
                    24:{ballName:'三',desc:'第三名',arr:[],},
                    25:{ballName:'四',desc:'第四名',arr:[],},
                    26:{ballName:'五',desc:'第五名',arr:[],},
                    27:{ballName:'六',desc:'第六名',arr:[],},
                    28:{ballName:'七',desc:'第七名',arr:[],},
                    29:{ballName:'八',desc:'第八名',arr:[],},
                    30:{ballName:'九',desc:'第九名',arr:[],},
                    31:{ballName:'十',desc:'第十名',arr:[],},
                    21:{ballName:'和',desc:'冠亚军和',arr:[],},
                },
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
