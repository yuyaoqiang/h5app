<template>
    <div class="report-height problem-main kg-explain">
        <div class="lottery-title">
            <p>1、第一名 ~ 第十名</p>
        </div>
        <dl>
            <dt>第一名~第十名：</dt>
            <dd>{{isCar}}号指定，每一个{{isCar}}号为一投注组合，开奖结果"投注{{isCar}}号"对应所投名次视为中奖，其余情形视为不中奖。</dd>
        </dl>
        <dl>
            <dt>两面：</dt>
            <dd>指单、双；大、小。</dd>
        </dl>
        <dl>
            <dt>单、双：</dt>
            <dd>号码为双数叫双，如8、10；号码为单数叫单，如9、5。</dd>
        </dl>
        <dl>
            <dt>大、小：</dt>
            <dd>开出之号码大于或等于6为大，小于或等于5为小。</dd>
        </dl>
        <div class="lottery-title">
            <p>2、1~5龙虎</p>
        </div>
        <dl>
            <dt>冠　军 龙/虎：</dt>
            <dd>"第一名"{{isCar}}号大于"第十名"{{isCar}}号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</dd>
            <dt>亚　军 龙/虎：</dt>
            <dd>"第二名"{{isCar}}号大于"第九名"{{isCar}}号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</dd>
            <dt>第三名 龙/虎：</dt>
            <dd>"第三名"{{isCar}}号大于"第八名"{{isCar}}号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</dd>
            <dt>第四名 龙/虎：</dt>
            <dd>"第四名"{{isCar}}号大于"第七名"{{isCar}}号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</dd>
            <dt>第五名 龙/虎：</dt>
            <dd>"第五名"{{isCar}}号大于"第六名"{{isCar}}号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</dd>
        </dl>
        <div class="lottery-title">
            <p>3、冠亚军和</p>
        </div>
        <dl>
            <dt>冠军{{isCar}}号＋亚军{{isCar}}号＝冠亚和值：</dt>
            <dd>可能出现的结果为3～19，投中对应"冠亚和值"数字的视为中奖，其余视为不中奖。</dd>
            <dt>冠亚和大小：</dt>
            <dd>大于11时投注"大"的注单视为中奖，小于或等于11时投注"小"的注单视为中奖，其余视为不中。</dd>
            <dt>冠亚和单双：</dt>
            <dd>为单视为投注"单"的注单视为中奖，为双视为投注"双"的注单视为中奖，其余视为不中奖。</dd>
        </dl>
    </div>
</template>

<script>
    import arrayUtil from '../../../assets/js/util/arrayUtil'
    export default {
        
        data () {
            return {
                isCar:'车'
            }
        },
        created(){
            var id = this.$route.query.gameId;
            if(id==40){
                this.isCar = '艇'
            }else{
                this.isCar = '车'
            }
        },
        methods: {
            
        },
        components: {}
    }
</script>