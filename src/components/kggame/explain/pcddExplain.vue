<template>
    <div  class="report-height problem-main kg-explain">
        <div class="lottery-title">
            <p>PC蛋蛋规则说明</p>
        </div>
        <div class="lottery-title">
            <p>一、简介</p>
        </div>
        <dl>
            <dd>
                PC蛋蛋开奖结果来源于国家福利彩票北京快乐8(官网)开奖号码，从早上9:05至23:55，每5分钟一期不停开奖。
                北京快乐8每期开奖共开出20个数字，PC蛋蛋将这20个开奖号码按照由小到大的顺序依次排列；
                取其1-6位开奖号码相加，和值的末位数作为PC蛋蛋开奖第一个数值；取其7-12位开奖号码相加，
                和值的末位数作为PC蛋蛋开奖第二个数值，取其13-18位开奖号码相加，和值的末位数作为PC蛋蛋开奖第三个数值；
                三个数值相加即为PC蛋蛋最终的开奖结果。
            </dd>
        </dl>
        <div class="lottery-title">
            <p>二、游戏玩法</p>
        </div>
        <dl>
            <dt>大小玩法：</dt>
            <dd>数字14-27为大，数字0-13为小</dd>
        </dl>
        <dl>
            <dt>单双玩法：</dt>
            <dd>数字1，3，5，~27为单，数字0，2，4~26为双</dd>
        </dl>
        <dl>
            <dt>极值玩法：</dt>
            <dd>[极小0-5]，[极大22-27]</dd>
        </dl>
        <dl>
            <dt>组合玩法：</dt>
            <dd> 数字14，16，~26为大双，数字0，2，4，~12为小双
                数字15，17，~27为大单，数字1，3，5，~13为小单
                小单：13，大双：14，视为和(不计算输赢，返回本金)。</dd>
        </dl>
        <dl>
            <dt>定位玩法：</dt>
            <dd>从数字0-27中选取一个数字</dd>
        </dl>
        <dl>
            <dt>特码三压一：</dt>
            <dd>选取三个特码,三个特码中有任一号码和开奖结果一致 如当期开奖结果为 3+3+3=9 购买号码中包含9即中奖</dd>
        </dl>
        <dl>
            <dt>豹子：</dt>
            <dd>当期3个开奖号码一致则中奖 , 如当期开奖结果为 3+3+3=9 则中奖豹子</dd>
        </dl>
    </div>
</template>

<script>
    import arrayUtil from '../../../assets/js/util/arrayUtil'
    export default {
        
        data () {
            return {
            }
        },
        created(){
            
        },
        methods: {
            
        },
        components: {}
    }
</script>