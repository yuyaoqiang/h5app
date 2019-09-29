<template>
    <div class="kg-lottery-main">
        <article class="kg-lottery-pcdd">
            <section  class="kg-betting-niu" v-if="kgLottery.playTypes!=null && type.isTs==true"
                      v-for="type in kgLottery.playTypes"
                      :class="{'pcdd-wave':type.id == '53','pcdd-leopard':type.id == '54','pcdd-special':type.id == '55'}">
                <h2 class="kg-betting-title">{{type.desc}}</h2>
                <dl v-for="(betType,index) in  type.betTypes">
                    <dd @click="toBetChoice(betType,betType.id)" :class="{'active':betType.active}">
                        <div>
                            <p :class="{'pcdd-special-msg':type.id == '55'}">{{type.id == '55'?'特码三压一':betType.name}}</p>
                            <p :class="{'pcdd-special-msg':type.id == '55'}" class="red">{{betType.odds}}</p>
                            <!-- <p class="betting-money" v-if="betType.active">¥{{kgLottery.totalMoney}} 元</p> -->
                        </div>
                    </dd>
                </dl>

                <ul class="display-box pcdd-special-select" v-if="type.id == '55'">
                    <li>
                        <section>
                            <input type="text" readonly class="pcdd-special-input" v-model="firNum"/>
                            <select v-model="firNum2" @change="firNumSelect()">
                                <option v-for="item in numList" v-if="(item==firNum || item == secNum || item==thrNum)==false"
                                    :label="item" :value="item">{{item}}</option>
                            </select>
                        </section>
                    </li>
                    <li>
                        <section>
                            <input type="text" readonly class="pcdd-special-input" v-model="secNum"/>
                            <select v-model="secNum2"  @change="secNumSelect()">
                                <option v-if="(item==firNum || item == secNum || item==thrNum)==false" v-for="item in numList"
                                        :label="item"
                                        :value="item">
                                    {{item}}
                                </option>
                            </select>
                        </section>
                    </li>
                    <li>
                        <section>
                            <input type="text" readonly class="pcdd-special-input" v-model="thrNum"/>
                            <select  v-model="thrNum2" @change="thrNumSelect()">
                                <option v-if="(item==firNum || item == secNum || item==thrNum)==false" v-for="item in numList"
                                        :label="item"
                                        :value="item">{{item}}</option>
                            </select>
                        </section>
                    </li>
                </ul>
            </section>
        </article>
    </div>
</template>

<script>
    import arrayUtil from '../../../assets/js/util/arrayUtil'
    import kgBusiness from '../../../assets/js/business/lottery/kg/kgBusiness'
    import stringUtil from "../../../assets/js/util/stringUtil";
    export default {
        props: {
            kgLottery:{
                type: Object
            }
        },
        data () {
            return {
                numList:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27'],
                firNum:'1',
                firNum2:'',
                secNum:'2',
                secNum2:'',
                thrNum:'3',
                thrNum2:''
            }
        },
        created(){
            this.kgLottery.selectList = [];
            this.reNameTm();
        },
        methods: {
            firNumSelect(){
                if(stringUtil.isNotBlank(this.firNum2)){
                    this.firNum=this.firNum2;
                }
                this.reNameTm();
            },
            secNumSelect(){
                if (stringUtil.isNotBlank(this.secNum2)){
                    this.secNum = this.secNum2
                }
                this.reNameTm();
            },
            thrNumSelect(){
                if (stringUtil.isNotBlank(this.thrNum2)){
                    this.thrNum = this.thrNum2
                }
                this.reNameTm();
            },
            reNameTm(){
                var _this = this;
                arrayUtil.findFirst(this.kgLottery.playTypes,item =>{
                    if(item.id == '55'){
                        arrayUtil.forEach(item.betTypes,bet =>{
                            bet.name = _this.firNum +'|'+_this.secNum + '|' + _this.thrNum;
                         })
                    };
                });
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
            }
        },
        components: {},

    }
</script>
