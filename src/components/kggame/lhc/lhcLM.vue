<template>
    <div>
        <div class="fixed-x"><p @click.stop="selectBox=!selectBox">{{playTypeName}} <i class="el-icon-arrow-down"></i></p></div>
        <div class="kg-link-play">
            
            <dl class="kg-link-select" v-show="selectBox">
                <dd v-for="(betType,index) in kgBetTypes" @click="toBetChoice(betType.id)" :class="{'active':betType.active}">
                    {{betType.name.split('|')[0]}}
                </dd>
            </dl>
        </div>
        <div class="kg-lottery-main">
            <ul class="clearfix kg-lottery-link">
                <li v-for="ball in ballList" @click="selectNum(ball,kgBetTypes)" :class="{'active':ball.active}">
                    <i  :class="ball.color">
                        {{ball.num}}
                    </i>
                </li>
            </ul>
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
                ballList:[
                    {"num":'01','active':false,'color':'ball-red'},
                    {"num":'02','active':false,'color':'ball-red'},
                    {"num":'03','active':false,'color':'ball-blue'},
                    {"num":'04','active':false,'color':'ball-blue'},
                    {"num":'05','active':false,'color':'ball-green'},
                    {"num":'06','active':false,'color':'ball-green'},
                    {"num":'07','active':false,'color':'ball-red'},
                    {"num":'08','active':false,'color':'ball-red'},
                    {"num":'09','active':false,'color':'ball-blue'},
                    {"num":'10','active':false,'color':'ball-blue'},
                    {"num":'11','active':false,'color':'ball-green'},
                    {"num":'12','active':false,'color':'ball-red'},
                    {"num":'13','active':false,'color':'ball-red'},
                    {"num":'14','active':false,'color':'ball-blue'},
                    {"num":'15','active':false,'color':'ball-blue'},
                    {"num":'16','active':false,'color':'ball-green'},
                    {"num":'17','active':false,'color':'ball-green'},
                    {"num":'18','active':false,'color':'ball-red'},
                    {"num":'19','active':false,'color':'ball-red'},
                    {"num":'20','active':false,'color':'ball-blue'},
                    {"num":'21','active':false,'color':'ball-green'},
                    {"num":'22','active':false,'color':'ball-green'},
                    {"num":'23','active':false,'color':'ball-red'},
                    {"num":'24','active':false,'color':'ball-red'},
                    {"num":'25','active':false,'color':'ball-blue'},
                    {"num":'26','active':false,'color':'ball-blue'},
                    {"num":'27','active':false,'color':'ball-green'},
                    {"num":'28','active':false,'color':'ball-green'},
                    {"num":'29','active':false,'color':'ball-red'},
                    {"num":'30','active':false,'color':'ball-red'},
                    {"num":'31','active':false,'color':'ball-blue'},
                    {"num":'32','active':false,'color':'ball-green'},
                    {"num":'33','active':false,'color':'ball-green'},
                    {"num":'34','active':false,'color':'ball-red'},
                    {"num":'35','active':false,'color':'ball-red'},
                    {"num":'36','active':false,'color':'ball-blue'},
                    {"num":'37','active':false,'color':'ball-blue'},
                    {"num":'38','active':false,'color':'ball-green'},
                    {"num":'39','active':false,'color':'ball-green'},
                    {"num":'40','active':false,'color':'ball-red'},
                    {"num":'41','active':false,'color':'ball-blue'},
                    {"num":'42','active':false,'color':'ball-blue'},
                    {"num":'43','active':false,'color':'ball-green'},
                    {"num":'44','active':false,'color':'ball-green'},
                    {"num":'45','active':false,'color':'ball-red'},
                    {"num":'46','active':false,'color':'ball-red'},
                    {"num":'47','active':false,'color':'ball-blue'},
                    {"num":'48','active':false,'color':'ball-blue'},
                    {"num":'49','active':false,'color':'ball-green'},
                ],
                playTypeName:'选择玩法',
                selectBox:false,
                mergeObj:{
                    '三中二':{isHave:false},
                    '二中特':{isHave:false},
                }
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
                //this.playTypeName = '选择玩法';
                this.kgBetTypes = [];
                this.mergeObj = {'三中二':{isHave:false},'二中特':{isHave:false}};
                var arr = this.kgLottery.playTypes[index].betTypes[subIndex].beteTypes;

                for(let i=0;i<arr.length;i++){
                    if(arr[i].name=='三中二'||arr[i].name=='二中特'){
                        this.mergeObj[arr[i].name].isHave = true;
                        this.mergeObj[arr[i].name].odds = arr[i].odds; 
                        this.mergeObj[arr[i].name].name = arr[i].name;
                    }else{
                        if(arr[i].name=='三中三'&&this.mergeObj['三中二'].isHave){
                            arr[i].name = '三中三（中二）'
                        }
                        if(arr[i].name=='二中二'&&this.mergeObj['二中特'].isHave){
                            arr[i].name = '二中二（中特）'
                        }
                        this.kgBetTypes.push(arr[i])
                    }
                }
                this.toBetChoice(this.kgBetTypes[0].id);
                this.kgBetTypes[0].active=true;
            },
            selectNum(ball,betType){
                this.kgLottery.resetStatu = false;
                if(kgBusiness.isClose()){
                    return
                }
                ball.active = !ball.active;
                //判断是否选择玩法，提示先选择玩法
                let count = 0;
                let ballList = this.ballList;
                //遍历玩法 判断是否存在active
                for(let i=0;i<betType.length;i++){
                    if(betType[i].active){
                        betType[i].val = this.kgLottery.totalMoney;
                        count++;
                    }
                }
                if(count==0){
                    this.lalterWarning("请选择玩法");
                    //避免重置后球还有选择状态
                    for(let j=0;j<ballList.length;j++){
                        ballList[j].active = false;
                    }
                    return;
                }
                //选择的号码长度不能低于玩法允许的长度 最长十位
                this.kgLottery.selectBall = [];
                for(let k=0;k<ballList.length;k++){
                    if(ballList[k].active){
                        this.kgLottery.selectBall.push(ballList[k].num);
                    }
                }

                if(this.kgLottery.selectBall.length>this.maxlength){
                    this.lalterWarning(`最多只能选择${this.maxlength}位`);
                    ball.active = false;
                    this.kgLottery.selectBall.pop();
                    return
                }
                //遍历玩法 修改 name值 取号码
                let num = this.kgLottery.selectBall.join(",");
                let name = this.betTypes.name.split('|')[0];
                this.betTypes.name = name+"|"+num;
                this.kgLottery.kgSpecial ={};
                this.kgLottery.kgSpecial.name=this.betTypes.name;
                this.kgLottery.kgSpecial.minlength = this.minlength;
                this.beforbet();
                this.compuSelect();
            },
            toBetChoice(command){
                
                let _this = this;
                _this.selectBox=false;
                var betType = {};

                arrayUtil.forEach(_this.kgBetTypes,type=>{
                    if(type.id == command){
                        betType = type;
                        _this.playTypeName = type.name.split('|')[0];
                        type.active=true;
                    }
                });

               // let betType = command.betType;
                let ID = command;
                let list = _this.kgBetTypes;
                //this.playTypeName = command.playTypeName;
                if(kgBusiness.isClose()){
                    return
                }
                arrayUtil.forEach(this.ballList,item=>{
                    item.active = false;
                });

                this.kgLottery.selectBall =[];
                this.kgLottery.selectID =[];
                this.kgLottery.totalMoneyl = 0;
                this.kgLottery.kgSpecial = {name:''};

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

                    for(let i=0;i<this.kgLottery.selectList.length;i++){
                        if(this.kgLottery.selectList[i].id == betType.id){
                            this.kgLottery.selectList.splice(i,1);
                        }
                    }
                }
                switch (betType.name.split('|')[0]){
                    case '特串':
                    case '二中二':
                    case '二中特':
                    case '二全中':
                    case '二中二（中特）':
                        this.minlength=2;
                        this.maxlength=10;
                        break;
                    case '三中三':
                    case '三中二':
                    case '三全中':
                    case '三中三（中二）':
                        this.minlength=3;
                        this.maxlength=10;
                        break;
                    case '四全中':
                        this.minlength=4;
                        this.maxlength=10;
                        break;
                    case '五不中':
                        this.minlength=5;
                        this.maxlength=10;
                        break;
                    case '六不中':
                        this.minlength=6;
                        this.maxlength=10;
                        break;
                    case '七不中':
                        this.minlength=7;
                        this.maxlength=10;
                        break;
                    case '八不中':
                        this.minlength=8;
                        this.maxlength=11;
                        break;
                    case '九不中':
                        this.minlength=9;
                        this.maxlength=12;
                        break;
                    case '十不中':
                        this.minlength=10;
                        this.maxlength=13;
                        break;
                    case '十一不中':
                        this.minlength=11;
                        this.maxlength=13;
                        break;
                    case '十二不中':
                        this.minlength=12;
                        this.maxlength=14;
                        break;
                };
                for(let i=0;i<list.length;i++){
                    list[i].active = false;
                }
                betType.active =true;
                this.betTypes = betType;

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
                this.kgLottery.groupBetLM =true;
            },
            //计算注数金额
            compuSelect(){
                //this.kgLottery.zhushu = this.kgLottery.selectList.length;
                this.kgLottery.allMoney = this.kgLottery.zhushu*this.kgLottery.totalMoney;
            }
        },
        watch:{
            "kgLottery.totalMoney": function () {
                let playTypes = this.kgLottery.playTypes[this.kgLottery.menuIndex].betTypes[this.kgLottery.submenuIndex].beteTypes
                for(let i=0; i<playTypes.length;i++){
                    if(playTypes[i].active){
                        playTypes[i].val = this.kgLottery.totalMoney
                    }
                }
                this.compuSelect();
            },
            "kgLottery.submenuIndex":function(){
                this.init();
            },
            "kgLottery.resetStatu":function(){
                if(this.kgLottery.resetStatu){
                    for(let j=0;j<this.ballList.length;j++){
                        this.ballList[j].active = false;
                       // this.playTypeName = '选择玩法'
                    }
                    //this.init();
                }
            }
        },
        components: {},

    }
</script>
<style scoped>

</style>
