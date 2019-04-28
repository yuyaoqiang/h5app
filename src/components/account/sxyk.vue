<template>
    <div v-if="data.init==true" class="report-platform-main">
        <div class="report-platform">
            <ul class="display-box">
                <li>总赢亏: <span
                        class="green">{{(data.ALLSSUM.agvideowinmoneytotal + data.ALLSSUM.agselfbonusmoney) | fixedMoney}}</span>
                </li>
                <li class="text-right">AG平台</li>
            </ul>
            <ul class="display-box">
                <li>
                    中奖: <span class="green">{{data.ALLSSUM.agvideowinmoneytotal | fixedMoney}}</span>
                </li>
                <li class="text-center">
                    返点: <span>{{data.ALLSSUM.agselfbonusmoney}}</span>
                </li>
                <li class="text-right">
                    投注: <span class="red">{{data.ALLSSUM.agvideoordermoneytotal | fixedMoney}}</span> 元
                </li>
            </ul>
        </div>
        <div class="report-platform">
            <ul class="display-box">
                <li>总赢亏: <span
                        class="green">{{((data.ALLSSUM.bbinvideowinmoneytotal + data.ALLSSUM.bbinsportwinmoneytotal + data.ALLSSUM.bbinvideogamewinmoneytotal) / 1
                + data.ALLSSUM.bbselfbonusmoney / 1) | fixedMoney}}</span>
                </li>
                <li class="text-right">BB平台</li>
            </ul>
            <ul class="display-box">
                <li>
                    中奖: <span
                        class="green">{{(data.ALLSSUM.bbinvideowinmoneytotal + data.ALLSSUM.bbinsportwinmoneytotal + data.ALLSSUM.bbinvideogamewinmoneytotal) | fixedMoney}}</span>
                </li>
                <li class="text-center">
                    返点: <span>{{data.ALLSSUM.bbselfbonusmoney}}</span>
                </li>
                <li class="text-right">
                    投注: <span
                        class="red">{{(data.ALLSSUM.bbinvideoordermoneytotal + data.ALLSSUM.bbinsportordermoneytotal + data.ALLSSUM.bbinvideogameordermoneytotal) | fixedMoney}}</span>
                    元
                </li>
            </ul>
        </div>

        <div class="report-platform">
            <ul class="display-box">
                <li>总赢亏: <span
                        class="green">{{(data.ALLSSUM.ptvideowinmoneytotal + data.ALLSSUM.ptselfbonusmoney) | fixedMoney}}</span>
                </li>
                <li class="text-right">PT平台</li>
            </ul>
            <ul class="display-box">
                <li>
                    中奖: <span class="green">{{data.ALLSSUM.ptvideowinmoneytotal | fixedMoney}}</span>
                </li>
                <li class="text-center">
                    返点: <span>{{data.ALLSSUM.ptselfbonusmoney}}</span>
                </li>
                <li class="text-right">
                    投注: <span class="red">{{data.ALLSSUM.ptvideoordermoneytotal | fixedMoney}}</span> 元
                </li>
            </ul>
        </div>

       

        <div class="report-platform">
            <ul class="display-box">
                <li>总赢亏: <span
                        class="green">{{(data.ALLSSUM.mgvideowinmoneytotal + data.ALLSSUM.mgselfbonusmoney) | fixedMoney}}</span>
                </li>
                <li class="text-right">MG平台</li>
            </ul>
            <ul class="display-box">
                <li>
                    中奖: <span class="green">{{data.ALLSSUM.mgvideowinmoneytotal | fixedMoney}}</span>
                </li>
                <li class="text-center">
                    返点: <span>{{data.ALLSSUM.mgselfbonusmoney}}</span>
                </li>
                <li class="text-right">
                    投注: <span class="red">{{data.ALLSSUM.mgvideoordermoneytotal | fixedMoney}}</span> 元
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            data:{
                type: Object
            }
        },

    }
</script>
<style>

</style>
