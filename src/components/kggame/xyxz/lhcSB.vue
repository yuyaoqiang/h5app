<template>
    <div class="kg-lottery-main">
        <!-- <p v-if="kgLottery.showDesc!='星色'" class="lottery-wave-header">赔率: <span class="red">{{kgBetTypes[0].odds}}</span></p> -->

        <div class="kg-wave overflow-hidden" :class="{'kg-wave-box':kgLottery.showDesc=='星色','kg-wave-half':kgLottery.showDesc=='半半星色'||kgLottery.showDesc=='半星色'}">
            <dl class="clearfix" v-for="(betType,index) in kgBetTypes"   @click="toBetChoice(betType,betType.id)"
                :class="{'active':betType.active}">
                <dt class="kg-wave-title">
                    <i class="lottery-block">{{betType.name.split('|')[0]}}</i>
                </dt>
                <dd v-if="kgLottery.showDesc!='星色'">
                    <b v-for="name in betType.name.split('|')[1].split(',')"
                       :class="[ballColor.red.indexOf(name)!=-1?'ball-red':
                            ballColor.green.indexOf(name)!=-1?'ball-green':
                            'ball-blue']">
                        {{name}}
                    </b>
                    <span class="red wave-odd">x {{betType.odds}}</span>
                </dd>

                <dd  class="red wave-odd" v-if="kgLottery.showDesc=='星色'">x {{betType.odds}}</dd>
                
                <dd class="wave-money" v-if="betType.active">
                    ¥{{kgLottery.totalMoney}}元
                </dd>
            </dl>
            
        </div>
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
               mixins:null
            }
        },
        created(){
            this.kgLottery.selectList = [];
            //二级菜单 默认为0
            this.init();
            let index = this.kgLottery.menuIndex;
            this.kgLottery.showDesc=this.kgLottery.playTypes[index].betTypes[0].name;
            this.ballColor = baseData.xyxzBallColor;
            this.mixins = window.outerHeight;
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




