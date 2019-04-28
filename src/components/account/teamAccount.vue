<template>
    <div class="report-height">
        <ul  class="display-box team-list">
            <li>团队钱包余额</li>
            <li class="text-right"><span class="red">¥</span> {{teamData.balance.capitalCenter | fixedMoney}}</li>
        </ul>
        <ul class="display-box team-list">
            <li>团队彩票余额</li>
            <li class="text-right"><span class="red">¥</span> {{teamData.balance.lotteryMoney | fixedMoney}}</li>
        </ul>
        <ul  class="display-box team-list">
            <li>团队人数</li>
            <li class="text-right">{{teamData.balance.teamcount}}</li>
        </ul>
    </div>
</template>

<script>
    import RecordList from '../../assets/js/api/recordSearchApi';
    export default {
        data () {
            return {
                teamData:{
                    balance:{}
                }
            }
        },
        methods: {

        },
        created(){
            let _this = this;
            RecordList.getTeamBalance( (res) =>{
                _this.teamData = res.data;
            })
        },
        components: {}
    }
</script>
<style>

</style>
