<template>
        <div>
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div class="report-select">
                    <ul class="display-box">
                        <li :class="{'active':selectType==1}" @click="recharge(1)">报表总览</li>
                        <li :class="{'active':selectType==2}" @click="recharge(2)">团队统计</li>
                    </ul>
                </div>
            </header>
            <component :is="rechargetype"></component>
        </div>
</template>
<script>
    import teamOverview from './teamOverview.vue'
    import teamAccount from './teamAccount.vue'
    export default {
        data () {
            return {
                rechargetype:'v-teamOverview',
                selectType: "1"
            }
        },
        methods: {
            goback: function(){
                this.$router.push('/agentCenter');
            },
            recharge:function(type){
                this.selectType = type;
                if(type == 1){
                    this.rechargetype = 'v-teamOverview'
                }else {
                    this.rechargetype = 'v-teamAccount'
                }
            }
        },
        components: {
            'v-teamOverview':teamOverview,
            'v-teamAccount':teamAccount
        }
    }
</script>
<style scoped>
    .report-select .display-box{
        margin-top: 0.06rem;
    }
</style>
