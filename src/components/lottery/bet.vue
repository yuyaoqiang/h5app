<template>
    <div>
        <div v-cloak>
            <div v-for="item in arr" v-if="selectorType=='DIGITAL'" >
                <dl data-po={{$index}}>
                    <dt><i>{{item.title}}</i><span>遗漏/冷热</span></dt>
                    <dd v-for="no in item.no">
                        <div @click="compute()" data-rel={{no}}>{{no}}</div>
                        <div>
                            <span>12</span>
                            <span>/</span>
                            <span>15</span>
                        </div>
                    </dd>
                </dl>
                <ul v-if="helpBtn==1" style="display:none;">
                    <li @click="helpMissing()">遗漏</li>
                    <li @click="helpHod()">冷热</li>
                    <li @click="helpAll()">全</li>
                    <li @click="helpBig()">大</li>
                    <li @click="helpSmall()">小</li>
                    <li @click="helpOdd()">奇</li>
                    <li @click="helpEven()">偶</li>
                    <li @click="helpClear()">清</li>
                </ul>
                <div v-if="helpBtn" @click="helpShow()"><i class="on_help off_help"><!--关闭帮助选号时更改class名 off_help --></i></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {},
        components: {}
    }
</script>