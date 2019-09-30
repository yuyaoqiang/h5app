<template>
    <div  class="kg-lottery-main">
        <div  class="kg-lottery-zodiac">
            <dl v-for="(betType,index) in kgBetTypes"   @click="toBetChoice(betType,betType.id)" :class="{'active':betType.active}">
                <dt><i  class="zodiac">{{betType.name.split('|')[0]}}</i></dt>
                <dd class="zodiac-number">
                    <b v-for="name in betType.name.split('|')[1].split(',')"
                            :class="[
                            ballColor.red.indexOf(name)!=-1?'ball-red':
                            ballColor.green.indexOf(name)!=-1?'ball-green':
                            'ball-blue']">
                        {{name}}
                    </b>
                </dd>
                <dd  class="zodiac-odds red">{{betType.odds}}</dd>
                <!-- <dd  class="zodiac-odds zodiac-money" v-if="betType.active">¥{{kgLottery.totalMoney}} 元</dd> -->
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
                selectBall:[],
                selectID:[],
                minlength:0,
                maxlength:0
            }
        },
        created(){
            //二级菜单 默认为0
            this.init();
            let index = this.kgLottery.menuIndex;
            this.kgLottery.showDesc=this.kgLottery.playTypes[index].betTypes[0].name;
            //球的颜色
            this.ballColor = baseData.lhcBallColor;
        },
        methods: {

            init(){
                //一级菜单 idnex
                let index = this.kgLottery.menuIndex;
                let subIndex = this.kgLottery.submenuIndex;
                this.kgBetTypes = this.kgLottery.playTypes[index].betTypes[subIndex].beteTypes;
                //二级菜单变化 取玩法长度
                this.compuLenth();
            },
            compuLenth(){
                switch (this.kgLottery.showDesc){
                    case '二肖':
                        this.minlength=2;
                        this.maxlength=12;
                        break;
                    case '三肖':
                        this.minlength=3;
                        this.maxlength=12;
                        break;
                    case '四肖':
                        this.minlength=4;
                        this.maxlength=12;
                        break;
                    case '五肖':
                        this.minlength=5;
                        this.maxlength=12;
                        break;
                    case '六肖':
                        this.minlength=6;
                        this.maxlength=12;
                        break;
                    case '七肖':
                        this.minlength=7;
                        this.maxlength=12;
                        break;
                    case '八肖':
                        this.minlength=8;
                        this.maxlength=12;
                        break;
                    case '九肖':
                        this.minlength=9;
                        this.maxlength=12;
                        break;
                    case '十肖':
                        this.minlength=10;
                        this.maxlength=12;
                        break;
                    case '十一肖':
                        this.minlength=11;
                        this.maxlength=12;
                        break;
                };
                this.kgLottery.selectBall=[];
                this.kgLottery.selectID=[];
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
                //玩法选择
                if(betType.active==null||betType.active == false){
                    betType.val = this.kgLottery.totalMoney;
                    betType.active = true;
                    this.kgLottery.selectList.push(selectItem);
                    this.kgLottery.selectBall.push(betType.name);
                    this.kgLottery.selectID.push(betType.id);

                }else{
                    betType.val = null;
                    betType.active = false;
                    let _this = this;
                    for(let i=0;i<this.kgLottery.selectList.length;i++){
                        if(this.kgLottery.selectList[i].id == betType.id){
                            this.kgLottery.selectList.splice(i,1);
                        }
                    }
                    //移除选择
                    let index = this.kgLottery.selectBall.indexOf(betType.name);
                    this.kgLottery.selectBall.splice(index,1);
                    this.kgLottery.selectID.splice(index,1);
                }

                //最长不能选择的选项位数
                if(this.kgLottery.selectBall.length>this.maxlength){
                    this.lalterWarning(`最多只能选择${this.maxlength}项`);
                    betType.active = false;
                    betType.val = null;
                    let index = this.kgLottery.selectBall.indexOf(betType.name);
                    this.kgLottery.selectBall.splice(index,1);
                    this.kgLottery.selectID.splice(index,1);
                }
                //遍历玩法 修改 name值

                this.kgLottery.kgSpecial ={};
                this.kgLottery.kgSpecial.name=this.kgLottery.selectBall.join('.');
                //id 拼接
                //this.kgLottery.kgSpecial.wanFaID=this.kgLottery.selectID.join('_');
                this.kgLottery.kgSpecial.wanFaID=this.kgLottery.selectID[0]; // 取任意一位ID传参
                this.kgLottery.kgSpecial.minlength = this.minlength;
                this.beforbet();
                this.compuSelect();
            },
            /*排列*/
            calculatePl: function(n, m) {
                if (n < m) return false;
                var num = 1;
                for (var i = 0; i < m; i++) {
                    num = num * (n - i);
                }
                return num;
            },
            /*组合*/
            calculateZh: function(n, m) {
                if (n < m) return false;
                return this.calculatePl(n, m) / this.calculatePl(m, m);
            },
            beforbet(){
                //根据对应玩法号码组合 计算注数
                let zhushu = this.calculateZh(this.kgLottery.selectBall.length,this.minlength);
                this.kgLottery.zhushu = zhushu;
                this.kgLottery.groupBetLX =true;
            },
            //计算注数金额
            compuSelect(){
                //this.kgLottery.zhushu = this.kgLottery.selectList.length;
                this.kgLottery.allMoney = this.kgLottery.zhushu*this.kgLottery.totalMoney;
            }
        },
        watch:{
            "kgLottery.totalMoney": function () {
                arrayUtil.forEach(this.kgLottery.playTypes,pt=>{
                    arrayUtil.forEach(pt.betTypes,bt=>{
                        arrayUtil.forEach(bt.beteTypes,bet=>{
                            bet.val=this.kgLottery.totalMoney;
                        })
                    })
                });
                this.compuSelect();
            },
            "kgLottery.submenuIndex":function(){
                this.init();
            },
            "kgLottery.showDesc":function(){
                this.compuLenth();
            }
        },
        components: {},

    }
</script>
