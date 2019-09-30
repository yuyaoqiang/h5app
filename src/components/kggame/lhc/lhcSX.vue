<template>
    <div class="kg-lottery-main">
        <div class="kg-lottery-zodiac">
            <dl v-for="(betType,index) in kgBetTypes"   @click="toBetChoice(betType,betType.id)"
                :class="{'active':betType.active,'zx':kgLottery.showDesc=='总肖'}">
                <dt>
                    <i class="zodiac" :class="{'zx':kgLottery.showDesc=='总肖'}">{{betType.name.split('|')[0]}}</i>
                </dt>
                <dd class="zodiac-number" v-if="kgLottery.showDesc!='总肖'">
                    <b v-for="name in betType.name.split('|')[1].split(',')"
                       :class="[
                        ballColor.red.indexOf(name)!=-1?'ball-red':
                        ballColor.green.indexOf(name)!=-1?'ball-green':
                        'ball-blue']"
                    >
                        {{name}}
                    </b>
                </dd>
                <dd class="zodiac-odds red">{{betType.odds}}</dd>
                <!-- <dd class="zodiac-odds zodiac-money" v-if="betType.active">¥{{kgLottery.totalMoney}}元</dd> -->
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
            },
            "kgLottery.submenuIndex":function(){
                this.init();
            }
        },
        components: {},

    }
</script>
