<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box"  @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>
                    <span @click="handlePlayClick">{{this.title}} ▼</span>
                </h1>
            </header>
        </div>
        
        <div v-if="show">
            <div class="lottery-play-select lottery-play-height" style="top:0.44rem">
                <div class="lottery-play-all">
                    <dl v-for="(elem, key) in methodList" :key="key" class="lottery-play-btn">
                        <dt>{{key}}</dt>
                        <dd>
                            <ul v-for="(elemArray, index) in elem" :class="{'active':elemArray.selected===true}" @click="handleInfoClick(index, key, elemArray.title)">
                                <li>{{elemArray.title}}</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <section class="report-height problem-main line-hig" v-if="showMethodInfoList">
            <dl v-for="(elem, key) in methodInfoList" :key="key">
                <dd>
                    <b>{{elem.title}}</b>
                    <span>{{elem.info}}</span>
                    <p>
                        <b>投注方案：</b>
                        <span>{{elem.plan}}</span>
                    </p>
                </dd>
            </dl>
        </section>
    </div>
</template>
<script>
    import playExplain  from  '../../assets/js/data/playExplain.js';
    import  appController from  "../../assets/js/business/app/appController"
    export default {
        data () {
            return {
                show: true,
                title: '玩法说明',
                methodInfoList: [],
                methodList:{},
                showMethodInfoList:false
            }
        },
        created () {
            this.methodList = playExplain.explain;
        },
        methods: {
            goback(){

                var appCtr = appController.getController();
                if(appCtr == null){
                    if (this.show) {
                        this.$router.go(-1);
                    }else {
                        this.show = true;
                        this.showMethodInfoList = false;
                    }
                }else {
                     appCtr.goback();
                }
            },
            handlePlayClick () {
                if (!this.show){
                    this.show = true;
                    this.showMethodInfoList = false;
                }
            },
            handleInfoClick (index, num, name) {
                for (let key in this.methodList) {
                    this.methodList[key].map(function(item){
                        item.selected = false
                    })
                }
                this.show = false;
                this.showMethodInfoList = true;
                const result = []
                let title = ''
                for (let key in this.methodList) {
                    if (key === num) {
                        title = key + '-' + name
                        this.methodList[key].map(function(value){
                            if (value.id === index) {
                                value.selected = true
                                result.push(value)
                            }
                        })
                    }
                }
                this.methodInfoList = result
                this.title = title
            }
        }
    }
</script>
<style  scoped>
    .line-hig {
        line-height: .25rem;
    }
    .lottery-play-height {
        height: 100%;
    }
    .lottery-play-all {
        padding-bottom: 0.5rem;
        background-color: #F4F4F4;
    }
    .lottery-play-btn {
        background: #ffffff;
    }
    .lottery-play-btn + .lottery-play-btn {
        margin-top: .1rem;
    }
</style>
